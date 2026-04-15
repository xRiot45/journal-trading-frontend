import { ApiSuccessResponse, PaginationMeta } from "@/configs/http"

export interface Pair {
    id: string
    name: string
    description: string
    createdAt: string
    updatedAt: string
}

export interface PairRequest {
    name: string
    description: string
}

export interface PairListResponse extends ApiSuccessResponse<Pair[]> {
    meta?: PaginationMeta
}

export type PairItemResponse = ApiSuccessResponse<Pair>
