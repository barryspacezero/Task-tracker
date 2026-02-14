import {z, ZodError} from "zod";

export const CreateTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    due_date: z.iso.datetime().optional()
});

export const UpdateTaskSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().optional(),
    status: z.enum(["pending", "completed"]).optional(),
    dueDate: z.string().optional(),
});

