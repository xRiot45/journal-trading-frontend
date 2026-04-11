"use client"

import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { useStrategyStore } from "../store/strategies.store"
import { Plus } from "lucide-react"
import { StrategyDialog } from "../components/strategy-dialog"
import { useFindAllSessionsQuery } from "@/features/sessions/hooks/use-session-queries"
import { StrategyCard } from "../components/strategy-card"
import { useRouter } from "next/navigation"
import { useFindAllStrategiesQuery } from "../hooks/use-strategies-queries"
import { StrategyDeleteDialog } from "../components/strategy-delete-dialog"

export default function StrategiesView() {
    const router = useRouter()

    const { openCreateDialog, openEditDialog, openDeleteDialog } =
        useStrategyStore()

    const { data, isLoading } = useFindAllStrategiesQuery()

    const strategiesData = data?.data ?? []

    console.log(strategiesData)

    return (
        <Container size="2xl">
            {/* HEADER */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <PageBreadcrumb
                    title="Strategies"
                    description="Manage your strategies for your trading experience."
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Strategies", href: "/strategies" },
                    ]}
                />

                <Button onClick={openCreateDialog} className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Strategy
                </Button>
            </div>

            {/* CONTENT */}
            {isLoading ? (
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    Loading strategies...
                </div>
            ) : strategiesData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="text-lg font-medium text-black dark:text-white">
                        No strategies yet
                    </div>
                    <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                        Start creating your first trading strategy
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {strategiesData.map((strategy) => (
                        <StrategyCard
                            key={strategy.id}
                            strategy={strategy}
                            onOpen={(s) => router.push(`/strategies/${s.id}`)}
                            onEdit={openEditDialog}
                            onDelete={openDeleteDialog}
                        />
                    ))}
                </div>
            )}

            {/* DIALOG */}
            <StrategyDialog />
            <StrategyDeleteDialog />
        </Container>
    )
}
