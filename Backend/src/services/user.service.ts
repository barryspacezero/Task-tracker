import crypto from 'crypto';
import {User} from '../models/users.model';

async function createUser(name: string, email: string, password: string) {
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    const user = new User({
        name,
        email,
        password: hashedPassword
    });

    return await user.save();
}

async function findUserByEmail(email: string) {
    return User.findOne({email}).select('+password');
}

export default {
    createUser,
    findUserByEmail
}