import { cn } from "@/lib/utils"

interface MetaTagProps {
    children: React.ReactNode
    className?: string
}

export function MetaTag({ children, className }: MetaTagProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase",
                "text-neutral-500 dark:text-neutral-400",
                className
            )}
        >
            {children}
        </span>
    )
}
