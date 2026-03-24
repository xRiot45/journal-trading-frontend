import { cn } from "@/lib/utils"
import { PINNED_DOCK_ITEMS } from "../../constants/dock-items"
import { Icon } from "@iconify/react"

export default function MobileNavItem({
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
                        ? "border-black/18 bg-black/14 dark:border-white/18 dark:bg-white/14"
                        : "border-transparent bg-transparent"
                )}
            >
                <Icon
                    icon={item.icon}
                    className={cn(
                        "h-5 w-5 transition-colors",
                        isActive
                            ? "text-black dark:text-white"
                            : "text-black/45 dark:text-white/45"
                    )}
                />
                {item.badge && item.badge > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-black px-0.5 text-[9px] font-bold text-white dark:bg-white dark:text-black">
                        {item.badge > 9 ? "9+" : item.badge}
                    </span>
                )}
            </div>
            <span
                className={cn(
                    "text-[10px] font-medium transition-colors",
                    isActive
                        ? "text-black/90 dark:text-white/90"
                        : "text-black/38 dark:text-white/38"
                )}
            >
                {item.label}
            </span>
        </a>
    )
}
