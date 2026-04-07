import { useEffect, useMemo, useState } from "react"
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
    type PaginationState,
    type SortingState,
    type RowSelectionState,
    ColumnFiltersState,
} from "@tanstack/react-table"
import { Journal } from "../types/journal.type"
import { buildJournalColumns } from "../components/columns"
import { useFindAllJournalsQuery } from "./use-journal-queries"
import { useJournalStore } from "../store/journal.store"

interface UseJournalTableOptions {
    onEdit: (journal: Journal) => void
    onDelete: (journal: Journal) => void
}

export function useJournalTable({ onEdit, onDelete }: UseJournalTableOptions) {
    const { selectedMonth, selectedYear } = useJournalStore()

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const [sorting, setSorting] = useState<SortingState>([
        { id: "createdAt", desc: true },
    ])

    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const columns = buildJournalColumns({ onEdit, onDelete })

    const [columnOrder, setColumnOrder] = useState<string[]>(
        columns.map((col) => col.id as string)
    )

    const currentSort = sorting[0]

    const columnFilters: ColumnFiltersState = useMemo(() => {
        const hasFilter = selectedMonth || selectedYear
        if (!hasFilter) return []

        return [
            {
                id: "date",
                value: {
                    month: selectedMonth ?? undefined,
                    year: selectedYear ?? undefined,
                },
            },
        ]
    }, [selectedMonth, selectedYear])

    useEffect(() => {
        setPagination((prev) => ({ ...prev, pageIndex: 0 }))
    }, [selectedMonth, selectedYear])

    const { data, isLoading } = useFindAllJournalsQuery({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        sortBy: currentSort?.id,
        order: currentSort ? (currentSort.desc ? "DESC" : "ASC") : undefined,
    })

    const tableData = data?.data ?? []
    const totalItems = data?.meta?.totalItems ?? 0

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable<Journal>({
        columns,
        data: tableData,
        pageCount: Math.ceil(totalItems / pagination.pageSize),
        getRowId: (row) => row.id,
        state: {
            pagination,
            sorting,
            columnOrder,
            rowSelection,
            columnFilters,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onColumnOrderChange: setColumnOrder,
        onPaginationChange: setPagination,
        onSortingChange: (updater) => {
            setSorting(updater)
            setPagination((prev) => ({ ...prev, pageIndex: 0 }))
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        manualSorting: true,
        manualFiltering: false,
    })

    return {
        table,
        isLoading,
        totalItems,
    }
}
