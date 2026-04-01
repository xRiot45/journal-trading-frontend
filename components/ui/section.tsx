export default function Section({
    title,
    label,
    children,
}: {
    title: string
    label: string
    children: React.ReactNode
}) {
    return (
        <section className="space-y-4">
            <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                    {label}
                </span>
                <h2 className="text-sm font-semibold tracking-widest text-zinc-700 uppercase dark:text-zinc-300">
                    {title}
                </h2>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                {children}
            </div>
        </section>
    )
}
