"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCanvasStore } from "../../store/canvas.store"
import { Download, Save } from "lucide-react"

export function Topbar() {
    const { title, setTitle, nodes, edges, viewport } = useCanvasStore()
    const [editingTitle, setEditingTitle] = useState(false)
    const [titleVal, setTitleVal] = useState(title)
    const [saved, setSaved] = useState(false)
    const [showExport, setShowExport] = useState(false)
    const titleRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setTitleVal(title)
    }, [title])

    const commitTitle = () => {
        setTitle(titleVal)
        setEditingTitle(false)
    }

    const handleSave = () => {
        // In a real app, this would POST to API
        const payload = {
            title,
            nodes,
            edges,
            viewport: {
                viewportX: viewport.x,
                viewportY: viewport.y,
                zoom: viewport.zoom,
            },
            savedAt: new Date().toISOString(),
        }
        console.log("Saving strategy:", payload)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    const handleExportJSON = () => {
        const data = JSON.stringify({ title, nodes, edges, viewport }, null, 2)
        const blob = new Blob([data], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${title.replace(/\s+/g, "-").toLowerCase()}.json`
        a.click()
        URL.revokeObjectURL(url)
        setShowExport(false)
    }

    const handleExportSVG = () => {
        alert("SVG export: coming soon in production build.")
        setShowExport(false)
    }

    return (
        <div
            className="toolbar-glass flex shrink-0 items-center gap-3 border-b px-4"
            style={{
                height: 52,
                borderColor: "var(--canvas-toolbar-border)",
                zIndex: 40,
            }}
        >
            {/* Title */}
            <div className="flex min-w-0 flex-1 items-center gap-1.5">
                {editingTitle ? (
                    <input
                        ref={titleRef}
                        autoFocus
                        value={titleVal}
                        onChange={(e) => setTitleVal(e.target.value)}
                        onBlur={commitTitle}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") commitTitle()
                            if (e.key === "Escape") setEditingTitle(false)
                        }}
                        className="min-w-0 flex-1 border-b bg-transparent text-sm font-semibold outline-none"
                        style={{
                            borderColor: "var(--canvas-accent)",
                            color: "var(--canvas-text)",
                            fontFamily: "var(--font-sans)",
                        }}
                    />
                ) : (
                    <button
                        onClick={() => {
                            setEditingTitle(true)
                            setTimeout(() => titleRef.current?.select(), 10)
                        }}
                        className="truncate text-left text-sm font-semibold transition-opacity hover:opacity-70"
                        style={{
                            color: "var(--canvas-text)",
                            fontFamily: "var(--font-sans)",
                        }}
                        title="Click to rename"
                    >
                        {title}
                    </button>
                )}
                <span
                    className="shrink-0 text-xs"
                    style={{ color: "var(--canvas-muted)" }}
                >
                    · {nodes.length} nodes · {edges.length} edges
                </span>
            </div>

            {/* Right actions */}
            <div className="flex shrink-0 items-center gap-2">
                {/* Export dropdown */}
                <div className="relative">
                    <motion.button
                        onClick={() => setShowExport((s) => !s)}
                        className="flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-medium transition-all"
                        style={{
                            background: "var(--canvas-border)",
                            color: "var(--canvas-text)",
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Export Strategy
                        <Download size={16} />
                    </motion.button>

                    <AnimatePresence>
                        {showExport && (
                            <motion.div
                                className="toolbar-glass absolute top-10 right-0 z-50 overflow-hidden rounded-xl"
                                style={{
                                    boxShadow: "var(--canvas-shadow)",
                                    minWidth: 140,
                                    border: "1px solid var(--canvas-toolbar-border)",
                                }}
                                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -4, scale: 0.95 }}
                                transition={{ duration: 0.12 }}
                            >
                                <button
                                    onClick={handleExportJSON}
                                    className="w-full px-4 py-2.5 text-left text-xs font-medium transition-opacity hover:opacity-70"
                                    style={{ color: "var(--canvas-text)" }}
                                >
                                    Export JSON
                                </button>
                                <div
                                    style={{
                                        height: 1,
                                        background: "var(--canvas-border)",
                                    }}
                                />
                                <button
                                    onClick={handleExportSVG}
                                    className="w-full px-4 py-2.5 text-left text-xs font-medium transition-opacity hover:opacity-70"
                                    style={{ color: "var(--canvas-text)" }}
                                >
                                    Export SVG
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Save button */}
                <motion.button
                    onClick={handleSave}
                    className="relative h-8 overflow-hidden rounded-md px-4 text-xs font-semibold transition-all"
                    style={{
                        background: saved
                            ? "var(--canvas-muted)"
                            : "var(--canvas-accent)",
                        color: "var(--canvas-node)",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <AnimatePresence mode="wait">
                        {saved ? (
                            <motion.span
                                key="saved"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className="flex items-center gap-1.5"
                            >
                                ✓ Saved
                            </motion.span>
                        ) : (
                            <motion.span
                                key="save"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className="flex items-center gap-2"
                            >
                                Save Strategy
                                <Save size={16} />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </div>
    )
}
