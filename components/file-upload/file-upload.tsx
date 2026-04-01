"use client"

import { useCallback, useState } from "react"
import { cn } from "@/lib/utils"
import { FileUploadProps } from "./types/types"
import { useFileUpload } from "./hooks/use-file-upload"
import { Dropzone } from "./dropzone"
import { FileList } from "./file-list"

export function FileUpload({
    multiple = false,
    accept,
    maxSize,
    maxFiles,
    disabled = false,
    variant = "default",
    layout = "list",
    files: controlledFiles,
    onFilesChange,
    onUpload,
    label,
    description,
    className,
}: FileUploadProps) {
    const { files, processFiles, removeFile, canAddMore } = useFileUpload({
        multiple,
        accept,
        maxSize,
        maxFiles,
        files: controlledFiles,
        onFilesChange,
        onUpload,
    })

    const [isDragOver, setIsDragOver] = useState(false)

    const handleFiles = useCallback(
        (incoming: File[]) => {
            processFiles(incoming)
        },
        [processFiles]
    )

    return (
        <div className={cn("flex w-full flex-col gap-3", className)}>
            {/* Show dropzone only when user can still add files */}
            {canAddMore && (
                <Dropzone
                    accept={accept}
                    multiple={multiple}
                    disabled={disabled}
                    isDragOver={isDragOver}
                    variant={variant}
                    label={label}
                    description={description}
                    maxSize={maxSize}
                    onFiles={handleFiles}
                    onDragStateChange={setIsDragOver}
                />
            )}

            {/* File list */}
            {files.length > 0 && (
                <FileList files={files} layout={layout} onRemove={removeFile} />
            )}

            {/* Stats bar — only in multi-file + upload mode */}
            {multiple && maxFiles !== undefined && (
                <p className="text-right text-xs text-zinc-400 tabular-nums dark:text-zinc-500">
                    {files.length} / {maxFiles} file{maxFiles !== 1 ? "s" : ""}
                </p>
            )}
        </div>
    )
}
