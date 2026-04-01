"use client"

import { memo } from "react"
import { cn } from "@/lib/utils"
import { UploadedFile } from "./types/types"
import { FilePreview } from "./file-preview"
import { UploadProgress } from "./upload-progress"
import { formatBytes } from "./utils/format-bytes"

interface FileItemProps {
    file: UploadedFile
    layout: "grid" | "list"
    onRemove: (id: string) => void
}

function FileItemComponent({ file, layout, onRemove }: FileItemProps) {
    const isGrid = layout === "grid"

    const statusLabel = {
        idle: null,
        uploading: "Uploading…",
        success: "Complete",
        error: file.error ?? "Error",
    }[file.status]

    return (
        <div
            className={cn(
                "group relative flex gap-3 rounded-xl border border-zinc-200 bg-white p-3",
                "transition-all duration-200 hover:border-zinc-300 hover:shadow-sm",
                "dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700",
                file.status === "error" && "border-red-200 bg-red-50",
                isGrid && "flex-col"
            )}
        >
            <div className={cn("flex min-w-0 gap-3", isGrid && "flex-row")}>
                <FilePreview file={file.file} preview={file.preview} />

                <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <p className="truncate text-sm leading-tight font-medium text-zinc-800 dark:text-zinc-100">
                        {file.file.name}
                    </p>

                    <p
                        className={cn(
                            "mt-0.5 truncate text-xs",
                            file.status === "error"
                                ? "text-red-500 dark:text-red-400"
                                : "text-zinc-400 dark:text-zinc-500"
                        )}
                    >
                        {file.status === "error"
                            ? statusLabel
                            : [
                                  formatBytes(file.file.size),
                                  file.status !== "idle" && statusLabel,
                              ]
                                  .filter(Boolean)
                                  .join(" · ")}
                    </p>

                    {(file.status === "uploading" ||
                        file.status === "success") && (
                        <UploadProgress
                            progress={file.progress}
                            status={file.status}
                            className="mt-1.5"
                        />
                    )}
                </div>
            </div>

            {/* Remove button */}
            <button
                type="button"
                onClick={() => onRemove(file.id)}
                aria-label={`Remove ${file.file.name}`}
                className={cn(
                    "absolute top-2 right-2",
                    "flex h-6 w-6 items-center justify-center rounded-lg",
                    "bg-zinc-100 text-zinc-500",
                    "hover:bg-zinc-200 hover:text-zinc-700",
                    "dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200",
                    "focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:outline-none dark:focus-visible:ring-zinc-400",
                    file.status === "uploading" &&
                        "pointer-events-none opacity-30"
                )}
                disabled={file.status === "uploading"}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-3 w-3"
                >
                    <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                </svg>
            </button>

            {/* Success badge */}
            {file.status === "success" && (
                <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-white transition-opacity duration-150 group-hover:opacity-0 dark:bg-zinc-100 dark:text-zinc-900">
                    <svg
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-3 w-3"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
            )}
        </div>
    )
}

export const FileItem = memo(FileItemComponent)
