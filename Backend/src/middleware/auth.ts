import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import {verifyJwt} from "../utils/jwt";
import {User} from "../models/users.model";

export interface AuthenticatedRequest extends Request {
    user?: typeof User.prototype;
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = verifyJwt(token);

    if (!decoded || typeof decoded === 'string' || !decoded.userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
    }

    try {
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
        }

        (req as AuthenticatedRequest).user = user;
        next();
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}

