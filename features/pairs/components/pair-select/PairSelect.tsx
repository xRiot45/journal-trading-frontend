"use client"

import {
    Control,
    Controller,
    FieldPath,
    FieldValues,
    RegisterOptions,
} from "react-hook-form"
import { Select } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { usePairSelect } from "./hooks/usePairSelect"
import { PairSelectTrigger } from "./PairSelectTrigger"
import { PairSelectContent } from "./PairSelectContent"

export interface PairSelectProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
    /** React Hook Form control object */
    control: Control<TFieldValues>
    /** Field name in the form */
    name: TName
    /** Visible label above the select */
    label?: string
    /** Placeholder text when nothing is selected */
    placeholder?: string
    /** RHF validation rules */
    rules?: RegisterOptions<TFieldValues, TName>
    /** Disable the entire control */
    disabled?: boolean
    /** Additional class names for the wrapper */
    className?: string
    /** Override fetch limit (default 1000) */
    fetchLimit?: number
}

export function PairSelect<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    label,
    placeholder = "Select a pair",
    rules,
    disabled = false,
    className,
    fetchLimit = 100,
}: PairSelectProps<TFieldValues, TName>) {
    const { filteredPairs, isLoading, isError, searchQuery, setSearchQuery } =
        usePairSelect({ limit: fetchLimit })

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field, fieldState }) => (
                <div className={cn("flex flex-col gap-1.5", className)}>
                    {/* ── Label ─────────────────────────── */}
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

                    {/* ── Select ────────────────────────── */}
                    <Select
                        value={field.value ?? ""}
                        onValueChange={(val) => {
                            field.onChange(val)
                            setSearchQuery("")
                        }}
                        disabled={disabled || isLoading}
                    >
                        <PairSelectTrigger
                            placeholder={placeholder}
                            isLoading={isLoading}
                            disabled={disabled}
                        />

                        <PairSelectContent
                            pairs={filteredPairs}
                            isError={isError}
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                        />
                    </Select>

                    {/* ── Validation error ──────────────── */}
                    {fieldState.error && (
                        <p className="flex items-center gap-1 text-[11px] font-medium text-red-600">
                            <span className="inline-block h-1 w-1 rounded-full bg-red-600" />
                            {fieldState.error.message ??
                                "This field is required"}
                        </p>
                    )}
                </div>
            )}
        />
    )
}
