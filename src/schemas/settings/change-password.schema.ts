import { z } from "zod";

export const changePasswordSchema = z
    .object({
        currentPassword: z
            .string()
            .min(
                1,
                "Current password is required.",
            ),

        newPassword: z
            .string()
            .min(
                8,
                "Password must be at least 8 characters long.",
            )
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

        confirmPassword: z
            .string()
            .min(
                1,
                "Please confirm your new password.",
            ),
    })
    .refine(
        (data) =>
            data.newPassword ===
            data.confirmPassword,
        {
            message: "Passwords do not match.",
            path: ["confirmPassword"],
        },
    );

export type ChangePasswordFormValues =
    z.infer<typeof changePasswordSchema>;