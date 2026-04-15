import useInvalidateQuery from "@/hooks/use-invalidate-query"
import { ELEMENTS_KEY } from "./use-elements-queries"
import { useMutation } from "@tanstack/react-query"
import { ElementItemResponse, ElementRequest } from "../types/element.types"
import { toast } from "sonner"
import { createElement } from "../api/elements.api"

export function useCreateElementMutation(onSuccess: () => void) {
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
