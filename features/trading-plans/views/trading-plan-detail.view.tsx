"use client"

import { useFindTradingPlanByIdQuery } from "../hooks/use-trading-plan-queries"
import { TradingPlan } from "../types/trading-plan.types"
import { format, parseISO } from "date-fns"
import {
    ArrowLeft,
    BookOpen,
    Calendar,
    Clock,
    Share2,
    Bookmark,
    MoreHorizontal,
    TrendingUp,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface TradingPlanDetailViewProps {
    tradingPlanId: string
}

function MetaTag({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
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

function ActionBar({ plan }: { plan: TradingPlan }) {
    return (
        <div className="flex items-center justify-between border-y border-neutral-200 py-4 dark:border-neutral-800">
            <div className="flex items-center gap-5">
                <TooltipProvider delayDuration={300}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2 px-0 text-neutral-500 hover:bg-transparent hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                            >
                                <Bookmark className="h-5 w-5" />
                                <span className="text-sm">Save</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            Save to library
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2 px-0 text-neutral-500 hover:bg-transparent hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                            >
                                <Share2 className="h-5 w-5" />
                                <span className="text-sm">Share</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            Share plan
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <Button
                variant="ghost"
                size="icon"
                className="text-neutral-400 hover:bg-transparent hover:text-neutral-900 dark:hover:text-neutral-100"
            >
                <MoreHorizontal className="h-5 w-5" />
            </Button>
        </div>
    )
}

function SkeletonView() {
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

function PlanContent({ plan }: { plan: TradingPlan }) {
    const planDate = parseISO(plan.date)
    const updatedAt = parseISO(plan.updatedAt)

    return (
        <article className="mx-auto max-w-170">
            {/* ── Back navigation ─────────────────────────────────── */}
            <nav className="mb-10">
                <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-1 gap-2 pl-0 text-neutral-500 hover:bg-transparent hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-sm font-medium">Back</span>
                </Button>
            </nav>

            {/* ── Pair badge ──────────────────────────────────────── */}
            <div className="mb-4 flex items-center gap-2">
                <Badge
                    variant="outline"
                    className={cn(
                        "rounded-sm px-2.5 py-0.5 text-xs font-semibold tracking-widest uppercase",
                        "border-neutral-900 text-neutral-900",
                        "dark:border-neutral-100 dark:text-neutral-100",
                        "bg-transparent"
                    )}
                >
                    <TrendingUp className="mr-1.5 h-3 w-3" />
                    {plan.pair.name}
                </Badge>
                {plan.pair.description && (
                    <MetaTag>— {plan.pair.description}</MetaTag>
                )}
            </div>

            {/* ── Title ───────────────────────────────────────────── */}
            <h1
                className={cn(
                    "mb-6 text-[2rem] leading-[1.15] font-bold tracking-tight sm:text-[2.5rem] md:text-[2.75rem]",
                    "text-neutral-900 dark:text-neutral-50"
                )}
            >
                {plan.title}
            </h1>

            {/* ── Meta row ────────────────────────────────────────── */}
            <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                <MetaTag>
                    <Calendar className="h-3.5 w-3.5" />
                    {format(planDate, "MMMM d, yyyy")}
                </MetaTag>
                <MetaTag>
                    <Clock className="h-3.5 w-3.5" />
                    Updated {format(updatedAt, "MMM d, yyyy · h:mm a")}
                </MetaTag>
                <MetaTag>
                    <BookOpen className="h-3.5 w-3.5" />
                    Trading Plan
                </MetaTag>
            </div>

            {/* ── Action bar ──────────────────────────────────────── */}
            <ActionBar plan={plan} />

            {/* ── Thumbnail ───────────────────────────────────────── */}
            {plan.thumbnailUrl && (
                <figure className="-mx-5 my-10 md:mx-0">
                    <div className="overflow-hidden bg-neutral-100 dark:bg-neutral-900">
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
            )}

            {/* ── Description (rich text) ─────────────────────────── */}
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
                dangerouslySetInnerHTML={{ __html: plan.description }}
            />

            {/* ── Footer separator ────────────────────────────────── */}
            <Separator className="my-12 bg-neutral-200 dark:bg-neutral-800" />

            {/* ── Plan info card ──────────────────────────────────── */}
            <footer className="rounded-none border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
                <p className="mb-4 text-[10px] font-semibold tracking-[0.15em] text-neutral-400 uppercase dark:text-neutral-500">
                    Plan Details
                </p>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                    <div>
                        <p className="mb-1 text-[11px] tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
                            Pair
                        </p>
                        <p className="text-sm font-semibold tracking-wide text-neutral-900 dark:text-neutral-100">
                            {plan.pair.name}
                        </p>
                        <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                            {plan.pair.description}
                        </p>
                    </div>
                    <div>
                        <p className="mb-1 text-[11px] tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
                            Plan Date
                        </p>
                        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            {format(planDate, "dd MMM yyyy")}
                        </p>
                    </div>
                    <div>
                        <p className="mb-1 text-[11px] tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
                            Last Updated
                        </p>
                        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            {format(updatedAt, "dd MMM yyyy")}
                        </p>
                        <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                            {format(updatedAt, "h:mm a")}
                        </p>
                    </div>
                </div>
            </footer>
        </article>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface TradingPlanDetailViewProps {
    tradingPlanId: string
}

export default function TradingPlanDetailView({
    tradingPlanId,
}: TradingPlanDetailViewProps) {
    const { data, isLoading, isError, error } =
        useFindTradingPlanByIdQuery(tradingPlanId)

    // ── Loading ────────────────────────────────────────────────────────────
    if (isLoading) {
        return (
            <div className="min-h-screen bg-white dark:bg-neutral-950">
                <SkeletonView />
            </div>
        )
    }

    // ── Error ──────────────────────────────────────────────────────────────
    if (isError || !data?.data) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white px-5 dark:bg-neutral-950">
                <div className="w-full max-w-170 space-y-4 text-center">
                    <p className="text-5xl">📉</p>
                    <h2 className="font-['Georgia',serif] text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        Plan not found
                    </h2>
                    <p className="text-neutral-500 dark:text-neutral-400">
                        {error?.message ??
                            "This trading plan could not be loaded."}
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                        className="mt-2 rounded-none border-neutral-900 text-neutral-900 dark:border-neutral-100 dark:text-neutral-100"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go back
                    </Button>
                </div>
            </div>
        )
    }

    // ── Success ────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-neutral-950">
            {/* ── Main content ────────────────────────────────────── */}
            <main>
                <PlanContent plan={data.data} />
            </main>
        </div>
    )
}
