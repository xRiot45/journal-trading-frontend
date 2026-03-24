"use client"

import { useRef } from "react"
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

export function DockItem({ item, isActive, mouseX, index = 0 }: DockItemProps) {
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
                        "border border-black/10 bg-white/90 text-black/90 backdrop-blur-md dark:border-white/10 dark:bg-black/90 dark:text-white/90",
                        "pointer-events-none opacity-0 shadow-xl shadow-black/10 group-hover:opacity-100 dark:shadow-black/30",
                        "transition-opacity duration-150"
                    )}
                >
                    {item.label}
                    <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-r border-b border-black/10 bg-white/90 dark:border-white/10 dark:bg-black/90" />
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
                                ? "shadow-lg ring-2 shadow-black/10 ring-black/20 dark:shadow-white/10 dark:ring-white/20"
                                : "hover:shadow-xl hover:shadow-black/20 dark:hover:shadow-black/40",
                            "bg-linear-to-br from-black/12 to-black/5 backdrop-blur-md dark:from-white/12 dark:to-white/5",
                            "border border-black/10 dark:border-white/10",
                            isActive &&
                                "border-black/20 from-black/20 to-black/10 dark:border-white/20 dark:from-white/20 dark:to-white/10"
                        )}
                    >
                        <Icon
                            icon={item.icon}
                            className={cn(
                                "h-[55%] w-[55%] transition-colors duration-200",
                                isActive
                                    ? "text-black dark:text-white"
                                    : "text-black/80 group-hover:text-black dark:text-white/80 dark:group-hover:text-white"
                            )}
                        />

                        {/* Badge */}
                        {item.badge && item.badge > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className={cn(
                                    "absolute -top-1 -right-1 h-4.5 min-w-4.5 px-1",
                                    "flex items-center justify-center rounded-full",
                                    "border border-black/20 bg-black text-[10px] font-bold text-white shadow-lg shadow-black/20",
                                    "dark:border-white/20 dark:bg-white dark:text-black dark:shadow-white/10"
                                )}
                            >
                                {item.badge > 9 ? "9+" : item.badge}
                            </motion.span>
                        )}
                    </motion.div>
                </Link>

                {/* Active dot indicator */}
                <motion.span
                    className="mt-1 h-1 w-1 rounded-full bg-black/70 dark:bg-white/70"
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
