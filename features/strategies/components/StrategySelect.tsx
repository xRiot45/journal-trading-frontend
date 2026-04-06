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
import { useFindAllStrategiesQuery } from "../hooks/use-strategies-queries"
import { useMemo, useState } from "react"

interface StrategySelectProps {
    value?: string
    onChange?: (value: string) => void
    disabled?: boolean
}

export function StrategySelect({
    value,
    onChange,
    disabled,
}: StrategySelectProps) {
    const { data, isLoading } = useFindAllStrategiesQuery()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const strategies = data?.data ?? []

    const [search, setSearch] = useState("")

    const filteredStrategies = useMemo(() => {
        return strategies.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
        )
    }, [strategies, search])

    return (
        <Select
            value={value}
            onValueChange={onChange}
            disabled={isLoading || disabled}
        >
            <SelectTrigger className="w-full cursor-pointer py-6">
                <SelectValue placeholder="--- Select Strategy ---" />
            </SelectTrigger>

            <SelectContent>
                <div className="p-2">
                    <Input
                        placeholder="Search strategy..."
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
                    ) : filteredStrategies.length === 0 ? (
                        <div className="p-2 text-sm text-muted-foreground">
                            No strategy found.
                        </div>
                    ) : (
                        filteredStrategies.map((item) => (
                            <SelectItem
                                key={item.id}
                                value={item.id}
                                className="p-4"
                            >
                                {item.title}
                            </SelectItem>
                        ))
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
