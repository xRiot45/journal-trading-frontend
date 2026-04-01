"use client"

import { cn } from "@/lib/utils"

interface UploadProgressProps {
    progress?: number
    status: "idle" | "uploading" | "success" | "error"
    className?: string
}

export function UploadProgress({
    progress = 0,
    status,
    className,
}: UploadProgressProps) {
    if (status === "idle") return null

    return (
        <div className={cn("space-y-1", className)}>
            <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div
                    className={cn(
                        "h-full rounded-full transition-all duration-500 ease-out",
                        status === "success" && "bg-zinc-900 dark:bg-zinc-100",
                        status === "error" && "bg-red-500 dark:bg-red-400",
                        status === "uploading" && "bg-zinc-700 dark:bg-zinc-300"
                    )}
                    style={{ width: `${progress}%` }}
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
            </div>
        </div>
    )
}
