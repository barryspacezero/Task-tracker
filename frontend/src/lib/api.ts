const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export function getToken() {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
}

export function setToken(token: string) {
    localStorage.setItem("token", token);
    // set as cookie too so middleware can read it
    document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 15}`;
}

export function removeToken() {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const token = getToken();

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
    }

    return data;
}

// Auth
export async function signup(name: string, email: string, password: string) {
    return fetchAPI("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
    });
}

export async function login(email: string, password: string) {
    const data = await fetchAPI("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
    setToken(data.access_token);
    return data;
}

// Tasks
export async function getTasks() {
    const data = await fetchAPI("/tasks");
    return data.tasks;
}

export async function createTask(title: string, description?: string, due_date?: string) {
    const body: Record<string, string> = { title };
    if (description) body.description = description;
    if (due_date) body.due_date = due_date;

    return fetchAPI("/tasks", {
        method: "POST",
        body: JSON.stringify(body),
    });
}

export async function updateTask(taskId: string, updates: Record<string, string>) {
    return fetchAPI(`/tasks/${taskId}`, {
        method: "PUT",
        body: JSON.stringify(updates),
    });
}

export async function deleteTask(taskId: string) {
    return fetchAPI(`/tasks/${taskId}`, {
        method: "DELETE",
    });
}
