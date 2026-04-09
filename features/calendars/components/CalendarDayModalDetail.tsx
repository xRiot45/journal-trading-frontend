"use client"

interface CalendarDay {
    date: string
    status: "profit" | "loss" | "neutral"
    totalPnL: number
    tradeCount: number
}

interface CalendarDayModalDetailProps {
    selectedDay: CalendarDay | null
    onClose: () => void
}

export function CalendarDayModalDetail({
    selectedDay,
    onClose,
}: CalendarDayModalDetailProps) {
    if (!selectedDay) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm dark:bg-black/70" />

            {/* Modal */}
            <div
                className="relative z-10 w-full max-w-md rounded-xl border border-black/10 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-black"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-base font-semibold text-black dark:text-white">
                        {new Date(selectedDay.date).toLocaleDateString(
                            "en-US",
                            {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                            }
                        )}
                    </h3>

                    <button
                        onClick={onClose}
                        className="cursor-pointer text-xs text-black/40 hover:text-black/70 dark:text-white/30 dark:hover:text-white/60"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-2">
                    {/* PnL */}
                    <div className="flex justify-between text-sm">
                        <span className="text-black/50 dark:text-white/40">
                            PnL
                        </span>
                        <span
                            className={
                                selectedDay.status === "profit"
                                    ? "font-semibold text-emerald-500"
                                    : selectedDay.status === "loss"
                                      ? "font-semibold text-red-500"
                                      : "text-black/40 dark:text-white/40"
                            }
                        >
                            {selectedDay.totalPnL === 0
                                ? "—"
                                : `${selectedDay.totalPnL > 0 ? "+" : ""}$${Math.abs(selectedDay.totalPnL)}`}
                        </span>
                    </div>

                    {/* Trades */}
                    <div className="flex justify-between text-sm">
                        <span className="text-black/50 dark:text-white/40">
                            Trades
                        </span>
                        <span className="text-black/70 dark:text-white/70">
                            {selectedDay.tradeCount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
