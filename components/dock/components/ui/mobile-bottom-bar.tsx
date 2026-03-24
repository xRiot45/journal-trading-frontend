import { cn } from "@/lib/utils"
import { PINNED_DOCK_ITEMS } from "../../constants/dock-items"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import MobileNavItem from "./mobile-nav-item"

export default function MobileBottomBar({
    items,
    pathname,
    onShowAll,
}: {
    items: typeof PINNED_DOCK_ITEMS
    pathname: string
    onShowAll: () => void
}) {
    const visibleItems = items.slice(0, 4)

    return (
        <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={cn(
                "fixed right-0 bottom-0 left-0 z-50",
                "flex sm:hidden",
                "bg-white/90 backdrop-blur-2xl dark:bg-black/90",
                "border-t border-black/10 dark:border-white/10",
                "shadow-[0_-4px_24px_rgba(0,0,0,0.12)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.4)]",
                "safe-area-inset-bottom"
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
                            "border border-black/8 bg-black/6 transition-colors group-active:bg-black/12",
                            "dark:border-white/8 dark:bg-white/6 dark:group-active:bg-white/12"
                        )}
                    >
                        <Icon
                            icon="solar:widget-add-bold-duotone"
                            className="h-5 w-5 text-black/55 dark:text-white/55"
                        />
                    </div>
                    <span className="text-[10px] font-medium text-black/40 dark:text-white/40">
                        More
                    </span>
                </button>
            </div>
        </motion.div>
    )
}
