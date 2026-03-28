import { useQuery } from "@tanstack/react-query"
import { findAllPairs } from "../api/pair.api"
import { FindAllPairsParams, PairListResponse } from "../types/pair.types"

export const PAIRS_QUERY_KEY = "pairs" as const

export function useFindAllPairsQuery(params?: FindAllPairsParams) {
    return useQuery<PairListResponse, Error>({
        queryKey: [PAIRS_QUERY_KEY, params],
        queryFn: () => findAllPairs(params),
    })
}
