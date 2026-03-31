export interface RichTextEditorProps {
    /** Current HTML content value */
    value?: string
    /** Callback fired when content changes */
    onChange?: (html: string) => void
    /** Placeholder text shown when editor is empty */
    placeholder?: string
    /** Whether the editor is in read-only mode */
    readOnly?: boolean
    /** Whether the editor is disabled */
    disabled?: boolean
    /** Minimum height of the editor content area */
    minHeight?: string
    /** Maximum height of the editor content area (enables scroll) */
    maxHeight?: string
    /** Custom class name for the wrapper */
    className?: string
    /** Show character count at the bottom */
    showCharCount?: boolean
    /** Max characters allowed (0 = unlimited) */
    maxChars?: number
    /** Show word count at the bottom */
    showWordCount?: boolean
    /** Whether to show the source HTML toggle */
    showHtmlToggle?: boolean
    /** Auto focus the editor on mount */
    autoFocus?: boolean
}

export interface ToolbarGroupProps {
    children: React.ReactNode
    className?: string
}

export interface EditorButtonProps {
    icon: string
    label: string
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
    className?: string
    size?: "sm" | "md" | "lg"
    variant?: "default" | "ghost" | "outline"
}

export interface EditorTooltipProps {
    children: React.ReactNode
    content: string
    shortcut?: string
    side?: "top" | "bottom" | "left" | "right"
}

export interface HeadingLevel {
    level: 1 | 2 | 3 | 4 | 5 | 6
    label: string
    icon: string
}

export interface ToolbarSection {
    id: string
    items: ToolbarItem[]
}

export interface ToolbarItem {
    id: string
    label: string
    icon: string
    shortcut?: string
    action: () => void
    isActive: () => boolean
    disabled?: boolean
}
