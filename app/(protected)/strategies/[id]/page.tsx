import StrategiesDetailView from "@/features/strategies/views/strategies-detail.view"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Strategy Detail",
    description: "View and edit your trading strategy details.",
}

export default async function StrategyDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    return <StrategiesDetailView strategyId={id} />
}
