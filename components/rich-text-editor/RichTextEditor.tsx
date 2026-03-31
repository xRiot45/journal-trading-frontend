"use client"

import { useCallback, useEffect, useState } from "react"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Color from "@tiptap/extension-color"
import { TextStyle } from "@tiptap/extension-text-style"
import Highlight from "@tiptap/extension-highlight"
import { Table } from "@tiptap/extension-table"
import TableRow from "@tiptap/extension-table-row"
import TableHeader from "@tiptap/extension-table-header"
import TableCell from "@tiptap/extension-table-cell"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import CharacterCount from "@tiptap/extension-character-count"
import Placeholder from "@tiptap/extension-placeholder"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import Typography from "@tiptap/extension-typography"
import Focus from "@tiptap/extension-focus"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { EditorToolbar } from "./EditorToolbar"
import { EditorTextarea } from "./EditorTextarea"
import { EditorFooter } from "./EditorFooter"
import type { RichTextEditorProps } from "./types/editor"

export function RichTextEditor({
    value = "",
    onChange,
    placeholder = "Start writing something amazing...",
    readOnly = false,
    disabled = false,
    minHeight = "400px",
    maxHeight,
    className,
    showCharCount = true,
    maxChars = 0,
    showWordCount = true,
    showHtmlToggle = true,
    autoFocus = false,
}: RichTextEditorProps) {
    const [isHtmlMode, setIsHtmlMode] = useState(false)
    const [htmlSource, setHtmlSource] = useState(value)
    const [isFocused, setIsFocused] = useState(false)

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3, 4, 5, 6],
                },
                codeBlock: {
                    HTMLAttributes: {
                        class: "code-block",
                    },
                },
            }),
            Underline,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                HTMLAttributes: {
                    rel: "noopener noreferrer",
                    target: "_blank",
                },
            }),
            Image.configure({
                inline: false,
                allowBase64: true,
                HTMLAttributes: {
                    class: "editor-image",
                },
            }),
            TextStyle,
            Color,
            Highlight.configure({
                multicolor: false,
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            Subscript,
            Superscript,
            CharacterCount.configure({
                limit: maxChars > 0 ? maxChars : undefined,
            }),
            Placeholder.configure({
                placeholder,
                emptyEditorClass: "is-editor-empty",
            }),
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            Typography,
            Focus.configure({
                className: "has-focus",
                mode: "all",
            }),
        ],
        content: value,
        editable: !readOnly && !disabled,
        autofocus: autoFocus,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            setHtmlSource(html)
            onChange?.(html)
        },
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
        editorProps: {
            attributes: {
                class: "tiptap-editor",
                "data-placeholder": placeholder,
            },
        },
    })

    // Sync external value changes
    useEffect(() => {
        if (!editor) return
        if (value !== editor.getHTML()) {
            editor.commands.setContent(value)
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setHtmlSource(value)
        }
    }, [value, editor])

    // Sync editable state
    useEffect(() => {
        editor?.setEditable(!readOnly && !disabled)
    }, [editor, readOnly, disabled])

    const handleHtmlChange = useCallback((newHtml: string) => {
        setHtmlSource(newHtml)
    }, [])

    const handleHtmlModeToggle = useCallback(() => {
        if (isHtmlMode && editor) {
            editor.commands.setContent(htmlSource)
            onChange?.(htmlSource)
        }
        setIsHtmlMode((v) => !v)
    }, [isHtmlMode, editor, htmlSource, onChange])

    if (!editor) return null

    return (
        <TooltipProvider>
            <div
                className={cn(
                    "flex flex-col rounded-xl border border-(--color-border) bg-(--color-background)",
                    "shadow-sm transition-shadow duration-200",
                    isFocused &&
                        !isHtmlMode &&
                        "shadow-md ring-1 ring-(--color-ring) ring-offset-0",
                    disabled && "cursor-not-allowed opacity-60",
                    className
                )}
            >
                {/* Toolbar */}
                {!readOnly && (
                    <EditorToolbar
                        editor={editor}
                        disabled={disabled}
                        showHtmlToggle={showHtmlToggle}
                        isHtmlMode={isHtmlMode}
                        onHtmlModeToggle={handleHtmlModeToggle}
                    />
                )}

                {/* Content area */}
                <EditorTextarea
                    editor={editor}
                    minHeight={minHeight}
                    maxHeight={maxHeight}
                    disabled={disabled}
                    isHtmlMode={isHtmlMode}
                    htmlValue={htmlSource}
                    onHtmlChange={handleHtmlChange}
                />

                {/* Footer */}
                {(showCharCount || showWordCount) && (
                    <EditorFooter
                        editor={editor}
                        showCharCount={showCharCount}
                        showWordCount={showWordCount}
                        maxChars={maxChars}
                    />
                )}
            </div>
        </TooltipProvider>
    )
}
