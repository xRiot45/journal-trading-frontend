"use client"

import { SelectContent } from "@/components/ui/select"
import { AlertCircle, Inbox } from "lucide-react"
import { cn } from "@/lib/utils"
import { Pair } from "../../types/pair.types"
import { PairSelectItem } from "./PairSelectItem"
import { PairSelectSearch } from "./PairSelectSearch"

interface PairSelectContentProps {
    pairs: Pair[]
    isError: boolean
    searchQuery: string
    onSearchChange: (value: string) => void
    className?: string
}

export function PairSelectContent({
    pairs,
    isError,
    searchQuery,
    onSearchChange,
    className,
}: PairSelectContentProps) {
    return (
        <SelectContent
            className={cn(
                "rounded-xl border bg-white p-2 dark:bg-black",
                "w-(--radix-select-trigger-width) min-w-55",
                className
            )}
            // Keep the viewport from shrinking on short lists
            position="item-aligned"
            sideOffset={4}
        >
            {/* ── Search box ────────────────────────── */}
            <PairSelectSearch
                value={searchQuery}
                onChange={onSearchChange}
                placeholder="Search by name or description…"
            />

            {/* ── Scrollable list ───────────────────── */}
            <div className="max-h-64 overflow-y-auto">
                {/* Error state */}
                {isError && (
                    <EmptySlot
                        icon={<AlertCircle className="h-4 w-4 text-red-500" />}
                        label="Failed to load pairs"
                        sublabel="Please try again later"
                    />
                )}

                {/* Empty state */}
                {!isError && pairs.length === 0 && (
                    <EmptySlot
                        icon={<Inbox className="h-4 w-4 text-black/30" />}
                        label={
                            searchQuery
                                ? `No results for "${searchQuery}"`
                                : "No pairs found"
                        }
                        sublabel={
                            searchQuery ? "Try a different keyword" : undefined
                        }
                    />
                )}

                {/* Items */}
                {!isError &&
                    pairs.map((pair) => (
                        <PairSelectItem key={pair.id} pair={pair} />
                    ))}
            </div>
        </SelectContent>
    )
}

// ─────────────────────────────────────────────
//  Empty / Error slot
// ─────────────────────────────────────────────
interface EmptySlotProps {
    icon: React.ReactNode
    label: string
    sublabel?: string
}

function EmptySlot({ icon, label, sublabel }: EmptySlotProps) {
    return (
        <div className="flex flex-col items-center gap-1 px-4 py-8 text-center">
            <span className="mb-1">{icon}</span>
            <p className="text-sm font-medium text-black/70">{label}</p>
            {sublabel && (
                <p className="text-[11px] text-black/40">{sublabel}</p>
            )}
        </div>
    )
}
