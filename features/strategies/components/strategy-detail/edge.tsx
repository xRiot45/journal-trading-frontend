"use client"

import { useMemo, memo } from "react"
import { useCanvasStore } from "../../store/canvas.store"
import { CanvasEdge, CanvasNode } from "../../types/canvas"

const EdgePath = memo(function EdgePath({
    edge,
    nodes,
    onSelect,
}: {
    edge: CanvasEdge
    nodes: CanvasNode[]
    onSelect: (id: string) => void
}) {
    const source = nodes.find((n) => n.id === edge.source)
    const target = nodes.find((n) => n.id === edge.target)
    if (!source || !target) return null

    const sx = source.x + source.width
    const sy = source.y + source.height / 2

    const ex = target.x
    const ey = target.y + target.height / 2

    const dx = ex - sx
    // const dy = ey - sy

    const curvature = Math.min(Math.abs(dx) * 0.5, 120)

    const cpx1 = sx + curvature
    const cpy1 = sy

    const cpx2 = ex - curvature
    const cpy2 = ey

    const d = `M ${sx} ${sy} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${ex} ${ey}`

    return (
        <g>
            {/* HIT AREA */}
            <path
                d={d}
                fill="none"
                stroke="transparent"
                strokeWidth={20}
                style={{ cursor: "pointer", pointerEvents: "all" }}
                onClick={(e) => {
                    e.stopPropagation()
                    onSelect(edge.id)
                }}
            />

            {/* MAIN LINE */}
            <path
                d={d}
                fill="none"
                style={{
                    stroke: edge.selected
                        ? "var(--canvas-accent, #6366f1)"
                        : "var(--canvas-edge, #94a3b8)",
                    strokeWidth: edge.selected ? 3 : 2,
                    transition: "all 0.2s ease",
                }}
            />

            {/* 🔥 GLOW EFFECT (optional tapi bikin premium) */}
            <path
                d={d}
                fill="none"
                style={{
                    stroke: edge.selected
                        ? "rgba(99,102,241,0.25)"
                        : "transparent",
                    strokeWidth: 8,
                    filter: "blur(6px)",
                }}
            />
        </g>
    )
})

export function EdgeRenderer() {
    const { nodes, edges, selectEdge } = useCanvasStore()

    const bounds = useMemo(() => {
        if (!nodes.length) return { x: 0, y: 0, width: 0, height: 0 }
        const padding = 100
        const minX = Math.min(...nodes.map((n) => n.x)) - padding
        const minY = Math.min(...nodes.map((n) => n.y)) - padding
        const maxX = Math.max(...nodes.map((n) => n.x + n.width)) + padding
        const maxY = Math.max(...nodes.map((n) => n.y + n.height)) + padding

        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY,
        }
    }, [nodes])

    return (
        <svg
            viewBox={`${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`}
            style={{
                position: "absolute",
                top: bounds.y,
                left: bounds.x,
                width: bounds.width,
                height: bounds.height,
                overflow: "visible",
                pointerEvents: "none",
            }}
        >
            <defs>
                <marker
                    id="arrow-default"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="5"
                    orient="auto"
                >
                    <path d="M0,0 L0,10 L10,5 z" fill="#94a3b8" />
                </marker>
                <marker
                    id="arrow-selected"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="5"
                    orient="auto"
                >
                    <path d="M0,0 L0,10 L10,5 z" fill="#3b82f6" />
                </marker>
            </defs>
            <g style={{ pointerEvents: "all" }}>
                {edges.map((edge) => (
                    <EdgePath
                        key={edge.id}
                        edge={edge}
                        nodes={nodes}
                        onSelect={selectEdge}
                    />
                ))}
            </g>
        </svg>
    )
}
