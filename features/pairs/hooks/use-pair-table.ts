/* eslint-disable react-hooks/incompatible-library */
import {
    PaginationState,
    RowSelectionState,
    SortingState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"
import { useFindAllPairsQuery } from "../application/queries"
import { PairResponseData } from "../interfaces/pair.interface"
import { Columns } from "../components/columns"

export function usePairTable() {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const [sorting, setSorting] = useState<SortingState>([
        { id: "createdAt", desc: true },
    ])
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [searchQuery, setSearchQuery] = useState("")
    const [columnOrder, setColumnOrder] = useState<string[]>(
        Columns.map((col) => col.id as string)
    )

    const { data, isLoading } = useFindAllPairsQuery({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: searchQuery || undefined,
        sortBy: sorting[0]?.id,
        order: sorting[0] ? (sorting[0].desc ? "DESC" : "ASC") : undefined,
    })

    const tableData = data?.data ?? []
    const totalItems = data?.meta?.totalItems ?? 0

    const table = useReactTable<PairResponseData>({
        columns: Columns,
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
