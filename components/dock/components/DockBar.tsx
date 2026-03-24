"use client"

import { useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, useMotionValue } from "framer-motion"
import { DockItem } from "./DockItem"
import { DockModal } from "./DockModal"
import { MobileDrawer } from "./MobileDrawer"
import { PINNED_DOCK_ITEMS } from "../constants/dock-items"
import type { DockBarProps } from "../types/dock.types"
import { cn } from "@/lib/utils"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import MobileBottomBar from "./ui/mobile-bottom-bar"

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
            <TooltipProvider delayDuration={100}>
                <div
                    className={cn(
                        "fixed right-0 bottom-6 left-0 z-50 flex items-end justify-center",
                        "pointer-events-none",
                        "hidden sm:flex",
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
                            "bg-white/70 backdrop-blur-2xl dark:bg-black/70",
                            "border border-black/12 dark:border-white/12",
                            "shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]"
                        )}
                    >
                        {/* Pinned items */}
                        {items.map((item, index) => {
                            const isActive =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(item.href)

                            return (
                                <Tooltip key={item.id}>
                                    <TooltipTrigger asChild>
                                        <div>
                                            <DockItem
                                                item={item}
                                                isActive={isActive}
                                                mouseX={mouseX}
                                                index={index}
                                            />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" sideOffset={12}>
                                        {item.label}
                                    </TooltipContent>
                                </Tooltip>
                            )
                        })}

                        {/* Divider */}
                        {/* <div className="mx-1 h-8 w-px self-center bg-black/12 dark:bg-white/12" /> */}

                        {/* "All apps" button */}
                        {/* <AllAppsButton
                            index={items.length}
                            mouseX={mouseX}
                            onClick={() => setModalOpen(true)}
                        /> */}
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
            </TooltipProvider>
        </>
    )
}
