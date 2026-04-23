import TradingPlanDetailView from "@/features/trading-plans/views/trading-plan-detail.view"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Detail Trading Plan",
    description: "View an existing trading plan.",
}

export default async function DetailTradingPlanPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    return <TradingPlanDetailView tradingPlanId={id} />
}
