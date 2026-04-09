"use client"

export function CalendarSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Summary skeleton */}
            <div className="mb-6 grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="h-20 rounded-xl border border-white/6 bg-white/3 p-3 sm:p-4"
                    />
                ))}
            </div>

            {/* Weekday headers */}
            <div className="mb-1.5 grid grid-cols-7 gap-1.5">
                {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="h-6 rounded bg-white/4" />
                ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1.5">
                {Array.from({ length: 35 }).map((_, i) => (
                    <div
                        key={i}
                        className="aspect-square rounded-xl border border-white/6 bg-white/3"
                    />
                ))}
            </div>
        </div>
    )
}
