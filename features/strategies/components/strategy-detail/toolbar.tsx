"use client"

import { useCanvasStore } from "../../store/canvas.store"
import { Tool } from "../../types/canvas"
import { motion } from "framer-motion"

interface ToolItem {
    id: Tool
    label: string
    icon: string
    shortcut?: string
}

const TOOLS: ToolItem[] = [
    { id: "select", label: "Select", icon: "↖", shortcut: "V" },
    { id: "node", label: "Add Node", icon: "□", shortcut: "N" },
    { id: "text", label: "Add Text", icon: "T", shortcut: "T" },
    // { id: "decision", label: "Decision Node", icon: "◇", shortcut: "D" },
    { id: "connect", label: "Connect", icon: "⤷", shortcut: "C" },
]

export function Toolbar() {
    const { activeTool, setTool, undo, redo, history, historyIndex } =
        useCanvasStore()
    const canUndo = historyIndex > 0
    const canRedo = historyIndex < history.length - 1

    return (
        <motion.div
            className="toolbar-glass absolute top-1/2 left-4 z-20 flex -translate-y-1/2 flex-col gap-1 rounded-2xl p-2"
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: 0.1,
            }}
            style={{ boxShadow: "var(--canvas-shadow)" }}
        >
            {TOOLS.map((tool, i) => (
                <motion.button
                    key={tool.id}
                    onClick={() => setTool(tool.id)}
                    title={`${tool.label} (${tool.shortcut})`}
                    // Menggunakan template literal untuk mengganti class dinamis
                    className={`group relative flex h-10 w-10 items-center justify-center rounded-xl text-base transition-all duration-150 ${
                        activeTool === tool.id
                            ? "bg-slate-900 text-white shadow-md dark:bg-slate-100 dark:text-slate-900" // Style saat Aktif (Support Dark/Light)
                            : "bg-transparent text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800" // Style saat Default/Nonaktif
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                >
                    <span className="text-lg leading-none">{tool.icon}</span>
                    {/* Tooltip */}
                    <div
                        className="toolbar-glass pointer-events-none absolute left-12 z-50 hidden items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap group-hover:flex"
                        style={{
                            color: "var(--canvas-text)",
                            boxShadow: "var(--canvas-shadow)",
                        }}
                    >
                        {tool.label}
                        <span className="font-mono text-[10px] opacity-40">
                            {tool.shortcut}
                        </span>
                    </div>
                </motion.button>
            ))}

            <div
                className="mx-auto my-1 h-px w-6"
                style={{ background: "var(--canvas-border)" }}
            />

            {/* Undo/Redo */}
            <motion.button
                onClick={undo}
                disabled={!canUndo}
                title="Undo (Ctrl+Z)"
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-base transition-all duration-150 ${
                    canUndo
                        ? "cursor-pointer text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
                        : "cursor-not-allowed text-slate-400 opacity-50 dark:text-slate-600"
                }`}
                whileHover={canUndo ? { scale: 1.05 } : {}}
                whileTap={canUndo ? { scale: 0.95 } : {}}
            >
                ↩
            </motion.button>
            <motion.button
                onClick={redo}
                disabled={!canRedo}
                title="Redo (Ctrl+Shift+Z)"
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-base transition-all duration-150 ${
                    canRedo
                        ? "cursor-pointer text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
                        : "cursor-not-allowed text-slate-400 opacity-50 dark:text-slate-600"
                }`}
                whileHover={canRedo ? { scale: 1.05 } : {}}
                whileTap={canRedo ? { scale: 0.95 } : {}}
            >
                ↪
            </motion.button>
        </motion.div>
    )
}
