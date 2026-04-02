import TradingPlanView from "@/features/trading-plans/views/trading-plan.view"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Trading Plans",
    description: "Manage your trading plans and strategies.",
}

export default function TradingPlansPage() {
    return <TradingPlanView />
}
