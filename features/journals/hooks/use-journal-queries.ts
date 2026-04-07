import { useQuery } from "@tanstack/react-query"
import { JournalItemResponse, JournalListResponse } from "../types/journal.type"
import { findAllJournals, findJournalById } from "../api/journal.api"
import { FindAllParams } from "@/configs/http"

export const JOURNALS_KEY = "journals"

export function useFindAllJournalsQuery(params?: FindAllParams) {
    return useQuery<JournalListResponse, Error>({
        queryKey: [JOURNALS_KEY, params],
        queryFn: () => findAllJournals(params),
    })
}

export function useFindJournalByIdQuery(journalId: string) {
    return useQuery<JournalItemResponse, Error>({
        queryKey: [JOURNALS_KEY, journalId],
        queryFn: () => findJournalById(journalId),
        enabled: !!journalId,
    })
}
