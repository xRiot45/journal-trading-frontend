"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icon } from "@iconify/react"
import { format } from "date-fns"
import Image from "next/image"
import { TradingPlan } from "../types/trading-plan.types"

interface TradingPlanCardProps {
    plan: TradingPlan
    onShowDetail: (id: string) => void
    onUpdate: (id: string) => void
    onDelete: (id: string) => void
}

export function TradingPlanCard({
    plan,
    onShowDetail,
    onUpdate,
    onDelete,
}: TradingPlanCardProps) {
    const formattedDate = format(new Date(plan.date), "dd MMM yyyy")

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
                {/* Gradient overlays */}
                <div className="absolute inset-0 z-10 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-0 z-10 bg-linear-to-br from-transparent via-transparent to-black/20" />

                <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${plan.thumbnailUrl}`}
                    alt={plan.title}
                    className="h-full w-full object-cover brightness-90 transition-transform duration-700 group-hover:scale-110 dark:brightness-70"
                    unoptimized
                    width={0}
                    height={0}
                />

                {/* Top-right action buttons - revealed on hover */}
                <div className="absolute top-2 right-2 z-20 flex translate-y-1 items-center gap-1.5 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-md hover:bg-white/25"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onUpdate(plan.id)
                                    }}
                                >
                                    <Icon
                                        icon="lucide:pencil"
                                        className="size-3"
                                    />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="mt-2" side="bottom">
                                <p>Edit plan</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 rounded-full border border-red-400/30 bg-red-500/20 text-red-300 backdrop-blur-md hover:bg-red-500/35"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onDelete(plan.id)
                                    }}
                                >
                                    <Icon
                                        icon="lucide:trash-2"
                                        className="size-3"
                                    />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent
                                side="bottom"
                                className="mt-2 border-destructive bg-destructive text-white"
                            >
                                <p>Delete plan</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                {/* Bottom overlay content */}
                <div className="absolute right-0 bottom-0 left-0 z-20 flex items-end justify-between p-2.5">
                    <Badge
                        variant="secondary"
                        className="border-0 bg-black/50 px-2.5 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-sm"
                    >
                        {plan.pair.name}
                    </Badge>
                    <span className="text-[10px] font-medium text-white/70">
                        {formattedDate}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-2.5 p-3">
                {/* Title */}
                <h3 className="line-clamp-2 text-sm leading-snug font-semibold tracking-tight text-card-foreground">
                    {plan.title}
                </h3>

                {/* Metadata row */}
                <div className="mt-auto flex items-center gap-2">
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Icon
                            icon="lucide:calendar-days"
                            className="size-3 shrink-0"
                        />
                        <span>{formattedDate}</span>
                    </div>
                </div>

                {/* CTA */}
                <Button
                    size="sm"
                    className="mx-auto mt-1 h-10 w-full gap-1.5 rounded-lg text-xs font-medium"
                    onClick={() => onShowDetail(plan.id)}
                >
                    <Icon icon="lucide:eye" className="size-3.5" />
                    View Detail
                </Button>
            </div>
        </div>
    )
}
