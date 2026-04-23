import StrategiesView from "@/features/strategies/views/strategies.view"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Strategies",
    description: "Create, refine, and manage your personal trading strategies.",
}

export default function StrategiesPage() {
    return <StrategiesView />
}
