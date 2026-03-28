import { httpClient } from "@/configs/http"
import type { LoginRequest, LoginResponse } from "../types/auth.types"
import type { UserResponse } from "../types/user.types"
import throwApiError from "@/helpers/throw-api-error"

const AUTH_ENDPOINTS = "/api/auth"

export async function loginUser(payload: LoginRequest): Promise<LoginResponse> {
    try {
        return await httpClient.post<LoginResponse, LoginRequest>(
            `${AUTH_ENDPOINTS}/login`,
            payload,
            { withCredentials: true }
        )
    } catch (err) {
        throwApiError(
            err,
            "Login failed. Please check your credentials and try again."
        )
    }
}

export async function fetchCurrentUser(): Promise<UserResponse> {
    try {
        return await httpClient.get<UserResponse>(`${AUTH_ENDPOINTS}/me`, {
            withCredentials: true,
        })
    } catch (err) {
        throwApiError(
            err,
            "Failed to fetch current user. Please try again later."
        )
    }
}

export async function logoutUser(): Promise<void> {
    try {
        await httpClient.post(`${AUTH_ENDPOINTS}/logout`, {
            withCredentials: true,
        })
    } catch (err) {
        throwApiError(err, "Logout failed. Please try again later.")
    }
}
