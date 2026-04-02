import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface TradingPlanEmptyStateProps {
    hasFilters?: boolean
    onResetFilters?: () => void
}

export function TradingPlanEmptyState({
    hasFilters = false,
    onResetFilters,
}: TradingPlanEmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                <Icon
                    icon={hasFilters ? "lucide:search-x" : "lucide:file-plus"}
                    className="size-7 text-muted-foreground/60"
                />
            </div>
            <p className="text-sm font-semibold text-foreground">
                {hasFilters
                    ? "No plans match your filters"
                    : "No trading plans yet"}
            </p>
            <p className="mt-1.5 max-w-xs text-xs text-muted-foreground/70">
                {hasFilters
                    ? "Try adjusting the month or year filter to see more results."
                    : "Create your first trading plan to organize your trading sessions."}
            </p>
            <div className="mt-5">
                {hasFilters ? (
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 text-xs"
                        onClick={onResetFilters}
                    >
                        <Icon icon="lucide:rotate-ccw" className="size-3" />
                        Reset Filters
                    </Button>
                ) : (
                    <Link href="/trading-plans/create">
                        <Button size="sm" className="gap-1.5 text-xs">
                            <Icon icon="lucide:plus" className="size-3.5" />
                            Create Trading Plan
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    )
}
