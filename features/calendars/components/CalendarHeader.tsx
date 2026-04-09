"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { getMonthName } from "../utils/utils"

interface CalendarHeaderProps {
    month: number
    year: number
    onPrevMonth: () => void
    onNextMonth: () => void
}

export function CalendarHeader({
    month,
    year,
    onPrevMonth,
    onNextMonth,
}: CalendarHeaderProps) {
    return (
        <div className="mb-6 flex items-center justify-between">
            <div>
                <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {getMonthName(month)}{" "}
                    <span className="text-white/40">{year}</span>
                </h2>
                <p className="mt-0.5 text-xs tracking-widest text-white/30 uppercase">
                    Monthly PnL Calendar
                </p>
            </div>

            <div className="flex items-center gap-1.5">
                <button
                    onClick={onPrevMonth}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/4 text-white/50 transition-all duration-150 hover:border-white/20 hover:bg-white/9 hover:text-white/80"
                    aria-label="Previous month"
                >
                    <ChevronLeft size={15} />
                </button>
                <button
                    onClick={onNextMonth}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/4 text-white/50 transition-all duration-150 hover:border-white/20 hover:bg-white/9 hover:text-white/80"
                    aria-label="Next month"
                >
                    <ChevronRight size={15} />
                </button>
            </div>
        </div>
    )
}
