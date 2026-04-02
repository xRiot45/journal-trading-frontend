"use client"

import { useCallback, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { FileStatus, FileUploadProps, UploadedFile } from "./types/types"
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
    value,
    existingPreviewUrl,
}: FileUploadProps) {
    const resolvedFiles = useMemo(() => {
        if (value instanceof File && value.size > 0) {
            return [
                {
                    id: value.name,
                    file: value,
                    preview: URL.createObjectURL(value),
                    status: "idle" as FileStatus,
                },
            ] satisfies UploadedFile[]
        }

        if (existingPreviewUrl) {
            const urlPath = existingPreviewUrl.split("?")[0]
            const ext = urlPath.split(".").pop()?.toLowerCase() ?? "jpg"
            const mimeMap: Record<string, string> = {
                jpg: "image/jpeg",
                jpeg: "image/jpeg",
                png: "image/png",
                gif: "image/gif",
                webp: "image/webp",
            }
            const mimeType = mimeMap[ext] ?? "image/jpeg"

            return [
                {
                    id: existingPreviewUrl,
                    file: new File([], `existing-thumbnail.${ext}`, {
                        type: mimeType,
                    }),
                    preview: existingPreviewUrl,
                    status: "idle" as FileStatus,
                },
            ] satisfies UploadedFile[]
        }

        return controlledFiles
    }, [value, existingPreviewUrl, controlledFiles])

    console.log("Resolved files:", resolvedFiles)

    const { files, processFiles, removeFile, canAddMore } = useFileUpload({
        multiple,
        accept,
        maxSize,
        maxFiles,
        files: resolvedFiles,
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
