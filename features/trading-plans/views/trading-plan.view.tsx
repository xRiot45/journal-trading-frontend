"use client"

import { Container } from "@/components/ui/container"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Icon } from "@iconify/react"
import { Badge } from "@/components/ui/badge"
import { useFindAllTradingPlansQuery } from "../hooks/use-trading-plan-queries"
import { format } from "date-fns"
import Image from "next/image"
import { TradingPlan } from "../types/trading-plan.types"
import { useRouter } from "next/navigation"
import Link from "next/link"

const months = [
    { label: "January", value: "1" },
    { label: "February", value: "2" },
    { label: "March", value: "3" },
    { label: "April", value: "4" },
    { label: "May", value: "5" },
    { label: "June", value: "6" },
    { label: "July", value: "7" },
    { label: "August", value: "8" },
    { label: "September", value: "9" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 10 }, (_, i) => currentYear - i)

interface TradingPlanCardProps {
    plan: TradingPlan
    onShowDetail: (id: string) => void
    onUpdate: (id: string) => void
    onDelete: (id: string) => void
}

function TradingPlanCard({
    plan,
    onShowDetail,
    onUpdate,
    onDelete,
}: TradingPlanCardProps) {
    const formattedDate = format(new Date(plan.date), "dd MMM yyyy")

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 z-10 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${plan.thumbnailUrl}`}
                    alt={plan.title}
                    className="h-full w-full object-cover brightness-90 transition-transform duration-500 group-hover:scale-105 dark:brightness-75"
                    unoptimized
                    width={0}
                    height={0}
                />
                {/* Pair badge overlay */}
                <div className="absolute bottom-2 left-2 z-20">
                    <Badge
                        variant="secondary"
                        className="border-0 bg-black/60 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-white backdrop-blur-sm"
                    >
                        {plan.pair.name}
                    </Badge>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-3 p-3">
                {/* Title */}
                <h3 className="line-clamp-2 text-sm leading-snug font-semibold text-card-foreground">
                    {plan.title}
                </h3>

                {/* Date */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon
                        icon="lucide:calendar"
                        className="size-3.5 shrink-0"
                    />
                    <span>{formattedDate}</span>
                </div>

                {/* Actions */}
                <div className="mt-auto flex items-center gap-1.5 pt-1">
                    <Button
                        size="md"
                        className="h-10 flex-1 gap-1 text-xs"
                        onClick={() => onShowDetail(plan.id)}
                    >
                        <Icon icon="lucide:eye" className="size-3" />
                        View Detail
                    </Button>
                    <Button
                        size="md"
                        variant="outline"
                        className="h-10 w-10 p-0"
                        onClick={() => onUpdate(plan.id)}
                        title="Update"
                    >
                        <Icon icon="lucide:pencil" className="size-3" />
                    </Button>
                    <Button
                        size="md"
                        variant="destructive"
                        className="h-10 w-10 p-0 text-white"
                        onClick={() => onDelete(plan.id)}
                        title="Delete"
                    >
                        <Icon icon="lucide:trash-2" className="size-3" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

function TradingPlanCardSkeleton() {
    return (
        <div className="flex animate-pulse flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="aspect-video bg-muted" />
            <div className="flex flex-col gap-3 p-3">
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="h-3 w-1/2 rounded bg-muted" />
                <div className="flex gap-1.5 pt-1">
                    <div className="h-7 flex-1 rounded bg-muted" />
                    <div className="h-7 w-7 rounded bg-muted" />
                    <div className="h-7 w-7 rounded bg-muted" />
                </div>
            </div>
        </div>
    )
}

export default function TradingPlanView() {
    const router = useRouter()
    const { data, isLoading, error } = useFindAllTradingPlansQuery()
    const plans: TradingPlan[] = data?.data ?? []

    const handleShowDetail = (id: string) => {
        router.push(`/trading-plans/${id}`)
    }

    const handleUpdate = (id: string) => {
        console.log("Update:", id)
        router.push(`/trading-plans/${id}/edit`)
    }

    const handleDelete = (id: string) => {
        console.log("Delete:", id)
        // Open confirmation dialog then call delete mutation
    }

    return (
        <Container size="full">
            <div className="space-y-6">
                {/* Top Section */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <PageBreadcrumb
                        title="Trading Plans"
                        description="Manage your trading plans to organize your trading sessions effectively."
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Trading Plans", href: "/trading-plans" },
                        ]}
                    />

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                        <div className="flex items-center gap-3">
                            <Select>
                                <SelectTrigger className="w-35 py-5">
                                    <SelectValue placeholder="Month" />
                                </SelectTrigger>
                                <SelectContent>
                                    {months.map((month) => (
                                        <SelectItem
                                            key={month.value}
                                            value={month.value}
                                        >
                                            {month.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select>
                                <SelectTrigger className="w-35 py-5">
                                    <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent>
                                    {years.map((year) => (
                                        <SelectItem
                                            key={year}
                                            value={year.toString()}
                                        >
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Link href="/trading-plans/create">
                            <Button className="py-5">
                                <Icon icon="lucide:plus" className="size-4" />
                                Add New Trading Plan
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Cards Grid */}
                {error ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-destructive/30 bg-destructive/5 py-16 text-center">
                        <Icon
                            icon="lucide:alert-circle"
                            className="mb-3 size-10 text-destructive"
                        />
                        <p className="text-sm font-medium text-destructive">
                            Failed to load trading plans
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Please try again later
                        </p>
                    </div>
                ) : isLoading ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <TradingPlanCardSkeleton key={i} />
                        ))}
                    </div>
                ) : plans.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
                        <Icon
                            icon="lucide:file-plus"
                            className="mb-3 size-12 text-muted-foreground/50"
                        />
                        <p className="text-sm font-medium text-muted-foreground">
                            No trading plans yet
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground/70">
                            Create your first trading plan to get started
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                        {plans.map((plan) => (
                            <TradingPlanCard
                                key={plan.id}
                                plan={plan}
                                onShowDetail={handleShowDetail}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Container>
    )
}
