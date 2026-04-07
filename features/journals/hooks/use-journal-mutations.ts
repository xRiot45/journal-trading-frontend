import useInvalidateQuery from "@/hooks/use-invalidate-query"
import { createJournal, deleteJournal, updateJournal } from "../api/journal.api"
import { JOURNALS_KEY } from "./use-journal-queries"
import { JournalItemResponse, JournalRequest } from "../types/journal.type"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { ApiSuccessResponse } from "@/configs/http"

export function useCreateJournalMutation(onSuccess?: () => void) {
    const invalidate = useInvalidateQuery(JOURNALS_KEY)

    return useMutation<JournalItemResponse, Error, JournalRequest>({
        mutationFn: createJournal,
        onSuccess: () => {
            toast.success("Journal created")
            invalidate()
            onSuccess?.()
            window.location.href = "/journals"
        },
        onError: (error) => toast.error(error.message),
    })
}

export function useUpdateJournalMutation(onSuccess?: () => void) {
    const invalidate = useInvalidateQuery(JOURNALS_KEY)

    return useMutation<
        JournalItemResponse,
        Error,
        { journalId: string; payload: JournalRequest }
    >({
        mutationFn: ({ journalId, payload }) =>
            updateJournal(journalId, payload),
        onSuccess: () => {
            toast.success("Journal updated")
            invalidate()
            onSuccess?.()
            window.location.href = "/journals"
        },
        onError: (error) => toast.error(error.message),
    })
}

export function useDeleteJournalMutation(onSuccess?: () => void) {
    const invalidate = useInvalidateQuery(JOURNALS_KEY)

    return useMutation<ApiSuccessResponse, Error, string>({
        mutationFn: deleteJournal,
        onSuccess: () => {
            toast.success("Journal deleted")
            invalidate()
            onSuccess?.()
        },
        onError: (error) => toast.error(error.message),
    })
}
