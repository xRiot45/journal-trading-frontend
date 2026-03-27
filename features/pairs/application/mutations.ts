import { useMutation } from "@tanstack/react-query"
import { PairRequest, PairResponse } from "../interfaces/pair.interface"
import { create, remove, update } from "../services/pair.service"

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

export function useRemovePairMutation() {
    return useMutation<PairResponse, Error, string>({
        mutationFn: (id) => remove(id),
    })
}
