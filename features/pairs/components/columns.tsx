"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { Ellipsis } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header"
import {
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
import { Pair } from "../types/pair.types"

interface BuildPairColumnsOptions {
    onEdit: (pair: Pair) => void
    onDelete: (pair: Pair) => void
}

export function buildPairColumns({
    onEdit,
    onDelete,
}: BuildPairColumnsOptions): ColumnDef<Pair>[] {
    return [
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
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button mode="icon" variant="ghost">
                            <Ellipsis />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="start">
                        <DropdownMenuItem onClick={() => onEdit(row.original)}>
                            Edit pair
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            variant="destructive"
                            onClick={() => onDelete(row.original)}
                        >
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
    ]
}
