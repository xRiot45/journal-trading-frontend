import { cn } from "@/lib/utils"
import { Icon } from "@iconify/react"
import { motion, useMotionValue } from "framer-motion"
import { useRef } from "react"

export default function AllAppsButton({
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
