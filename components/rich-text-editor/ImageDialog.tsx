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

interface ImageDialogProps {
    editor: Editor
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ImageDialog({ editor, open, onOpenChange }: ImageDialogProps) {
    const [url, setUrl] = useState("")
    const [alt, setAlt] = useState("")
    const [activeTab, setActiveTab] = useState<"url" | "upload">("url")

    const handleInsert = () => {
        if (!url.trim()) return

        editor
            .chain()
            .focus()
            .setImage({ src: url, alt: alt || undefined })
            .run()

        onOpenChange(false)
        setUrl("")
        setAlt("")
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            const src = event.target?.result as string
            if (src) {
                editor
                    .chain()
                    .focus()
                    .setImage({ src, alt: alt || file.name })
                    .run()
                onOpenChange(false)
                setUrl("")
                setAlt("")
            }
        }
        reader.readAsDataURL(file)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && activeTab === "url") handleInsert()
        if (e.key === "Escape") onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-base font-semibold">
                        Insert Image
                    </DialogTitle>
                </DialogHeader>

                {/* Tab switcher */}
                <div className="flex gap-0.5 rounded-md border border-(--color-border) p-0.5">
                    {(["url", "upload"] as const).map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 rounded py-1.5 text-xs font-medium transition-colors ${
                                activeTab === tab
                                    ? "bg-(--color-foreground) text-(--color-background)"
                                    : "text-(--color-muted-foreground) hover:text-(--color-foreground)"
                            }`}
                        >
                            {tab === "url" ? "From URL" : "Upload File"}
                        </button>
                    ))}
                </div>

                <div className="grid gap-4 py-2">
                    {activeTab === "url" ? (
                        <div className="grid gap-2">
                            <Label
                                htmlFor="img-url"
                                className="text-xs font-medium text-(--color-muted-foreground)"
                            >
                                Image URL
                            </Label>
                            <Input
                                id="img-url"
                                placeholder="https://example.com/image.jpg"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                className="text-sm"
                            />
                        </div>
                    ) : (
                        <div className="grid gap-2">
                            <Label
                                htmlFor="img-file"
                                className="text-xs font-medium text-(--color-muted-foreground)"
                            >
                                Choose File
                            </Label>
                            <div className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-(--color-border) p-6 transition-colors hover:border-(--color-foreground)">
                                <label
                                    htmlFor="img-file"
                                    className="cursor-pointer text-center"
                                >
                                    <p className="text-sm text-(--color-muted-foreground)">
                                        Click to upload or drag & drop
                                    </p>
                                    <p className="mt-1 text-xs text-(--color-muted-foreground)">
                                        PNG, JPG, GIF, WebP
                                    </p>
                                    <input
                                        id="img-file"
                                        type="file"
                                        accept="image/*"
                                        className="sr-only"
                                        onChange={handleFileUpload}
                                    />
                                </label>
                            </div>
                        </div>
                    )}

                    <div className="grid gap-2">
                        <Label
                            htmlFor="img-alt"
                            className="text-xs font-medium text-(--color-muted-foreground)"
                        >
                            Alt Text{" "}
                            <span className="opacity-50">(optional)</span>
                        </Label>
                        <Input
                            id="img-alt"
                            placeholder="Describe the image..."
                            value={alt}
                            onChange={(e) => setAlt(e.target.value)}
                            className="text-sm"
                        />
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    {activeTab === "url" && (
                        <Button
                            size="sm"
                            onClick={handleInsert}
                            disabled={!url.trim()}
                        >
                            Insert Image
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
