"use client"

import { DataGrid } from "@/components/ui/data-grid"
import { Card, CardFooter, CardTable } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { DataGridTable } from "@/components/ui/data-grid-table"
import { DataGridPagination } from "@/components/ui/data-grid-pagination"
import { usePairTable } from "../hooks/use-pair-table"
import { Toolbar } from "./toolbar"

export default function PairList() {
    const {
        table,
        isLoading,
        totalItems,
        searchQuery,
        handleSearch,
        handleClearSearch,
    } = usePairTable()

    return (
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
    )
}
