import userApi from "@/api/user.api";

import type {
    UserProfile,
    UpdateProfileRequest,
    ChangePasswordRequest,
    ChangeEmailRequest,
    ChangeUsernameRequest,
    DeleteAccountRequest,
    ProfileImageResponse,
} from "@/types/api/user";

import type { MessageResponse } from "@/types/api/common";
import type { AuthResponse } from "@/types/api/auth";


class UserService {

    async getProfile(): Promise<UserProfile> {
        return await userApi.getProfile();
    }

    async updateProfile(request: UpdateProfileRequest): Promise<MessageResponse> {
        return await userApi.updateProfile(request);
    }

    async uploadProfileImage(image: File): Promise<ProfileImageResponse> {
        const formData = new FormData();
        formData.append("image", image);

        return await userApi.UploadProfileImage(formData);
    }

    async changePassword(request: ChangePasswordRequest): Promise<MessageResponse> {
        return await userApi.changePassword(request);
    }

    async changeEmail(request: ChangeEmailRequest): Promise<MessageResponse> {
        return await userApi.changeEmail(request);
    }

    async changeUsername(request: ChangeUsernameRequest): Promise<AuthResponse> {
        return await userApi.changeUsername(request);
    }

    async deleteAccount(request: DeleteAccountRequest): Promise<MessageResponse> {
        return await userApi.deleteAccount(request);
    }

    async startGoogleAccountDeletion(): Promise<{
        authorizationUrl: string;
    }> {

        return await userApi.startGoogleAccountDeletion();
    }
}

export default new UserService();