"use client"

import {
    Control,
    Controller,
    FieldPath,
    FieldValues,
    RegisterOptions,
} from "react-hook-form"
import { usePairSelect } from "./hooks/usePairSelect"
import { PairSelectInner } from "./PairSelectInner"

export interface PairSelectProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
    control: Control<TFieldValues>
    name: TName
    label?: string
    placeholder?: string
    rules?: RegisterOptions<TFieldValues, TName>
    disabled?: boolean
    className?: string
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
            render={({ field, fieldState }) => {
                return (
                    <PairSelectInner
                        field={field}
                        fieldState={fieldState}
                        filteredPairs={filteredPairs}
                        isLoading={isLoading}
                        isError={isError}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        label={label}
                        placeholder={placeholder}
                        rules={rules}
                        disabled={disabled}
                        className={className}
                        name={name}
                    />
                )
            }}
        />
    )
}
