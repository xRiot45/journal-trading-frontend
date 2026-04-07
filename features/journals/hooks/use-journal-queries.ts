import { useQuery } from "@tanstack/react-query"
import { JournalItemResponse } from "../types/journal.type"
import { findJournalById } from "../api/journal.api"

export const JOURNALS_KEY = "journals"

export function useFindJournalByIdQuery(journalId: string) {
    return useQuery<JournalItemResponse, Error>({
        queryKey: [JOURNALS_KEY, journalId],
        queryFn: () => findJournalById(journalId),
        enabled: !!journalId,
    })
}
