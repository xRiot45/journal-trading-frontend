import type { ApiSuccessResponse } from "@/configs/http"

// ─── Domain Model ─────────────────────────────────────────────────────────────

export interface User {
    id: string
    username: string
    fullName: string
    email: string
    emailVerifiedAt: string // ISO string from JSON, not Date
    isVerified: boolean
    createdAt: string
    updatedAt: string
}

// ─── API Response ─────────────────────────────────────────────────────────────

export type UserResponse = ApiSuccessResponse<User>
