import TradingPlanFormView from "@/features/trading-plans/views/trading-plan-form.view"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Edit Trading Plan",
    description: "Edit an existing trading plan.",
}

export default async function EditTradingPlanPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    return <TradingPlanFormView tradingPlanId={id} />
}
