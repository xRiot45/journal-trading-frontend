"use client"

import { useMemo } from "react"
import { Container } from "@/components/ui/container"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import { useFindAllTradingPlansQuery } from "../hooks/use-trading-plan-queries"
import { useDeleteTradingPlanMutation } from "../hooks/use-trading-plan-mutations"
import { TradingPlan } from "../types/trading-plan.types"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useTradingPlanStore } from "../store/trading-plan.store"
import { TradingPlanFilters } from "../components/trading-plan-filters"
import { TradingPlanCardSkeleton } from "../components/trading-plan-card-skeleton"
import { TradingPlanEmptyState } from "../components/trading-plan-empty-state"
import { TradingPlanCard } from "../components/trading-plan-card"
import { TradingPlanDeleteDialog } from "../components/trading-plan-delete-dialog"

function TradingPlanErrorState() {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 py-16 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <Icon
                    icon="lucide:alert-circle"
                    className="size-6 text-destructive"
                />
            </div>
            <p className="text-sm font-semibold text-destructive">
                Failed to load trading plans
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
                Please try refreshing the page
            </p>
        </div>
    )
}

export default function TradingPlanView() {
    const router = useRouter()

    const { data, isLoading, error } = useFindAllTradingPlansQuery()
    const { mutate: deleteMutation } = useDeleteTradingPlanMutation()

    const {
        filter,
        deleteConfirmation,
        setFilter,
        resetFilter,
        openDeleteConfirmation,
        closeDeleteConfirmation,
    } = useTradingPlanStore()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const allPlans: TradingPlan[] = data?.data ?? []

    // Filter plans by selected month/year (client-side)
    const filteredPlans = useMemo(() => {
        return allPlans.filter((plan) => {
            const date = new Date(plan.date)
            const matchesMonth =
                !filter.month || String(date.getMonth() + 1) === filter.month
            const matchesYear =
                !filter.year || String(date.getFullYear()) === filter.year
            return matchesMonth && matchesYear
        })
    }, [allPlans, filter.month, filter.year])

    const hasActiveFilter = !!filter.month || !!filter.year

    const handleShowDetail = (id: string) => {
        router.push(`/trading-plans/${id}`)
    }

    const handleUpdate = (id: string) => {
        router.push(`/trading-plans/${id}/edit`)
    }

    const handleDeleteRequest = (id: string) => {
        const plan = allPlans.find((p) => p.id === id)
        openDeleteConfirmation(id, plan?.title)
    }

    const handleDeleteConfirm = () => {
        if (deleteConfirmation.targetId) {
            deleteMutation(deleteConfirmation.targetId)
        }
        closeDeleteConfirmation()
    }

    return (
        <Container size="2xl">
            <div className="space-y-6">
                {/* Top Section */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <PageBreadcrumb
                        title="Trading Plans"
                        description="Document, organize, and track your daily trading plans and setups."
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Trading Plans", href: "/trading-plans" },
                        ]}
                    />

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                        <TradingPlanFilters
                            month={filter.month}
                            year={filter.year}
                            onMonthChange={(value) =>
                                setFilter({ month: value })
                            }
                            onYearChange={(value) => setFilter({ year: value })}
                            onReset={resetFilter}
                        />

                        <Link href="/trading-plans/create">
                            <Button className="gap-1.5 py-5">
                                <Icon icon="lucide:plus" className="size-4" />
                                Add New Plan
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Result count when filtered */}
                {hasActiveFilter && !isLoading && !error && (
                    <p className="text-sm text-muted-foreground">
                        Showing{" "}
                        <span className="font-medium text-foreground">
                            {filteredPlans.length}
                        </span>{" "}
                        {filteredPlans.length === 1 ? "plan" : "plans"}
                        {filter.month || filter.year
                            ? " for the selected period"
                            : ""}
                    </p>
                )}

                {/* Cards Grid */}
                {error ? (
                    <TradingPlanErrorState />
                ) : isLoading ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <TradingPlanCardSkeleton key={i} />
                        ))}
                    </div>
                ) : filteredPlans.length === 0 ? (
                    <TradingPlanEmptyState
                        hasFilters={hasActiveFilter}
                        onResetFilters={resetFilter}
                    />
                ) : (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
                        {filteredPlans.map((plan) => (
                            <TradingPlanCard
                                key={plan.id}
                                plan={plan}
                                onShowDetail={handleShowDetail}
                                onUpdate={handleUpdate}
                                onDelete={handleDeleteRequest}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <TradingPlanDeleteDialog
                open={deleteConfirmation.isOpen}
                onOpenChange={(open) => {
                    if (!open) closeDeleteConfirmation()
                }}
                onConfirm={handleDeleteConfirm}
                planTitle={deleteConfirmation.targetTitle ?? undefined}
            />
        </Container>
    )
}
