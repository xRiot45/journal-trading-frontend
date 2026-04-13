import StrategiesDetailView from "@/features/strategies/views/strategies-detail.view"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Strategy Detail",
    description: "View and edit your trading strategy details.",
}

export default function StrategyDetailPage() {
    return <StrategiesDetailView />
}
