import { SessionItemResponse, SessionRequest } from "./../types/session.types"
import useInvalidateQuery from "@/hooks/use-invalidate-query"
import { SESSIONS_QUERY_KEY } from "./use-session-queries"
import { createSession, deleteSession, updateSession } from "../api/session.api"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { ApiSuccessResponse } from "@/configs/http"

export function useCreateSessionMutation(onSuccess?: () => void) {
    const invalidate = useInvalidateQuery(SESSIONS_QUERY_KEY)

    return useMutation<SessionItemResponse, Error, SessionRequest>({
        mutationFn: createSession,
        onSuccess: () => {
            toast.success("Session created")
            invalidate()
            onSuccess?.()
        },
        onError: (error) => toast.error(error.message),
    })
}

export function useUpdateSessionMutation(onSuccess?: () => void) {
    const invalidate = useInvalidateQuery(SESSIONS_QUERY_KEY)

    return useMutation<
        SessionItemResponse,
        Error,
        { id: string; payload: SessionRequest }
    >({
        mutationFn: ({ id, payload }) => updateSession(id, payload),
        onSuccess: () => {
            toast.success("Session updated")
            invalidate()
            onSuccess?.()
        },
        onError: (error) => toast.error(error.message),
    })
}

export function useDeleteSessionMutation(onSuccess?: () => void) {
    const invalidate = useInvalidateQuery(SESSIONS_QUERY_KEY)

    return useMutation<ApiSuccessResponse, Error, string>({
        mutationFn: deleteSession,
        onSuccess: () => {
            toast.success("Session deleted")
            invalidate()
            onSuccess?.()
        },
        onError: (error) => toast.error(error.message),
    })
}
