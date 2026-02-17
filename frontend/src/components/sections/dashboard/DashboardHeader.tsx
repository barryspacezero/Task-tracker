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
                <h1 className="text-xl font-bold text-slate-700">Task Manager</h1>
                <button
                    onClick={handleLogout}
                    className="text-sm text-slate-500 hover:text-slate-700 hover:underline"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}
