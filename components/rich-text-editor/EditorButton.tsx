"use client"

import React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { EditorTooltip } from "./EditorTooltip"
import type { EditorButtonProps } from "./types/editor"

export function EditorButton({
    icon,
    label,
    onClick,
    isActive = false,
    disabled = false,
    className,
    size = "md",
    shortcut,
}: EditorButtonProps & { shortcut?: string }) {
    const sizeClasses = {
        sm: "h-7 w-7 text-sm",
        md: "h-8 w-8 text-base",
        lg: "h-9 w-9 text-lg",
    }

    const iconSizes = {
        sm: 14,
        md: 16,
        lg: 18,
    }

    return (
        <EditorTooltip content={label} shortcut={shortcut}>
            <button
                type="button"
                onMouseDown={(e) => {
                    e.preventDefault()
                    if (!disabled) onClick()
                }}
                disabled={disabled}
                aria-label={label}
                aria-pressed={isActive}
                className={cn(
                    "relative inline-flex items-center justify-center rounded-md transition-all duration-150",
                    "focus-visible:ring-1 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none",
                    "disabled:pointer-events-none disabled:opacity-40",
                    sizeClasses[size],
                    isActive
                        ? "bg-[var(--color-foreground)] text-[var(--color-background)]"
                        : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]",
                    className
                )}
            >
                <Icon
                    icon={icon}
                    width={iconSizes[size]}
                    height={iconSizes[size]}
                />
            </button>
        </EditorTooltip>
    )
}
