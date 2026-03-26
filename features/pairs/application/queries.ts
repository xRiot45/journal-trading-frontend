import { useQuery } from "@tanstack/react-query"
import { FindAllPairsParams, PairResponse } from "../interfaces/pair.interface"
import { findAll } from "../services/pair.service"

export function useFindAllPairsQuery(params?: FindAllPairsParams) {
    return useQuery<PairResponse, Error>({
        queryKey: ["pairs", params],
        queryFn: () => findAll(params),
    })
}
