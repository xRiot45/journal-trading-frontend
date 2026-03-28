"use client"

import { DataGrid } from "@/components/ui/data-grid"
import { Card, CardFooter, CardTable } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { DataGridTable } from "@/components/ui/data-grid-table"
import { DataGridPagination } from "@/components/ui/data-grid-pagination"
import { usePairTable } from "../hooks/use-pair-table"
import { usePairStore } from "../store/pair.store"
import { Toolbar } from "./toolbar"
import { PairDialog } from "./pair-dialog"
import { PairDeleteDialog } from "./pair-delete-dialog"

export default function PairList() {
    const { openCreateDialog, openEditDialog, openDeleteDialog } =
        usePairStore()

    const {
        table,
        isLoading,
        totalItems,
        searchQuery,
        handleSearch,
        handleClearSearch,
    } = usePairTable({
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
                        onAddPair={openCreateDialog}
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

            <PairDialog />
            <PairDeleteDialog />
        </>
    )
}
