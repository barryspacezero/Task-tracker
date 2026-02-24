import { Request, Response } from 'express';
import crypto from 'crypto';
import UserService from '../services/user.service';
import { signJwt } from "../utils/jwt";

async function signup(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
        const user = await UserService.createUser(name, email, password);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const user = await UserService.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        if (!crypto.timingSafeEqual(Buffer.from(user.password), Buffer.from(hashedPassword))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = signJwt({ userId: user._id });

        res.json({ message: 'Login successful', access_token: token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}


export default {
    signup,
    login
}