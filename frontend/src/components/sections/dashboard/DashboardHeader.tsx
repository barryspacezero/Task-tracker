"use client";

import { removeToken } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function DashboardHeader() {
    const router = useRouter();

    function handleLogout() {
        removeToken();
        router.push("/login");
    }

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>
                <button
                    onClick={handleLogout}
                    className="text-sm text-gray-600 hover:text-gray-800 hover:underline"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}
