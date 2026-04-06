import useInvalidateQuery from "@/hooks/use-invalidate-query"
import { createJournal } from "../api/journal.api"
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
        },
        onError: (error) => toast.error(error.message),
    })
}
