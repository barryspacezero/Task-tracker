import TaskService from "../services/task.service";
import {AuthenticatedRequest} from "../middleware/auth";
import {Response} from "express";
import redis from "../config/redis";

async function createTask(req: AuthenticatedRequest, res: Response) {
    const {title, description, due_date} = req.body;
    const owner = req.user;

    try {

        // invalidate
        await redis.del(`tasks:${owner?._id.toString()}`);

        const task = await TaskService.createTask(
            title,
            description,
            due_date,
            owner?._id
        );


        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getTasks(req: AuthenticatedRequest, res: Response) {
    const owner = req.user;

    try {
        // try to get task from redis first
        let tasks: any = await redis.get(`tasks:${owner?._id.toString()}`);

        if (tasks) {
            console.log('Tasks fetched from Redis');
            tasks = JSON.parse(tasks);
        } else {
            tasks = await TaskService.getTasksByOwner(owner?._id);
            // store task in cache
            await redis.set(`tasks:${owner?._id.toString()}`, JSON.stringify(tasks), 'EX', 3600 * 8); // cache for 8 hours
        }
        res.json({ tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateTask(req: AuthenticatedRequest, res: Response) {
    const { taskId } = req.params;
    const updates = req.body;
    const owner = req.user;

    try {
        await redis.del(`tasks:${owner?._id.toString()}`);
        const updatedTask = await TaskService.updateTask(taskId as string, updates);
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteTask(req: AuthenticatedRequest, res: Response) {
    const { taskId } = req.params;

    try {
        const owner = req.user;
        await redis.del(`tasks:${owner?._id.toString()}`);
        const deletedTask = await TaskService.deleteTask(taskId as string);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default {
    createTask,
    getTasks,
    updateTask,
    deleteTask
}