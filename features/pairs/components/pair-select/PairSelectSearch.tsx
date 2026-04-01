"use client"

import { useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface PairSelectSearchProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

export function PairSelectSearch({
    value,
    onChange,
    placeholder = "Search pairs…",
    className,
}: PairSelectSearchProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const timer = setTimeout(() => inputRef.current?.focus(), 50)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className={cn("flex items-center border-b px-3 py-2", className)}>
            <Search className="mr-2 h-3.5 w-3.5 shrink-0 text-black/40 dark:text-white" />
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                onKeyDown={(e) => e.stopPropagation()}
                className={cn(
                    "flex-1 bg-transparent text-sm text-black dark:text-white",
                    "outline-none"
                )}
            />
            {value && (
                <button
                    type="button"
                    onClick={() => onChange("")}
                    className="ml-1 rounded-sm p-0.5 text-black/40 hover:text-black"
                    aria-label="Clear search"
                >
                    <X className="h-3 w-3" />
                </button>
            )}
        </div>
    )
}
