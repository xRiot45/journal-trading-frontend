"use client"

import {
    ErrorView,
    PlanContent,
    SkeletonView,
} from "../components/trading-plan-detail"
import { useFindTradingPlanByIdQuery } from "../hooks/use-trading-plan-queries"

interface TradingPlanDetailViewProps {
    tradingPlanId: string
}

export default function TradingPlanDetailView({
    tradingPlanId,
}: TradingPlanDetailViewProps) {
    const { data, isLoading, isError, error } =
        useFindTradingPlanByIdQuery(tradingPlanId)

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white dark:bg-neutral-950">
                <SkeletonView />
            </div>
        )
    }

    if (isError || !data?.data) {
        return <ErrorView message={error?.message} />
    }

    return (
        <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-neutral-950">
            <main>
                <PlanContent plan={data.data} />
            </main>
        </div>
    )
}
