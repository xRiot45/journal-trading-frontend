"use client"

import React, { useState } from "react"
import { type Editor } from "@tiptap/react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LinkDialogProps {
    editor: Editor
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function LinkDialog({ editor, open, onOpenChange }: LinkDialogProps) {
    const [url, setUrl] = useState(
        () => editor.getAttributes("link").href ?? ""
    )
    const [text, setText] = useState(() => {
        const { from, to } = editor.state.selection
        return editor.state.doc.textBetween(from, to, "")
    })

    const handleInsert = () => {
        if (!url.trim()) {
            editor.chain().focus().extendMarkRange("link").unsetLink().run()
            onOpenChange(false)
            return
        }

        const href = url.startsWith("http") ? url : `https://${url}`

        if (text && editor.state.selection.empty) {
            editor
                .chain()
                .focus()
                .insertContent(`<a href="${href}">${text}</a>`)
                .run()
        } else {
            editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href, target: "_blank" })
                .run()
        }

        onOpenChange(false)
        setUrl("")
        setText("")
    }

    const handleRemove = () => {
        editor.chain().focus().extendMarkRange("link").unsetLink().run()
        onOpenChange(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleInsert()
        if (e.key === "Escape") onOpenChange(false)
    }

    const hasLink = editor.isActive("link")

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-base font-semibold">
                        {hasLink ? "Edit Link" : "Insert Link"}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-2">
                    <div className="grid gap-2">
                        <Label
                            htmlFor="url"
                            className="text-xs font-medium text-(--color-muted-foreground)"
                        >
                            URL
                        </Label>
                        <Input
                            id="url"
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            className="text-sm"
                        />
                    </div>

                    {editor.state.selection.empty && !hasLink && (
                        <div className="grid gap-2">
                            <Label
                                htmlFor="text"
                                className="text-xs font-medium text-(--color-muted-foreground)"
                            >
                                Display Text
                            </Label>
                            <Input
                                id="text"
                                placeholder="Link text..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="text-sm"
                            />
                        </div>
                    )}
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    {hasLink && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRemove}
                            className="border-(--color-destructive) text-(--color-destructive) hover:bg-(--color-destructive) hover:text-white"
                        >
                            Remove Link
                        </Button>
                    )}
                    <div className="ml-auto flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button size="sm" onClick={handleInsert}>
                            {hasLink ? "Update" : "Insert"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
