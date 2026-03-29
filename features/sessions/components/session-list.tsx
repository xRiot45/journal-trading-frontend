"use client"

import { DataGrid } from "@/components/ui/data-grid"
import { useSessionTable } from "../hooks/use-session-table"
import { useSessionStore } from "../store/session.store"
import { Card, CardFooter, CardTable } from "@/components/ui/card"
import { Toolbar } from "./toolbar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { DataGridTable } from "@/components/ui/data-grid-table"
import { DataGridPagination } from "@/components/ui/data-grid-pagination"
import { SessionDialog } from "./session-dialog"
import { SessionDeleteDialog } from "./session-delete-dialog"

export default function SessionList() {
    const { openCreateDialog, openEditDialog, openDeleteDialog } =
        useSessionStore()

    const {
        table,
        isLoading,
        totalItems,
        searchQuery,
        handleSearch,
        handleClearSearch,
    } = useSessionTable({
        onEdit: openEditDialog,
        onDelete: openDeleteDialog,
    })

    return (
        <>
            <DataGrid
                table={table}
                recordCount={totalItems}
                isLoading={isLoading}
                tableLayout={{
                    columnsResizable: true,
                    columnsPinnable: true,
                    columnsMovable: true,
                    columnsVisibility: true,
                }}
                tableClassNames={{
                    edgeCell: "px-5",
                }}
            >
                <Card>
                    <Toolbar
                        searchQuery={searchQuery}
                        isLoading={isLoading}
                        onSearch={handleSearch}
                        onClear={handleClearSearch}
                        onAddSession={openCreateDialog}
                    />
                    <CardTable>
                        <ScrollArea>
                            <DataGridTable />
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </CardTable>
                    <CardFooter>
                        <DataGridPagination />
                    </CardFooter>
                </Card>
            </DataGrid>

            <SessionDialog />
            <SessionDeleteDialog />
        </>
    )
}
