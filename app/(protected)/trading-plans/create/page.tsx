import TradingPlanFormView from "@/features/trading-plans/views/trading-plan-form.view"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Create Trading Plan",
    description: "Create a new trading plan.",
}

export default function CreateTradingPlanPage() {
    return (
        <main className="min-h-screen bg-(--color-background)">
            <TradingPlanFormView />
        </main>
    )
}
