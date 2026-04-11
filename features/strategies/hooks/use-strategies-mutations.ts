import useInvalidateQuery from "@/hooks/use-invalidate-query"
import { STRATEGIES_QUERY_KEY } from "./use-strategies-queries"
import { createStrategy } from "../api/strategies.api"
import { toast } from "sonner"
import {
    StrategiesItemResponse,
    StrategiesRequest,
} from "../types/strategies.types"
import { useMutation } from "@tanstack/react-query"

export function useCreateStrategyMutation(onSuccess: () => void) {
    const invalidate = useInvalidateQuery(STRATEGIES_QUERY_KEY)

    return useMutation<StrategiesItemResponse, Error, StrategiesRequest>({
        mutationFn: createStrategy,
        onSuccess: () => {
            toast.success("Strategy created")
            invalidate()
            onSuccess?.()
        },
        onError: (error) => toast.error(error.message),
    })
}
