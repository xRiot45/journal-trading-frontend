import type { DockItem, DockModalItem } from "../types/dock.types"

export const PINNED_DOCK_ITEMS: DockItem[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: "ic:round-dashboard",
        href: "/dashboard",
    },

    // Dashboard
    // Planning
    // Journal
    // Calendar
    // Master Data
    // Strategy

    {
        id: "pairs",
        label: "Pairs",
        icon: "fluent:pair-20-filled",
        href: "/pairs",
    },
    {
        id: "sessions",
        label: "Sessions",
        icon: "pajamas:session-ai",
        href: "/sessions",
    },
    {
        id: "strategies",
        label: "Strategy",
        icon: "material-symbols:strategy-outline",
        href: "/strategies",
    },
    {
        id: "plannings",
        label: "Planning",
        icon: "pajamas:planning",
        href: "/plannings",
    },
    {
        id: "journals",
        label: "Journals",
        icon: "mdi:journal",
        href: "/journals",
    },
    {
        id: "calendars",
        label: "Calendar",
        icon: "solar:calendar-bold-duotone",
        href: "/calendar",
    },
]

export const MODAL_ALL_ITEMS: DockModalItem[] = [
    ...PINNED_DOCK_ITEMS.map((item) => ({
        ...item,
        category: "Pinned",
        description: `Navigate to ${item.label}`,
    })),
    {
        id: "profile",
        label: "Profile",
        icon: "solar:user-circle-bold-duotone",
        href: "/profile",
        category: "Account",
        description: "View and edit your profile",
        color: "#6366f1",
    },
    {
        id: "files",
        label: "Files",
        icon: "solar:file-bold-duotone",
        href: "/files",
        category: "Content",
        description: "Browse your file library",
        color: "#f59e0b",
    },
    {
        id: "calendar",
        label: "Calendar",
        icon: "solar:calendar-bold-duotone",
        href: "/calendar",
        category: "Productivity",
        description: "Schedule and events",
        color: "#ef4444",
    },
    {
        id: "media",
        label: "Media",
        icon: "solar:gallery-bold-duotone",
        href: "/media",
        category: "Content",
        description: "Your media gallery",
        color: "#8b5cf6",
    },
    {
        id: "integrations",
        label: "Integrations",
        icon: "solar:plug-circle-bold-duotone",
        href: "/integrations",
        category: "Developer",
        description: "Third-party integrations",
        color: "#10b981",
    },
    {
        id: "api",
        label: "API Keys",
        icon: "solar:key-bold-duotone",
        href: "/api-keys",
        category: "Developer",
        description: "Manage your API keys",
        color: "#f97316",
    },
    {
        id: "team",
        label: "Team",
        icon: "solar:users-group-rounded-bold-duotone",
        href: "/team",
        category: "Account",
        description: "Manage team members",
        color: "#06b6d4",
    },
    {
        id: "billing",
        label: "Billing",
        icon: "solar:card-bold-duotone",
        href: "/billing",
        category: "Account",
        description: "Subscription & billing",
        color: "#84cc16",
    },
    {
        id: "docs",
        label: "Docs",
        icon: "solar:document-text-bold-duotone",
        href: "/docs",
        category: "Help",
        description: "Documentation & guides",
        color: "#a855f7",
    },
    {
        id: "support",
        label: "Support",
        icon: "solar:question-circle-bold-duotone",
        href: "/support",
        category: "Help",
        description: "Get help & support",
        color: "#ec4899",
    },
]

export const MODAL_CATEGORIES = [
    ...new Set(MODAL_ALL_ITEMS.map((item) => item.category).filter(Boolean)),
] as string[]
