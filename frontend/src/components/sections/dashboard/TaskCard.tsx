"use client";

import { useState } from "react";

interface Task {
    _id: string;
    title: string;
    description?: string;
    status: string;
    due_date?: string;
}

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (taskId: string) => void;
    onToggle: (taskId: string, newStatus: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete, onToggle }: TaskCardProps) {
    const [deleting, setDeleting] = useState(false);
    const isCompleted = task.status === "completed";

    function formatDate(dateStr: string) {
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }

    function isOverdue() {
        if (!task.due_date || isCompleted) return false;
        return new Date(task.due_date) < new Date();
    }

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this task?")) return;
        setDeleting(true);
        try {
            await onDelete(task._id);
        } catch {
            setDeleting(false);
        }
    }

    return (
        <div className={`bg-white rounded-lg shadow border p-4 ${deleting ? "opacity-50" : ""}`}>
            <div className="flex items-start gap-3 mb-2">
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => onToggle(task._id, isCompleted ? "pending" : "completed")}
                    className="mt-1.5 h-4 w-4 accent-emerald-500 cursor-pointer"
                />
                <div className="flex-1 flex justify-between items-start">
                    <h3 className={`text-lg font-semibold ${isCompleted ? "line-through text-slate-400" : "text-slate-700"}`}>
                        {task.title}
                    </h3>
                    <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${isCompleted
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-amber-100 text-amber-600"
                            }`}
                    >
                        {task.status}
                    </span>
                </div>
            </div>

            {task.description && (
                <p className={`text-sm mb-3 ml-7 ${isCompleted ? "line-through text-slate-300" : "text-slate-500"}`}>
                    {task.description}
                </p>
            )}

            <div className="flex justify-between items-center ml-7">
                <div className="text-xs text-slate-400">
                    {task.due_date && (
                        <span className={isOverdue() ? "text-rose-400 font-medium" : ""}>
                            Due: {formatDate(task.due_date)}
                            {isOverdue() && " (overdue)"}
                        </span>
                    )}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="text-sm text-indigo-500 hover:text-indigo-600 hover:underline"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="text-sm text-rose-400 hover:text-rose-500 hover:underline"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

