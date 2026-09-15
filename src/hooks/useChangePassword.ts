import { useMutation } from "@tanstack/react-query";

import userService from "@/services/user.service";

import type {
    ChangePasswordRequest,
} from "@/types/api/user";

export function useChangePassword() {
    return useMutation({
        mutationFn: (
            request: ChangePasswordRequest,
        ) =>
            userService.changePassword(
                request,
            ),
    });
}