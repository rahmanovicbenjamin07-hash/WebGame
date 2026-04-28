import { z } from "zod"

export const signupSchema = z.object({
    firstname: z.string().min(1).max(50),
    lastname:  z.string().min(1).max(50),
    email:     z.string().email(),
    password:  z.string().min(1),
    avatar:     z.string().optional(),
    avatarName: z.string().optional(),
    avatarType: z.string().optional(),
})

export const signinSchema = z.object({
    email: z.string().email("Invalid email addess"),
    password: z.string().min(1, "Password must be at least 8 characters"),
})

export const updateUserSchema = z.object({
    firstname:    z.string().min(1).max(50).optional(),
    lastname:     z.string().min(1).max(50).optional(),
    password:     z.string().min(1).optional(),
    avatarBase64: z.string().optional(),
    avatarName:   z.string().optional(),
    avatarType:   z.string().optional(),
})