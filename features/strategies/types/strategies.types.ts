import { ApiSuccessResponse } from "@/configs/http"

export interface Strategies {
    id: string
    title: string
    content: null | string
    descriptiaon: string
    lastEditedAt: Date
    createdAt: Date
    updatedAt: Date
}

export type StrategiesListResponse = ApiSuccessResponse<Strategies[]>

export type StrategiesItemResponse = ApiSuccessResponse<Strategies>
