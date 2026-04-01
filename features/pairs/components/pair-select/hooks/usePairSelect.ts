import { useFindAllPairsQuery } from "@/features/pairs/hooks/use-pair-queries"
import { Pair } from "@/features/pairs/types/pair.types"
import { useState, useMemo, useCallback } from "react"

interface UsePairSelectOptions {
    limit?: number
}

interface UsePairSelectReturn {
    pairs: Pair[]
    isLoading: boolean
    isError: boolean
    searchQuery: string
    setSearchQuery: (value: string) => void
    filteredPairs: Pair[]
    totalCount: number
}

export function usePairSelect(
    options: UsePairSelectOptions = {}
): UsePairSelectReturn {
    const { limit = 100 } = options

    const [searchQuery, setSearchQuery] = useState("")

    const { data, isLoading, isError } = useFindAllPairsQuery({
        limit,
        page: 1,
    })

    const pairs = useMemo(() => data?.data ?? [], [data])

    const filteredPairs = useMemo(() => {
        if (!searchQuery.trim()) return pairs

        const lower = searchQuery.toLowerCase()
        return pairs.filter(
            (pair) =>
                pair.name.toLowerCase().includes(lower) ||
                pair.description.toLowerCase().includes(lower)
        )
    }, [pairs, searchQuery])

    const handleSetSearch = useCallback((value: string) => {
        setSearchQuery(value)
    }, [])

    return {
        pairs,
        isLoading,
        isError,
        searchQuery,
        setSearchQuery: handleSetSearch,
        filteredPairs,
        totalCount: data?.meta?.totalItems ?? 0,
    }
}
