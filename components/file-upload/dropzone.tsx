"use client"

import { useRef, useCallback, KeyboardEvent } from "react"
import { cn } from "@/lib/utils"
import { useDragDrop } from "./hooks/use-drag-drop"
import { EmptyState } from "./empty-state"
import { FileUploadVariant } from "./types/types"

interface DropzoneProps {
    accept?: string
    multiple?: boolean
    disabled?: boolean
    isDragOver: boolean
    variant?: FileUploadVariant
    label?: string
    description?: string
    maxSize?: number
    onFiles: (files: File[]) => void
    onDragStateChange: (isDragOver: boolean) => void
    className?: string
}

export function Dropzone({
    accept,
    multiple,
    disabled,
    variant = "default",
    label,
    description,
    maxSize,
    onFiles,
    className,
}: DropzoneProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    const { isDragOver, dragHandlers } = useDragDrop({
        disabled,
        onDrop: onFiles,
    })

    const openPicker = useCallback(() => {
        if (!disabled) inputRef.current?.click()
    }, [disabled])

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                openPicker()
            }
        },
        [openPicker]
    )

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const selected = Array.from(e.target.files ?? [])
            if (selected.length > 0) onFiles(selected)
            // Reset input so the same file can be re-selected
            e.target.value = ""
        },
        [onFiles]
    )

    return (
        <div
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-label="File upload dropzone. Press Enter or Space to open file picker"
            aria-disabled={disabled}
            onClick={openPicker}
            onKeyDown={handleKeyDown}
            {...dragHandlers}
            className={cn(
                "relative flex flex-col items-center justify-center",
                "min-h-40 w-full cursor-pointer rounded-2xl",
                "transition-all duration-200 ease-out",
                "focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-zinc-100",

                // Variants
                variant === "default" && [
                    "border-2 border-dashed",
                    isDragOver
                        ? "scale-[1.01] border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-900"
                        : "border-zinc-300 bg-white hover:border-zinc-500 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:border-zinc-400 dark:hover:bg-zinc-900",
                ],
                variant === "outline" && [
                    "border border-solid",
                    isDragOver
                        ? "scale-[1.01] border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-900"
                        : "border-zinc-200 bg-white hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600 dark:hover:bg-zinc-900",
                ],
                variant === "minimal" && [
                    "border-0 bg-zinc-50 dark:bg-zinc-900",
                    isDragOver
                        ? "bg-zinc-100 dark:bg-zinc-800"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                ],

                disabled && "pointer-events-none cursor-not-allowed opacity-50",
                className
            )}
        >
            <EmptyState
                isDragOver={isDragOver}
                disabled={disabled}
                accept={accept}
                maxSize={maxSize}
                label={label}
                description={description}
            />

            <input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                onChange={handleChange}
                className="sr-only"
                tabIndex={-1}
                aria-hidden
            />
        </div>
    )
}
