"use client"

import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    PaginationState,
    RowSelectionState,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"
import { useMemo, useState } from "react"
import { useFindAllPairsQuery } from "../application/queries"
import { PairResponseData } from "../interfaces/pair.interface"
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header"
import { Skeleton } from "@/components/ui/skeleton"
import {
    DataGridTable,
    DataGridTableRowSelect,
    DataGridTableRowSelectAll,
} from "@/components/ui/data-grid-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Ellipsis, Plus, Search, X } from "lucide-react"
import {
    Card,
    CardFooter,
    CardHeader,
    CardTable,
    CardToolbar,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DataGrid } from "@/components/ui/data-grid"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { DataGridPagination } from "@/components/ui/data-grid-pagination"

export default function PairList() {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const [sorting, setSorting] = useState<SortingState>([
        { id: "createdAt", desc: true },
    ])
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [searchQuery, setSearchQuery] = useState("")

    const { data, isLoading } = useFindAllPairsQuery({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: searchQuery || undefined,
        sortBy: sorting[0]?.id,
        order: sorting[0] ? (sorting[0].desc ? "DESC" : "ASC") : undefined,
    })

    const tableData = data?.data ?? []
    const totalItems = data?.meta?.totalItems ?? 0

    console.log(tableData)

    const columns = useMemo<ColumnDef<PairResponseData>[]>(
        () => [
            {
                id: "id",
                accessorKey: "id",
                header: () => <DataGridTableRowSelectAll />,
                cell: ({ row }) => <DataGridTableRowSelect row={row} />,
                size: 27,
                enableSorting: false,
                enableResizing: false,
                meta: {
                    skeleton: <Skeleton className="size-5" />,
                },
            },
            {
                id: "name",
                accessorKey: "name",
                header: ({ column }) => (
                    <DataGridColumnHeader title="Name" column={column} />
                ),
                cell: (info) => info.getValue(),
                size: 150,
                enableSorting: true,
                enableHiding: false,
                meta: {
                    headerTitle: "Name",
                    skeleton: <Skeleton className="h-8 w-28" />,
                },
            },
            {
                id: "description",
                accessorKey: "description",
                header: ({ column }) => (
                    <DataGridColumnHeader title="Description" column={column} />
                ),
                cell: (info) => (
                    <div className="truncate">{info.getValue() as string}</div>
                ),
                size: 300,
                enableSorting: false,
                enableHiding: false,
                meta: {
                    headerTitle: "Description",
                    skeleton: <Skeleton className="h-8 w-28" />,
                },
            },
            {
                id: "createdAt",
                accessorKey: "createdAt",
                header: ({ column }) => (
                    <DataGridColumnHeader title="Created At" column={column} />
                ),
                cell: (info) =>
                    new Date(info.getValue() as string).toLocaleString(),
                enableSorting: true,
                enableHiding: false,
                meta: {
                    headerTitle: "Created At",
                    skeleton: <Skeleton className="h-8 w-20" />,
                },
            },
            {
                id: "updatedAt",
                accessorKey: "updatedAt",
                header: ({ column }) => (
                    <DataGridColumnHeader title="Updated At" column={column} />
                ),
                cell: (info) =>
                    new Date(info.getValue() as string).toLocaleString(),
                enableSorting: true,
                enableHiding: false,
                meta: {
                    headerTitle: "Updated At",
                    skeleton: <Skeleton className="h-8 w-20" />,
                },
            },
            {
                id: "actions",
                header: "Actions",
                cell: () => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button mode="icon" variant="ghost">
                                <Ellipsis />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="bottom" align="start">
                            <DropdownMenuItem>Edit pair</DropdownMenuItem>
                            <DropdownMenuItem variant="destructive">
                                Delete pair
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
                size: 90,
                enableSorting: false,
                enableHiding: false,
                enableResizing: false,
                meta: {
                    skeleton: <Skeleton className="size-5" />,
                },
            },
        ],
        []
    )

    const [columnOrder, setColumnOrder] = useState<string[]>(
        columns.map((column) => column.id as string)
    )

    const table = useReactTable({
        columns,
        data: tableData,
        pageCount: Math.ceil(totalItems / pagination.pageSize),
        getRowId: (row: PairResponseData) => row.id,
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

    const DataGridToolbar = () => {
        const [inputValue, setInputValue] = useState(searchQuery)

        const handleSearch = () => {
            setSearchQuery(inputValue)
            setPagination((prev) => ({ ...prev, pageIndex: 0 }))
        }

        const handleClear = () => {
            setSearchQuery("")
            setPagination((prev) => ({ ...prev, pageIndex: 0 }))
        }

        return (
            <CardHeader className="flex-col flex-wrap items-end py-5 sm:flex-row sm:items-center">
                <div className="flex flex-col items-stretch justify-between gap-2.5 sm:flex-row sm:items-center">
                    <div className="relative">
                        <Search className="absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search pairs"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleSearch()
                            }
                            disabled={isLoading}
                            className="w-full ps-9 sm:w-64"
                        />
                        {searchQuery.length > 0 && (
                            <Button
                                mode="icon"
                                variant="dim"
                                className="absolute inset-e-1.5 top-1/2 h-6 w-6 -translate-y-1/2"
                                onClick={handleClear}
                            >
                                <X />
                            </Button>
                        )}
                    </div>
                </div>
                <CardToolbar>
                    <Button disabled={isLoading}>
                        <Plus />
                        Add Pair
                    </Button>
                </CardToolbar>
            </CardHeader>
        )
    }

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
                <DataGridToolbar />
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
