import { useQuery } from "@tanstack/react-query"
import {
    TradingPlanItemResponse,
    TradingPlanListResponse,
} from "../types/trading-plan.types"
import {
    findAllTradingPlans,
    findTradingPlanById,
} from "../api/trading-plan.api"

export const TRADING_PLANS_QUERY_KEY = "trading-plans" as const

export function useFindAllTradingPlansQuery() {
    return useQuery<TradingPlanListResponse, Error>({
        queryKey: [TRADING_PLANS_QUERY_KEY],
        queryFn: findAllTradingPlans,
    })
}

export function useFindTradingPlanByIdQuery(tradingPlanId: string) {
    return useQuery<TradingPlanItemResponse, Error>({
        queryKey: [TRADING_PLANS_QUERY_KEY, tradingPlanId],
        queryFn: () => findTradingPlanById(tradingPlanId),
        enabled: !!tradingPlanId,
    })
}
