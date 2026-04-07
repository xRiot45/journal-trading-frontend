import { Pair } from "@/features/pairs/types/pair.types"
import { ApiSuccessResponse, PaginationMeta } from "@/configs/http"
import { Strategies } from "@/features/strategies/types/strategies.types"

export enum BasedOnPlanEnum {
    YES = 1,
    NO = 0,
}

export enum TradeDirectionEnum {
    BUY = "Buy",
    SELL = "Sell",
}

export enum TradeStatusEnum {
    PROFIT = "Profit",
    LOSS = "Loss",
    DRAW = "Draw",
}

export interface Journal {
    id: string
    date: string
    direction: TradeDirectionEnum
    status: TradeStatusEnum
    lotSize: number
    entryPrice: number
    entryTime: string
    closingPrice: number
    closingTime: string
    takeProfit: number
    stopLoss: number
    profitAndLoss: number
    riskRatio: number
    rewardRatio: number
    basedOnPlan: BasedOnPlanEnum
    note?: string
    pair: Pair
    strategy: Strategies
}

export interface JournalRequest {
    date?: string
    direction?: TradeDirectionEnum
    status?: TradeStatusEnum
    lotSize?: number
    entryPrice?: number
    entryTime?: string
    closingPrice?: number
    closingTime?: string
    takeProfit?: number
    stopLoss?: number
    profitAndLoss?: number
    riskRatio?: number
    rewardRatio?: number
    basedOnPlan?: BasedOnPlanEnum
    note?: string
    pairId?: string
    strategyId?: string
}

export interface JournalListResponse extends ApiSuccessResponse<Journal[]> {
    meta?: PaginationMeta
}

export type JournalItemResponse = ApiSuccessResponse<Journal>
