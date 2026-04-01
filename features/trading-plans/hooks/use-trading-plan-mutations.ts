import useInvalidateQuery from "@/hooks/use-invalidate-query"
import { TRADING_PLANS_QUERY_KEY } from "./use-trading-plan-queries"
import {
    TradingPlanItemResponse,
    TradingPlanRequest,
} from "../types/trading-plan.types"
import { useMutation } from "@tanstack/react-query"
import { createTradingPlan } from "../api/trading-plan.api"
import { toast } from "sonner"

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
