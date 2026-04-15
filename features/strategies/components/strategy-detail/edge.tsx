"use client"

import { useMemo, memo } from "react"
import { useCanvasStore } from "../../store/canvas.store"
import { CanvasEdge, CanvasNode } from "../../types/canvas"

function getNodeCenter(node: CanvasNode) {
    return { x: node.x + node.width / 2, y: node.y + node.height / 2 }
}

function getEdgePoints(source: CanvasNode, target: CanvasNode) {
    const sc = getNodeCenter(source)
    const tc = getNodeCenter(target)

    const dx = tc.x - sc.x
    const dy = tc.y - sc.y

    // Menghitung titik keluar/masuk tepat di tepi kotak node
    let sx, sy, ex, ey

    if (Math.abs(dx) / source.width > Math.abs(dy) / source.height) {
        // Keluar dari sisi kiri atau kanan
        sx = sc.x + (dx > 0 ? source.width / 2 : -source.width / 2)
        sy = sc.y + dy * (source.width / 2 / Math.abs(dx))

        ex = tc.x + (dx > 0 ? -target.width / 2 : target.width / 2)
        ey = tc.y + -dy * (target.width / 2 / Math.abs(dx))
    } else {
        // Keluar dari sisi atas atau bawah
        sx = sc.x + dx * (source.height / 2 / Math.abs(dy))
        sy = sc.y + (dy > 0 ? source.height / 2 : -source.height / 2)

        ex = tc.x + -dx * (target.height / 2 / Math.abs(dy))
        ey = tc.y + (dy > 0 ? -target.height / 2 : target.height / 2)
    }

    // Kalkulasi Control Points untuk kurva Bezier (S-shape horizontal)
    const offset = Math.min(Math.abs(dx) / 2, 50)
    const cpx1 = sx + (dx > 0 ? offset : -offset)
    const cpy1 = sy
    const cpx2 = ex + (dx > 0 ? -offset : offset)
    const cpy2 = ey

    return { sx, sy, ex, ey, cpx1, cpy1, cpx2, cpy2 }
}

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

    const { sx, sy, ex, ey, cpx1, cpy1, cpx2, cpy2 } = getEdgePoints(
        source,
        target
    )

    // Path string menggunakan Cubic Bezier
    const d = `M${sx},${sy} C${cpx1},${cpy1} ${cpx2},${cpy2} ${ex},${ey}`

    return (
        <g>
            {/* Hit area lebih luas agar mudah diklik */}
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
            <path
                className="edge-path"
                d={d}
                fill="none"
                style={{
                    stroke: edge.selected
                        ? "var(--canvas-accent, #3b82f6)"
                        : "var(--canvas-edge, #94a3b8)",
                    strokeWidth: edge.selected ? 3 : 1.5,
                    transition: "stroke 0.2s",
                }}
                markerEnd={`url(#arrow-${edge.selected ? "selected" : "default"})`}
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
