"use client"

import { useState } from "react"
import { DataGrid } from "@/components/ui/data-grid"
import { Card, CardFooter, CardTable } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { DataGridTable } from "@/components/ui/data-grid-table"
import { DataGridPagination } from "@/components/ui/data-grid-pagination"
import { usePairTable } from "../hooks/use-pair-table"
import { PairDialog } from "./pair-dialog"
import { PairResponseData } from "../interfaces/pair.interface"
import { Toolbar } from "./toolbar"

export default function PairList() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedPair, setSelectedPair] = useState<PairResponseData | null>(
        null
    )

    const handleOpenCreate = () => {
        setSelectedPair(null)
        setDialogOpen(true)
    }

    const handleOpenEdit = (pair: PairResponseData) => {
        setSelectedPair(pair)
        setDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setDialogOpen(false)
        setSelectedPair(null)
    }

    const {
        table,
        isLoading,
        totalItems,
        searchQuery,
        handleSearch,
        handleClearSearch,
    } = usePairTable({
        onEdit: handleOpenEdit,
        onDelete: (pair) => console.log("delete", pair),
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
                        onAddPair={handleOpenCreate}
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

            <PairDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                pair={selectedPair}
            />
        </>
    )
}
