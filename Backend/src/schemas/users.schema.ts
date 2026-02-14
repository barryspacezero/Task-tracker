import {z, ZodError} from "zod";

export const UserSignUpSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 6 characters long")
})


export const UserSignInSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 6 characters long")
})