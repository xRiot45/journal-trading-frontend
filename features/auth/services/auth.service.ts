import type { LoginRequest, LoginResponse } from "../interfaces/auth.interface"
import { httpClient, isHttpError } from "@/configs/http"

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
