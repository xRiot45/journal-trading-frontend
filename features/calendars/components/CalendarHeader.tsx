"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { getMonthName } from "../utils/utils"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface CalendarHeaderProps {
    month: number
    year: number
    onPrevMonth: () => void
    onNextMonth: () => void
    onChangeMonth: (value: number) => void
    onChangeYear: (value: number) => void
}

export function CalendarHeader({
    month,
    year,
    onPrevMonth,
    onNextMonth,
    onChangeMonth,
    onChangeYear,
}: CalendarHeaderProps) {
    const months = [
        { label: "January", value: 1 },
        { label: "February", value: 2 },
        { label: "March", value: 3 },
        { label: "April", value: 4 },
        { label: "May", value: 5 },
        { label: "June", value: 6 },
        { label: "July", value: 7 },
        { label: "August", value: 8 },
        { label: "September", value: 9 },
        { label: "October", value: 10 },
        { label: "November", value: 11 },
        { label: "December", value: 12 },
    ]

    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i)

    return (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Title */}
            <div>
                <h2 className="font-display text-xl font-bold tracking-tight text-black sm:text-2xl dark:text-white">
                    {getMonthName(month)}{" "}
                    <span className="text-black dark:text-white">{year}</span>
                </h2>
                <p className="mt-0.5 text-xs tracking-widest text-black uppercase dark:text-white">
                    Monthly PnL Calendar
                </p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2">
                {/* Select Month */}
                <Select
                    value={String(month)}
                    onValueChange={(val) => onChangeMonth(Number(val))}
                >
                    <SelectTrigger className="w-42 cursor-pointer py-5">
                        <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                        {months.map((m) => (
                            <SelectItem key={m.value} value={String(m.value)}>
                                {m.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Select Year */}
                <Select
                    value={String(year)}
                    onValueChange={(val) => onChangeYear(Number(val))}
                >
                    <SelectTrigger className="w-42 cursor-pointer py-5">
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map((y) => (
                            <SelectItem
                                key={y}
                                value={String(y)}
                                className="cursor-pointer p-3"
                            >
                                {y}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={onPrevMonth}
                        className="flex cursor-pointer items-center justify-center rounded-lg border border-gray-100 bg-gray-100 p-3 text-black hover:bg-gray-300"
                    >
                        <ChevronLeft size={15} />
                    </button>
                    <button
                        onClick={onNextMonth}
                        className="flex cursor-pointer items-center justify-center rounded-lg border border-gray-100 bg-gray-100 p-3 text-black hover:bg-gray-300"
                    >
                        <ChevronRight size={15} />
                    </button>
                </div>
            </div>
        </div>
    )
}
