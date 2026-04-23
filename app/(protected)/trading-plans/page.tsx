import TradingPlanView from "@/features/trading-plans/views/trading-plan.view"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Trading Plans",
    description:
        "Document, organize, and track your daily trading plans and setups.",
}

export default function TradingPlansPage() {
    return <TradingPlanView />
}
