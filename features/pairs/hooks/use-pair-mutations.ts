import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { createPair, deletePair, updatePair } from "../api/pair.api"
import { PairItemResponse, PairRequest } from "../types/pair.types"
import { PAIRS_QUERY_KEY } from "./use-pair-queries"
import { ApiSuccessResponse } from "@/configs/http"
import useInvalidateQuery from "@/hooks/use-invalidate-query"

export function useCreatePairMutation(onSuccess?: () => void) {
    const invalidate = useInvalidateQuery(PAIRS_QUERY_KEY)

    return useMutation<PairItemResponse, Error, PairRequest>({
        mutationFn: createPair,
        onSuccess: () => {
            toast.success("Pair created")
            invalidate()
            onSuccess?.()
        },
        onError: (error) => toast.error(error.message),
    })
}

export function useUpdatePairMutation(onSuccess?: () => void) {
    const invalidate = useInvalidateQuery(PAIRS_QUERY_KEY)

    return useMutation<
        PairItemResponse,
        Error,
        { id: string; payload: PairRequest }
    >({
        mutationFn: ({ id, payload }) => updatePair(id, payload),
        onSuccess: () => {
            toast.success("Pair updated")
            invalidate()
            onSuccess?.()
        },
        onError: (error) => toast.error(error.message),
    })
}

export function useDeletePairMutation(onSuccess?: () => void) {
    const invalidate = useInvalidateQuery(PAIRS_QUERY_KEY)

    return useMutation<ApiSuccessResponse, Error, string>({
        mutationFn: deletePair,
        onSuccess: () => {
            toast.success("Pair deleted")
            invalidate()
            onSuccess?.()
        },
        onError: (error) => toast.error(error.message),
    })
}
