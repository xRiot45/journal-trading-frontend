"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MODAL_ALL_ITEMS, MODAL_CATEGORIES } from "../constants/dock-items"
import type { DockModalProps } from "../types/dock.types"
import { cn } from "@/lib/utils"

const CATEGORY_COLORS: Record<string, string> = {
    Pinned: "#6366f1",
    Account: "#06b6d4",
    Content: "#f59e0b",
    Productivity: "#ef4444",
    Developer: "#10b981",
    Help: "#ec4899",
}

export function DockModal({ open, onOpenChange }: DockModalProps) {
    const [search, setSearch] = useState("")
    const [activeCategory, setActiveCategory] = useState<string | null>(null)

    const filtered = MODAL_ALL_ITEMS.filter((item) => {
        const matchSearch =
            item.label.toLowerCase().includes(search.toLowerCase()) ||
            item.description?.toLowerCase().includes(search.toLowerCase())
        const matchCategory = activeCategory
            ? item.category === activeCategory
            : true
        return matchSearch && matchCategory
    })

    const grouped = filtered.reduce<Record<string, typeof filtered>>(
        (acc, item) => {
            const cat = item.category ?? "Other"
            if (!acc[cat]) acc[cat] = []
            acc[cat].push(item)
            return acc
        },
        {}
    )

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className={cn(
                    "flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden",
                    "border border-white/10 bg-[#0d0d1a]/95 backdrop-blur-2xl",
                    "rounded-2xl shadow-2xl shadow-black/60"
                )}
            >
                <DialogHeader className="shrink-0 pb-0">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 shadow-lg">
                            <Icon
                                icon="solar:widget-5-bold-duotone"
                                className="h-4 w-4 text-white"
                            />
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-semibold tracking-tight text-white">
                                All Navigation
                            </DialogTitle>
                            <p className="mt-0.5 text-xs text-white/40">
                                {MODAL_ALL_ITEMS.length} destinations
                            </p>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative mb-3">
                        <Icon
                            icon="solar:magnifer-linear"
                            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/30"
                        />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search navigation..."
                            className={cn(
                                "border-white/10 bg-white/5 pl-9 text-white/90 placeholder:text-white/25",
                                "h-9 rounded-xl text-sm focus-visible:ring-1 focus-visible:ring-indigo-500/50",
                                "focus-visible:border-indigo-500/30"
                            )}
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-white/30 transition-colors hover:text-white/70"
                            >
                                <Icon
                                    icon="solar:close-circle-bold"
                                    className="h-4 w-4"
                                />
                            </button>
                        )}
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-1.5 border-b border-white/8 pb-3">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveCategory(null)}
                            className={cn(
                                "rounded-full px-3 py-1 text-xs font-medium transition-all duration-150",
                                activeCategory === null
                                    ? "border border-indigo-500/30 bg-indigo-500/20 text-indigo-300"
                                    : "border border-transparent text-white/40 hover:bg-white/5 hover:text-white/70"
                            )}
                        >
                            All
                        </motion.button>
                        {MODAL_CATEGORIES.map((cat) => (
                            <motion.button
                                key={cat}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                    setActiveCategory(
                                        activeCategory === cat ? null : cat
                                    )
                                }
                                className={cn(
                                    "rounded-full border px-3 py-1 text-xs font-medium transition-all duration-150",
                                    activeCategory === cat
                                        ? "border-white/20 bg-white/10 text-white"
                                        : "border-transparent text-white/40 hover:bg-white/5 hover:text-white/70"
                                )}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </DialogHeader>

                {/* Items Grid */}
                <div className="custom-scrollbar -mx-1 mt-1 flex-1 overflow-y-auto px-1">
                    <AnimatePresence mode="wait">
                        {Object.keys(grouped).length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-16 text-white/30"
                            >
                                <Icon
                                    icon="solar:telescope-bold-duotone"
                                    className="mb-3 h-10 w-10 opacity-50"
                                />
                                <p className="text-sm">No results found</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-5 py-2"
                            >
                                {Object.entries(grouped).map(
                                    ([category, items]) => (
                                        <div key={category}>
                                            <div className="mb-2 flex items-center gap-2">
                                                <span
                                                    className="h-1.5 w-1.5 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            CATEGORY_COLORS[
                                                                category
                                                            ] ?? "#6366f1",
                                                    }}
                                                />
                                                <span className="text-[11px] font-semibold tracking-widest text-white/35 uppercase">
                                                    {category}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                                                {items.map((item, i) => (
                                                    <motion.div
                                                        key={item.id}
                                                        initial={{
                                                            opacity: 0,
                                                            y: 8,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        transition={{
                                                            delay: i * 0.03,
                                                        }}
                                                    >
                                                        <Link
                                                            href={item.href}
                                                            onClick={() =>
                                                                onOpenChange(
                                                                    false
                                                                )
                                                            }
                                                            className={cn(
                                                                "group flex flex-col items-center gap-2 rounded-xl p-3",
                                                                "border border-white/6 bg-white/4 hover:border-white/14 hover:bg-white/8",
                                                                "cursor-pointer text-center transition-all duration-200"
                                                            )}
                                                        >
                                                            <div
                                                                className="relative flex h-10 w-10 items-center justify-center rounded-[14px]"
                                                                style={{
                                                                    background: `linear-gradient(135deg, ${CATEGORY_COLORS[category] ?? "#6366f1"}22, ${CATEGORY_COLORS[category] ?? "#6366f1"}11)`,
                                                                    border: `1px solid ${CATEGORY_COLORS[category] ?? "#6366f1"}30`,
                                                                }}
                                                            >
                                                                <Icon
                                                                    icon={
                                                                        item.icon
                                                                    }
                                                                    className="h-5 w-5 transition-transform duration-200 group-hover:scale-110"
                                                                    style={{
                                                                        color:
                                                                            CATEGORY_COLORS[
                                                                                category
                                                                            ] ??
                                                                            "#6366f1",
                                                                    }}
                                                                />
                                                                {item.badge &&
                                                                    item.badge >
                                                                        0 && (
                                                                        <Badge className="absolute -top-1.5 -right-1.5 h-4 min-w-4 border-0 bg-red-500 px-1 text-[9px] hover:bg-red-500">
                                                                            {item.badge >
                                                                            9
                                                                                ? "9+"
                                                                                : item.badge}
                                                                        </Badge>
                                                                    )}
                                                            </div>
                                                            <div>
                                                                <p className="text-xs leading-tight font-medium text-white/85 transition-colors group-hover:text-white">
                                                                    {item.label}
                                                                </p>
                                                                {item.description && (
                                                                    <p className="mt-0.5 line-clamp-1 text-[10px] leading-tight text-white/30">
                                                                        {
                                                                            item.description
                                                                        }
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </Link>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    )
}
