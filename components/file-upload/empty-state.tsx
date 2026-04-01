"use client"

import { cn } from "@/lib/utils"
import { formatBytes } from "./utils/format-bytes"

interface EmptyStateProps {
    isDragOver: boolean
    disabled?: boolean
    accept?: string
    maxSize?: number
    label?: string
    description?: string
    className?: string
}

export function EmptyState({
    isDragOver,
    disabled,
    accept,
    maxSize,
    label,
    description,
    className,
}: EmptyStateProps) {
    const hint = [
        accept && `Accepted: ${accept}`,
        maxSize && `Max size: ${formatBytes(maxSize)}`,
    ]
        .filter(Boolean)
        .join(" · ")

    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-3 select-none",
                className
            )}
        >
            {/* Icon */}
            <div
                className={cn(
                    "relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 transition-all duration-300",
                    isDragOver
                        ? "scale-110 border-zinc-900 bg-zinc-900 dark:border-zinc-100 dark:bg-zinc-100"
                        : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900",

                    disabled && "opacity-40"
                )}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={cn(
                        "h-6 w-6 transition-all duration-300",
                        isDragOver
                            ? "-translate-y-0.5 text-white dark:text-zinc-900"
                            : "text-zinc-500 dark:text-zinc-400"
                    )}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                    />
                </svg>
            </div>

            {/* Text */}
            <div className="space-y-0.5 text-center">
                <p
                    className={cn(
                        "text-sm font-semibold transition-colors duration-200",
                        isDragOver
                            ? "text-zinc-900 dark:text-zinc-100"
                            : "text-zinc-700 dark:text-zinc-300",
                        disabled && "text-zinc-400 dark:text-zinc-600"
                    )}
                >
                    {isDragOver
                        ? "Release to upload"
                        : (label ?? "Drop files here, or click to browse")}
                </p>

                {!isDragOver && (
                    <p
                        className={cn(
                            "text-xs text-zinc-400 dark:text-zinc-500",
                            disabled && "opacity-60"
                        )}
                    >
                        {description ?? hint ?? "Any file type accepted"}
                    </p>
                )}
            </div>
        </div>
    )
}
