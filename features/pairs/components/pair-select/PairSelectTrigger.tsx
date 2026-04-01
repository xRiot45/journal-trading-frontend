"use client"

import { SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface PairSelectTriggerProps {
    placeholder?: string
    isLoading: boolean
    disabled?: boolean
    className?: string
    selectedLabel?: string
}

export function PairSelectTrigger({
    placeholder = "Select a pair",
    isLoading,
    disabled,
    className,
}: PairSelectTriggerProps) {
    return (
        <SelectTrigger
            className={cn(
                // Base
                "relative h-11 w-full rounded-md border bg-white px-4 py-6",
                "text-sm font-medium text-black transition-all duration-150",
                // Focus ring — sharp black outline
                "focus:ring-2 focus:ring-black focus:ring-offset-0 focus:outline-none",
                // Hover
                "cursor-pointer hover:bg-gray-100 hover:text-white",
                // Disabled
                "disabled:cursor-not-allowed disabled:opacity-40",
                // Custom
                className
            )}
            disabled={disabled || isLoading}
        >
            {isLoading ? (
                <span className="flex items-center gap-2 text-black/50">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span className="text-xs tracking-widest uppercase">
                        Loading…
                    </span>
                </span>
            ) : (
                <SelectValue placeholder={placeholder} />
            )}
        </SelectTrigger>
    )
}
