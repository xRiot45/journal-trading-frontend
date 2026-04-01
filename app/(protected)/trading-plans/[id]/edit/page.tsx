import TradingPlanFormView from "@/features/trading-plans/views/trading-plan-form.view"

export default async function EditTradingPlanPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    return <TradingPlanFormView tradingPlanId={id} />
}
