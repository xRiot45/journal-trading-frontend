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
    selectedDescription?: string
}

export function PairSelectTrigger({
    placeholder = "Select a pair",
    isLoading,
    disabled,
    className,
    selectedLabel,
    selectedDescription,
}: PairSelectTriggerProps) {
    return (
        <SelectTrigger
            className={cn(
                "relative h-11 w-full rounded-md border bg-white px-4 py-6",
                "text-sm font-medium text-black transition-all duration-150",
                "focus:ring-2 focus:ring-black focus:ring-offset-0 focus:outline-none",
                "cursor-pointer hover:bg-gray-100 hover:text-white",
                "disabled:cursor-not-allowed disabled:opacity-40",
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
                <>
                    {/* Sembunyikan total saat selectedLabel ada, tetap di DOM agar Radix berfungsi */}
                    <span
                        className={cn(
                            selectedLabel
                                ? "pointer-events-none w-0 overflow-hidden opacity-0 select-none"
                                : ""
                        )}
                    >
                        <SelectValue placeholder={placeholder} />
                    </span>

                    <div className="space-y-3">
                        {/* Tampil saat cachedPair sudah ada, posisi absolute agar tidak bentrok */}
                        {selectedLabel ? (
                            <span className="absolute inset-0 flex items-center px-4 text-sm font-medium text-black">
                                {selectedLabel}
                            </span>
                        ) : null}

                        {/* Tampil saat ada deskripsi, posisi absolute agar tidak bentrok */}
                        {selectedDescription ? (
                            <span className="absolute inset-0 flex items-end px-4 pb-2 text-[10px] text-zinc-500">
                                {selectedDescription}
                            </span>
                        ) : null}
                    </div>
                </>
            )}
        </SelectTrigger>
    )
}
