"use client"

import { useRef, useState, useCallback, memo } from "react"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { useCanvasStore } from "../../store/canvas.store"
import { CanvasNode } from "../../types/canvas"
import { snapToGrid } from "@/lib/utils"

interface Props {
    node: CanvasNode
}

const HANDLES = [
    { id: "top", pos: { top: -6, left: "50%", transform: "translateX(-50%)" } },
    {
        id: "bottom",
        pos: { bottom: -6, left: "50%", transform: "translateX(-50%)" },
    },
    {
        id: "left",
        pos: { left: -6, top: "50%", transform: "translateY(-50%)" },
    },
    {
        id: "right",
        pos: { right: -6, top: "50%", transform: "translateY(-50%)" },
    },
]

export const NodeRenderer = memo(function NodeRenderer({ node }: Props) {
    const {
        selectNode,
        updateNode,
        pushHistory,
        activeTool,
        startConnect,
        endConnect,
        createNode, // 🔥 NEW
    } = useCanvasStore()

    const [isEditing, setIsEditing] = useState(false)
    const [editLabel, setEditLabel] = useState(node.label)
    const [isHovered, setIsHovered] = useState(false)

    const dragStart = useRef<{
        mx: number
        my: number
        nx: number
        ny: number
    } | null>(null)

    const hasDragged = useRef(false)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    // ================= DRAG =================
    const onPointerDown = useCallback(
        (e: React.PointerEvent) => {
            if (isEditing) return
            e.stopPropagation()

            if (activeTool === "connect") {
                endConnect(node.id)
                return
            }

            selectNode(node.id, e.shiftKey || e.metaKey || e.ctrlKey)

            dragStart.current = {
                mx: e.clientX,
                my: e.clientY,
                nx: node.x,
                ny: node.y,
            }

            hasDragged.current = false

            const el = e.currentTarget as HTMLElement
            el.setPointerCapture(e.pointerId)

            const onMove = (me: PointerEvent) => {
                if (!dragStart.current) return

                const vp = useCanvasStore.getState().viewport
                const dx = (me.clientX - dragStart.current.mx) / vp.zoom
                const dy = (me.clientY - dragStart.current.my) / vp.zoom

                if (
                    !hasDragged.current &&
                    (Math.abs(dx) > 2 || Math.abs(dy) > 2)
                ) {
                    hasDragged.current = true
                }

                if (!hasDragged.current) return

                const gs = useCanvasStore.getState().settings.gridSize
                const doSnap = useCanvasStore.getState().settings.snapToGrid

                const rawX = dragStart.current.nx + dx
                const rawY = dragStart.current.ny + dy

                const newX = doSnap ? snapToGrid(rawX, gs) : rawX
                const newY = doSnap ? snapToGrid(rawY, gs) : rawY

                const store = useCanvasStore.getState()
                const diffX = newX - node.x
                const diffY = newY - node.y

                if (store.selectedNodeIds.length > 1) {
                    store.selectedNodeIds.forEach((id) => {
                        const n = store.nodes.find((n) => n.id === id)
                        if (!n) return
                        store.updateNode(id, { x: n.x + diffX, y: n.y + diffY })
                    })
                } else {
                    updateNode(node.id, { x: newX, y: newY })
                }
            }

            const onUp = () => {
                if (hasDragged.current) pushHistory()
                dragStart.current = null
                hasDragged.current = false
                el.removeEventListener("pointermove", onMove)
                el.removeEventListener("pointerup", onUp)
            }

            el.addEventListener("pointermove", onMove)
            el.addEventListener("pointerup", onUp)
        },
        [
            isEditing,
            activeTool,
            selectNode,
            endConnect,
            node,
            updateNode,
            pushHistory,
        ]
    )

    // ================= EDIT =================
    const onDoubleClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation()
            setEditLabel(node.label)
            setIsEditing(true)
            setTimeout(() => {
                inputRef.current?.focus()
                inputRef.current?.select()
            }, 10)
        },
        [node.label]
    )

    const commitEdit = useCallback(() => {
        setIsEditing(false)
        updateNode(node.id, { label: editLabel })
    }, [editLabel, node.id, updateNode])

    // ================= CONNECT =================
    const onHandleDown = useCallback(
        (e: React.PointerEvent) => {
            e.stopPropagation()
            e.preventDefault()
            startConnect(node.id)
        },
        [node.id, startConnect]
    )

    // ================= CREATE CHILD (🔥 CORE FEATURE) =================
    const handleAddChild = useCallback(() => {
        const offsetX = 220

        createNode({
            parentId: node.id,
            x: node.x + offsetX,
            y: node.y,
        })

        useCanvasStore.getState().setTool("select")
    }, [node, createNode])

    // ================= STYLE =================
    const nodeClass = [
        "canvas-node",
        `type-${node.type}`,
        node.selected ? "selected" : "",
    ]
        .filter(Boolean)
        .join(" ")

    const style: React.CSSProperties = {
        left: node.x,
        top: node.y,
        width: node.width,
        height: node.height,
        zIndex: node.selected ? 1000 : node.zIndex,
        position: "absolute",
        padding: "10px 16px",
    }

    return (
        <motion.div
            className={nodeClass}
            style={style}
            initial={{ scale: 0.82, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            onPointerDown={onPointerDown}
            onDoubleClick={onDoubleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* LABEL */}
            {isEditing ? (
                <textarea
                    ref={inputRef}
                    value={editLabel}
                    onChange={(e) => setEditLabel(e.target.value)}
                    onBlur={commitEdit}
                    className="h-full w-full resize-none bg-transparent text-center text-sm outline-none"
                />
            ) : (
                <span className="text-center text-sm font-medium select-none">
                    {node.label}
                </span>
            )}

            {/* ➕ ADD CHILD BUTTON (WHIMSICAL STYLE) */}
            {(node.selected || isHovered) && (
                <button
                    onPointerDown={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                    }}
                    onClick={(e) => {
                        e.stopPropagation()
                        handleAddChild()
                    }}
                    className="absolute top-1/2 -right-8 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow hover:bg-gray-100"
                >
                    <Plus size={14} />
                </button>
            )}

            {/* HANDLES */}
            {HANDLES.map((h) => (
                <div
                    key={h.id}
                    className="node-handle"
                    style={h.pos as React.CSSProperties}
                    onPointerDown={onHandleDown}
                />
            ))}
        </motion.div>
    )
})
