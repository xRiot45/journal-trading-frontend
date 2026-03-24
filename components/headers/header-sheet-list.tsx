import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export type HeaderSheetItem = {
    id: string
    title: string
    description: string
    time: string
    unread?: boolean
}

type HeaderSheetListProps = {
    title: string
    description?: string
    items: HeaderSheetItem[]
    emptyText?: string
    className?: string
}

export function HeaderSheetList({
    title,
    description,
    items,
    emptyText = "Tidak ada data.",
    className,
}: HeaderSheetListProps) {
    return (
        <div className={cn("flex h-full flex-col", className)}>
            <div className="border-b px-5 py-4">
                <h2 className="text-base font-semibold">{title}</h2>
                {description ? (
                    <p className="mt-1 text-sm text-muted-foreground">
                        {description}
                    </p>
                ) : null}
            </div>

            <ScrollArea className="flex-1">
                <div className="p-4">
                    {items.length === 0 ? (
                        <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                            {emptyText}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className={cn(
                                        "rounded-xl border p-4 transition-colors",
                                        item.unread
                                            ? "bg-muted/50"
                                            : "bg-background"
                                    )}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="truncate text-sm font-medium">
                                                    {item.title}
                                                </h3>
                                                {item.unread ? (
                                                    <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                                                ) : null}
                                            </div>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {item.description}
                                            </p>
                                        </div>

                                        <span className="shrink-0 text-xs text-muted-foreground">
                                            {item.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    )
}
