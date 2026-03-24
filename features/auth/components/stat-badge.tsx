import { cn } from "@/lib/utils"

export default function StatBadge({
    value,
    label,
    accent,
}: {
    value: string
    label: string
    accent?: string
}) {
    return (
        <div className="flex flex-col rounded-xl border border-white/8 bg-white/5 px-4 py-3 backdrop-blur-sm">
            <span
                className={cn(
                    "text-xl leading-none font-semibold",
                    accent ?? "text-white"
                )}
            >
                {value}
            </span>
            <span className="mt-1.5 text-[11px] text-blue-200/50">{label}</span>
        </div>
    )
}
