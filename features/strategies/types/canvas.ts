export type NodeType = "default" | "text" | "decision"

export interface CanvasNode {
    id: string
    type: NodeType
    x: number
    y: number
    width: number
    height: number
    label: string
    selected: boolean
    zIndex: number
    backendElementId?: string
}

export interface CanvasEdge {
    id: string
    source: string
    target: string
    label?: string
    selected: boolean
}

export interface Viewport {
    x: number
    y: number
    zoom: number
}

export interface CanvasSettings {
    background: "dots" | "grid" | "none"
    backgroundColor: string
    snapToGrid: boolean
    gridSize: number
}

export type Tool = "select" | "node" | "text" | "decision" | "connect"

export interface HistoryEntry {
    nodes: CanvasNode[]
    edges: CanvasEdge[]
}

export interface StrategyData {
    id: string
    title: string
    description: string
    lastEditedAt: string
    viewport: {
        viewportX: number
        viewportY: number
        zoom: number
    }
    canvasSettings: {
        background: "dots" | "grid" | "none"
        backgroundColor: string
        snapToGrid: number
        gridSize: number
    }
}
