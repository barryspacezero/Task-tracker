import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth/signup.routes';
import taskRoutes from './routes/tasks/task';
import bodyParser from "body-parser";
import { connectDB } from './config/mongo';

const app = express();

const allowedOrigins = [
    'http://localhost:3000',
    'https://task-tracker-xmox.onrender.com',
    'https://penguin-task-tracker.vercel.app',
];
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. curl, Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS policy: origin '${origin}' not allowed`));
        }
    },
    credentials: true,
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 8000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
});
