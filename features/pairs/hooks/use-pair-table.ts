import { useState } from "react"
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
    type PaginationState,
    type RowSelectionState,
    type SortingState,
} from "@tanstack/react-table"
import { useFindAllPairsQuery } from "./use-pair-queries"
import { Pair } from "../types/pair.types"
import { buildPairColumns } from "../components/columns"

interface UsePairTableOptions {
    onEdit: (pair: Pair) => void
    onDelete: (pair: Pair) => void
}

export function usePairTable({ onEdit, onDelete }: UsePairTableOptions) {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const [sorting, setSorting] = useState<SortingState>([
        { id: "createdAt", desc: true },
    ])
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [searchQuery, setSearchQuery] = useState("")

    const columns = buildPairColumns({ onEdit, onDelete })

    const [columnOrder, setColumnOrder] = useState<string[]>(
        columns.map((col) => col.id as string)
    )

    const currentSort = sorting[0]

    const { data, isLoading } = useFindAllPairsQuery({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: searchQuery || undefined,
        sortBy: currentSort?.id,
        order: currentSort ? (currentSort.desc ? "DESC" : "ASC") : undefined,
    })

    const tableData = data?.data ?? []
    const totalItems = data?.meta?.totalItems ?? 0

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable<Pair>({
        columns,
        data: tableData,
        pageCount: Math.ceil(totalItems / pagination.pageSize),
        getRowId: (row) => row.id,
        state: {
            pagination,
            sorting,
            columnOrder,
            rowSelection,
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
        manualFiltering: true,
    })

    const handleSearch = (value: string) => {
        setSearchQuery(value)
        setPagination((prev) => ({ ...prev, pageIndex: 0 }))
    }

    const handleClearSearch = () => {
        setSearchQuery("")
        setPagination((prev) => ({ ...prev, pageIndex: 0 }))
    }

    return {
        table,
        isLoading,
        totalItems,
        searchQuery,
        handleSearch,
        handleClearSearch,
    }
}
