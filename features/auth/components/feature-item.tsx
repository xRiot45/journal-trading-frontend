export default function FeatureItem({
    icon: Icon,
    title,
    description,
}: {
    icon: React.ElementType
    title: string
    description: string
}) {
    return (
        <div className="flex items-start gap-3.5">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-500/10">
                <Icon className="size-3.5 text-blue-400" />
            </div>
            <div>
                <p className="text-sm font-medium text-white/90">{title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-blue-200/50">
                    {description}
                </p>
            </div>
        </div>
    )
}
