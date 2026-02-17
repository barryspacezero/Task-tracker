"use client";

import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "@/lib/api";
import DashboardHeader from "@/components/sections/dashboard/DashboardHeader";
import TaskForm from "@/components/sections/dashboard/TaskForm";
import TaskList from "@/components/sections/dashboard/TaskList";

interface Task {
    _id: string;
    title: string;
    description?: string;
    status: string;
    due_date?: string;
}

export default function DashboardPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchTasks();
    }, []);

    async function fetchTasks() {
        try {
            setLoading(true);
            const data = await getTasks();
            setTasks(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleCreateTask(data: { title: string; description?: string; due_date?: string }) {
        await createTask(data.title, data.description, data.due_date);
        setShowForm(false);
        fetchTasks();
    }

    async function handleUpdateTask(data: { title: string; description?: string; due_date?: string; status?: string }) {
        if (!editingTask) return;
        await updateTask(editingTask._id, data as Record<string, string>);
        setEditingTask(null);
        fetchTasks();
    }

    async function handleDeleteTask(taskId: string) {
        const previousTasks = [...tasks];
        setTasks(tasks.filter((t) => t._id !== taskId));

        try {
            await deleteTask(taskId);
        } catch {
            // rollback if it fails
            setTasks(previousTasks);
            alert("Failed to delete task");
        }
    }

    async function handleToggleTask(taskId: string, newStatus: string) {
        const previousTasks = [...tasks];

        setTasks(tasks.map(t =>
            t._id === taskId ? { ...t, status: newStatus } : t
        ));

        try {
            await updateTask(taskId, { status: newStatus });
        } catch {
            setTasks(previousTasks);
            alert("Failed to update task status");
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-violet-50">
                <p className="text-slate-400">Loading tasks...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-violet-50">
            <DashboardHeader />

            <main className="max-w-4xl mx-auto px-4 py-6">
                {error && (
                    <div className="bg-rose-100 text-rose-600 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <label className="text-sm text-slate-500">Filter:</label>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="px-3 py-1 border border-slate-200 rounded-md text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        >
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <button
                        onClick={() => {
                            setShowForm(!showForm);
                            setEditingTask(null);
                        }}
                        className="bg-indigo-400 text-white px-4 py-2 rounded-md hover:bg-indigo-500 text-sm transition-colors"
                    >
                        {showForm ? "Cancel" : "+ New Task"}
                    </button>
                </div>

                {showForm && (
                    <TaskForm
                        onSubmit={handleCreateTask}
                        onCancel={() => setShowForm(false)}
                    />
                )}

                {editingTask && (
                    <TaskForm
                        initialData={editingTask}
                        onSubmit={handleUpdateTask}
                        onCancel={() => setEditingTask(null)}
                    />
                )}

                <TaskList
                    tasks={tasks}
                    filter={filter}
                    onEdit={(task) => {
                        setEditingTask(task);
                        setShowForm(false);
                    }}
                    onDelete={handleDeleteTask}
                    onToggle={handleToggleTask}
                />
            </main>
        </div>
    );
}
