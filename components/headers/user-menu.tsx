"use client"

import Link from "next/link"
import { CreditCard, LogOut, Settings, UserCircle2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useGetCurrentUserQuery } from "@/features/auth/application/queries"

export function UserMenu() {
    const { data, isLoading, isError } = useGetCurrentUserQuery()

    // Loading state
    if (isLoading) {
        return (
            <Button variant="ghost" className="h-11 gap-3 rounded-2xl" disabled>
                <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
                <div className="hidden space-y-1 sm:block">
                    <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                </div>
            </Button>
        )
    }

    // Error state
    if (isError || !data) {
        return (
            <Button variant="ghost" className="h-11 rounded-2xl">
                Failed to load user
            </Button>
        )
    }

    const user = data

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="h-11 cursor-pointer gap-3 rounded-2xl hover:bg-transparent dark:hover:bg-transparent"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src="https://github.com/maxleiter.png"
                            alt={user?.data?.fullName}
                        />
                        <AvatarFallback>{user?.data?.fullName}</AvatarFallback>
                    </Avatar>

                    <div className="hidden min-w-0 text-left sm:block">
                        <p className="truncate text-sm leading-none font-medium">
                            {user?.data?.fullName}
                        </p>
                        <p className="mt-1 truncate text-xs text-muted-foreground">
                            {user?.data?.email}
                        </p>
                    </div>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-64 rounded-xl"
                sideOffset={10}
            >
                <DropdownMenuLabel className="pb-2">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                            <AvatarImage
                                src="https://github.com/maxleiter.png"
                                alt={user?.data?.fullName}
                            />
                            <AvatarFallback>
                                {user?.data?.fullName}
                            </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                                {user?.data?.fullName}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                                {user?.data?.email}
                            </p>
                        </div>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/profile" className="cursor-pointer">
                            <UserCircle2 className="mr-2 h-4 w-4" />
                            Profile
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link href="/billing" className="cursor-pointer">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Billing
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link href="/settings" className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
