"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"
import type { DockItem } from "../types/dock.types"
import { cn } from "@/lib/utils"

interface MobileDrawerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    items: DockItem[]
    currentPath?: string
}

export function MobileDrawer({
    open,
    onOpenChange,
    items,
    currentPath = "/",
}: MobileDrawerProps) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-white/60 backdrop-blur-sm dark:bg-black/60"
                        onClick={() => onOpenChange(false)}
                    />

                    {/* Drawer */}
                    <motion.div
                        key="drawer"
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 260,
                        }}
                        className={cn(
                            "fixed right-0 bottom-0 left-0 z-50",
                            "bg-white/95 backdrop-blur-2xl dark:bg-black/95",
                            "rounded-t-2xl border-t border-black/10 dark:border-white/10",
                            "shadow-2xl shadow-black/20 dark:shadow-black/60"
                        )}
                    >
                        {/* Drag Handle */}
                        <div className="flex justify-center pt-3 pb-1">
                            <div className="h-1 w-10 rounded-full bg-black/20 dark:bg-white/20" />
                        </div>

                        <div className="p-4 pb-8">
                            <p className="mb-4 px-1 text-[11px] font-semibold tracking-widest text-black/35 uppercase dark:text-white/35">
                                Navigation
                            </p>

                            {/* Grid of navigation items */}
                            <div className="grid grid-cols-4 gap-3">
                                {items.map((item, i) => {
                                    const isActive =
                                        item.href === "/"
                                            ? currentPath === "/"
                                            : currentPath.startsWith(item.href)

                                    return (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                delay: i * 0.03,
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 20,
                                            }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() =>
                                                    onOpenChange(false)
                                                }
                                                className="group flex flex-col items-center gap-2"
                                                aria-label={item.label}
                                            >
                                                <div
                                                    className={cn(
                                                        "relative flex h-14 w-14 items-center justify-center rounded-2xl",
                                                        "border transition-all duration-200",
                                                        isActive
                                                            ? "border-black/20 bg-black/15 dark:border-white/20 dark:bg-white/15"
                                                            : "border-black/8 bg-black/6 group-active:bg-black/10 dark:border-white/8 dark:bg-white/6 dark:group-active:bg-white/10"
                                                    )}
                                                >
                                                    <Icon
                                                        icon={item.icon}
                                                        className={cn(
                                                            "h-6 w-6 transition-colors",
                                                            isActive
                                                                ? "text-black dark:text-white"
                                                                : "text-black/65 dark:text-white/65"
                                                        )}
                                                    />
                                                    {item.badge &&
                                                        item.badge > 0 && (
                                                            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full border border-black/30 bg-black px-1 text-[9px] font-bold text-white dark:border-white/30 dark:bg-white dark:text-black">
                                                                {item.badge > 9
                                                                    ? "9+"
                                                                    : item.badge}
                                                            </span>
                                                        )}
                                                </div>
                                                <span
                                                    className={cn(
                                                        "text-[11px] font-medium transition-colors",
                                                        isActive
                                                            ? "text-black/90 dark:text-white/90"
                                                            : "text-black/45 dark:text-white/45"
                                                    )}
                                                >
                                                    {item.label}
                                                </span>
                                            </Link>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
