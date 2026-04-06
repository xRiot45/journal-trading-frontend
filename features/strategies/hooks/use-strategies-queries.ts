import { useQuery } from "@tanstack/react-query"
import { StrategiesListResponse } from "../types/strategies.types"
import { findAllStrategies } from "../api/strategies.api"

export const STRATEGIES_QUERY_KEY = "strategies"

export function useFindAllStrategiesQuery() {
    return useQuery<StrategiesListResponse, Error>({
        queryKey: [STRATEGIES_QUERY_KEY],
        queryFn: () => findAllStrategies(),
    })
}
