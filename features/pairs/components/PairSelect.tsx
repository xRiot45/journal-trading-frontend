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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

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

    if (isLoading) {
        return <Skeleton className="h-13 w-full rounded-md" />
    }

    return (
        <Select value={value} onValueChange={onChange} disabled={disabled}>
            <SelectTrigger className="w-full cursor-pointer py-6">
                <SelectValue placeholder="--- Select Pairs ---" />
            </SelectTrigger>

            <SelectContent>
                {/* Search Input */}
                <div className="p-2">
                    <Input
                        placeholder="Search pair..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="py-5"
                    />
                </div>

                <ScrollArea className="h-72">
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
                                    className="p-3"
                                >
                                    <div className="flex flex-col">
                                        <span className="font-medium">
                                            {item.name}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground">
                                            {item.description}
                                        </span>
                                    </div>
                                </SelectItem>
                            ))
                        )}
                    </SelectGroup>
                </ScrollArea>
            </SelectContent>
        </Select>
    )
}
