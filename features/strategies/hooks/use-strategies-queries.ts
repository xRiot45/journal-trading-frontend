import { useQuery } from "@tanstack/react-query"
import {
    StrategiesItemResponse,
    StrategiesListResponse,
} from "../types/strategies.types"
import { findAllStrategies, findStrategyById } from "../api/strategies.api"

export const STRATEGIES_QUERY_KEY = "strategies"

export function useFindAllStrategiesQuery() {
    return useQuery<StrategiesListResponse, Error>({
        queryKey: [STRATEGIES_QUERY_KEY],
        queryFn: () => findAllStrategies(),
    })
}

export function useFindStrategyByIdQuery(strategyId: string) {
    return useQuery<StrategiesItemResponse, Error>({
        queryKey: [STRATEGIES_QUERY_KEY, strategyId],
        queryFn: () => findStrategyById(strategyId),
        enabled: !!strategyId,
    })
}
