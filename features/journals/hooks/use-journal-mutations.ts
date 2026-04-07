import useInvalidateQuery from "@/hooks/use-invalidate-query"
import { createJournal, updateJournal } from "../api/journal.api"
import { JOURNALS_KEY } from "./use-journal-queries"
import { JournalItemResponse, JournalRequest } from "../types/journal.type"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

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
