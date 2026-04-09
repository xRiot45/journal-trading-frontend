"use client"

import { getFirstDayOfMonth } from "../utils/utils"
import { CalendarDayCard } from "./CalendarDayCard"
import type { CalendarDay } from "../types/calendar.type"

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

interface CalendarGridProps {
    days: CalendarDay[]
    month: number
    year: number
    onDayClick?: (day: CalendarDay) => void
}

export function CalendarGrid({
    days,
    month,
    year,
    onDayClick,
}: CalendarGridProps) {
    const firstDayOffset = getFirstDayOfMonth(year, month) // 0 = Sun

    return (
        <div>
            {/* Weekday headers */}
            <div className="mb-1.5 grid grid-cols-7 gap-1.5">
                {WEEKDAYS.map((d) => (
                    <div
                        key={d}
                        className="py-1.5 text-center text-[10px] font-semibold tracking-widest text-white/20"
                    >
                        {d}
                    </div>
                ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1.5">
                {/* Empty prefix cells */}
                {Array.from({ length: firstDayOffset }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {/* Day cards */}
                {days.map((day) => (
                    <CalendarDayCard
                        key={day.date}
                        day={day}
                        onClick={onDayClick}
                    />
                ))}
            </div>
        </div>
    )
}
