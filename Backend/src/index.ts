import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import express from 'express';
import authRoutes from './routes/auth/signup.routes';
import taskRoutes from './routes/tasks/task';
import bodyParser from "body-parser";
import { connectDB } from './config/mongo';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

connectDB().then(() => {
    app.listen(8000, () => {
        console.log('Server is running on port 8000');
    });
}).catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
});
