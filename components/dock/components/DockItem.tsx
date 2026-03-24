"use client"

import React, { useRef } from "react"
import Link from "next/link"
import {
    motion,
    useSpring,
    useTransform,
    type MotionValue,
} from "framer-motion"
import { Icon } from "@iconify/react"
import type { DockItem } from "../types/dock.types"
import {
    DOCK_BASE_SIZE,
    DOCK_DISTANCE,
    DOCK_MAGNIFICATION,
} from "../utils/dock-utils"
import { cn } from "@/lib/utils"

interface DockItemProps {
    item: DockItem
    isActive?: boolean
    mouseX: MotionValue<number>
    index?: number
}

export function DockItemComponent({
    item,
    isActive,
    mouseX,
    index = 0,
}: DockItemProps) {
    const ref = useRef<HTMLDivElement>(null)

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? {
            left: 0,
            width: 0,
        }
        return Math.abs(val - (bounds.left + bounds.width / 2))
    })

    const rawSize = useTransform(
        distance,
        [0, DOCK_DISTANCE],
        [DOCK_MAGNIFICATION, DOCK_BASE_SIZE]
    )

    const size = useSpring(rawSize, { mass: 0.1, stiffness: 160, damping: 12 })
    const yOffset = useTransform(
        rawSize,
        [DOCK_BASE_SIZE, DOCK_MAGNIFICATION],
        [0, -10]
    )
    const ySpring = useSpring(yOffset, {
        mass: 0.1,
        stiffness: 160,
        damping: 12,
    })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                delay: index * 0.04,
                type: "spring",
                stiffness: 260,
                damping: 20,
            }}
            className="group relative flex flex-col items-center"
        >
            <motion.div
                style={{ y: ySpring }}
                className="flex flex-col items-center"
            >
                {/* Tooltip Label */}
                <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.9 }}
                    whileHover={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.15 }}
                    className={cn(
                        "absolute -top-10 rounded-lg px-2.5 py-1 text-xs font-medium whitespace-nowrap",
                        "border border-white/10 bg-[#1a1a2e]/90 text-white/90 backdrop-blur-md",
                        "pointer-events-none opacity-0 shadow-xl shadow-black/30 group-hover:opacity-100",
                        "transition-opacity duration-150"
                    )}
                >
                    {item.label}
                    {/* Tooltip arrow */}
                    <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-r border-b border-white/10 bg-[#1a1a2e]/90" />
                </motion.div>

                {/* Icon Wrapper */}
                <Link href={item.href} prefetch={false} aria-label={item.label}>
                    <motion.div
                        style={{ width: size, height: size }}
                        whileTap={{ scale: 0.88 }}
                        className={cn(
                            "relative flex cursor-pointer items-center justify-center rounded-[22%]",
                            "transition-shadow duration-200",
                            isActive
                                ? "shadow-lg ring-2 shadow-white/10 ring-white/20"
                                : "hover:shadow-xl hover:shadow-black/40",
                            // macOS-like glass tile bg
                            "bg-linear-to-br from-white/12 to-white/5 backdrop-blur-md",
                            "border border-white/10",
                            isActive &&
                                "border-white/20 from-white/20 to-white/10"
                        )}
                    >
                        <Icon
                            icon={item.icon}
                            className={cn(
                                "h-[55%] w-[55%] transition-colors duration-200",
                                isActive
                                    ? "text-white"
                                    : "text-white/80 group-hover:text-white"
                            )}
                        />

                        {/* Badge */}
                        {item.badge && item.badge > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className={cn(
                                    "absolute -top-1 -right-1 h-4.5 min-w-4.5 px-1",
                                    "rounded-full bg-red-500 text-[10px] font-bold text-white",
                                    "flex items-center justify-center shadow-lg shadow-red-500/40",
                                    "border border-red-400/50"
                                )}
                            >
                                {item.badge > 9 ? "9+" : item.badge}
                            </motion.span>
                        )}
                    </motion.div>
                </Link>

                {/* Active dot indicator */}
                <motion.span
                    className="mt-1 h-1 w-1 rounded-full bg-white/70"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
            </motion.div>
        </motion.div>
    )
}
