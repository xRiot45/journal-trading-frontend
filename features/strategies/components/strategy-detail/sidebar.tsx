/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useCanvasStore } from "../../store/canvas.store"
import { useState, useEffect } from "react"
import {
    X,
    Settings2,
    Box,
    Trash2,
    ChevronRight,
    Loader2,
    CheckCircle2,
    CloudOff,
} from "lucide-react"
import { ElementType } from "../../types/element.types"
import { useUpsertNodeMutation } from "../../hooks/use-elements-mutations"
import { useStrategyStore } from "../../store/strategies.store"

export function Sidebar() {
    const strategyId = useStrategyStore((state) => state.selectedStrategyId)

    const {
        nodes,
        selectedNodeIds,
        selectedEdgeId,
        edges,
        updateNode,
        deleteNode,
        settings,
        updateSettings,
        deleteEdge,
    } = useCanvasStore()

    const [isVisible, setIsVisible] = useState(true)

    const selectedNodeId = selectedNodeIds[0] || null

    const selectedNode = selectedNodeId
        ? nodes.find((n) => n.id === selectedNodeId)
        : null

    const selectedEdge = selectedEdgeId
        ? edges.find((e) => e.id === selectedEdgeId)
        : null

    const [label, setLabel] = useState("")
    const [edgeLabel, setEdgeLabel] = useState("")

    useEffect(() => {
        if (selectedNode) setLabel(selectedNode.label)
    }, [selectedNode])

    useEffect(() => {
        if (selectedEdge) setEdgeLabel(selectedEdge.label || "")
    }, [selectedEdge])

    const upsertNodeMutation = useUpsertNodeMutation()

    const backendElementId =
        nodes.find((n) => n.id === selectedNodeId)?.backendElementId ?? null

    const isNodeSynced = !!backendElementId
    const isMutating = upsertNodeMutation.isPending

    // ── UPSERT AUTOMATIS (AUTOSAVE) ─────────────────────────
    const handleAutosave = (overrides?: Partial<typeof selectedNode>) => {
        if (!strategyId || !selectedNode) return

        const currentNode = nodes.find((n) => n.id === selectedNode.id)
        const currentBackendId = currentNode?.backendElementId ?? null

        const finalLabel = (overrides?.label ?? label).trim()

        if (
            !finalLabel ||
            (overrides?.width ?? selectedNode.width) <= 0 ||
            (overrides?.height ?? selectedNode.height) <= 0
        ) {
            return
        }

        upsertNodeMutation.mutate(
            {
                id: currentBackendId ?? undefined,
                strategyId,
                type: ElementType.NODE,
                identifier: finalLabel,
                x: overrides?.x ?? selectedNode.x,
                y: overrides?.y ?? selectedNode.y,
                width: overrides?.width ?? selectedNode.width,
                height: overrides?.height ?? selectedNode.height,
                zIndex: selectedNode.zIndex ?? nodes.length + 1,
                parentElementId: null,
                isLocked: false,
                isVisible: true,
            },
            {
                onSuccess: (data) => {
                    if (!currentBackendId && data.data?.id) {
                        updateNode(selectedNode.id, {
                            backendElementId: data.data.id,
                        })
                    }
                },
            }
        )
    }

    return (
        <>
            {!isVisible && (
                <button
                    onClick={() => setIsVisible(true)}
                    className="fixed top-1/2 right-4 z-50 -translate-y-1/2 rounded-md border border-black bg-white p-2 shadow-xl dark:border-white dark:bg-black"
                >
                    <ChevronRight className="h-4 w-4 rotate-180" />
                </button>
            )}

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        key="sidebar"
                        className="relative flex h-full w-full shrink-0 flex-col gap-0 border-l border-black/10 bg-white text-black transition-colors duration-300 sm:w-80 dark:border-white/10 dark:bg-black dark:text-white"
                        initial={{ x: 320, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 320, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4 dark:border-white/5">
                            <div className="flex items-center gap-2">
                                <Settings2 className="h-4 w-4" />
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
                                    {selectedNode
                                        ? "Node Context"
                                        : selectedEdge
                                          ? "Edge Context"
                                          : "Global Config"}
                                </span>
                            </div>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="rounded-md p-1 transition-all hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="custom-scrollbar flex flex-1 flex-col gap-6 overflow-y-auto p-5">
                            {/* ── NODE PANEL ── */}
                            {selectedNode && (
                                <motion.div
                                    key={selectedNode.id}
                                    initial={{
                                        opacity: 0,
                                        filter: "blur(4px)",
                                    }}
                                    animate={{
                                        opacity: 1,
                                        filter: "blur(0px)",
                                    }}
                                    className="flex flex-col gap-5"
                                >
                                    {/* Status Indicator (Pengganti Tombol Save) */}
                                    <div className="flex items-center justify-between rounded-md bg-black/5 px-3 py-2 dark:bg-white/5">
                                        <span className="text-[10px] font-bold uppercase opacity-60">
                                            Status
                                        </span>
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase">
                                            {isMutating ? (
                                                <>
                                                    <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
                                                    <span className="text-blue-500">
                                                        Syncing...
                                                    </span>
                                                </>
                                            ) : isNodeSynced ? (
                                                <>
                                                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                    <span className="text-green-500">
                                                        Synced
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <CloudOff className="h-3 w-3 text-amber-500" />
                                                    <span className="text-amber-500">
                                                        Pending
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <SidebarField label="Identifier">
                                        <textarea
                                            value={label}
                                            onChange={(e) =>
                                                setLabel(e.target.value)
                                            }
                                            onBlur={() => {
                                                updateNode(selectedNode.id, {
                                                    label,
                                                })
                                                handleAutosave({ label })
                                            }}
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === "Enter" &&
                                                    !e.shiftKey
                                                ) {
                                                    e.preventDefault()
                                                    updateNode(
                                                        selectedNode.id,
                                                        { label }
                                                    )
                                                    handleAutosave({ label }) // 🚀 Trigger Autosave
                                                }
                                            }}
                                            rows={3}
                                            className="sidebar-input-web3"
                                        />
                                        {label.trim() === "" && (
                                            <p className="mt-1 text-center text-[9px] text-red-500 opacity-80">
                                                Identifier wajib diisi
                                            </p>
                                        )}
                                    </SidebarField>

                                    <SidebarField label="Geometry Type">
                                        <div className="grid grid-cols-1 gap-1 rounded-md bg-black/5 p-1 dark:bg-white/5">
                                            {(["default"] as const).map((t) => (
                                                <button
                                                    key={t}
                                                    onClick={() => {
                                                        updateNode(
                                                            selectedNode.id,
                                                            { type: t }
                                                        )
                                                    }}
                                                    className={`flex flex-col items-center justify-center rounded-md py-2 transition-all ${
                                                        selectedNode.type === t
                                                            ? "bg-black text-white shadow-lg dark:bg-white dark:text-black"
                                                            : "hover:bg-black/10 dark:hover:bg-white/10"
                                                    }`}
                                                >
                                                    {t === "default" && (
                                                        <Box className="h-3.5 w-3.5" />
                                                    )}
                                                    {/* {t === "text" && (
                                                            <Type className="h-3.5 w-3.5" />
                                                        )} */}

                                                    <span className="mt-1 text-[9px] font-bold uppercase">
                                                        {t}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </SidebarField>

                                    <div className="grid grid-cols-2 gap-3">
                                        <SidebarField label="Pos X">
                                            <input
                                                type="number"
                                                value={Math.round(
                                                    selectedNode.x
                                                )}
                                                onChange={(e) =>
                                                    updateNode(
                                                        selectedNode.id,
                                                        {
                                                            x: Number(
                                                                e.target.value
                                                            ),
                                                        }
                                                    )
                                                }
                                                onBlur={(e) =>
                                                    handleAutosave({
                                                        x: Number(
                                                            e.target.value
                                                        ),
                                                    })
                                                } // 🚀 Trigger Autosave
                                                className="sidebar-input-web3"
                                            />
                                        </SidebarField>
                                        <SidebarField label="Pos Y">
                                            <input
                                                type="number"
                                                value={Math.round(
                                                    selectedNode.y
                                                )}
                                                onChange={(e) =>
                                                    updateNode(
                                                        selectedNode.id,
                                                        {
                                                            y: Number(
                                                                e.target.value
                                                            ),
                                                        }
                                                    )
                                                }
                                                onBlur={(e) =>
                                                    handleAutosave({
                                                        y: Number(
                                                            e.target.value
                                                        ),
                                                    })
                                                } // 🚀 Trigger Autosave
                                                className="sidebar-input-web3"
                                            />
                                        </SidebarField>
                                        <SidebarField label="Width">
                                            <input
                                                type="number"
                                                value={Math.round(
                                                    selectedNode.width
                                                )}
                                                onChange={(e) =>
                                                    updateNode(
                                                        selectedNode.id,
                                                        {
                                                            width: Number(
                                                                e.target.value
                                                            ),
                                                        }
                                                    )
                                                }
                                                onBlur={(e) =>
                                                    handleAutosave({
                                                        width: Number(
                                                            e.target.value
                                                        ),
                                                    })
                                                } // 🚀 Trigger Autosave
                                                className="sidebar-input-web3"
                                            />
                                        </SidebarField>
                                        <SidebarField label="Height">
                                            <input
                                                type="number"
                                                value={Math.round(
                                                    selectedNode.height
                                                )}
                                                onChange={(e) =>
                                                    updateNode(
                                                        selectedNode.id,
                                                        {
                                                            height: Number(
                                                                e.target.value
                                                            ),
                                                        }
                                                    )
                                                }
                                                onBlur={(e) =>
                                                    handleAutosave({
                                                        height: Number(
                                                            e.target.value
                                                        ),
                                                    })
                                                } // 🚀 Trigger Autosave
                                                className="sidebar-input-web3"
                                            />
                                        </SidebarField>
                                    </div>

                                    <button
                                        onClick={() =>
                                            deleteNode(selectedNode.id)
                                        }
                                        className="group flex w-full items-center justify-center gap-2 rounded-md border border-black/10 py-2.5 text-[11px] font-bold tracking-widest uppercase transition-all hover:border-red-500 hover:text-red-500 dark:border-white/10"
                                    >
                                        <Trash2 className="group-hover:shake h-3.5 w-3.5" />
                                        Remove Object
                                    </button>
                                </motion.div>
                            )}

                            {/* ── EDGE PANEL ── */}
                            {selectedEdge && (
                                <motion.div
                                    key={selectedEdge.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col gap-5"
                                >
                                    <SidebarField label="Edge Label">
                                        <input
                                            type="text"
                                            value={edgeLabel}
                                            onChange={(e) =>
                                                setEdgeLabel(e.target.value)
                                            }
                                            onBlur={() => {
                                                useCanvasStore.setState(
                                                    (s) => ({
                                                        edges: s.edges.map(
                                                            (e) =>
                                                                e.id ===
                                                                selectedEdge.id
                                                                    ? {
                                                                          ...e,
                                                                          label: edgeLabel,
                                                                      }
                                                                    : e
                                                        ),
                                                    })
                                                )
                                                // Jika edge juga disimpan ke DB, tambahkan logic upsert edge di sini
                                            }}
                                            className="sidebar-input-web3"
                                        />
                                    </SidebarField>
                                    <div className="space-y-2 rounded-md border border-black/5 bg-black/5 p-3 dark:border-white/5 dark:bg-white/5">
                                        <div className="flex justify-between text-[10px] uppercase opacity-60">
                                            <span>Source</span>
                                            <span className="text-black dark:text-white">
                                                {selectedEdge.source.slice(
                                                    0,
                                                    8
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-[10px] uppercase opacity-60">
                                            <span>Target</span>
                                            <span className="text-black dark:text-white">
                                                {selectedEdge.target.slice(
                                                    0,
                                                    8
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            deleteEdge(selectedEdge.id)
                                        }
                                        className="w-full rounded-md border border-black/10 py-2.5 text-[11px] font-bold uppercase transition-all hover:bg-black hover:text-white dark:border-white/10 dark:hover:bg-white dark:hover:text-black"
                                    >
                                        Disconnect
                                    </button>
                                </motion.div>
                            )}

                            {/* ── CANVAS SETTINGS ── */}
                            {!selectedNode && !selectedEdge && (
                                <motion.div
                                    key="canvas-settings"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col gap-6"
                                >
                                    <SidebarField label="Environment Surface">
                                        <div className="flex gap-1 rounded-md bg-black/5 p-1 dark:bg-white/5">
                                            {(
                                                [
                                                    "dots",
                                                    "grid",
                                                    "none",
                                                ] as const
                                            ).map((bg) => (
                                                <button
                                                    key={bg}
                                                    onClick={() =>
                                                        updateSettings({
                                                            background: bg,
                                                        })
                                                    }
                                                    className={`flex-1 rounded-md py-1.5 text-[10px] font-bold uppercase transition-all ${
                                                        settings.background ===
                                                        bg
                                                            ? "bg-black text-white shadow-md dark:bg-white dark:text-black"
                                                            : "opacity-50 hover:opacity-100"
                                                    }`}
                                                >
                                                    {bg}
                                                </button>
                                            ))}
                                        </div>
                                    </SidebarField>

                                    <SidebarField
                                        label={`Grid Density / ${settings.gridSize}px`}
                                    >
                                        <input
                                            type="range"
                                            min={10}
                                            max={60}
                                            step={5}
                                            value={settings.gridSize}
                                            onChange={(e) =>
                                                updateSettings({
                                                    gridSize: Number(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                            className="w-full cursor-none accent-black dark:accent-white"
                                        />
                                    </SidebarField>

                                    <SidebarField label="System Alignment">
                                        <button
                                            onClick={() =>
                                                updateSettings({
                                                    snapToGrid:
                                                        !settings.snapToGrid,
                                                })
                                            }
                                            className={`w-full rounded-md border py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-all ${
                                                settings.snapToGrid
                                                    ? "border-transparent bg-black text-white dark:bg-white dark:text-black"
                                                    : "border-black/20 hover:border-black dark:border-white/20 dark:hover:border-white"
                                            }`}
                                        >
                                            Snap to Grid:{" "}
                                            {settings.snapToGrid
                                                ? "Active"
                                                : "Disabled"}
                                        </button>
                                    </SidebarField>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

function SidebarField({
    label,
    children,
}: {
    label: string
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[9px] font-black tracking-widest uppercase opacity-40">
                {label}
            </label>
            {children}
        </div>
    )
}
