"use client"

import * as React from "react"
import { Bell, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { HeaderSheetItem, HeaderSheetList } from "./header-sheet-list"
import { UserMenu, UserMenuData } from "./user-menu"
import { ThemeToggle } from "../theme-toggle"

type HeaderActionsProps = {
    notifications: HeaderSheetItem[]
    messages: HeaderSheetItem[]
    user: UserMenuData
}

function countUnread(items: HeaderSheetItem[]): number {
    return items.filter((item) => item.unread).length
}

type IconButtonWithBadgeProps = {
    children: React.ReactNode
    badgeCount?: number
    label: string
}

function IconButtonWithBadge({
    children,
    badgeCount = 0,
    label,
}: IconButtonWithBadgeProps) {
    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 rounded-2xl"
                aria-label={label}
            >
                {children}
            </Button>

            {badgeCount > 0 ? (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                    {badgeCount > 9 ? "9+" : badgeCount}
                </span>
            ) : null}
        </div>
    )
}

export function HeaderActions({
    notifications,
    messages,
    user,
}: HeaderActionsProps) {
    const unreadNotifications = countUnread(notifications)
    const unreadMessages = countUnread(messages)

    return (
        <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <Sheet>
                <SheetTrigger asChild>
                    <div>
                        <IconButtonWithBadge
                            badgeCount={unreadNotifications}
                            label="Open notifications"
                        >
                            <Bell className="h-5 w-5" />
                        </IconButtonWithBadge>
                    </div>
                </SheetTrigger>

                <SheetContent className="w-full p-0 sm:max-w-md">
                    <SheetHeader className="sr-only">
                        <SheetTitle>Notifications</SheetTitle>
                        <SheetDescription>
                            Lihat semua notifikasi terbaru Anda.
                        </SheetDescription>
                    </SheetHeader>

                    <HeaderSheetList
                        title="Notifications"
                        description="Pantau update terbaru, aktivitas sistem, dan informasi penting."
                        items={notifications}
                        emptyText="Belum ada notifikasi."
                    />
                </SheetContent>
            </Sheet>

            <Sheet>
                <SheetTrigger asChild>
                    <div>
                        <IconButtonWithBadge
                            badgeCount={unreadMessages}
                            label="Open messages"
                        >
                            <Mail className="h-5 w-5" />
                        </IconButtonWithBadge>
                    </div>
                </SheetTrigger>

                <SheetContent className="w-full p-0 sm:max-w-md">
                    <SheetHeader className="sr-only">
                        <SheetTitle>Messages</SheetTitle>
                        <SheetDescription>
                            Lihat semua pesan terbaru Anda.
                        </SheetDescription>
                    </SheetHeader>

                    <HeaderSheetList
                        title="Messages"
                        description="Pesan masuk dari tim, sistem, dan percakapan terbaru."
                        items={messages}
                        emptyText="Belum ada pesan."
                    />
                </SheetContent>
            </Sheet>

            <UserMenu user={user} />
        </div>
    )
}
