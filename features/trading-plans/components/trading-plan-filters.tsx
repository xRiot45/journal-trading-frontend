"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"

const months = [
    { label: "January", value: "1" },
    { label: "February", value: "2" },
    { label: "March", value: "3" },
    { label: "April", value: "4" },
    { label: "May", value: "5" },
    { label: "June", value: "6" },
    { label: "July", value: "7" },
    { label: "August", value: "8" },
    { label: "September", value: "9" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 10 }, (_, i) => currentYear - i)

interface TradingPlanFiltersProps {
    month: string
    year: string
    onMonthChange: (value: string) => void
    onYearChange: (value: string) => void
    onReset: () => void
}

export function TradingPlanFilters({
    month,
    year,
    onMonthChange,
    onYearChange,
    onReset,
}: TradingPlanFiltersProps) {
    const hasActiveFilter = !!month || !!year

    return (
        <div className="flex items-center gap-2">
            <Select value={month} onValueChange={onMonthChange}>
                <SelectTrigger className="w-36 py-5">
                    <SelectValue placeholder="All Months" />
                </SelectTrigger>
                <SelectContent>
                    {months.map((m) => (
                        <SelectItem key={m.value} value={m.value}>
                            {m.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select value={year} onValueChange={onYearChange}>
                <SelectTrigger className="w-28 py-5">
                    <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                    {years.map((y) => (
                        <SelectItem key={y} value={y.toString()}>
                            {y}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {hasActiveFilter && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                    onClick={onReset}
                >
                    <Icon icon="lucide:x" className="size-3" />
                    Reset
                </Button>
            )}
        </div>
    )
}
