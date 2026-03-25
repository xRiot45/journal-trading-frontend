import type { LoginRequest, LoginResponse } from "../interfaces/auth.interface"
import { httpClient, isHttpError } from "@/configs/http"
import { UserResponse } from "../interfaces/users.interface"

export async function login(payload: LoginRequest): Promise<LoginResponse> {
    try {
        return await httpClient.post<LoginResponse, LoginRequest>(
            "/api/auth/login",
            payload,
            {
                withCredentials: true,
            }
        )
    } catch (err: unknown) {
        if (isHttpError(err) && err.response?.data?.message) {
            throw new Error(err.response.data.message)
        }

        throw new Error(
            "Login failed. Please check your credentials and try again."
        )
    }
}

export async function getCurrentUser(): Promise<UserResponse> {
    try {
        return await httpClient.get<UserResponse>("/api/auth/me", {
            withCredentials: true,
        })
    } catch (err: unknown) {
        if (isHttpError(err) && err.response?.data?.message) {
            throw new Error(err.response.data.message)
        }

        throw new Error("Failed to fetch current user. Please try again later.")
    }
}

export async function logout(): Promise<void> {
    try {
        return await httpClient.post("/api/auth/logout", {
            withCredentials: true,
        })
    } catch (err: unknown) {
        if (isHttpError(err) && err.response?.data?.message) {
            throw new Error(err.response.data.message)
        }

        throw new Error("Logout failed. Please try again later.")
    }
}
