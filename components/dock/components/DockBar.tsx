"use client"

import React, { useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, useMotionValue } from "framer-motion"
import { Icon } from "@iconify/react"
import { DockItemComponent } from "./DockItem"
import { DockModal } from "./DockModal"
import { MobileDrawer } from "./MobileDrawer"
import { PINNED_DOCK_ITEMS } from "../constants/dock-items"
import type { DockBarProps } from "../types/dock.types"
import { cn } from "@/lib/utils"

export function DockBar({
    items = PINNED_DOCK_ITEMS,
    className,
}: DockBarProps) {
    const pathname = usePathname()
    const mouseX = useMotionValue(Infinity)
    const dockRef = useRef<HTMLDivElement>(null)

    const [modalOpen, setModalOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
        <>
            {/* ─── Desktop & Tablet Dock ─── */}
            <div
                className={cn(
                    "fixed right-0 bottom-6 left-0 z-50 flex items-end justify-center",
                    "pointer-events-none",
                    "hidden sm:flex", // hidden on mobile
                    className
                )}
            >
                <motion.div
                    ref={dockRef}
                    onMouseMove={(e) => mouseX.set(e.clientX)}
                    onMouseLeave={() => mouseX.set(Infinity)}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        delay: 0.1,
                    }}
                    className={cn(
                        "pointer-events-auto",
                        "flex items-end gap-2 px-4 py-3",
                        "rounded-[28px]",
                        // macOS glass pill
                        "bg-[#1a1a2e]/70 backdrop-blur-2xl",
                        "border border-white/12",
                        "shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]"
                    )}
                >
                    {/* Pinned items */}
                    {items.map((item, index) => {
                        const isActive =
                            item.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(item.href)
                        return (
                            <DockItemComponent
                                key={item.id}
                                item={item}
                                isActive={isActive}
                                mouseX={mouseX}
                                index={index}
                            />
                        )
                    })}

                    {/* Divider */}
                    <div className="mx-1 h-8 w-px self-center bg-white/12" />

                    {/* "All apps" button */}
                    <AllAppsButton
                        index={items.length}
                        mouseX={mouseX}
                        onClick={() => setModalOpen(true)}
                    />
                </motion.div>
            </div>

            {/* ─── Mobile Bottom Bar ─── */}
            <MobileBottomBar
                items={items}
                pathname={pathname}
                onShowAll={() => setDrawerOpen(true)}
            />

            {/* ─── Modals ─── */}
            <DockModal open={modalOpen} onOpenChange={setModalOpen} />
            <MobileDrawer
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                items={items}
                currentPath={pathname}
            />
        </>
    )
}

// ─── All Apps Button (desktop) ───────────────────────────────────────────────

function AllAppsButton({
    index,
    onClick,
}: {
    index: number
    mouseX: ReturnType<typeof useMotionValue<number>>
    onClick: () => void
}) {
    const ref = useRef<HTMLDivElement>(null)

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                delay: index * 0.04 + 0.05,
                type: "spring",
                stiffness: 260,
                damping: 20,
            }}
            className="group relative flex flex-col items-center"
        >
            {/* Tooltip */}
            <div
                className={cn(
                    "absolute -top-10 rounded-lg px-2.5 py-1 text-xs font-medium whitespace-nowrap",
                    "border border-white/10 bg-[#1a1a2e]/90 text-white/90 backdrop-blur-md",
                    "pointer-events-none opacity-0 shadow-xl shadow-black/30 group-hover:opacity-100",
                    "transition-opacity duration-150"
                )}
            >
                All Apps
                <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-r border-b border-white/10 bg-[#1a1a2e]/90" />
            </div>

            <motion.button
                onClick={onClick}
                whileTap={{ scale: 0.88 }}
                aria-label="Show all navigation"
                style={{ width: 52, height: 52 }}
                className={cn(
                    "relative flex cursor-pointer items-center justify-center rounded-[22%]",
                    "bg-linear-to-br from-indigo-500/20 to-violet-600/20",
                    "border border-indigo-500/25 hover:border-indigo-400/40",
                    "hover:from-indigo-500/30 hover:to-violet-600/30",
                    "transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/20"
                )}
            >
                <Icon
                    icon="solar:widget-5-bold-duotone"
                    className="h-[55%] w-[55%] text-indigo-300 transition-colors group-hover:text-indigo-200"
                />
            </motion.button>

            <span className="mt-1 h-1 w-1 opacity-0" />
        </motion.div>
    )
}

// ─── Mobile Bottom Bar ───────────────────────────────────────────────────────

function MobileBottomBar({
    items,
    pathname,
    onShowAll,
}: {
    items: typeof PINNED_DOCK_ITEMS
    pathname: string
    onShowAll: () => void
}) {
    // Show first 4 items + "more" button on mobile
    const visibleItems = items.slice(0, 4)

    return (
        <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={cn(
                "fixed right-0 bottom-0 left-0 z-50",
                "flex sm:hidden", // only on mobile
                "bg-[#0d0d1a]/90 backdrop-blur-2xl",
                "border-t border-white/10",
                "shadow-[0_-4px_24px_rgba(0,0,0,0.4)]",
                "safe-area-inset-bottom" // iOS safe area
            )}
        >
            <div className="flex w-full items-center px-2 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
                {visibleItems.map((item) => {
                    const isActive =
                        item.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.href)
                    return (
                        <MobileNavItem
                            key={item.id}
                            item={item}
                            isActive={isActive}
                        />
                    )
                })}

                {/* More button */}
                <button
                    onClick={onShowAll}
                    className="group flex flex-1 flex-col items-center gap-1 py-1"
                    aria-label="Show all navigation"
                >
                    <div
                        className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-2xl",
                            "border border-white/8 bg-white/6 transition-colors group-active:bg-white/12"
                        )}
                    >
                        <Icon
                            icon="solar:widget-add-bold-duotone"
                            className="h-5 w-5 text-white/55"
                        />
                    </div>
                    <span className="text-[10px] font-medium text-white/40">
                        More
                    </span>
                </button>
            </div>
        </motion.div>
    )
}

function MobileNavItem({
    item,
    isActive,
}: {
    item: (typeof PINNED_DOCK_ITEMS)[0]
    isActive: boolean
}) {
    return (
        <a
            href={item.href}
            className="group flex flex-1 flex-col items-center gap-1 py-1"
            aria-label={item.label}
        >
            <div
                className={cn(
                    "relative flex h-10 w-10 items-center justify-center rounded-2xl",
                    "border transition-all duration-200",
                    isActive
                        ? "border-white/18 bg-white/14"
                        : "border-transparent bg-transparent"
                )}
            >
                <Icon
                    icon={item.icon}
                    className={cn(
                        "h-5 w-5 transition-colors",
                        isActive ? "text-white" : "text-white/45"
                    )}
                />
                {item.badge && item.badge > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-red-500 px-0.5 text-[9px] font-bold text-white">
                        {item.badge > 9 ? "9+" : item.badge}
                    </span>
                )}
            </div>
            <span
                className={cn(
                    "text-[10px] font-medium transition-colors",
                    isActive ? "text-white/90" : "text-white/38"
                )}
            >
                {item.label}
            </span>
        </a>
    )
}
