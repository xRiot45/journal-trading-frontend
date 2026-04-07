"use client"

import { useRouter } from "next/navigation"
import { Card, CardFooter, CardTable } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useJournalTable } from "../hooks/use-journal-table"
import { useJournalStore } from "../store/journal.store"
import { JournalDeleteDialog } from "./journal-delete-dialog"
import { Toolbar } from "./toolbar"
import { DataGrid } from "@/components/ui/data-grid"
import { DataGridTable } from "@/components/ui/data-grid-table"
import { DataGridPagination } from "@/components/ui/data-grid-pagination"

export default function JournalList() {
    const router = useRouter()
    const { openDeleteDialog } = useJournalStore()

    const { table, isLoading, totalItems } = useJournalTable({
        onEdit: (journal) => router.push(`/journals/${journal.id}/update`),
        onDelete: (journal) => openDeleteDialog(journal),
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
                    <Toolbar isLoading={isLoading} />
                    <CardTable>
                        <ScrollArea className="overflow-hidden">
                            <DataGridTable />
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </CardTable>
                    <CardFooter>
                        <DataGridPagination />
                    </CardFooter>
                </Card>
            </DataGrid>

            <JournalDeleteDialog />
        </>
    )
}
