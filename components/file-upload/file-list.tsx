"use client"

import { cn } from "@/lib/utils"
import { UploadedFile } from "./types/types"
import { FileItem } from "./file-item"

interface FileListProps {
    files: UploadedFile[]
    layout: "grid" | "list"
    onRemove: (id: string) => void
    className?: string
}

export function FileList({
    files,
    layout,
    onRemove,
    className,
}: FileListProps) {
    if (files.length === 0) return null

    return (
        <div
            className={cn(
                "w-full",
                layout === "grid"
                    ? "grid grid-cols-1 gap-2 sm:grid-cols-2"
                    : "flex flex-col gap-2",
                className
            )}
        >
            {files.map((file) => (
                <FileItem
                    key={file.id}
                    file={file}
                    layout={layout}
                    onRemove={onRemove}
                />
            ))}
        </div>
    )
}
