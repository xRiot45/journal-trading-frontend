export function TradingPlanCardSkeleton() {
    return (
        <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
            {/* Thumbnail skeleton */}
            <div className="relative aspect-video overflow-hidden bg-muted">
                <div className="absolute inset-0 animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-muted-foreground/5 to-transparent" />
            </div>

            {/* Content skeleton */}
            <div className="flex flex-col gap-2.5 p-3">
                <div className="space-y-1.5">
                    <div className="h-3.5 w-full rounded-md bg-muted" />
                    <div className="h-3.5 w-2/3 rounded-md bg-muted" />
                </div>
                <div className="mt-1 h-3 w-1/3 rounded-md bg-muted" />
                <div className="mt-1 h-8 w-full rounded-xl bg-muted" />
            </div>
        </div>
    )
}
