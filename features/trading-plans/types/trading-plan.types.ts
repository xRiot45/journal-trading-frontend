import { ApiSuccessResponse } from "@/configs/http"
import { Pair } from "@/features/pairs/types/pair.types"

export interface TradingPlan {
    id: string
    title: string
    date: string
    pair: Pair
    description: string
    thumbnailUrl: string
    createdAt: string
    updatedAt: string
}

export interface TradingPlanRequest {
    title: string
    date: string
    pairId: string
    description: string
    thumbnail: File
}

export type TradingPlanListResponse = ApiSuccessResponse<TradingPlan[]>

export type TradingPlanItemResponse = ApiSuccessResponse<TradingPlan>
