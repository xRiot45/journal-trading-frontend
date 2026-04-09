"use client"

import type { CalendarDay } from "../types/calendar.type"
import { cn, formatPnL, isToday } from "../utils/utils"

interface CalendarDayCardProps {
    day: CalendarDay
    onClick?: (day: CalendarDay) => void
    isEmpty?: boolean
}

export function CalendarDayCard({
    day,
    onClick,
    isEmpty = false,
}: CalendarDayCardProps) {
    if (isEmpty) {
        return <div className="aspect-square rounded-lg bg-transparent" />
    }

    const today = isToday(day.date)

    return (
        <button
            onClick={() => onClick?.(day)}
            className={cn(
                "group relative flex aspect-square w-full flex-col items-start justify-between overflow-hidden rounded-xl border p-2 transition-all duration-200 sm:p-3",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                // base
                day.status === "neutral" &&
                    "border-white/6 bg-white/3 hover:border-white/10 hover:bg-white/[0.07]",
                day.status === "profit" &&
                    "border-emerald-500/20 bg-emerald-500/8 hover:border-emerald-500/35 hover:bg-emerald-500/15",
                day.status === "loss" &&
                    "border-red-500/20 bg-red-500/8 hover:border-red-500/35 hover:bg-red-500/15",
                // today ring
                today &&
                    "ring-2 ring-white/40 ring-offset-1 ring-offset-[#0a0a0a]"
            )}
        >
            {/* Subtle glow on profit/loss */}
            {day.status === "profit" && (
                <span className="pointer-events-none absolute inset-0 rounded-xl bg-emerald-400/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            )}
            {day.status === "loss" && (
                <span className="pointer-events-none absolute inset-0 rounded-xl bg-red-400/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            )}

            {/* Day number */}
            <div className="flex w-full items-center justify-between">
                <span
                    className={cn(
                        "text-xs leading-none font-semibold tabular-nums",
                        today ? "text-white" : "text-white/40",
                        day.status !== "neutral" && "text-white/70"
                    )}
                >
                    {day.day}
                </span>
                {today && (
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/80" />
                )}
            </div>

            {/* PnL */}
            {day.status !== "neutral" && (
                <div className="flex w-full flex-col gap-0.5">
                    <span
                        className={cn(
                            "text-xs leading-tight font-bold tabular-nums sm:text-sm",
                            day.status === "profit"
                                ? "text-emerald-400"
                                : "text-red-400"
                        )}
                    >
                        {formatPnL(day.totalPnL)}
                    </span>
                    <span className="text-[10px] leading-none text-white/30">
                        {day.tradeCount} trade{day.tradeCount !== 1 ? "s" : ""}
                    </span>
                </div>
            )}
        </button>
    )
}
