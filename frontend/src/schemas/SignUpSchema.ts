import z from "zod";

export const signUpSchema = z.object({
                email: z.string().email(),
                firstname: z.string(),
                lastname: z.string(),
                password: z.string(),
                confirmpassword: z.string().min(1, "Password is required"),
}).refine(
  (data) => data.password === data.confirmpassword,
  { message: "Passowrds are not the same!", path: ["confirmpassword"] }
)

export type SignUpType = z.infer<typeof signUpSchema>