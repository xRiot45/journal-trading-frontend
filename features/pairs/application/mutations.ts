import { useMutation } from "@tanstack/react-query"
import { PairRequest, PairResponse } from "../interfaces/pair.interface"
import { create, update } from "../services/pair.service"

export function useCreatePairMutation() {
    return useMutation<PairResponse, Error, PairRequest>({
        mutationFn: create,
    })
}

export function useUpdatePairMutation() {
    return useMutation<
        PairResponse,
        Error,
        { id: string; payload: PairRequest }
    >({
        mutationFn: ({ id, payload }) => update(id, payload),
    })
}
