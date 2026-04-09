import { ApiSuccessResponse } from "@/configs/http"

export interface GetMonthlyPnLCalendarParams {
    year: number
    month: number
}

export interface CalendarDaySummary {
    totalProfit: number
    totalLoss: number
    netPnL: number
}

export type CalendarDayStatus = "profit" | "loss" | "neutral"

export interface CalendarDay {
    date: string // YYYY-MM-DD
    day: number // 1 - 31
    totalPnL: number
    tradeCount: number
    status: CalendarDayStatus
}

export interface CalendarResponse {
    month: number // 1 - 12
    year: number
    summary: CalendarDaySummary
    days: CalendarDay[]
}

export type CalendarListResponse = ApiSuccessResponse<CalendarResponse>
