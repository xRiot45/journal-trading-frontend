import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ActionBar } from "./ActionBar"
import { PlanBody } from "./PlanBody"
import { PlanFooter } from "./PlanFooter"
import { PlanHeader } from "./PlanHeader"
import { PlanThumbnail } from "./PlanThumbnail"
import { TradingPlan } from "../../types/trading-plan.types"

interface PlanContentProps {
    plan: TradingPlan
}

export function PlanContent({ plan }: PlanContentProps) {
    return (
        <article className="mx-auto max-w-170">
            {/* ── Back navigation ─────────────────────────────────── */}
            <nav className="mb-10">
                <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-1 gap-2 pl-0 text-neutral-500 hover:bg-transparent hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-sm font-medium">Back</span>
                </Button>
            </nav>

            <PlanHeader plan={plan} />
            <ActionBar plan={plan} />
            <PlanThumbnail plan={plan} />
            <PlanBody html={plan.description} />

            <Separator className="my-12 bg-neutral-200 dark:bg-neutral-800" />

            <PlanFooter plan={plan} />
        </article>
    )
}
