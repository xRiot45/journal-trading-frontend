"use client"

import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"
import { formatPnL } from "../utils/utils"
import { CalendarDaySummary } from "../types/calendar.type"

interface CalendarSummaryProps {
    summary: CalendarDaySummary
}

const cards = [
    {
        key: "totalProfit" as const,
        label: "Total Profit",
        icon: TrendingUp,
        color: "emerald",
    },
    {
        key: "totalLoss" as const,
        label: "Total Loss",
        icon: TrendingDown,
        color: "red",
    },
    {
        key: "netPnL" as const,
        label: "Net PnL",
        icon: Activity,
        color: "auto",
    },
]

export function CalendarSummary({ summary }: CalendarSummaryProps) {
    return (
        <div className="mb-6 grid grid-cols-3 gap-3">
            {cards.map(({ key, label, icon: Icon, color }) => {
                const value = summary[key]
                const isNet = color === "auto"
                const resolvedColor = isNet
                    ? value >= 0
                        ? "emerald"
                        : "red"
                    : color

                return (
                    <div
                        key={key}
                        className={cn(
                            "relative overflow-hidden rounded-xl border p-3 transition-all duration-200 sm:p-4",
                            resolvedColor === "emerald"
                                ? "border-emerald-500/15 bg-emerald-500/6"
                                : "border-red-500/15 bg-red-500/6"
                        )}
                    >
                        {/* Background gradient */}
                        <div
                            className={cn(
                                "absolute top-0 right-0 h-16 w-16 translate-x-4 -translate-y-4 rounded-full opacity-20 blur-2xl",
                                resolvedColor === "emerald"
                                    ? "bg-emerald-400"
                                    : "bg-red-400"
                            )}
                        />

                        <div className="relative flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-medium tracking-widest text-black uppercase sm:text-xs dark:text-white">
                                    {label}
                                </span>
                                <Icon
                                    size={13}
                                    className={cn(
                                        resolvedColor === "emerald"
                                            ? "text-emerald-400/60"
                                            : "text-red-400/60"
                                    )}
                                />
                            </div>
                            <span
                                className={cn(
                                    "text-lg leading-none font-bold tabular-nums sm:text-xl",
                                    resolvedColor === "emerald"
                                        ? "text-emerald-400"
                                        : "text-red-400"
                                )}
                            >
                                {formatPnL(value)}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
