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
                <h2 className="font-display text-xl font-bold tracking-tight text-black sm:text-2xl dark:text-white">
                    {getMonthName(month)}{" "}
                    <span className="text-black dark:text-white">{year}</span>
                </h2>
                <p className="mt-0.5 text-xs tracking-widest text-black uppercase dark:text-white">
                    Monthly PnL Calendar
                </p>
            </div>

            <div className="flex items-center gap-1.5">
                <button
                    onClick={onPrevMonth}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-100 bg-gray-100 text-black transition-all duration-150 hover:border-gray-100 hover:bg-gray-300 hover:text-black"
                    aria-label="Previous month"
                >
                    <ChevronLeft size={15} />
                </button>
                <button
                    onClick={onNextMonth}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-100 bg-gray-100 text-black transition-all duration-150 hover:border-gray-100 hover:bg-gray-300 hover:text-black"
                    aria-label="Next month"
                >
                    <ChevronRight size={15} />
                </button>
            </div>
        </div>
    )
}
