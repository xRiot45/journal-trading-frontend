import StrategiesView from "@/features/strategies/views/strategies.view"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Strategies",
    description: "Manage your strategies for your trading experience.",
}

export default function StrategiesPage() {
    return <StrategiesView />
}
