"use client"

import { useEffect, useCallback, useRef, useState } from "react"
import { useCanvasStore } from "../../store/canvas.store"
import { CanvasBackground } from "./canvas-background"
import { NodeRenderer } from "./node"
import { EdgeRenderer } from "./edge"
import { Toolbar } from "./toolbar"
import { Sidebar } from "./sidebar"
import { Controls } from "./controls"
import { Minimap } from "./minimap"
import { Topbar } from "./topbar"
import { clamp, snapToGrid } from "@/lib/utils"
import { useGetElementsByStrategyId } from "../../hooks/use-elements-queries"
import { useStrategyStore } from "../../store/strategies.store"
import { CanvasEdge, CanvasNode } from "../../types/canvas"

export function CanvasRoot() {
    const strategyId = useStrategyStore((state) => state.selectedStrategyId)
    const containerRef = useRef<HTMLDivElement>(null)
    const isDraggingCanvas = useRef(false)
    const lastPointer = useRef({ x: 0, y: 0 })
    const isSpaceDown = useRef(false)
    const boxSelectStart = useRef<{ x: number; y: number } | null>(null)
    const [boxSelect, setBoxSelect] = useState<{
        x: number
        y: number
        w: number
        h: number
    } | null>(null)
    const [connectLine, setConnectLine] = useState<{
        sx: number
        sy: number
        ex: number
        ey: number
    } | null>(null)
    const isPinching = useRef(false)
    const lastPinchDist = useRef(0)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const {
        viewport,
        setViewport,
        zoomBy,
        clearSelection,
        activeTool,
        addNode,
        nodes,
        settings,
        connectingFrom,
        cancelConnect,
        deleteSelected,
        undo,
        redo,
        copySelected,
        paste,
        selectAll,
        setElements,
        fitScreen,
    } = useCanvasStore()

    const { data: response, isSuccess } = useGetElementsByStrategyId(
        strategyId as string
    )

    useEffect(() => {
        if (isSuccess && response?.data) {
            const rawData = response.data
            const mappedNodes: CanvasNode[] = rawData
                .filter((el) => el.type === "node")
                .map((el) => ({
                    id: el.id,
                    type: "default", // Sesuaikan jika ada logika tipe lain
                    x: el.x,
                    y: el.y,
                    width: el.width || 160,
                    height: el.height || 60,
                    label: el.identifier, // Database menggunakan 'identifier' sebagai teks
                    selected: false,
                    zIndex: el.zIndex || 1,
                }))

            // 2. Map Edges (Jika nanti API mengembalikan tipe 'edge')
            const mappedEdges: CanvasEdge[] = rawData
                .filter((el: any) => el.type === "edge")
                .map((el: any) => ({
                    id: el.id,
                    source: el.sourceId, // Pastikan field ini sesuai dengan response nantinya
                    target: el.targetId,
                    label: el.identifier || "",
                    selected: false,
                }))

            // 3. Simpan ke Store
            setElements(mappedNodes, mappedEdges)

            // Beri sedikit delay agar DOM selesai render sebelum kalkulasi fitScreen
            requestAnimationFrame(() => {
                fitScreen()
            })
        }
    }, [isSuccess, response, setElements, fitScreen])

    // Keyboard shortcuts
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const tag = (e.target as HTMLElement).tagName
            if (tag === "INPUT" || tag === "TEXTAREA") return
            if (e.key === " ") {
                isSpaceDown.current = true
                e.preventDefault()
            }
            if (e.key === "Delete" || e.key === "Backspace") deleteSelected()
            if (e.key === "z" && (e.ctrlKey || e.metaKey) && e.shiftKey) redo()
            else if (e.key === "z" && (e.ctrlKey || e.metaKey)) undo()
            if (e.key === "c" && (e.ctrlKey || e.metaKey)) copySelected()
            if (e.key === "v" && (e.ctrlKey || e.metaKey)) paste()
            if (e.key === "a" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault()
                selectAll()
            }
            if (e.key === "Escape") {
                cancelConnect()
                setConnectLine(null)
            }
        }
        const onKeyUp = (e: KeyboardEvent) => {
            if (e.key === " ") isSpaceDown.current = false
        }
        window.addEventListener("keydown", onKeyDown)
        window.addEventListener("keyup", onKeyUp)
        return () => {
            window.removeEventListener("keydown", onKeyDown)
            window.removeEventListener("keyup", onKeyUp)
        }
    }, [
        deleteSelected,
        undo,
        redo,
        copySelected,
        paste,
        selectAll,
        cancelConnect,
    ])

    // Mouse wheel zoom / pan
    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const onWheel = (e: WheelEvent) => {
            e.preventDefault()
            const rect = el.getBoundingClientRect()
            const cx = e.clientX - rect.left
            const cy = e.clientY - rect.top
            const { viewport: vp } = useCanvasStore.getState()
            if (e.ctrlKey || e.metaKey) {
                const delta = -e.deltaY * 0.002
                const newZoom = clamp(vp.zoom + delta * vp.zoom, 0.1, 3)
                const scale = newZoom / vp.zoom
                setViewport({
                    zoom: newZoom,
                    x: cx - (cx - vp.x) * scale,
                    y: cy - (cy - vp.y) * scale,
                })
            } else {
                setViewport({ x: vp.x - e.deltaX, y: vp.y - e.deltaY })
            }
        }
        el.addEventListener("wheel", onWheel, { passive: false })
        return () => el.removeEventListener("wheel", onWheel)
    }, [setViewport])

    const toCanvasCoords = useCallback((clientX: number, clientY: number) => {
        const rect = containerRef.current?.getBoundingClientRect()
        if (!rect) return { x: 0, y: 0 }
        const vp = useCanvasStore.getState().viewport
        return {
            x: (clientX - rect.left - vp.x) / vp.zoom,
            y: (clientY - rect.top - vp.y) / vp.zoom,
        }
    }, [])

    const onPointerDown = useCallback(
        (e: React.PointerEvent) => {
            if (e.button !== 0) return
            const target = e.target as HTMLElement
            const isCanvas =
                target === containerRef.current ||
                target.classList.contains("canvas-bg-layer") ||
                target.tagName === "svg" ||
                (target.tagName === "rect" && !target.closest(".canvas-node"))

            if (!isCanvas) return

            e.currentTarget.setPointerCapture(e.pointerId)

            const tool = useCanvasStore.getState().activeTool

            if (isSpaceDown.current || tool === "select") {
                isDraggingCanvas.current = false
                boxSelectStart.current = null
                if (isSpaceDown.current) {
                    isDraggingCanvas.current = true
                    lastPointer.current = { x: e.clientX, y: e.clientY }
                    if (containerRef.current)
                        containerRef.current.style.cursor = "grabbing"
                } else {
                    // Begin box select + pan
                    clearSelection()
                    boxSelectStart.current = toCanvasCoords(
                        e.clientX,
                        e.clientY
                    )
                    lastPointer.current = { x: e.clientX, y: e.clientY }
                }
                return
            }

            if (tool === "node" || tool === "text" || tool === "decision") {
                const coords = toCanvasCoords(e.clientX, e.clientY)
                const gs = useCanvasStore.getState().settings.gridSize
                const doSnap = useCanvasStore.getState().settings.snapToGrid
                const type =
                    tool === "decision"
                        ? "decision"
                        : tool === "text"
                          ? "text"
                          : "default"
                addNode(
                    doSnap ? snapToGrid(coords.x - 80, gs) : coords.x - 80,
                    doSnap ? snapToGrid(coords.y - 30, gs) : coords.y - 30,
                    type
                )
            }
        },
        [clearSelection, addNode, toCanvasCoords]
    )

    const onPointerMove = useCallback(
        (e: React.PointerEvent) => {
            // Connecting preview line
            const {
                connectingFrom: cf,
                nodes: ns,
                viewport: vp,
            } = useCanvasStore.getState()
            if (cf) {
                const srcNode = ns.find((n) => n.id === cf)
                if (srcNode && containerRef.current) {
                    const rect = containerRef.current.getBoundingClientRect()
                    const sx = (srcNode.x + srcNode.width / 2) * vp.zoom + vp.x
                    const sy = (srcNode.y + srcNode.height / 2) * vp.zoom + vp.y
                    setConnectLine({
                        sx,
                        sy,
                        ex: e.clientX - rect.left,
                        ey: e.clientY - rect.top,
                    })
                }
                return
            }
            if (connectLine) setConnectLine(null)

            if (isDraggingCanvas.current) {
                const dx = e.clientX - lastPointer.current.x
                const dy = e.clientY - lastPointer.current.y
                lastPointer.current = { x: e.clientX, y: e.clientY }
                const cur = useCanvasStore.getState().viewport
                setViewport({ x: cur.x + dx, y: cur.y + dy })
                return
            }

            if (boxSelectStart.current) {
                const current = toCanvasCoords(e.clientX, e.clientY)
                const sx = Math.min(boxSelectStart.current.x, current.x)
                const sy = Math.min(boxSelectStart.current.y, current.y)
                const sw = Math.abs(current.x - boxSelectStart.current.x)
                const sh = Math.abs(current.y - boxSelectStart.current.y)
                setBoxSelect({ x: sx, y: sy, w: sw, h: sh })
                const store = useCanvasStore.getState()
                const selected = store.nodes
                    .filter(
                        (n) =>
                            n.x < sx + sw &&
                            n.x + n.width > sx &&
                            n.y < sy + sh &&
                            n.y + n.height > sy
                    )
                    .map((n) => n.id)
                useCanvasStore.setState({
                    selectedNodeIds: selected,
                    nodes: store.nodes.map((n) => ({
                        ...n,
                        selected: selected.includes(n.id),
                    })),
                })
            }
        },
        [setViewport, toCanvasCoords, connectLine]
    )

    const onPointerUp = useCallback((e: React.PointerEvent) => {
        isDraggingCanvas.current = false
        boxSelectStart.current = null
        setBoxSelect(null)
        if (containerRef.current) containerRef.current.style.cursor = ""
        try {
            e.currentTarget.releasePointerCapture(e.pointerId)
        } catch {}
    }, [])

    // Touch pinch zoom
    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length !== 2) return
            e.preventDefault()
            const dx = e.touches[0].clientX - e.touches[1].clientX
            const dy = e.touches[0].clientY - e.touches[1].clientY
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (isPinching.current)
                zoomBy((dist - lastPinchDist.current) * 0.005)
            isPinching.current = true
            lastPinchDist.current = dist
        }
        const onTouchEnd = () => {
            isPinching.current = false
        }
        el.addEventListener("touchmove", onTouchMove, { passive: false })
        el.addEventListener("touchend", onTouchEnd)
        return () => {
            el.removeEventListener("touchmove", onTouchMove)
            el.removeEventListener("touchend", onTouchEnd)
        }
    }, [zoomBy])

    const transform = `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`

    // eslint-disable-next-line react-hooks/refs
    const cursorStyle = isSpaceDown.current
        ? "grab"
        : activeTool === "node" ||
            activeTool === "text" ||
            activeTool === "decision"
          ? "crosshair"
          : activeTool === "connect"
            ? "crosshair"
            : "default"

    if (!mounted) {
        return <div className="h-screen w-screen bg-background" />
    }

    return (
        <div
            className="flex h-screen w-screen flex-col overflow-hidden"
            style={{
                background: "var(--canvas-bg)",
                color: "var(--canvas-text)",
            }}
        >
            <Topbar />

            <div className="relative flex flex-1 overflow-hidden">
                {/* Floating left toolbar */}
                <div className="pointer-events-auto absolute top-1/2 left-4 z-20 -translate-y-1/2">
                    <Toolbar />
                </div>

                {/* Canvas */}
                <div
                    ref={containerRef}
                    className="canvas-container relative flex-1"
                    style={{ cursor: cursorStyle }}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerLeave={onPointerUp}
                >
                    {/* BG layer */}
                    <div className="canvas-bg-layer pointer-events-none absolute inset-0">
                        <CanvasBackground
                            settings={settings}
                            viewport={viewport}
                        />
                    </div>

                    {/* Transform layer */}
                    <div className="canvas-layer" style={{ transform }}>
                        <EdgeRenderer />
                        {nodes.map((node) => (
                            <NodeRenderer key={node.id} node={node} />
                        ))}
                    </div>

                    {/* Box select */}
                    {boxSelect && boxSelect.w > 4 && boxSelect.h > 4 && (
                        <div
                            className="box-select"
                            style={{
                                left: boxSelect.x * viewport.zoom + viewport.x,
                                top: boxSelect.y * viewport.zoom + viewport.y,
                                width: boxSelect.w * viewport.zoom,
                                height: boxSelect.h * viewport.zoom,
                            }}
                        />
                    )}

                    {/* Connect line preview */}
                    {connectLine && (
                        <svg
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                pointerEvents: "none",
                                zIndex: 50,
                            }}
                        >
                            <defs>
                                <marker
                                    id="ca-arrow"
                                    markerWidth="7"
                                    markerHeight="7"
                                    refX="5"
                                    refY="3"
                                    orient="auto"
                                >
                                    <path
                                        d="M0,0 L0,6 L7,3 z"
                                        fill="var(--canvas-accent)"
                                    />
                                </marker>
                            </defs>
                            <line
                                x1={connectLine.sx}
                                y1={connectLine.sy}
                                x2={connectLine.ex}
                                y2={connectLine.ey}
                                stroke="var(--canvas-accent)"
                                strokeWidth={2}
                                strokeDasharray="6 4"
                                markerEnd="url(#ca-arrow)"
                            />
                        </svg>
                    )}

                    {/* Status pills */}
                    {connectingFrom && (
                        <div
                            className="toolbar-glass pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-medium"
                            style={{
                                color: "var(--canvas-text)",
                                boxShadow: "var(--canvas-shadow)",
                            }}
                        >
                            Click a node to connect · ESC to cancel
                        </div>
                    )}
                    {(activeTool === "node" ||
                        activeTool === "text" ||
                        activeTool === "decision") && (
                        <div
                            className="toolbar-glass pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-medium"
                            style={{
                                color: "var(--canvas-text)",
                                boxShadow: "var(--canvas-shadow)",
                            }}
                        >
                            Click canvas to place node · ESC to cancel
                        </div>
                    )}
                </div>

                <Sidebar />
            </div>

            <Controls />
            <Minimap />
        </div>
    )
}
