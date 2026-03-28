import { cn } from "@/lib/utils"

interface StatBadgeProps {
    value: string
    label: string
    accent?: string
}

export default function StatBadge({ value, label, accent }: StatBadgeProps) {
    return (
        <div className="flex flex-col rounded-xl border border-black/8 bg-black/5 px-4 py-3 backdrop-blur-sm dark:border-white/8 dark:bg-white/5">
            <span
                className={cn(
                    "text-xl leading-none font-semibold",
                    accent ?? "text-black dark:text-white"
                )}
            >
                {value}
            </span>
            <span className="mt-1.5 text-[11px] text-black/50 dark:text-white/50">
                {label}
            </span>
        </div>
    )
}
