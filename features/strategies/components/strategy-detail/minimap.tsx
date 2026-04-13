"use client"

import { useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { useCanvasStore } from "../../store/canvas.store"

export function Minimap() {
    const { nodes, viewport, setViewport } = useCanvasStore()
    const mapRef = useRef<HTMLDivElement>(null)

    const MAP_W = 160
    const MAP_H = 100
    const PADDING = 40

    if (!nodes.length) return null

    const minX = Math.min(...nodes.map((n) => n.x)) - PADDING
    const minY = Math.min(...nodes.map((n) => n.y)) - PADDING
    const maxX = Math.max(...nodes.map((n) => n.x + n.width)) + PADDING
    const maxY = Math.max(...nodes.map((n) => n.y + n.height)) + PADDING

    const worldW = maxX - minX || 1
    const worldH = maxY - minY || 1

    const scaleX = MAP_W / worldW
    const scaleY = MAP_H / worldH
    const scale = Math.min(scaleX, scaleY)

    // Viewport rect in minimap space
    const vw =
        (typeof window !== "undefined" ? window.innerWidth - 320 : 800) /
        viewport.zoom
    const vh =
        (typeof window !== "undefined" ? window.innerHeight - 60 : 600) /
        viewport.zoom
    const vx = -viewport.x / viewport.zoom
    const vy = -viewport.y / viewport.zoom

    const toMap = (x: number, y: number) => ({
        x: (x - minX) * scale,
        y: (y - minY) * scale,
    })

    const vpRect = {
        x: (vx - minX) * scale,
        y: (vy - minY) * scale,
        w: vw * scale,
        h: vh * scale,
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onMinimapClick = useCallback(
        (e: React.MouseEvent) => {
            const rect = mapRef.current?.getBoundingClientRect()
            if (!rect) return
            const mx = e.clientX - rect.left
            const my = e.clientY - rect.top
            const wx = mx / scale + minX
            const wy = my / scale + minY
            const screenW =
                typeof window !== "undefined" ? window.innerWidth - 320 : 800
            const screenH =
                typeof window !== "undefined" ? window.innerHeight - 60 : 600
            setViewport({
                x: screenW / 2 - wx * viewport.zoom,
                y: screenH / 2 - wy * viewport.zoom,
            })
        },
        [scale, minX, minY, viewport.zoom, setViewport]
    )

    const actualH = worldH * scale
    // const actualW = worldW * scale

    return (
        <motion.div
            className="toolbar-glass fixed bottom-6 left-20 z-30 overflow-hidden rounded-2xl"
            style={{
                width: MAP_W,
                height: actualH > MAP_H ? MAP_H : actualH + 8,
                boxShadow: "var(--canvas-shadow)",
                border: "1px solid var(--canvas-toolbar-border)",
            }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: 0.25,
            }}
        >
            <div
                ref={mapRef}
                onClick={onMinimapClick}
                style={{
                    position: "relative",
                    width: MAP_W,
                    height: "100%",
                    cursor: "pointer",
                    overflow: "hidden",
                }}
            >
                {/* Node blobs */}
                {nodes.map((node) => {
                    const mp = toMap(node.x, node.y)
                    return (
                        <div
                            key={node.id}
                            style={{
                                position: "absolute",
                                left: mp.x,
                                top: mp.y,
                                width: Math.max(node.width * scale, 4),
                                height: Math.max(node.height * scale, 3),
                                background: node.selected
                                    ? "var(--canvas-accent)"
                                    : "var(--canvas-muted)",
                                borderRadius: node.type === "decision" ? 0 : 2,
                                opacity: node.selected ? 0.9 : 0.5,
                                transform:
                                    node.type === "decision"
                                        ? "rotate(45deg)"
                                        : undefined,
                            }}
                        />
                    )
                })}

                {/* Viewport rect */}
                <div
                    style={{
                        position: "absolute",
                        left: Math.max(vpRect.x, 0),
                        top: Math.max(vpRect.y, 0),
                        width: Math.min(vpRect.w, MAP_W),
                        height: Math.min(vpRect.h, MAP_H),
                        border: "1.5px solid var(--canvas-accent)",
                        borderRadius: 3,
                        background: "var(--canvas-selection)",
                        pointerEvents: "none",
                    }}
                />

                {/* Label */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 4,
                        right: 6,
                        fontSize: 9,
                        fontFamily: "var(--font-mono)",
                        color: "var(--canvas-muted)",
                        pointerEvents: "none",
                    }}
                >
                    MAP
                </div>
            </div>
        </motion.div>
    )
}
