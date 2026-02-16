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
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
    const [deleting, setDeleting] = useState(false);

    function formatDate(dateStr: string) {
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }

    function isOverdue() {
        if (!task.due_date || task.status === "completed") return false;
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
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${task.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {task.status}
                </span>
            </div>

            {task.description && (
                <p className="text-gray-600 text-sm mb-3">{task.description}</p>
            )}

            <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                    {task.due_date && (
                        <span className={isOverdue() ? "text-red-500 font-medium" : ""}>
                            Due: {formatDate(task.due_date)}
                            {isOverdue() && " (overdue)"}
                        </span>
                    )}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="text-sm text-red-600 hover:text-red-800 hover:underline"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
