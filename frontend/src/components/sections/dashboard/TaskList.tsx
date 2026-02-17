"use client";

import TaskCard from "./TaskCard";

interface Task {
    _id: string;
    title: string;
    description?: string;
    status: string;
    due_date?: string;
}

interface TaskListProps {
    tasks: Task[];
    filter: string;
    onEdit: (task: Task) => void;
    onDelete: (taskId: string) => void;
    onToggle: (taskId: string, newStatus: string) => void;
}

export default function TaskList({ tasks, filter, onEdit, onDelete, onToggle }: TaskListProps) {
    const filteredTasks = tasks.filter((task) => {
        if (filter === "all") return true;
        return task.status === filter;
    });

    if (filteredTasks.length === 0) {
        return (
            <div className="text-center py-12 text-slate-400">
                {tasks.length === 0
                    ? "No tasks yet. Create one to get started!"
                    : "No tasks match the current filter."}
            </div>
        );
    }

    return (
        <>
            <div className="space-y-3">
                {filteredTasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onToggle={onToggle}
                    />
                ))}
            </div>

            <div className="mt-4 text-xs text-slate-300 text-center">
                {filteredTasks.length} of {tasks.length} tasks shown
            </div>
        </>
    );
}
