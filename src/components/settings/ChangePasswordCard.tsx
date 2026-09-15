import { Lock, Info } from "lucide-react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import PasswordInput from "@/components/auth/PasswordInput";

import { useChangePassword } from "@/hooks/useChangePassword";

import {
    changePasswordSchema,
    type ChangePasswordFormValues,
} from "@/schemas/settings/change-password.schema";
import { useAuth } from "@/hooks/useAuth";

export default function ChangePasswordCard() {
    const { user } = useAuth();

    const {
        mutateAsync: changePassword,
        isPending,
    } = useChangePassword();

    if (!user || !user.hasPassword) {
        return null;
    }

    const form =
        useForm<ChangePasswordFormValues>({
            resolver:
                zodResolver(
                    changePasswordSchema,
                ),

            defaultValues: {
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            },

            mode: "onBlur",
        });

    const onSubmit = async (
        values: ChangePasswordFormValues,
    ) => {
        try {
            await changePassword(values);

            toast.success(
                "Password updated successfully.",
                {
                    description:
                        "Your password has been changed successfully.",
                },
            );

            form.reset();
        } catch (error) {
            toast.error(
                "Unable to update password.",
                {
                    description:
                        error instanceof Error
                            ? error.message
                            : "Please try again in a moment.",
                },
            );
        }
    };

    return (
        <Card className="overflow-hidden rounded-md">
            <CardContent className="p-4 sm:p-6">
                {/* Header */}
                <div className="flex items-start gap-4">
                    <div
                        className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-violet-100
                            dark:bg-violet-950/40
                        "
                    >
                        <Lock
                            className="
                                h-6
                                w-6
                                text-violet-600
                                dark:text-violet-400
                            "
                            aria-hidden="true"
                        />
                    </div>

                    <div className="min-w-0">
                        <h2 className="text-xl font-semibold">
                            Change Password
                        </h2>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            Keep your account secure by using a strong password.
                        </p>
                    </div>
                </div>

                <div className="my-6 border-t" />

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(
                            onSubmit,
                        )}
                        className="space-y-5"
                    >
                        {/* Password Fields */}
                        <div className="grid gap-5 lg:grid-cols-3">
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Current Password
                                        </FormLabel>

                                        <FormControl>
                                            <PasswordInput
                                                placeholder="Enter current password"
                                                autoComplete="current-password"
                                                disabled={isPending}
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            New Password
                                        </FormLabel>

                                        <FormControl>
                                            <PasswordInput
                                                placeholder="Enter new password"
                                                autoComplete="new-password"
                                                disabled={isPending}
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Confirm New Password
                                        </FormLabel>

                                        <FormControl>
                                            <PasswordInput
                                                placeholder="Confirm new password"
                                                autoComplete="new-password"
                                                disabled={isPending}
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Bottom Row */}
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                            <div
                                className="
                                    flex
                                    min-w-0
                                    flex-1
                                    items-start
                                    gap-3
                                    rounded-lg
                                    bg-violet-50
                                    px-4
                                    py-3
                                    dark:bg-violet-950/20
                                "
                            >
                                <Info
                                    className="
                                        mt-0.5
                                        h-4
                                        w-4
                                        shrink-0
                                        text-violet-600
                                        dark:text-violet-400
                                    "
                                    aria-hidden="true"
                                />

                                <p className="text-xs leading-5 text-violet-700 dark:text-violet-300">
                                    Your password must be at least
                                    8 characters long and include a
                                    mix of letters, numbers, and
                                    symbols.
                                </p>
                            </div>

                            <Button
                                type="submit"
                                disabled={isPending}
                                className="
                                    h-10
                                    shrink-0
                                    rounded-md
                                    bg-violet-600
                                    px-6
                                    text-white
                                    transition-all
                                    duration-200
                                    ease-out
                                    hover:bg-violet-700
                                    hover:shadow-sm
                                    active:scale-[0.98]
                                    dark:bg-violet-600
                                    dark:hover:bg-violet-500
                                "
                            >
                                {isPending
                                    ? "Updating..."
                                    : "Update Password"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}