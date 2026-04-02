/* eslint-disable react-hooks/set-state-in-effect */
import {
    ControllerFieldState,
    ControllerRenderProps,
    RegisterOptions,
} from "react-hook-form"
import { Pair } from "../../types/pair.types"
import { cn } from "@/lib/utils"
import { Select } from "@/components/ui/select"
import { PairSelectTrigger } from "./PairSelectTrigger"
import { PairSelectContent } from "./PairSelectContent"
import { useFindPairByIdQuery } from "../../hooks/use-pair-queries"
import { useEffect, useState } from "react"
import { useTradingPlanStore } from "@/features/trading-plans/store/trading-plan.store"

interface PairSelectInnerProps {
    field: ControllerRenderProps
    fieldState: ControllerFieldState
    filteredPairs: Pair[]
    isLoading: boolean
    isError: boolean
    searchQuery: string
    setSearchQuery: (q: string) => void
    label?: string
    placeholder: string
    rules?: RegisterOptions
    disabled: boolean
    className?: string
    name: string
}

export function PairSelectInner({
    field,
    fieldState,
    filteredPairs,
    isLoading,
    isError,
    searchQuery,
    setSearchQuery,
    label,
    placeholder,
    rules,
    disabled,
    className,
    name,
}: PairSelectInnerProps) {
    const { tradingPlan } = useTradingPlanStore()
    const initialPairId = tradingPlan?.pair?.id

    const activePairId = field.value || initialPairId

    const { data: pairDetail } = useFindPairByIdQuery(activePairId, {
        enabled: !!activePairId,
    })

    const [cachedPair, setCachedPair] = useState<Pair | undefined>(undefined)

    const resolvedPair =
        filteredPairs.find((p) => p.id === activePairId) ?? pairDetail?.data

    useEffect(() => {
        if (resolvedPair) {
            setCachedPair(resolvedPair)
        }
    }, [resolvedPair])

    useEffect(() => {
        if (!activePairId) {
            setCachedPair(undefined)
        }
    }, [activePairId])

    return (
        <div className={cn("flex flex-col gap-1.5", className)}>
            {label && (
                <label
                    htmlFor={name}
                    className={cn(
                        "text-xs font-semibold tracking-widest text-black uppercase",
                        (disabled || isLoading) && "opacity-40"
                    )}
                >
                    {label}
                    {rules?.required && (
                        <span className="ml-1 text-black/60">*</span>
                    )}
                </label>
            )}

            <Select
                value={field.value ?? ""}
                onValueChange={(val) => {
                    if (!val) setCachedPair(undefined)
                    field.onChange(val)
                    setSearchQuery("")
                }}
                disabled={disabled || isLoading}
            >
                <PairSelectTrigger
                    placeholder={placeholder}
                    isLoading={isLoading}
                    disabled={disabled}
                    selectedLabel={cachedPair?.name}
                    selectedDescription={cachedPair?.description}
                />

                <PairSelectContent
                    pairs={filteredPairs}
                    isError={isError}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />
            </Select>

            {fieldState.error && (
                <p className="flex items-center gap-1 text-[11px] font-medium text-red-600">
                    {fieldState.error.message ?? "This field is required"}
                </p>
            )}
        </div>
    )
}
