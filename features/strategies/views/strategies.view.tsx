"use client"

import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { useStrategyStore } from "../store/strategies.store"
import { Plus } from "lucide-react"
import { StrategyDialog } from "../components/strategy-dialog"

export default function StrategiesView() {
    const { openCreateDialog, openEditDialog, openDeleteDialog } =
        useStrategyStore()

    return (
        <Container size="2xl">
            <div className="flex items-center justify-between space-y-6">
                <PageBreadcrumb
                    title="Strategies"
                    description="Manage your strategies for your trading experience."
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Strategies", href: "/strategies" },
                    ]}
                />

                <Button onClick={openCreateDialog}>
                    <Plus />
                    Add Strategy
                </Button>

                <StrategyDialog />
            </div>
        </Container>
    )
}
