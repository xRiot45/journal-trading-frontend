"use client"

import { Controller } from "react-hook-form"
import { useMemo, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PairSelectItem } from "./pair-select-item"
import { PairSelectProps } from "./types"
import { useFindAllPairsQuery } from "@/features/pairs/hooks/use-pair-queries"

export function PairSelect({
    control,
    name,
    label,
    placeholder = "Select pair",
    disabled,
}: PairSelectProps) {
    const [search, setSearch] = useState("")

    const { data, isLoading } = useFindAllPairsQuery({
        page: 1,
        limit: 100,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const pairs = data?.data ?? []

    const filteredPairs = useMemo(() => {
        if (!search) return pairs
        return pairs.filter((p) =>
            `${p.name} ${p.description ?? ""}`
                .toLowerCase()
                .includes(search.toLowerCase())
        )
    }, [pairs, search])

    return (
        <div className="w-full space-y-2">
            {label && <Label>{label}</Label>}

            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={disabled || isLoading}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue
                                placeholder={
                                    isLoading ? "Loading..." : placeholder
                                }
                            />
                        </SelectTrigger>

                        <SelectContent className="p-2">
                            {/* Search Input */}
                            <div className="mb-2">
                                <Input
                                    placeholder="Search pair..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            {/* Loading */}
                            {isLoading && (
                                <div className="p-2 text-sm text-muted-foreground">
                                    Loading pairs...
                                </div>
                            )}

                            {/* Empty */}
                            {!isLoading && filteredPairs.length === 0 && (
                                <div className="p-2 text-sm text-muted-foreground">
                                    No pairs found
                                </div>
                            )}

                            {/* Items */}
                            {filteredPairs.map((pair) => (
                                <SelectItem key={pair.id} value={pair.id}>
                                    <PairSelectItem pair={pair} />
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
        </div>
    )
}
