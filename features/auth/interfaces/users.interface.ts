import { ApiSuccessResponse } from "@/configs/http"

export interface UserResponseData {
    id: string
    username: string
    fullName: string
    email: string
    emailVerifiedAt: Date
    isVerified: boolean
    createdAt: Date
    updatedAt: Date
}

export type UserResponse = ApiSuccessResponse<UserResponseData>
