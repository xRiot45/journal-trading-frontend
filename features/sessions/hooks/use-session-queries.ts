import { FindAllParams } from "@/configs/http"
import { SessionListResponse } from "../types/session.types"
import { useQuery } from "@tanstack/react-query"
import { findAllSessions } from "../api/session.api"

export const SESSIONS_QUERY_KEY = "sessions" as const

export function useFindAllSessionsQuery(params?: FindAllParams) {
    return useQuery<SessionListResponse, Error>({
        queryKey: [SESSIONS_QUERY_KEY, params],
        queryFn: () => findAllSessions(params),
    })
}
