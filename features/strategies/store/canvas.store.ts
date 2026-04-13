"use client"

import { create } from "zustand"
import {
    CanvasNode,
    CanvasEdge,
    Viewport,
    CanvasSettings,
    Tool,
    HistoryEntry,
    NodeType,
} from "../types/canvas"

const MAX_HISTORY = 50

interface CanvasStore {
    // Data
    nodes: CanvasNode[]
    edges: CanvasEdge[]
    viewport: Viewport
    settings: CanvasSettings
    title: string

    // Selection
    selectedNodeIds: string[]
    selectedEdgeId: string | null

    // Tool
    activeTool: Tool

    // History
    history: HistoryEntry[]
    historyIndex: number

    // Connecting
    connectingFrom: string | null

    // Dark mode
    isDark: boolean

    // Actions - Nodes
    addNode: (x: number, y: number, type: NodeType) => void
    updateNode: (id: string, patch: Partial<CanvasNode>) => void
    deleteNode: (id: string) => void
    deleteSelectedNodes: () => void

    // Actions - Edges
    addEdge: (source: string, target: string) => void
    deleteEdge: (id: string) => void
    deleteSelectedEdge: () => void

    // Actions - Selection
    selectNode: (id: string, additive?: boolean) => void
    selectEdge: (id: string) => void
    clearSelection: () => void
    selectAll: () => void

    // Actions - Viewport
    setViewport: (patch: Partial<Viewport>) => void
    resetZoom: () => void
    fitScreen: () => void
    zoomBy: (delta: number) => void

    // Actions - Tool
    setTool: (tool: Tool) => void

    // Actions - Connect
    startConnect: (nodeId: string) => void
    endConnect: (nodeId: string) => void
    cancelConnect: () => void

    // Actions - Settings
    updateSettings: (patch: Partial<CanvasSettings>) => void
    setTitle: (title: string) => void
    toggleDark: () => void

    // Clipboard
    clipboard: CanvasNode[]
    copySelected: () => void
    paste: () => void

    // History
    undo: () => void
    redo: () => void
    pushHistory: () => void

    // Delete under cursor
    deleteSelected: () => void
}

let nodeCounter = 1
let edgeCounter = 1

function genId(prefix: string) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export const useCanvasStore = create<CanvasStore>((set, get) => ({
    nodes: [
        {
            id: "node-demo-1",
            type: "default",
            x: 200,
            y: 200,
            width: 160,
            height: 60,
            label: "Entry Signal",
            selected: false,
            zIndex: 1,
        },
        {
            id: "node-demo-2",
            type: "decision",
            x: 460,
            y: 180,
            width: 120,
            height: 120,
            label: "Trend Up?",
            selected: false,
            zIndex: 1,
        },
        {
            id: "node-demo-3",
            type: "default",
            x: 680,
            y: 140,
            width: 160,
            height: 60,
            label: "Buy Order",
            selected: false,
            zIndex: 1,
        },
        {
            id: "node-demo-4",
            type: "default",
            x: 680,
            y: 300,
            width: 160,
            height: 60,
            label: "Wait / Skip",
            selected: false,
            zIndex: 1,
        },
        {
            id: "node-demo-5",
            type: "text",
            x: 200,
            y: 340,
            width: 200,
            height: 50,
            label: "XAUUSD Strategy v1.0",
            selected: false,
            zIndex: 1,
        },
    ],
    edges: [
        {
            id: "edge-1",
            source: "node-demo-1",
            target: "node-demo-2",
            selected: false,
        },
        {
            id: "edge-2",
            source: "node-demo-2",
            target: "node-demo-3",
            label: "Yes",
            selected: false,
        },
        {
            id: "edge-3",
            source: "node-demo-2",
            target: "node-demo-4",
            label: "No",
            selected: false,
        },
    ],
    viewport: { x: 0, y: 0, zoom: 1 },
    settings: {
        background: "dots",
        backgroundColor: "#ffffff",
        snapToGrid: true,
        gridSize: 20,
    },
    title: "Strategi Trading XAUUSD",
    selectedNodeIds: [],
    selectedEdgeId: null,
    activeTool: "select",
    history: [],
    historyIndex: -1,
    connectingFrom: null,
    clipboard: [],
    isDark: false,

    pushHistory: () => {
        const { nodes, edges, history, historyIndex } = get()
        const entry: HistoryEntry = {
            nodes: JSON.parse(JSON.stringify(nodes)),
            edges: JSON.parse(JSON.stringify(edges)),
        }
        const newHistory = history.slice(0, historyIndex + 1)
        newHistory.push(entry)
        if (newHistory.length > MAX_HISTORY) newHistory.shift()
        set({ history: newHistory, historyIndex: newHistory.length - 1 })
    },

    undo: () => {
        const { history, historyIndex } = get()
        if (historyIndex <= 0) return
        const prev = history[historyIndex - 1]
        set({
            nodes: prev.nodes,
            edges: prev.edges,
            historyIndex: historyIndex - 1,
            selectedNodeIds: [],
            selectedEdgeId: null,
        })
    },

    redo: () => {
        const { history, historyIndex } = get()
        if (historyIndex >= history.length - 1) return
        const next = history[historyIndex + 1]
        set({
            nodes: next.nodes,
            edges: next.edges,
            historyIndex: historyIndex + 1,
            selectedNodeIds: [],
            selectedEdgeId: null,
        })
    },

    addNode: (x, y, type) => {
        get().pushHistory()
        const snap = get().settings.snapToGrid ? get().settings.gridSize : 1
        const snappedX = Math.round(x / snap) * snap
        const snappedY = Math.round(y / snap) * snap
        const isDecision = type === "decision"
        const isText = type === "text"
        const node: CanvasNode = {
            id: genId("node"),
            type,
            x: snappedX,
            y: snappedY,
            width: isDecision ? 120 : isText ? 200 : 160,
            height: isDecision ? 120 : 60,
            label: isDecision ? "Decision?" : isText ? "Text" : "New Node",
            selected: true,
            zIndex: get().nodes.length + 1,
        }
        set((s) => ({
            nodes: s.nodes.map((n) => ({ ...n, selected: false })).concat(node),
            selectedNodeIds: [node.id],
            activeTool: "select",
        }))
    },

    updateNode: (id, patch) => {
        set((s) => ({
            nodes: s.nodes.map((n) => (n.id === id ? { ...n, ...patch } : n)),
        }))
    },

    deleteNode: (id) => {
        get().pushHistory()
        set((s) => ({
            nodes: s.nodes.filter((n) => n.id !== id),
            edges: s.edges.filter((e) => e.source !== id && e.target !== id),
            selectedNodeIds: s.selectedNodeIds.filter((sid) => sid !== id),
        }))
    },

    deleteSelectedNodes: () => {
        const { selectedNodeIds } = get()
        if (!selectedNodeIds.length) return
        get().pushHistory()
        set((s) => ({
            nodes: s.nodes.filter((n) => !s.selectedNodeIds.includes(n.id)),
            edges: s.edges.filter(
                (e) =>
                    !s.selectedNodeIds.includes(e.source) &&
                    !s.selectedNodeIds.includes(e.target)
            ),
            selectedNodeIds: [],
        }))
    },

    addEdge: (source, target) => {
        if (source === target) return
        const exists = get().edges.some(
            (e) => e.source === source && e.target === target
        )
        if (exists) return
        get().pushHistory()
        const edge: CanvasEdge = {
            id: genId("edge"),
            source,
            target,
            selected: false,
        }
        set((s) => ({ edges: [...s.edges, edge] }))
    },

    deleteEdge: (id) => {
        get().pushHistory()
        set((s) => ({
            edges: s.edges.filter((e) => e.id !== id),
            selectedEdgeId: null,
        }))
    },

    deleteSelectedEdge: () => {
        const { selectedEdgeId } = get()
        if (selectedEdgeId) get().deleteEdge(selectedEdgeId)
    },

    selectNode: (id, additive = false) => {
        set((s) => {
            if (additive) {
                const already = s.selectedNodeIds.includes(id)
                const newIds = already
                    ? s.selectedNodeIds.filter((sid) => sid !== id)
                    : [...s.selectedNodeIds, id]
                return {
                    selectedNodeIds: newIds,
                    selectedEdgeId: null,
                    nodes: s.nodes.map((n) => ({
                        ...n,
                        selected: newIds.includes(n.id),
                    })),
                }
            }
            return {
                selectedNodeIds: [id],
                selectedEdgeId: null,
                nodes: s.nodes.map((n) => ({ ...n, selected: n.id === id })),
            }
        })
    },

    selectEdge: (id) => {
        set((s) => ({
            selectedEdgeId: id,
            selectedNodeIds: [],
            edges: s.edges.map((e) => ({ ...e, selected: e.id === id })),
            nodes: s.nodes.map((n) => ({ ...n, selected: false })),
        }))
    },

    clearSelection: () => {
        set((s) => ({
            selectedNodeIds: [],
            selectedEdgeId: null,
            nodes: s.nodes.map((n) => ({ ...n, selected: false })),
            edges: s.edges.map((e) => ({ ...e, selected: false })),
        }))
    },

    selectAll: () => {
        set((s) => ({
            selectedNodeIds: s.nodes.map((n) => n.id),
            selectedEdgeId: null,
            nodes: s.nodes.map((n) => ({ ...n, selected: true })),
        }))
    },

    setViewport: (patch) => {
        set((s) => ({ viewport: { ...s.viewport, ...patch } }))
    },

    resetZoom: () => {
        set({ viewport: { x: 0, y: 0, zoom: 1 } })
    },

    fitScreen: () => {
        const { nodes } = get()
        if (!nodes.length) return
        const minX = Math.min(...nodes.map((n) => n.x))
        const minY = Math.min(...nodes.map((n) => n.y))
        const maxX = Math.max(...nodes.map((n) => n.x + n.width))
        const maxY = Math.max(...nodes.map((n) => n.y + n.height))
        const padding = 80
        const w = window.innerWidth - 280
        const h = window.innerHeight - 60
        const zoom = Math.min(
            w / (maxX - minX + padding * 2),
            h / (maxY - minY + padding * 2),
            1.5
        )
        const cx = (minX + maxX) / 2
        const cy = (minY + maxY) / 2
        set({ viewport: { x: w / 2 - cx * zoom, y: h / 2 - cy * zoom, zoom } })
    },

    zoomBy: (delta) => {
        set((s) => {
            const newZoom = Math.min(Math.max(s.viewport.zoom + delta, 0.1), 3)
            return { viewport: { ...s.viewport, zoom: newZoom } }
        })
    },

    setTool: (tool) => {
        set({ activeTool: tool, connectingFrom: null })
    },

    startConnect: (nodeId) => {
        set({ connectingFrom: nodeId, activeTool: "connect" })
    },

    endConnect: (nodeId) => {
        const { connectingFrom } = get()
        if (connectingFrom && connectingFrom !== nodeId) {
            get().addEdge(connectingFrom, nodeId)
        }
        set({ connectingFrom: null, activeTool: "select" })
    },

    cancelConnect: () => {
        set({ connectingFrom: null, activeTool: "select" })
    },

    updateSettings: (patch) => {
        set((s) => ({ settings: { ...s.settings, ...patch } }))
    },

    setTitle: (title) => set({ title }),

    toggleDark: () => {
        const { isDark } = get()
        const newDark = !isDark
        if (newDark) document.documentElement.classList.add("dark")
        else document.documentElement.classList.remove("dark")
        set({ isDark: newDark })
    },

    copySelected: () => {
        const { nodes, selectedNodeIds } = get()
        const copied = nodes.filter((n) => selectedNodeIds.includes(n.id))
        set({ clipboard: JSON.parse(JSON.stringify(copied)) })
    },

    paste: () => {
        const { clipboard } = get()
        if (!clipboard.length) return
        get().pushHistory()
        const now = Date.now()
        const newNodes = clipboard.map((n, i) => ({
            ...n,
            id: genId("node"),
            x: n.x + 20,
            y: n.y + 20,
            selected: true,
            zIndex: get().nodes.length + i + 1,
        }))
        set((s) => ({
            nodes: s.nodes
                .map((n) => ({ ...n, selected: false }))
                .concat(newNodes),
            selectedNodeIds: newNodes.map((n) => n.id),
        }))
    },

    deleteSelected: () => {
        const { selectedNodeIds, selectedEdgeId } = get()
        if (selectedNodeIds.length) get().deleteSelectedNodes()
        else if (selectedEdgeId) get().deleteSelectedEdge()
    },
}))
