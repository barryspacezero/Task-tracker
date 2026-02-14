import jsonwebtoken from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '56f7d62b41139680837e5d598100bb778cbbdd727de1ea94f76c6cf9b8e9293a';
const JWT_EXPIRES_IN = '15D';
const JWT_ISSUER = process.env.JWT_ISSUER || 'task_manager';


export const signJwt = (payload: string | Buffer | object, options?: jsonwebtoken.SignOptions) => {
    return jsonwebtoken.sign(payload, JWT_SECRET, {
        algorithm: 'HS256',
        issuer: JWT_ISSUER,
        expiresIn: JWT_EXPIRES_IN,
        ...options
    });
};

export const verifyJwt = (token: string) => {
    try {
        return jsonwebtoken.verify(token, JWT_SECRET, {
            algorithms: ['HS256'],
            issuer: JWT_ISSUER
        });
    } catch (error) {
        return null;
    }
};