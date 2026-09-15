import {
    ShieldAlert,
    Trash2,
} from "lucide-react";

import {
    useEffect,
} from "react";

import {
    useForm,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import PasswordInput from "@/components/auth/PasswordInput";

import LoadingSubmitButton from "@/components/common/LoadingSubmitButton";

import { useAuth } from "@/hooks/useAuth";

import {
    useDeleteAccount,
} from "@/hooks/useDeleteAccount";

import {
    getErrorMessage,
} from "@/lib/error";

import {
    applyServerFormError,
} from "@/lib/forms/server-form-error";

import {
    deleteAccountSchema,
    type DeleteAccountFormData,
} from "@/schemas/profile/delete-account";

import { ROUTES } from "@/constants/app/routes";
import userService from "@/services/user.service";

interface DeleteAccountDialogProps {
    open: boolean;
    onOpenChange: (
        open: boolean,
    ) => void;
}

export default function DeleteAccountDialog({
    open,
    onOpenChange,
}: DeleteAccountDialogProps) {
    const {
        user,
        logout,
    } = useAuth();



    const navigate =
        useNavigate();

    const {
        mutateAsync: deleteAccount,
        isPending,
    } = useDeleteAccount();

    const form =
        useForm<DeleteAccountFormData>({
            resolver:
                zodResolver(
                    deleteAccountSchema,
                ),
            defaultValues: {
                password: "",
            },
        });

    const isGoogleOnly =
        !!user &&
        !user.hasPassword &&
        user.hasGoogle;

    /*
     * Reset the form whenever the dialog opens.
     */
    useEffect(() => {
        if (!open) {
            return;
        }

        form.reset({
            password: "",
        });
    }, [open, form]);

    const handleGoogleDelete = async () => {

        if (isPending) {
            return;
        }

        try {

            const {
                authorizationUrl,
            } =
                await userService.startGoogleAccountDeletion();

            onOpenChange(false);

            const apiBaseUrl =
                import.meta.env.VITE_API_BASE_URL as string;

            const backendBaseUrl =
                apiBaseUrl.replace(
                    /\/api\/v1\/?$/,
                    "",
                );

            window.location.href =
                `${backendBaseUrl}${authorizationUrl}`;

        } catch (error) {

            toast.error(
                getErrorMessage(error),
            );
        }
    };

    /*
     * ----------------------------------------
     * Account deletion
     * ----------------------------------------
     */
    const onSubmit = async (
        data: DeleteAccountFormData,
    ) => {

        if (isGoogleOnly) {
            return;
        }

        try {

            await deleteAccount(data);

            onOpenChange(false);

            logout();

            navigate(
                ROUTES.LOGIN,
                {
                    replace: true,
                },
            );

        } catch (error) {

            if (
                applyServerFormError(
                    error,
                    form,
                )
            ) {
                return;
            }

            toast.error(
                getErrorMessage(error),
            );
        }
    };

    /*
     * Prevent accidental closing while the destructive
     * request is in progress.
     */
    const preventCloseWhileDeleting = (
        event: {
            preventDefault: () => void;
        },
    ) => {
        if (isPending) {
            event.preventDefault();
        }
    };

    if (!user) {
        return null;
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(
                nextOpen,
            ) => {
                if (isPending) {
                    return;
                }

                onOpenChange(
                    nextOpen,
                );
            }}
        >
            <DialogContent
                className="sm:max-w-md"
                onPointerDownOutside={
                    preventCloseWhileDeleting
                }
                onEscapeKeyDown={
                    preventCloseWhileDeleting
                }
            >
                <DialogHeader>
                    <div className="flex items-start gap-3">
                        <div
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-destructive/10
                            "
                        >
                            <ShieldAlert
                                className="
                                    h-6
                                    w-6
                                    text-destructive
                                "
                                aria-hidden="true"
                            />
                        </div>

                        <div>
                            <DialogTitle>
                                Delete Account
                            </DialogTitle>

                            <DialogDescription className="mt-1">
                                {isGoogleOnly
                                    ? "This action permanently deletes your account and all associated data. You will need to reauthenticate with Google before your account can be deleted."
                                    : "This action permanently deletes your account and all associated data."
                                }
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                {/* Account information */}
                <div
                    className="
                        rounded-lg
                        border
                        bg-muted/40
                        px-4
                        py-3
                    "
                >
                    <p className="text-xs text-muted-foreground">
                        Account
                    </p>

                    <p className="mt-1 text-sm font-medium">
                        {user.username}
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                        {user.email}
                    </p>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(
                            onSubmit,
                        )}
                        className="space-y-6"
                    >
                        {isGoogleOnly ? (
                            <div
                                className="
                                    rounded-lg
                                    border
                                    bg-muted/40
                                    px-4
                                    py-4
                                "
                            >
                                <p className="text-sm font-medium">
                                    Google authentication required
                                </p>

                                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                                    This account is managed through Google.
                                    Reauthenticate with Google to permanently
                                    delete your account.
                                </p>
                            </div>
                        ) : (
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Current Password
                                        </FormLabel>

                                        <FormControl>
                                            <PasswordInput
                                                autoComplete="current-password"
                                                placeholder="Enter your current password"
                                                disabled={isPending}
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <div
                            className="
                                flex
                                gap-3
                                rounded-lg
                                border
                                border-destructive/20
                                bg-destructive/5
                                px-4
                                py-3
                            "
                        >
                            <Trash2
                                className="
                                    mt-0.5
                                    h-4
                                    w-4
                                    shrink-0
                                    text-destructive
                                "
                                aria-hidden="true"
                            />

                            <p className="text-sm leading-5 text-muted-foreground">
                                Once your account is deleted,
                                your journals, drafts, profile,
                                and other account data cannot
                                be recovered.
                            </p>
                        </div>

                        <DialogFooter className="gap-2 sm:gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={
                                    isPending
                                }
                                onClick={() => {
                                    form.reset();
                                    onOpenChange(
                                        false,
                                    );
                                }}
                                className="rounded-md"
                            >
                                Cancel
                            </Button>

                            {isGoogleOnly ? (
                                <Button
                                    type="button"
                                    onClick={handleGoogleDelete}
                                    disabled={isPending}
                                    className="
                                        rounded-md
                                        bg-destructive
                                        text-destructive-foreground
                                        hover:bg-destructive/90
                                    "
                                >
                                    <ShieldAlert className="h-4 w-4" />
                                    Continue with Google
                                </Button>
                            ) : (
                                <LoadingSubmitButton
                                    type="submit"
                                    loading={isPending}
                                    loadingText="Deleting Account..."
                                    className="
                                            rounded-md
                                            bg-destructive
                                            text-destructive-foreground
                                            hover:bg-destructive/90
                                        "
                                    disabled={
                                        !form
                                            .watch("password")
                                            .trim()
                                    }
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Account
                                </LoadingSubmitButton>
                            )}
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}