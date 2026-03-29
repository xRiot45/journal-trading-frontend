"use client"

import { useState } from "react"
import { Search, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardHeader, CardToolbar } from "@/components/ui/card"

interface ToolbarProps {
    searchQuery: string
    isLoading: boolean
    onSearch: (value: string) => void
    onClear: () => void
    onAddSession: () => void
}

export function Toolbar({
    searchQuery,
    isLoading,
    onSearch,
    onClear,
    onAddSession,
}: ToolbarProps) {
    const [inputValue, setInputValue] = useState(searchQuery)

    const handleSearch = () => onSearch(inputValue)

    const handleClear = () => {
        setInputValue("")
        onClear()
    }

    return (
        <CardHeader className="flex-col flex-wrap items-end py-5 sm:flex-row sm:items-center">
            <div className="flex flex-col items-stretch justify-between gap-2.5 sm:flex-row sm:items-center">
                <div className="relative">
                    <Search className="absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search sessions"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        disabled={isLoading}
                        className="w-full ps-9 sm:w-64"
                    />
                    {searchQuery.length > 0 && (
                        <Button
                            mode="icon"
                            variant="dim"
                            className="absolute inset-e-1.5 top-1/2 h-6 w-6 -translate-y-1/2"
                            onClick={handleClear}
                        >
                            <X />
                        </Button>
                    )}
                </div>
            </div>
            <CardToolbar>
                <Button disabled={isLoading} onClick={onAddSession}>
                    <Plus />
                    Add Session
                </Button>
            </CardToolbar>
        </CardHeader>
    )
}
