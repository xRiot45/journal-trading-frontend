import { cn } from "@/lib/utils"

interface PlanBodyProps {
    html: string
}

export function PlanBody({ html }: PlanBodyProps) {
    return (
        <section
            className={cn(
                "prose max-w-none prose-neutral dark:prose-invert",
                "prose-p:text-[1.125rem] prose-p:leading-[1.8] prose-p:text-neutral-700 dark:prose-p:text-neutral-300",
                "prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-neutral-900 dark:prose-headings:text-neutral-50",
                "prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100",
                "prose-a:text-neutral-900 prose-a:underline prose-a:underline-offset-2 dark:prose-a:text-neutral-100",
                "prose-ul:text-neutral-700 dark:prose-ul:text-neutral-300",
                "prose-ol:text-neutral-700 dark:prose-ol:text-neutral-300",
                "prose-blockquote:border-l-4 prose-blockquote:border-neutral-900 dark:prose-blockquote:border-neutral-100",
                "prose-blockquote:pl-5 prose-blockquote:text-neutral-600 prose-blockquote:italic dark:prose-blockquote:text-neutral-400"
            )}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}
