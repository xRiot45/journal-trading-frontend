"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useFindAllPairsQuery } from "../hooks/use-pair-queries"
import { useMemo, useState } from "react"

interface PairSelectProps {
    value?: string
    onChange?: (value: string) => void
    disabled?: boolean
}

export function PairSelect({ value, onChange, disabled }: PairSelectProps) {
    const { data, isLoading } = useFindAllPairsQuery()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const pairs = data?.data ?? []

    const [search, setSearch] = useState("")

    const filteredPairs = useMemo(() => {
        return pairs.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        )
    }, [pairs, search])

    return (
        <Select
            value={value}
            onValueChange={onChange}
            disabled={isLoading || disabled}
        >
            <SelectTrigger className="w-full cursor-pointer py-6">
                <SelectValue placeholder="--- Select Pairs ---" />
            </SelectTrigger>

            <SelectContent>
                {/* Search */}
                <div className="p-2">
                    <Input
                        placeholder="Search pair..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="py-5"
                    />
                </div>

                <SelectGroup>
                    {isLoading ? (
                        <div className="p-2 text-sm text-muted-foreground">
                            Loading...
                        </div>
                    ) : filteredPairs.length === 0 ? (
                        <div className="p-2 text-sm text-muted-foreground">
                            No pair found.
                        </div>
                    ) : (
                        filteredPairs.map((item) => (
                            <SelectItem
                                key={item.id}
                                value={item.id}
                                className="p-4"
                            >
                                {item.name}
                            </SelectItem>
                        ))
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
