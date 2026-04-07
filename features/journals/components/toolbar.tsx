"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardHeader, CardToolbar } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useJournalStore } from "../store/journal.store"

interface ToolbarProps {
    isLoading: boolean
}

const MONTHS = [
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
const YEARS = Array.from({ length: 5 }, (_, i) => currentYear - i)

export function Toolbar({ isLoading }: ToolbarProps) {
    const router = useRouter()
    const {
        selectedMonth,
        selectedYear,
        setSelectedMonth,
        setSelectedYear,
        resetFilter,
    } = useJournalStore()

    const handleAddNewEntry = () => {
        router.push("/journals/create")
    }

    const isFilterActive = selectedMonth || selectedYear

    return (
        <CardHeader className="flex items-center justify-end gap-4 py-5">
            {/* Filter Month & Year */}
            <div className="flex items-center gap-2">
                <Select
                    value={selectedMonth?.toString() ?? ""}
                    onValueChange={(val) =>
                        setSelectedMonth(val ? Number(val) : null)
                    }
                >
                    <SelectTrigger className="w-42 py-5">
                        <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                    <SelectContent>
                        {MONTHS.map((month) => (
                            <SelectItem
                                key={month.value}
                                value={month.value}
                                className="cursor-pointer p-2"
                            >
                                {month.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={selectedYear?.toString() ?? ""}
                    onValueChange={(val) =>
                        setSelectedYear(val ? Number(val) : null)
                    }
                >
                    <SelectTrigger className="w-42 py-5">
                        <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                        {YEARS.map((year) => (
                            <SelectItem
                                key={year}
                                value={year.toString()}
                                className="cursor-pointer p-2"
                            >
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* ✅ Conditional Reset Button */}
                {isFilterActive && (
                    <Button
                        disabled={isLoading}
                        onClick={resetFilter}
                        variant="secondary"
                    >
                        Reset Filter
                    </Button>
                )}
            </div>

            {/* Action Button */}
            <CardToolbar>
                <Button disabled={isLoading} onClick={handleAddNewEntry}>
                    <Plus />
                    Add New Trading Entry
                </Button>
            </CardToolbar>
        </CardHeader>
    )
}
