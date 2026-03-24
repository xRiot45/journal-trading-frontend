import { ApiSuccessResponse } from "@/configs/http"

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponseData {
    accessToken: string
    refreshToken: string
}

export type LoginResponse = ApiSuccessResponse<LoginResponseData>
