"use client"

import React from "react"
import { EditorContent, type Editor } from "@tiptap/react"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"

interface EditorTextareaProps {
    editor: Editor
    minHeight?: string
    maxHeight?: string
    disabled?: boolean
    isHtmlMode?: boolean
    htmlValue?: string
    onHtmlChange?: (value: string) => void
    className?: string
}

export function EditorTextarea({
    editor,
    minHeight = "400px",
    maxHeight,
    disabled = false,
    isHtmlMode = false,
    htmlValue = "",
    onHtmlChange,
    className,
}: EditorTextareaProps) {
    return (
        <div
            className={cn(
                "relative w-full overflow-auto rounded-md",
                maxHeight ? "" : "flex-1",
                className
            )}
            style={{ minHeight, maxHeight }}
        >
            {isHtmlMode ? (
                <Textarea
                    value={htmlValue}
                    onChange={(e) => onHtmlChange?.(e.target.value)}
                    className={cn(
                        "h-full min-h-full w-full resize-none rounded-none border-none font-mono text-xs",
                        "focus-visible:ring-0 focus-visible:ring-offset-0",
                        "bg-(--color-muted) text-(--color-foreground)",
                        "p-4 leading-relaxed"
                    )}
                    style={{ minHeight }}
                    placeholder="<!-- HTML source -->"
                    disabled={disabled}
                />
            ) : (
                <EditorContent
                    editor={editor}
                    className={cn(
                        "tiptap-editor-wrapper h-full",
                        disabled &&
                            "pointer-events-none cursor-not-allowed opacity-60"
                    )}
                    style={{ minHeight }}
                />
            )}
        </div>
    )
}
