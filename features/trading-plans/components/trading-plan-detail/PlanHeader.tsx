import { format, parseISO } from "date-fns"
import { BookOpen, Calendar, Clock, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { MetaTag } from "./MetaTag"
import { TradingPlan } from "../../types/trading-plan.types"

interface PlanHeaderProps {
    plan: TradingPlan
}

export function PlanHeader({ plan }: PlanHeaderProps) {
    const planDate = parseISO(plan.date)
    const updatedAt = parseISO(plan.updatedAt)

    return (
        <>
            {/* ── Pair badge ──────────────────────────────────────── */}
            <div className="mb-4 flex items-center gap-2">
                <Badge
                    variant="outline"
                    className={cn(
                        "rounded-sm px-2.5 py-0.5 text-xs font-semibold tracking-widest uppercase",
                        "border-neutral-900 text-neutral-900",
                        "dark:border-neutral-100 dark:text-neutral-100",
                        "bg-transparent"
                    )}
                >
                    <TrendingUp className="mr-1.5 h-3 w-3" />
                    {plan.pair.name}
                </Badge>
                {plan.pair.description && (
                    <MetaTag>— {plan.pair.description}</MetaTag>
                )}
            </div>

            {/* ── Title ───────────────────────────────────────────── */}
            <h1
                className={cn(
                    "mb-6 text-[2rem] leading-[1.15] font-bold tracking-tight sm:text-[2.5rem] md:text-[2.75rem]",
                    "text-neutral-900 dark:text-neutral-50"
                )}
            >
                {plan.title}
            </h1>

            {/* ── Meta row ────────────────────────────────────────── */}
            <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                <MetaTag>
                    <Calendar className="h-3.5 w-3.5" />
                    {format(planDate, "MMMM d, yyyy")}
                </MetaTag>
                <MetaTag>
                    <Clock className="h-3.5 w-3.5" />
                    Updated {format(updatedAt, "MMM d, yyyy · h:mm a")}
                </MetaTag>
                <MetaTag>
                    <BookOpen className="h-3.5 w-3.5" />
                    Trading Plan
                </MetaTag>
            </div>
        </>
    )
}
