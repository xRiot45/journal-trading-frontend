import { useState } from "react"
import { Session } from "../types/session.types"
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    PaginationState,
    RowSelectionState,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"
import { buildSessionColumns } from "../components/columns"
import { useFindAllSessionsQuery } from "./use-session-queries"

interface UseSessionTableOptions {
    onEdit: (session: Session) => void
    onDelete: (session: Session) => void
}

export function useSessionTable({ onEdit, onDelete }: UseSessionTableOptions) {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const [sorting, setSorting] = useState<SortingState>([
        { id: "createdAt", desc: true },
    ])

    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [searchQuery, setSearchQuery] = useState<string>("")

    const columns = buildSessionColumns({ onEdit, onDelete })

    const [columnOrder, setColumnOrder] = useState<string[]>(
        columns.map((col) => col.id as string)
    )

    const currentSort = sorting[0]

    const { data, isLoading } = useFindAllSessionsQuery({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: searchQuery || undefined,
        sortBy: currentSort?.id,
        order: currentSort ? (currentSort.desc ? "DESC" : "ASC") : undefined,
    })

    const tableData = data?.data ?? []
    const totalItems = data?.meta?.totalItems ?? 0

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable<Session>({
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
