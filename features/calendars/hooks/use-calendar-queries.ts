import { useQuery } from "@tanstack/react-query"
import {
    CalendarListResponse,
    GetMonthlyPnLCalendarParams,
} from "../types/calendar.type"
import { getMonthlyPnLCalendar } from "../api/calendar.api"

export const CALENDAR_QUERY_KEY = "calendar" as const

export function useGetMonthlyPnLCalendarQuery(
    params?: GetMonthlyPnLCalendarParams
) {
    return useQuery<CalendarListResponse, Error>({
        queryKey: [CALENDAR_QUERY_KEY, params],
        queryFn: () => getMonthlyPnLCalendar(params),
    })
}
