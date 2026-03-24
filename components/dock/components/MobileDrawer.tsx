"use client"

import React from "react"
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
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
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
                            "bg-[#0d0d1a]/95 backdrop-blur-2xl",
                            "rounded-t-2xl border-t border-white/10",
                            "shadow-2xl shadow-black/60"
                        )}
                    >
                        {/* Drag Handle */}
                        <div className="flex justify-center pt-3 pb-1">
                            <div className="h-1 w-10 rounded-full bg-white/20" />
                        </div>

                        <div className="p-4 pb-8">
                            <p className="mb-4 px-1 text-[11px] font-semibold tracking-widest text-white/35 uppercase">
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
                                                            ? "border-white/20 bg-white/15"
                                                            : "border-white/8 bg-white/6 group-active:bg-white/10"
                                                    )}
                                                >
                                                    <Icon
                                                        icon={item.icon}
                                                        className={cn(
                                                            "h-6 w-6 transition-colors",
                                                            isActive
                                                                ? "text-white"
                                                                : "text-white/65"
                                                        )}
                                                    />
                                                    {item.badge &&
                                                        item.badge > 0 && (
                                                            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full border border-red-400/30 bg-red-500 px-1 text-[9px] font-bold text-white">
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
                                                            ? "text-white/90"
                                                            : "text-white/45"
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
