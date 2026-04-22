import useInvalidateQuery from "@/hooks/use-invalidate-query"
import { ELEMENTS_KEY } from "./use-elements-queries"
import { useMutation } from "@tanstack/react-query"
import {
    ElementItemResponse,
    ElementRequest,
    ElementUpsertRequest,
} from "../types/element.types"
import { toast } from "sonner"
import { createElement, removeElement, upsertNode } from "../api/elements.api"
import { ApiSuccessResponse } from "@/configs/http"

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

export function useUpsertNodeMutation(onSuccess?: () => void) {
    const invalidate = useInvalidateQuery(ELEMENTS_KEY)

    return useMutation<ElementItemResponse, Error, ElementUpsertRequest>({
        mutationFn: upsertNode,
        onSuccess: () => {
            invalidate()
            onSuccess?.()
        },
        onError: (error) => toast.error(error.message),
    })
}

export function useRemoveElementMutation(onSuccess?: () => void) {
    const invalidate = useInvalidateQuery(ELEMENTS_KEY)

    return useMutation<ApiSuccessResponse, Error, string>({
        mutationFn: removeElement,
        onSuccess: () => {
            toast.success("Element deleted")
            invalidate()
            onSuccess?.()
        },
        onError: (error) => toast.error(error.message),
    })
}
