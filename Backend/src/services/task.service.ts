import { TaskModel } from "../models/task.model";

async function createTask(title: string, description: string, due_date: Date, owner: string) {
    const task = new TaskModel({
        title,
        description,
        due_date,
        owner
    });

    return await task.save();
}

async function getTasksByOwner(owner: string) {
    return TaskModel.find({ owner });
}

async function getTaskById(taskId: string) {
    return TaskModel.findById(taskId);
}

async function updateTask(taskId: string, updates: Partial<{ title: string; description: string; status: "pending" | "completed"; due_date: Date }>) {
    return TaskModel.findByIdAndUpdate(taskId, updates, { returnDocument: 'after' });
}

async function deleteTask(taskId: string) {
    return TaskModel.findByIdAndDelete(taskId);
}

export default {
    createTask,
    getTasksByOwner,
    getTaskById,
    updateTask,
    deleteTask
}