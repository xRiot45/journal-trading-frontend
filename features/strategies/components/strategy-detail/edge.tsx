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

    // Find exit/entry points on node border
    const srcHalfW = source.width / 2
    const srcHalfH = source.height / 2
    const tgtHalfW = target.width / 2
    const tgtHalfH = target.height / 2

    let sx = sc.x,
        sy = sc.y,
        ex = tc.x,
        ey = tc.y

    if (Math.abs(dx) > Math.abs(dy)) {
        sx = sc.x + (dx > 0 ? srcHalfW : -srcHalfW)
        sy = sc.y
        ex = tc.x + (dx > 0 ? -tgtHalfW : tgtHalfW)
        ey = tc.y
    } else {
        sx = sc.x
        sy = sc.y + (dy > 0 ? srcHalfH : -srcHalfH)
        ex = tc.x
        ey = tc.y + (dy > 0 ? -tgtHalfH : tgtHalfH)
    }

    const cpx1 = sx + (ex - sx) * 0.5
    const cpy1 = sy
    const cpx2 = sx + (ex - sx) * 0.5
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
    const d = `M${sx},${sy} C${cpx1},${cpy1} ${cpx2},${cpy2} ${ex},${ey}`
    const midX = (sx + ex) / 2
    const midY = (sy + ey) / 2

    return (
        <g>
            {/* Invisible wider hit area */}
            <path
                d={d}
                fill="none"
                stroke="transparent"
                strokeWidth={16}
                style={{ cursor: "pointer" }}
                onClick={() => onSelect(edge.id)}
            />
            {/* Visible path */}
            <path
                className="edge-path"
                d={d}
                style={{
                    stroke: edge.selected
                        ? "var(--canvas-accent)"
                        : "var(--canvas-edge)",
                    strokeWidth: edge.selected ? 2.5 : 1.5,
                    strokeDasharray: edge.selected ? "0" : "0",
                }}
                markerEnd={`url(#arrow-${edge.selected ? "selected" : "default"})`}
                onClick={() => onSelect(edge.id)}
            />
            {/* Edge label */}
            {edge.label && (
                <foreignObject
                    x={midX - 30}
                    y={midY - 12}
                    width={60}
                    height={24}
                    style={{ overflow: "visible", pointerEvents: "none" }}
                >
                    <div
                        style={{
                            background: "var(--canvas-node)",
                            border: "1px solid var(--canvas-border)",
                            borderRadius: 4,
                            fontSize: 10,
                            fontFamily: "var(--font-sans)",
                            color: "var(--canvas-text)",
                            textAlign: "center",
                            padding: "2px 6px",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {edge.label}
                    </div>
                </foreignObject>
            )}
        </g>
    )
})

export function EdgeRenderer() {
    const { nodes, edges, selectEdge } = useCanvasStore()

    // Compute bounding box for SVG
    const bounds = useMemo(() => {
        if (!nodes.length)
            return { x: -5000, y: -5000, width: 10000, height: 10000 }
        const minX = Math.min(...nodes.map((n) => n.x)) - 200
        const minY = Math.min(...nodes.map((n) => n.y)) - 200
        const maxX = Math.max(...nodes.map((n) => n.x + n.width)) + 200
        const maxY = Math.max(...nodes.map((n) => n.y + n.height)) + 200
        return { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
    }, [nodes])

    return (
        <svg
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "visible",
                pointerEvents: "none",
                width: 0,
                height: 0,
            }}
        >
            <defs>
                <marker
                    id="arrow-default"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="3"
                    orient="auto"
                >
                    <path d="M0,0 L0,6 L8,3 z" fill="var(--canvas-edge)" />
                </marker>
                <marker
                    id="arrow-selected"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="3"
                    orient="auto"
                >
                    <path d="M0,0 L0,6 L8,3 z" fill="var(--canvas-accent)" />
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
