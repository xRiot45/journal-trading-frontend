import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Strategies } from "../types/strategies.types"

interface Props {
    strategy: Strategies
    onEdit?: (strategy: Strategies) => void
    onDelete?: (strategy: Strategies) => void
    onOpen?: (strategy: Strategies) => void
}

export function StrategyCard({ strategy, onEdit, onDelete, onOpen }: Props) {
    const lastEdited = strategy.lastEditedAt
        ? formatDistanceToNow(new Date(strategy.lastEditedAt), {
              addSuffix: true,
          })
        : "Never edited"

    return (
        <Card className="group flex flex-col justify-between rounded-xl border border-neutral-200 bg-white transition-all duration-200 hover:shadow-md dark:border-neutral-800 dark:bg-black">
            {/* ================= HEADER ================= */}
            <CardHeader className="space-y-3">
                {/* Title + Badge */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col">
                        <h3
                            onClick={() => onOpen?.(strategy)}
                            className="cursor-pointer text-base font-semibold text-black hover:underline dark:text-white"
                        >
                            {strategy.title}
                        </h3>

                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            {lastEdited}
                        </span>
                    </div>
                </div>
            </CardHeader>

            {/* ================= FOOTER ================= */}
            <div className="flex items-center justify-between border-neutral-200 px-4 py-3 dark:border-neutral-800">
                {/* Left Info */}
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    Zoom {strategy.viewport.zoom.toFixed(1)}x
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onEdit?.(strategy)}
                        className="h-8 w-8"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onDelete?.(strategy)}
                        className="h-8 w-8"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </Card>
    )
}
