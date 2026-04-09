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

                // focus ring
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 dark:focus-visible:ring-white/30",

                // base (neutral)
                day.status === "neutral" &&
                    "border-black/10 bg-black/2 hover:border-black/20 hover:bg-black/5 dark:border-white/10 dark:bg-white/3 dark:hover:border-white/20 dark:hover:bg-white/[0.07]",

                // profit
                day.status === "profit" &&
                    "border-emerald-500/30 bg-emerald-500/10 hover:border-emerald-500/40 hover:bg-emerald-500/15 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:hover:border-emerald-400/40 dark:hover:bg-emerald-400/15",

                // loss
                day.status === "loss" &&
                    "border-red-500/30 bg-red-500/10 hover:border-red-500/40 hover:bg-red-500/15 dark:border-red-400/30 dark:bg-red-400/10 dark:hover:border-red-400/40 dark:hover:bg-red-400/15",

                // today ring (dengan offset sesuai theme)
                today &&
                    "ring-1 ring-black/40 ring-offset-1 ring-offset-white dark:ring-white/40 dark:ring-offset-black"
            )}
        >
            {/* Subtle glow (monochrome) */}
            {(day.status === "profit" || day.status === "loss") && (
                <span className="pointer-events-none absolute inset-0 rounded-xl bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-white/5" />
            )}

            {/* Day number */}
            <div className="flex w-full items-center justify-between">
                <span
                    className={cn(
                        "text-xs leading-none font-semibold tabular-nums",
                        today
                            ? "text-black dark:text-white"
                            : "text-black/40 dark:text-white/40",
                        day.status !== "neutral" &&
                            "text-black/70 dark:text-white/70"
                    )}
                >
                    {day.day}
                </span>
                {today && (
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-black/80 dark:bg-white/80" />
                )}
            </div>

            {/* PnL */}
            {day.status !== "neutral" && (
                <div className="flex w-full flex-col gap-0.5">
                    <span
                        className={cn(
                            "text-xs leading-tight font-bold tabular-nums sm:text-sm",
                            // tetap ada indikasi tapi subtle
                            day.status === "profit"
                                ? "text-black dark:text-white"
                                : "text-black/70 dark:text-white/70"
                        )}
                    >
                        {formatPnL(day.totalPnL)}
                    </span>
                    <span className="text-[10px] leading-none text-black/40 dark:text-white/30">
                        {day.tradeCount} trade{day.tradeCount !== 1 ? "s" : ""}
                    </span>
                </div>
            )}
        </button>
    )
}
