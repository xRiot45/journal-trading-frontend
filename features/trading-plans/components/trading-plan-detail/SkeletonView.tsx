import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonView() {
    return (
        <article className="mx-auto max-w-170 animate-pulse space-y-8 px-5 py-10 md:px-0 md:py-16">
            {/* Back */}
            <Skeleton className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800" />

            {/* Badge */}
            <Skeleton className="h-5 w-16 rounded-full bg-neutral-200 dark:bg-neutral-800" />

            {/* Title */}
            <div className="space-y-3">
                <Skeleton className="h-10 w-full bg-neutral-200 dark:bg-neutral-800" />
                <Skeleton className="h-10 w-4/5 bg-neutral-200 dark:bg-neutral-800" />
            </div>

            {/* Meta */}
            <div className="flex gap-6">
                <Skeleton className="h-4 w-28 bg-neutral-200 dark:bg-neutral-800" />
                <Skeleton className="h-4 w-28 bg-neutral-200 dark:bg-neutral-800" />
            </div>

            {/* Action bar */}
            <Skeleton className="h-12 w-full bg-neutral-200 dark:bg-neutral-800" />

            {/* Thumbnail */}
            <Skeleton className="h-72 w-full rounded-sm bg-neutral-200 md:h-100 dark:bg-neutral-800" />

            {/* Body */}
            <div className="space-y-4">
                <Skeleton className="h-4 w-full bg-neutral-200 dark:bg-neutral-800" />
                <Skeleton className="h-4 w-full bg-neutral-200 dark:bg-neutral-800" />
                <Skeleton className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-800" />
            </div>
        </article>
    )
}
