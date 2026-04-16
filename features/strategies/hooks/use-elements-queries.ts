import { useQuery } from "@tanstack/react-query"
import { getElementsByStrategyId } from "../api/elements.api"

export const ELEMENTS_KEY = "elements"

export function useGetElementsByStrategyId(strategyId: string) {
    return useQuery({
        queryKey: [ELEMENTS_KEY, strategyId],
        queryFn: () => getElementsByStrategyId(strategyId),
        enabled: !!strategyId,
    })
}
