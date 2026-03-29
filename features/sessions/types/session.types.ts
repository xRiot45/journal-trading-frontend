import { ApiSuccessResponse, PaginationMeta } from "@/configs/http"

export interface Session {
    id: string
    name: string
    startTime: string
    endTime: string
    createdAt: string
    updatedAt: string
}

export interface SessionRequest {
    name: string
    startTime: string
    endTime: string
}

export interface SessionListResponse extends ApiSuccessResponse<Session[]> {
    meta?: PaginationMeta
}

export type SessionItemResponse = ApiSuccessResponse<Session>
