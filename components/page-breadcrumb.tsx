"use client"

import Link from "next/link"
import { useMemo } from "react"
import { usePathname } from "next/navigation"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type BreadcrumbSegment = {
    label: string
    href: string
}

type PageBreadcrumbProps = {
    title: string
    description?: string
    items?: BreadcrumbSegment[]
    homeLabel?: string
    className?: string
}

function formatSegmentLabel(segment: string): string {
    return segment
        .split("-")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
}

export function PageBreadcrumb({
    title,
    description,
    items,
    homeLabel = "Home",
    className,
}: PageBreadcrumbProps) {
    const pathname = usePathname()

    const breadcrumbItems = useMemo<BreadcrumbSegment[]>(() => {
        if (items && items.length > 0) {
            return items
        }

        const segments = pathname
            .split("/")
            .filter(Boolean)
            .map((segment, index, array) => ({
                label: formatSegmentLabel(segment),
                href: `/${array.slice(0, index + 1).join("/")}`,
            }))

        return [
            {
                label: homeLabel,
                href: "/",
            },
            ...segments,
        ]
    }, [homeLabel, items, pathname])

    const lastIndex = breadcrumbItems.length - 1

    return (
        <section className={className}>
            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
                    {title}
                </h1>

                {description ? (
                    <p className="text-sm text-black/60 dark:text-white/60">
                        {description}
                    </p>
                ) : null}
            </div>

            <div className="mt-3">
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbItems.map((item, index) => {
                            const isLast = index === lastIndex

                            return (
                                <div
                                    key={item.href}
                                    className="flex items-center gap-2"
                                >
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage className="text-black/80 dark:text-white/80">
                                                {item.label}
                                            </BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink asChild>
                                                <Link
                                                    href={item.href}
                                                    className="text-black/50 transition-colors hover:text-black dark:text-white/50 dark:hover:text-white"
                                                >
                                                    {item.label}
                                                </Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>

                                    {!isLast ? (
                                        <BreadcrumbSeparator className="text-black/35 dark:text-white/35" />
                                    ) : null}
                                </div>
                            )
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </section>
    )
}
