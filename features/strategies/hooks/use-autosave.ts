import { useCanvasStore } from "../store/canvas.store"
import { useStrategyStore } from "../store/strategies.store"
import { CanvasNode } from "../types/canvas"
import { ElementType } from "../types/element.types"
import { useUpsertNodeMutation } from "./use-elements-mutations"

export function useAutosave() {
    const strategyId = useStrategyStore((state) => state.selectedStrategyId)
    const { updateNode } = useCanvasStore()
    const upsertNodeMutation = useUpsertNodeMutation()

    const triggerAutosave = (
        nodeId: string,
        overrides?: Partial<CanvasNode> & { parentElementId?: string | null }
    ) => {
        if (!strategyId) return

        const store = useCanvasStore.getState()
        const currentNode = store.nodes.find((n) => n.id === nodeId)

        if (!currentNode) return

        const currentBackendId = currentNode.backendElementId ?? null
        const finalLabel = (overrides?.label ?? currentNode.label).trim()

        if (
            !finalLabel ||
            (overrides?.width ?? currentNode.width) <= 0 ||
            (overrides?.height ?? currentNode.height) <= 0
        ) {
            return
        }

        let parentBackendId: string | null = null

        if (overrides && overrides.parentElementId !== undefined) {
            parentBackendId = overrides.parentElementId
        } else {
            const incomingEdge = store.edges.find((e) => e.target === nodeId)

            if (incomingEdge) {
                const parentNode = store.nodes.find(
                    (n) => n.id === incomingEdge.source
                )

                if (parentNode && parentNode.backendElementId) {
                    parentBackendId = parentNode.backendElementId
                }
            }
        }

        upsertNodeMutation.mutate(
            {
                id: currentBackendId ?? undefined,
                strategyId,
                type: ElementType.NODE,
                identifier: finalLabel,
                x: overrides?.x ?? currentNode.x,
                y: overrides?.y ?? currentNode.y,
                width: overrides?.width ?? currentNode.width,
                height: overrides?.height ?? currentNode.height,
                zIndex: overrides?.zIndex ?? currentNode.zIndex,
                parentElementId: parentBackendId,
                isLocked: false,
                isVisible: true,
            },
            {
                onSuccess: (data) => {
                    if (!currentBackendId && data.data?.id) {
                        updateNode(nodeId, {
                            backendElementId: data.data.id,
                        })
                    }
                },
            }
        )
    }

    return { triggerAutosave, isMutating: upsertNodeMutation.isPending }
}
