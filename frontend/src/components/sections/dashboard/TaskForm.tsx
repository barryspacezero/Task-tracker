"use client";

import { useState } from "react";

interface TaskFormData {
    title: string;
    description?: string;
    due_date?: string;
    status?: string;
}

interface TaskFormProps {
    onSubmit: (data: TaskFormData) => Promise<void>;
    initialData?: {
        title: string;
        description?: string;
        due_date?: string;
        status?: string;
    };
    onCancel?: () => void;
}

export default function TaskForm({ onSubmit, initialData, onCancel }: TaskFormProps) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [dueDate, setDueDate] = useState(
        initialData?.due_date ? initialData.due_date.split("T")[0] : ""
    );
    const [status, setStatus] = useState(initialData?.status || "pending");
    const [loading, setLoading] = useState(false);

    const isEdit = !!initialData;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const data: TaskFormData = { title };
            if (description) data.description = description;
            if (dueDate) data.due_date = new Date(dueDate).toISOString();
            if (isEdit) data.status = status;

            await onSubmit(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow border mb-4">
            <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    rows={3}
                />
            </div>

            <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                </label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
            </div>

            {isEdit && (
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                    </label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            )}

            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                    {loading ? "Saving..." : isEdit ? "Update Task" : "Create Task"}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
