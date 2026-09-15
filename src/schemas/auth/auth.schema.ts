import { z } from "zod";

import type { LoginRequest, RegisterRequest } from "@/types/api/auth";

export const loginSchema = z.object({

    username: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters.")
        .max(20, "Username cannot exceed 20 characters.")
        .regex(/^[a-zA-Z0-9._]+$/, {
            message:
                "Username can contain only letters, numbers, dots and underscores.",
        }),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters."),

});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const loginDefaultValues: LoginRequest = {

    username: "",

    password: "",

};

export const signupSchema = z.object({

    username: z
        .string()
        .trim()
        .min(3, {
            message: "Username must be at least 3 characters.",
        })
        .max(20, {
            message: "Username cannot exceed 20 characters.",
        })
        .regex(/^[a-zA-Z0-9._]+$/, {
            message:
                "Username can contain only letters, numbers, dots and underscores.",
        }),

    email: z
        .email({
            message: "Please enter a valid email address.",
        }),

    password: z
        .string()
        .min(8, {
            message: "Password must be at least 8 characters long.",
        })
        .regex(
            /[A-Za-z]/,
            "Password must include at least one letter.",
        )
        .regex(
            /[0-9]/,
            "Password must include at least one number.",
        )
        .regex(
            /[^A-Za-z0-9]/,
            "Password must include at least one symbol.",
        ),

    city: z
        .string()
        .trim()
        .min(2, {
            message: "City must be at least 2 characters.",
        }),

    sentimentAnalysisEnabled: z.boolean(),

});

export type SignupFormValues = z.infer<typeof signupSchema>;

export const signupDefaultValues: RegisterRequest = {

    username: "",

    email: "",

    password: "",

    city: "",

    sentimentAnalysisEnabled: false,

};