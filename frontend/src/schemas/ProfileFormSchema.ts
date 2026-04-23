import z from "zod";

export const ProfileFormSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    firstname: z.string(),
    lastname: z.string(),  
})

export type ProfileFormType = z.infer<typeof ProfileFormSchema>;