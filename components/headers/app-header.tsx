"use client"

import { cn } from "@/lib/utils"
import { HeaderSheetItem } from "./header-sheet-list"
import { HeaderLogo } from "./header-logo"
import { HeaderActions } from "./header-action"
import { UserResponse } from "@/features/auth/types/user.types"

export type AppHeaderProps = {
    className?: string
    logoTitle?: string
    logoHref?: string
    user?: UserResponse
    notifications?: HeaderSheetItem[]
    messages?: HeaderSheetItem[]
}

const defaultNotifications: HeaderSheetItem[] = [
    {
        id: "notif-1",
        title: "Order berhasil diproses",
        description:
            "Pesanan #TRX-2026-001 sudah berhasil diproses oleh sistem.",
        time: "2m ago",
        unread: true,
    },
    {
        id: "notif-2",
        title: "Update sistem tersedia",
        description:
            "Versi terbaru dashboard telah tersedia dan siap digunakan.",
        time: "1h ago",
        unread: true,
    },
    {
        id: "notif-3",
        title: "Backup selesai",
        description:
            "Proses backup data harian berhasil diselesaikan tanpa kendala.",
        time: "Yesterday",
        unread: false,
    },
]

const defaultMessages: HeaderSheetItem[] = [
    {
        id: "msg-1",
        title: "Support Team",
        description: "Halo, tiket support Anda sedang kami tindak lanjuti.",
        time: "5m ago",
        unread: true,
    },
    {
        id: "msg-2",
        title: "Project Manager",
        description: "Tolong review progress task pada sprint minggu ini.",
        time: "35m ago",
        unread: false,
    },
    {
        id: "msg-3",
        title: "Finance",
        description: "Invoice bulan ini sudah tersedia untuk diperiksa.",
        time: "Yesterday",
        unread: false,
    },
]

export function AppHeader({
    className,
    logoTitle = "Journal Trading",
    logoHref = "/",
    notifications = defaultNotifications,
    messages = defaultMessages,
}: AppHeaderProps) {
    return (
        <header
            className={cn(
                "sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-xl",
                className
            )}
        >
            <div className="mx-auto flex h-16 w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                <HeaderLogo title={logoTitle} href={logoHref} />
                <HeaderActions
                    notifications={notifications}
                    messages={messages}
                />
            </div>
        </header>
    )
}
