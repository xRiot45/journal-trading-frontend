export interface DockItem {
    id: string
    label: string
    icon: string
    href: string
    badge?: number
    isActive?: boolean
}

export interface DockModalItem extends DockItem {
    description?: string
    category?: string
    color?: string
}

export interface DockBarProps {
    items?: DockItem[]
    className?: string
    showLabels?: boolean
}

export interface DockItemProps {
    item: DockItem
    isActive?: boolean
    showLabel?: boolean
    index?: number
    mouseX?: import("framer-motion").MotionValue<number>
}

export interface DockModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export interface MobileDrawerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    items: DockItem[]
    onNavigate?: (href: string) => void
}
