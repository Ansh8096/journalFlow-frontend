import client from "./client";

import type {
    UserProfile,
    UpdateProfileRequest,
    ChangePasswordRequest,
    ChangeEmailRequest,
    ChangeUsernameRequest,
    DeleteAccountRequest,
    ProfileImageResponse
} from "@/types/api/user";

import type { MessageResponse } from "@/types/api/common";
import type { AuthResponse } from "@/types/api/auth";

class UserApi {

    async getProfile(): Promise<UserProfile> {
        const { data } = await client.get<UserProfile>("/users/me")
        return data;
    }

    async UploadProfileImage(formData: FormData): Promise<ProfileImageResponse> {


        const { data } = await client.patch<ProfileImageResponse>(
            "/users/me/profile-image",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log("The updateProfile method is called, response: ", data.message);


        return data;
    }

    async updateProfile(request: UpdateProfileRequest): Promise<MessageResponse> {

        const { data } = await client.patch<MessageResponse>(
            "/users/me",
            request
        );

        console.log("updateProfile method is called, response: ", data);

        return data;
    }

    async changePassword(request: ChangePasswordRequest): Promise<MessageResponse> {

        const { data } = await client.patch<MessageResponse>(
            "/users/me/password",
            request
        );

        console.log("The changePassword method is called, response: ", data.message);

        return data;
    }

    async changeEmail(request: ChangeEmailRequest): Promise<MessageResponse> {

        const { data } = await client.patch<MessageResponse>(
            "/users/me/email",
            request
        );

        console.log("The updateProfile method is called, response: ", data.message);

        return data;
    }

    async changeUsername(request: ChangeUsernameRequest): Promise<AuthResponse> {

        const { data } = await client.patch<AuthResponse>(
            "/users/me/username",
            request
        );

        console.log("The changeUsername method is called, response: ", data);

        return data;
    }

    async deleteAccount(request: DeleteAccountRequest): Promise<MessageResponse> {

        // Axios supports sending a request body with DELETE, but it has to be passed in the config object...
        const { data } = await client.delete<MessageResponse>(
            "/users/me",
            {
                data: request,
            }
        );

        return data;
    }

    async startGoogleAccountDeletion(): Promise<{
        authorizationUrl: string;
    }> {

        const { data } =
            await client.post<{
                authorizationUrl: string;
            }>(
                "/auth/oauth2/google/delete-account/start",
            );

        return data;
    }
}

export default new UserApi();