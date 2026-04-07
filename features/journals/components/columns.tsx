import { ColumnDef } from "@tanstack/react-table"
import {
    BasedOnPlanEnum,
    Journal,
    TradeDirectionEnum,
    TradeStatusEnum,
} from "../types/journal.type"
import { Skeleton } from "@/components/ui/skeleton"
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Ellipsis } from "lucide-react"

interface BuildJournalColumnsOptions {
    onEdit: (journal: Journal) => void
    onDelete: (journal: Journal) => void
}

export function buildJournalColumns({
    onEdit,
    onDelete,
}: BuildJournalColumnsOptions): ColumnDef<Journal>[] {
    return [
        {
            id: "date",
            accessorKey: "date",
            header: ({ column }) => (
                <DataGridColumnHeader title="Date" column={column} />
            ),
            cell: (info) =>
                new Date(info.getValue() as string).toLocaleDateString(),
            size: 120,
            enableSorting: true,
            enableHiding: false,
            filterFn: (
                row,
                columnId,
                filterValue: { month?: number; year?: number }
            ) => {
                const date = new Date(row.getValue(columnId) as string)
                const { month, year } = filterValue

                const monthMatch = month ? date.getMonth() + 1 === month : true
                const yearMatch = year ? date.getFullYear() === year : true

                return monthMatch && yearMatch
            },
            meta: {
                headerTitle: "Date",
                skeleton: <Skeleton className="h-8 w-24" />,
            },
        },
        {
            id: "pair",
            accessorKey: "pair.name",
            header: ({ column }) => (
                <DataGridColumnHeader title="Pair" column={column} />
            ),
            cell: (info) => (
                <span className="font-medium">{info.getValue() as string}</span>
            ),
            size: 110,
            enableSorting: true,
            enableHiding: false,
            meta: {
                headerTitle: "Pair",
                skeleton: <Skeleton className="h-8 w-20" />,
            },
        },
        {
            id: "direction",
            accessorKey: "direction",
            header: ({ column }) => (
                <DataGridColumnHeader title="Direction" column={column} />
            ),
            cell: (info) => {
                const value = info.getValue() as TradeDirectionEnum
                return (
                    <Badge
                        variant={
                            value === TradeDirectionEnum.BUY
                                ? "default"
                                : "secondary"
                        }
                        className={
                            value === TradeDirectionEnum.BUY
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "bg-orange-500 text-white hover:bg-orange-600"
                        }
                    >
                        {value}
                    </Badge>
                )
            },
            size: 100,
            enableSorting: true,
            enableHiding: false,
            meta: {
                headerTitle: "Direction",
                skeleton: <Skeleton className="h-6 w-16" />,
            },
        },
        {
            id: "status",
            accessorKey: "status",
            header: ({ column }) => (
                <DataGridColumnHeader title="Status" column={column} />
            ),
            cell: (info) => {
                const value = info.getValue() as TradeStatusEnum
                const styles: Record<TradeStatusEnum, string> = {
                    [TradeStatusEnum.PROFIT]:
                        "bg-green-500 hover:bg-green-600 text-white",
                    [TradeStatusEnum.LOSS]:
                        "bg-red-500 hover:bg-red-600 text-white",
                    [TradeStatusEnum.DRAW]:
                        "bg-yellow-500 hover:bg-yellow-600 text-white",
                }
                return <Badge className={styles[value]}>{value}</Badge>
            },
            size: 100,
            enableSorting: true,
            enableHiding: false,
            meta: {
                headerTitle: "Status",
                skeleton: <Skeleton className="h-6 w-16" />,
            },
        },
        {
            id: "lotSize",
            accessorKey: "lotSize",
            header: ({ column }) => (
                <DataGridColumnHeader title="Lot Size" column={column} />
            ),
            cell: (info) => (info.getValue() as number).toFixed(2),
            size: 90,
            enableSorting: true,
            enableHiding: true,
            meta: {
                headerTitle: "Lot Size",
                skeleton: <Skeleton className="h-8 w-16" />,
            },
        },
        {
            id: "entryPrice",
            accessorKey: "entryPrice",
            header: ({ column }) => (
                <DataGridColumnHeader title="Entry Price" column={column} />
            ),
            cell: (info) => (info.getValue() as number).toLocaleString(),
            size: 120,
            enableSorting: true,
            enableHiding: true,
            meta: {
                headerTitle: "Entry Price",
                skeleton: <Skeleton className="h-8 w-20" />,
            },
        },
        {
            id: "closingPrice",
            accessorKey: "closingPrice",
            header: ({ column }) => (
                <DataGridColumnHeader title="Closing Price" column={column} />
            ),
            cell: (info) => (info.getValue() as number).toLocaleString(),
            size: 130,
            enableSorting: true,
            enableHiding: true,
            meta: {
                headerTitle: "Closing Price",
                skeleton: <Skeleton className="h-8 w-20" />,
            },
        },
        {
            id: "profitAndLoss",
            accessorKey: "profitAndLoss",
            header: ({ column }) => (
                <DataGridColumnHeader title="PnL" column={column} />
            ),
            cell: (info) => {
                const value = info.getValue() as number
                return (
                    <span
                        className={
                            value >= 0
                                ? "font-medium text-green-600"
                                : "font-medium text-red-600"
                        }
                    >
                        {value >= 0 ? "+" : ""}
                        {value}
                    </span>
                )
            },
            size: 90,
            enableSorting: true,
            enableHiding: false,
            meta: {
                headerTitle: "P&L",
                skeleton: <Skeleton className="h-8 w-16" />,
            },
        },
        {
            id: "riskRatio",
            accessorKey: "riskRatio",
            header: ({ column }) => (
                <DataGridColumnHeader title="R:R" column={column} />
            ),
            cell: (info) => {
                const row = info.row.original
                return `${row.riskRatio}:${row.rewardRatio}`
            },
            size: 80,
            enableSorting: false,
            enableHiding: true,
            meta: {
                headerTitle: "R:R",
                skeleton: <Skeleton className="h-8 w-16" />,
            },
        },
        {
            id: "basedOnPlan",
            accessorKey: "basedOnPlan",
            header: ({ column }) => (
                <DataGridColumnHeader title="Based on Plan" column={column} />
            ),
            cell: (info) => {
                const value = info.getValue() as BasedOnPlanEnum
                const isPlan = value === BasedOnPlanEnum.YES
                return (
                    <Badge
                        className={
                            isPlan
                                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                                : "bg-slate-400 text-white hover:bg-slate-500"
                        }
                    >
                        {isPlan ? "Yes" : "No"}
                    </Badge>
                )
            },
            size: 130,
            enableSorting: true,
            enableHiding: true,
            meta: {
                headerTitle: "Based on Plan",
                skeleton: <Skeleton className="h-6 w-14" />,
            },
        },
        {
            id: "strategy",
            accessorKey: "strategy.title",
            header: ({ column }) => (
                <DataGridColumnHeader title="Strategy" column={column} />
            ),
            cell: (info) => (
                <div className="truncate">{info.getValue() as string}</div>
            ),
            size: 180,
            enableSorting: false,
            enableHiding: true,
            meta: {
                headerTitle: "Strategy",
                skeleton: <Skeleton className="h-8 w-28" />,
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
                            Edit journal
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            variant="destructive"
                            onClick={() => onDelete(row.original)}
                        >
                            Delete journal
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
