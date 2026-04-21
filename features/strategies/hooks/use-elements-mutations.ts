import useInvalidateQuery from "@/hooks/use-invalidate-query"
import { ELEMENTS_KEY } from "./use-elements-queries"
import { useMutation } from "@tanstack/react-query"
import {
    ElementItemResponse,
    ElementRequest,
    ElementUpdateRequest,
    ElementUpsertRequest,
} from "../types/element.types"
import { toast } from "sonner"
import { createElement, updateElement, upsertNode } from "../api/elements.api"

export function useCreateElementMutation(onSuccess?: () => void) {
    const invalidate = useInvalidateQuery(ELEMENTS_KEY)

    return useMutation<ElementItemResponse, Error, ElementRequest>({
        mutationFn: createElement,
        onSuccess: () => {
            toast.success("Element created")
            invalidate()
            onSuccess?.()
        },
        onError: (error) => toast.error(error.message),
    })
}

export function useUpdateElementMutation(onSuccess?: () => void) {
    const invalidate = useInvalidateQuery(ELEMENTS_KEY)

    return useMutation<
        ElementItemResponse,
        Error,
        {
            elementId: string
            strategyId: string
            payload: ElementUpdateRequest
        }
    >({
        mutationFn: ({ elementId, strategyId, payload }) =>
            updateElement(elementId, strategyId, payload),

        onSuccess: () => {
            toast.success("Element updated")
            invalidate()
            onSuccess?.()
        },
        onError: (error) => toast.error(error.message),
    })
}

export function useUpsertNodeMutation(onSuccess?: () => void) {
    const invalidate = useInvalidateQuery(ELEMENTS_KEY)

    return useMutation<ElementItemResponse, Error, ElementUpsertRequest>({
        mutationFn: upsertNode,
        onSuccess: () => {
            toast.success("Element Node upserted")
            invalidate()
            onSuccess?.()
        },
        onError: (error) => toast.error(error.message),
    })
}
