"use client"

import { useState } from "react"

import { CalendarHeader } from "./CalendarHeader"
import { CalendarSummary } from "./CalendarSummary"
import { CalendarGrid } from "./CalendarGrid"
import { CalendarSkeleton } from "./CalendarSkeleton"
import { useGetMonthlyPnLCalendarQuery } from "../hooks/use-calendar-queries"
import type { CalendarDay } from "../types/calendar.type"

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
        <div className="flex min-h-screen items-start justify-center bg-[#090909] px-4 py-8 sm:py-12">
            {/* Subtle noise / grain background */}
            <div
                className="pointer-events-none fixed inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
                }}
            />

            <div className="relative w-full max-w-2xl">
                {/* Card */}
                <div className="rounded-2xl border border-white/[0.07] bg-white/2 p-5 shadow-2xl shadow-black/60 backdrop-blur-sm sm:p-7">
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
                            <span className="text-sm text-red-400/60">
                                Failed to load calendar data.
                            </span>
                        </div>
                    )}

                    {/* Empty */}
                    {!isLoading && !isError && !data?.data?.days?.length && (
                        <div className="flex flex-col items-center justify-center gap-3 py-20">
                            <span className="text-sm text-white/20">
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
                    <div className="mt-5 flex items-center gap-4 border-t border-white/5 pt-4">
                        {[
                            { color: "bg-emerald-400", label: "Profit" },
                            { color: "bg-red-400", label: "Loss" },
                            { color: "bg-white/20", label: "Neutral" },
                        ].map(({ color, label }) => (
                            <div
                                key={label}
                                className="flex items-center gap-1.5"
                            >
                                <span
                                    className={`h-2 w-2 rounded-full ${color}`}
                                />
                                <span className="text-[10px] tracking-wide text-white/30">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Day detail drawer */}
                {selectedDay && (
                    <div
                        className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
                        onClick={() => setSelectedDay(null)}
                    >
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                        <div
                            className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-[#111] p-6 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-base font-semibold text-white">
                                    {new Date(
                                        selectedDay.date
                                    ).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </h3>
                                <button
                                    onClick={() => setSelectedDay(null)}
                                    className="text-xs text-white/30 hover:text-white/60"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-white/40">PnL</span>
                                    <span
                                        className={
                                            selectedDay.status === "profit"
                                                ? "font-semibold text-emerald-400"
                                                : selectedDay.status === "loss"
                                                  ? "font-semibold text-red-400"
                                                  : "text-white/40"
                                        }
                                    >
                                        {selectedDay.totalPnL === 0
                                            ? "—"
                                            : `${selectedDay.totalPnL > 0 ? "+" : ""}$${Math.abs(selectedDay.totalPnL)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-white/40">
                                        Trades
                                    </span>
                                    <span className="text-white/70">
                                        {selectedDay.tradeCount}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
