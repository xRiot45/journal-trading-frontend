import { useTransform, type MotionValue } from "framer-motion"

export const DOCK_MAGNIFICATION = 72
export const DOCK_BASE_SIZE = 52
export const DOCK_DISTANCE = 120

/**
 * Returns a framer-motion transformed value for icon magnification.
 * Simulates the macOS dock magnification effect.
 */
export function useMagnification(
    mouseX: MotionValue<number>,
    ref: React.RefObject<HTMLElement>
): MotionValue<number> {
    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect()
        if (!bounds) return DOCK_DISTANCE + 1
        return Math.abs(val - (bounds.left + bounds.width / 2))
    })

    const size = useTransform(
        distance,
        [0, DOCK_DISTANCE],
        [DOCK_MAGNIFICATION, DOCK_BASE_SIZE]
    )

    return size
}

/**
 * Returns a width transform based on mouse proximity.
 */
export function useWidthTransform(
    mouseX: MotionValue<number>,
    ref: React.RefObject<HTMLElement>
) {
    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect()
        if (!bounds) return DOCK_DISTANCE + 1
        return Math.abs(val - (bounds.left + bounds.width / 2))
    })

    return useTransform(
        distance,
        [0, DOCK_DISTANCE],
        [DOCK_MAGNIFICATION, DOCK_BASE_SIZE]
    )
}

/**
 * Groups an array of items by a given key.
 */
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
    return arr.reduce(
        (acc, item) => {
            const groupKey = String(item[key] ?? "Other")
            if (!acc[groupKey]) acc[groupKey] = []
            acc[groupKey].push(item)
            return acc
        },
        {} as Record<string, T[]>
    )
}

/**
 * Checks if a given href matches the current pathname.
 */
export function isActiveRoute(href: string, pathname: string): boolean {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
}
