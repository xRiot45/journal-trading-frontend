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
import { Session } from "../types/session.types"
import { toHHmm } from "@/helpers/time"

interface BuildSessionColumnsOptions {
    onEdit: (session: Session) => void
    onDelete: (session: Session) => void
}

export function buildSessionColumns({
    onEdit,
    onDelete,
}: BuildSessionColumnsOptions): ColumnDef<Session>[] {
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
            id: "startTime",
            accessorKey: "startTime",
            header: ({ column }) => (
                <DataGridColumnHeader title="Start Time" column={column} />
            ),
            cell: (info) => toHHmm((info.getValue() + " WIB") as string),
            enableSorting: true,
            enableHiding: false,
            meta: {
                headerTitle: "Start Time",
                skeleton: <Skeleton className="h-8 w-20" />,
            },
        },
        {
            id: "endTime",
            accessorKey: "endTime",
            header: ({ column }) => (
                <DataGridColumnHeader title="End Time" column={column} />
            ),
            cell: (info) => toHHmm((info.getValue() + " WIB") as string),
            enableSorting: true,
            enableHiding: false,
            meta: {
                headerTitle: "End Time",
                skeleton: <Skeleton className="h-8 w-20" />,
            },
        },
        {
            id: "description",
            accessorKey: "description",
            header: ({ column }) => (
                <DataGridColumnHeader title="Description" column={column} />
            ),
            cell: (info) => (info.getValue() as string) || "-",
            enableSorting: false,
            enableHiding: false,
            meta: {
                headerTitle: "Description",
                skeleton: <Skeleton className="h-8 w-32" />,
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
                            Edit session
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            variant="destructive"
                            onClick={() => onDelete(row.original)}
                        >
                            Delete session
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
