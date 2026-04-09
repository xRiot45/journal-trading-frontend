import { httpClient } from "@/configs/http"
import {
    CalendarListResponse,
    GetMonthlyPnLCalendarParams,
} from "../types/calendar.type"
import throwApiError from "@/helpers/throw-api-error"

const CALENDAR_ENDPOINTS = "/api/calendar"

export async function getMonthlyPnLCalendar(
    params?: GetMonthlyPnLCalendarParams
) {
    try {
        return await httpClient.get<CalendarListResponse>(CALENDAR_ENDPOINTS, {
            params,
            withCredentials: true,
        })
    } catch (err) {
        throwApiError(
            err,
            "Failed to fetch data monthly pnl calendar. Please try again later."
        )
    }
}
