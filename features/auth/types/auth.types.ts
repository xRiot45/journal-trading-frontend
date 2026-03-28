import type { ApiSuccessResponse } from "@/configs/http"

export interface LoginRequest {
    email: string
    password: string
}

export interface AuthTokens {
    accessToken: string
    refreshToken: string
}

export type LoginResponse = ApiSuccessResponse<AuthTokens>
