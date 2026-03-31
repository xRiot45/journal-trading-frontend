"use client"

import React from "react"
import { type Editor } from "@tiptap/react"
import { cn } from "@/lib/utils"

interface EditorFooterProps {
    editor: Editor
    showCharCount?: boolean
    showWordCount?: boolean
    maxChars?: number
}

export function EditorFooter({
    editor,
    showCharCount = true,
    showWordCount = true,
    maxChars = 0,
}: EditorFooterProps) {
    const charCount = editor.storage.characterCount?.characters?.() ?? 0
    const wordCount = editor.storage.characterCount?.words?.() ?? 0

    const isNearLimit = maxChars > 0 && charCount > maxChars * 0.85
    const isAtLimit = maxChars > 0 && charCount >= maxChars

    if (!showCharCount && !showWordCount) return null

    return (
        <div
            className={cn(
                "flex items-center justify-between border-t border-[var(--color-border)] px-4 py-2 text-xs",
                "editor-fade-in bg-[var(--color-background)]"
            )}
        >
            <div className="flex items-center gap-4 text-[var(--color-muted-foreground)]">
                {showWordCount && (
                    <span>
                        {wordCount.toLocaleString()}{" "}
                        {wordCount === 1 ? "word" : "words"}
                    </span>
                )}
                {showCharCount && (
                    <span
                        className={cn(
                            isAtLimit &&
                                "font-semibold text-[var(--color-destructive)]",
                            isNearLimit && !isAtLimit && "text-orange-500"
                        )}
                    >
                        {charCount.toLocaleString()}
                        {maxChars > 0 && ` / ${maxChars.toLocaleString()}`}{" "}
                        {charCount === 1 ? "character" : "characters"}
                    </span>
                )}
            </div>

            {/* Progress bar (only if maxChars set) */}
            {maxChars > 0 && (
                <div className="flex items-center gap-2">
                    <div className="h-1 w-24 overflow-hidden rounded-full bg-[var(--color-muted)]">
                        <div
                            className={cn(
                                "h-full rounded-full transition-all duration-300",
                                isAtLimit
                                    ? "bg-[var(--color-destructive)]"
                                    : isNearLimit
                                      ? "bg-orange-500"
                                      : "bg-[var(--color-foreground)]"
                            )}
                            style={{
                                width: `${Math.min((charCount / maxChars) * 100, 100)}%`,
                            }}
                        />
                    </div>
                    <span
                        className={cn(
                            "tabular-nums",
                            isAtLimit
                                ? "text-[var(--color-destructive)]"
                                : isNearLimit
                                  ? "text-orange-500"
                                  : "text-[var(--color-muted-foreground)]"
                        )}
                    >
                        {Math.max(maxChars - charCount, 0).toLocaleString()}{" "}
                        left
                    </span>
                </div>
            )}
        </div>
    )
}
