import { z } from "zod";

export const userSignUpSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
})

export type UserSignUpType = z.infer<typeof userSignUpSchema>

export const userSignInSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export type UserSignInType = z.infer<typeof userSignInSchema>

export const UserSignUpFormSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be atleast 3 characters long"
    }).max(20, {
        message: "Username must not exceed 20 characters"
    }),
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string().min(6, {
        message: "Password must be atleast 6 characters long"
    }),
})

export const UserSignInFormSchema = z.object({
	email: z.string().email({
		message: "Invalid email address",
	}),
	password: z.string().min(6, {
		message: "Password must be atleast 6 characters long",
	}),
});
