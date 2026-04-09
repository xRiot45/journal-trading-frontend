import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatPnL(value: number): string {
    if (value === 0) return "$0"
    const abs = Math.abs(value)
    const formatted = abs >= 1000 ? `$${(abs / 1000).toFixed(1)}k` : `$${abs}`
    return value > 0 ? `+${formatted}` : `-${formatted}`
}

export function getMonthName(month: number): string {
    return new Date(2000, month - 1, 1).toLocaleString("default", {
        month: "long",
    })
}

export function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate()
}

export function getFirstDayOfMonth(year: number, month: number): number {
    // 0 = Sunday, 1 = Monday, ...
    return new Date(year, month - 1, 1).getDay()
}

export function isToday(dateStr: string): boolean {
    const today = new Date()
    const date = new Date(dateStr)
    return (
        today.getFullYear() === date.getFullYear() &&
        today.getMonth() === date.getMonth() &&
        today.getDate() === date.getDate()
    )
}
