"use client"

import { SelectItem } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Pair } from "../../types/pair.types"

interface PairSelectItemProps {
    pair: Pair
    className?: string
}

export function PairSelectItem({ pair, className }: PairSelectItemProps) {
    return (
        <SelectItem
            value={pair.id}
            className={cn(
                "px-4 py-3",
                "text-sm text-black",
                "transition-colors duration-100",
                "focus:bg-gray-100 focus:text-black",
                "data-highlighted:bg-gray-100 data-highlighted:text-black",
                "data-[state=checked]:bg-black/5 data-[state=checked]:font-semibold",
                className
            )}
        >
            {/* Wrapper */}
            <div className="flex flex-col items-start leading-tight">
                {/* Name */}
                <span className="font-medium tracking-tight dark:text-white">
                    {pair.name}
                </span>

                {/* Description */}
                {pair.description && (
                    <span className="mt-0.5 text-[11px] text-black/50 dark:text-white/60">
                        {pair.description}
                    </span>
                )}
            </div>
        </SelectItem>
    )
}
