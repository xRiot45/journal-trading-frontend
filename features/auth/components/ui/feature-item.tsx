import type { ElementType } from "react"

interface FeatureItemProps {
    icon: ElementType
    title: string
    description: string
}

export default function FeatureItem({
    icon: Icon,
    title,
    description,
}: FeatureItemProps) {
    return (
        <div className="flex items-start gap-3.5">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-black/20 bg-black/10 dark:border-white/20 dark:bg-white/10">
                <Icon className="size-3.5 text-black dark:text-white" />
            </div>
            <div>
                <p className="text-sm font-medium text-black/90 dark:text-white/90">
                    {title}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-black/50 dark:text-white/50">
                    {description}
                </p>
            </div>
        </div>
    )
}
