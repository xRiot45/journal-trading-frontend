"use client"

import { motion } from "framer-motion"
import { useCanvasStore } from "../../store/canvas.store"

export function Controls() {
    const { viewport, zoomBy, resetZoom, fitScreen } = useCanvasStore()
    const zoom = Math.round(viewport.zoom * 100)

    return (
        <motion.div
            className="toolbar-glass fixed right-70 bottom-6 z-30 flex items-center gap-1 rounded-2xl p-1.5"
            style={{ boxShadow: "var(--canvas-shadow)" }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: 0.2,
            }}
        >
            <ControlButton
                onClick={() => zoomBy(-0.1)}
                title="Zoom Out (Ctrl+-)"
            >
                −
            </ControlButton>
            <div
                className="min-w-13 px-3 text-center font-mono text-xs font-medium"
                style={{ color: "var(--canvas-text)" }}
            >
                {zoom}%
            </div>
            <ControlButton onClick={() => zoomBy(0.1)} title="Zoom In (Ctrl++)">
                +
            </ControlButton>
            <div
                className="mx-1 h-5 w-px"
                style={{ background: "var(--canvas-border)" }}
            />
            <ControlButton onClick={resetZoom} title="Reset Zoom">
                ⊙
            </ControlButton>
            <ControlButton onClick={fitScreen} title="Fit Screen">
                ⊞
            </ControlButton>
        </motion.div>
    )
}

function ControlButton({
    onClick,
    title,
    children,
}: {
    onClick: () => void
    title: string
    children: React.ReactNode
}) {
    return (
        <motion.button
            onClick={onClick}
            title={title}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-sm transition-all"
            style={{ color: "var(--canvas-text)" }}
            whileHover={{ scale: 1.1, background: "var(--canvas-selection)" }}
            whileTap={{ scale: 0.9 }}
        >
            {children}
        </motion.button>
    )
}
