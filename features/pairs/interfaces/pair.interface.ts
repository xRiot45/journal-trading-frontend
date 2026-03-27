import {
    ApiSuccessResponse,
    PaginationMeta,
} from "@/configs/http"

export interface PairRequest {
    name: string
    description: string
}

export interface PairResponseData {
    id: string
    name: string
    description: string
    createdAt: Date
    updatedAt: Date
}

export interface FindAllPairsParams {
    page?: number
    limit?: number
    search?: string
    sortBy?: string
    order?: "ASC" | "DESC"
}

export interface PairResponse extends ApiSuccessResponse<PairResponseData[]> {
    meta?: PaginationMeta
}
