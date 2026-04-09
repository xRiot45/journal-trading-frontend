"use client"

import { useState } from "react"

import { CalendarHeader } from "./CalendarHeader"
import { CalendarSummary } from "./CalendarSummary"
import { CalendarGrid } from "./CalendarGrid"
import { CalendarSkeleton } from "./CalendarSkeleton"
import { useGetMonthlyPnLCalendarQuery } from "../hooks/use-calendar-queries"
import type { CalendarDay } from "../types/calendar.type"
import { CalendarDayModalDetail } from "./CalendarDayModalDetail"

export function CalendarContainer() {
    const now = new Date()
    const [month, setMonth] = useState(now.getMonth() + 1)
    const [year, setYear] = useState(now.getFullYear())
    const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null)

    const { data, isLoading, isError } = useGetMonthlyPnLCalendarQuery({
        month,
        year,
    })

    function handlePrevMonth() {
        if (month === 1) {
            setMonth(12)
            setYear((y) => y - 1)
        } else setMonth((m) => m - 1)
    }

    function handleNextMonth() {
        if (month === 12) {
            setMonth(1)
            setYear((y) => y + 1)
        } else setMonth((m) => m + 1)
    }

    return (
        <div className="flex min-h-screen items-start justify-center text-black dark:text-white">
            {/* Subtle noise / grain background */}
            <div
                className="pointer-events-none fixed inset-0 opacity-[0.03] dark:opacity-[0.025]"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
                }}
            />

            <div className="relative w-full">
                {/* Card */}
                <div className="rounded-2xl">
                    {/* Header */}
                    <CalendarHeader
                        month={month}
                        year={year}
                        onPrevMonth={handlePrevMonth}
                        onNextMonth={handleNextMonth}
                    />

                    {/* Loading */}
                    {isLoading && <CalendarSkeleton />}

                    {/* Error */}
                    {isError && !isLoading && (
                        <div className="flex flex-col items-center justify-center gap-3 py-20">
                            <span className="text-sm text-black/50 dark:text-white/50">
                                Failed to load calendar data.
                            </span>
                        </div>
                    )}

                    {/* Empty */}
                    {!isLoading && !isError && !data?.data?.days?.length && (
                        <div className="flex flex-col items-center justify-center gap-3 py-20">
                            <span className="text-sm text-black dark:text-white">
                                No trading data for this month.
                            </span>
                        </div>
                    )}

                    {/* Content */}
                    {!isLoading && data?.data && (
                        <>
                            <CalendarSummary summary={data.data.summary} />
                            <CalendarGrid
                                days={data.data.days}
                                month={month}
                                year={year}
                                onDayClick={setSelectedDay}
                            />
                        </>
                    )}

                    {/* Legend */}
                    <div className="mt-5 flex items-center gap-4 border-t border-black/10 pt-4 dark:border-white/10">
                        {[
                            { color: "bg-emerald-400", label: "Profit" },
                            { color: "bg-red-400", label: "Loss" },
                            {
                                color: "bg-black/30 dark:bg-white/20",
                                label: "Neutral",
                            },
                        ].map(({ color, label }) => (
                            <div
                                key={label}
                                className="flex items-center gap-1.5"
                            >
                                <span
                                    className={`h-2 w-2 rounded-full ${color}`}
                                />
                                <span className="text-[10px] tracking-wide text-black/40 dark:text-white/30">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <CalendarDayModalDetail
                    selectedDay={selectedDay}
                    onClose={() => setSelectedDay(null)}
                />
            </div>
        </div>
    )
}
