import { format, parseISO } from "date-fns"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { TradingPlan } from "../../types/trading-plan.types"

interface PlanThumbnailProps {
    plan: TradingPlan
}

export function PlanThumbnail({ plan }: PlanThumbnailProps) {
    if (!plan.thumbnailUrl) return null

    const planDate = parseISO(plan.date)

    return (
        <figure className="my-10">
            <div className="w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
                <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${plan.thumbnailUrl}`}
                    alt={`Thumbnail for ${plan.title}`}
                    className={cn(
                        "h-auto max-h-125 w-full object-cover",
                        "rounded-lg transition-transform duration-700 hover:scale-[1.01]"
                    )}
                    onError={(e) => {
                        const target = e.currentTarget
                        target.style.display = "none"
                    }}
                    width={0}
                    height={0}
                    unoptimized
                />
            </div>
            <figcaption className="mt-2.5 text-center text-xs tracking-wide text-neutral-400 dark:text-neutral-500">
                {plan.pair.name} · {format(planDate, "MMMM d, yyyy")}
            </figcaption>
        </figure>
    )
}
