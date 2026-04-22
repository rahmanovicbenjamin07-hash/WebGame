import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email("Make sure to enter the correct password!"),
  password: z.string().min(8, "Password must be more than 8 char long!"),
})

export type SignInType = z.infer<typeof signInSchema>