import type { Role } from "../common/role";

export interface UserSummary {
    id: string;
    username: string;
    email: string;
    city: string;
    sentimentAnalysisEnabled: boolean;
    roles: Role[];
}

export interface UserProfile {
    id: string;
    username: string;
    email: string;
    city: string;
    sentimentAnalysisEnabled: boolean;
    profileImageUrl: string | null;
    roles: Role[];
    createdAt: string;
    updatedAt: string;
    hasPassword: boolean;
    hasGoogle: boolean;
}

export interface UpdateProfileRequest {
    city: string;
    sentimentAnalysisEnabled: boolean;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ChangeEmailRequest {
    newEmail: string;
    password: string;
}

export interface ChangeUsernameRequest {
    username: string;
}

export interface DeleteAccountRequest {
    password: string;
}

export interface ProfileImageResponse{
    message: string;
    profileImageUrl: string; 
}