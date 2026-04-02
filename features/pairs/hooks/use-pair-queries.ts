import { useQuery } from "@tanstack/react-query"
import { findAllPairs, findPairById } from "../api/pair.api"
import { PairListResponse } from "../types/pair.types"
import { FindAllParams } from "@/configs/http"

export const PAIRS_QUERY_KEY = "pairs" as const

export function useFindAllPairsQuery(params?: FindAllParams) {
    return useQuery<PairListResponse, Error>({
        queryKey: [PAIRS_QUERY_KEY, params],
        queryFn: () => findAllPairs(params),
    })
}

export function useFindPairByIdQuery(
    id?: string,
    options?: Omit<Parameters<typeof useQuery>[1], "queryKey" | "queryFn">
) {
    return useQuery({
        queryKey: [PAIRS_QUERY_KEY, id],
        queryFn: () => findPairById(id!),
        enabled: !!id,
        ...options,
    })
}
