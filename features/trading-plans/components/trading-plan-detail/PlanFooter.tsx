import { format, parseISO } from "date-fns"
import { TradingPlan } from "../../types/trading-plan.types"

interface PlanFooterProps {
    plan: TradingPlan
}

export function PlanFooter({ plan }: PlanFooterProps) {
    const planDate = parseISO(plan.date)
    const updatedAt = parseISO(plan.updatedAt)

    return (
        <footer className="rounded-none border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
            <p className="mb-4 text-[10px] font-semibold tracking-[0.15em] text-neutral-400 uppercase dark:text-neutral-500">
                Plan Details
            </p>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                <div>
                    <p className="mb-1 text-[11px] tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
                        Pair
                    </p>
                    <p className="text-sm font-semibold tracking-wide text-neutral-900 dark:text-neutral-100">
                        {plan.pair.name}
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                        {plan.pair.description}
                    </p>
                </div>
                <div>
                    <p className="mb-1 text-[11px] tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
                        Plan Date
                    </p>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {format(planDate, "dd MMM yyyy")}
                    </p>
                </div>
                <div>
                    <p className="mb-1 text-[11px] tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
                        Last Updated
                    </p>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {format(updatedAt, "dd MMM yyyy")}
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                        {format(updatedAt, "h:mm a")}
                    </p>
                </div>
            </div>
        </footer>
    )
}
