// utils/time.ts
export function toHHmmss(time: string): string {
    if (!time) return ""
    return time.length === 5 ? `${time}:00` : time
}

export function toHHmm(time: string): string {
    if (!time) return ""
    return time.length === 8 ? time.slice(0, 5) : time
}
