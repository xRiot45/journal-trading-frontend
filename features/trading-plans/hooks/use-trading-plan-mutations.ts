import useInvalidateQuery from "@/hooks/use-invalidate-query"
import { TRADING_PLANS_QUERY_KEY } from "./use-trading-plan-queries"
import {
    TradingPlanItemResponse,
    TradingPlanRequest,
} from "../types/trading-plan.types"
import { useMutation } from "@tanstack/react-query"
import {
    createTradingPlan,
    deleteTradingPlan,
    updateTradingPlan,
} from "../api/trading-plan.api"
import { toast } from "sonner"
import { ApiSuccessResponse } from "@/configs/http"

export function useCreateTradingPlanMutation(onSuccess?: () => void) {
    const invalidate = useInvalidateQuery(TRADING_PLANS_QUERY_KEY)

    return useMutation<TradingPlanItemResponse, Error, TradingPlanRequest>({
        mutationFn: createTradingPlan,
        onSuccess: () => {
            toast.success("Trading plan created")
            invalidate()
            onSuccess?.()
        },
        onError: (error) => toast.error(error.message),
    })
}

export function useUpdateTradingPlanMutation(onSuccess?: () => void) {
    const invalidate = useInvalidateQuery(TRADING_PLANS_QUERY_KEY)

    return useMutation<
        TradingPlanItemResponse,
        Error,
        { tradingPlanId: string; payload: TradingPlanRequest }
    >({
        mutationFn: ({ tradingPlanId, payload }) =>
            updateTradingPlan(tradingPlanId, payload),
        onSuccess: () => {
            toast.success("Trading plan updated")
            invalidate()
            onSuccess?.()
        },
        onError: (error) => toast.error(error.message),
    })
}

export function useDeleteTradingPlanMutation(onSuccess?: () => void) {
    const invalidate = useInvalidateQuery(TRADING_PLANS_QUERY_KEY)

    return useMutation<ApiSuccessResponse, Error, string>({
        mutationFn: deleteTradingPlan,
        onSuccess: () => {
            toast.success("Trading plan deleted")
            invalidate()
            onSuccess?.()
        },
        onError: (error) => toast.error(error.message),
    })
}
