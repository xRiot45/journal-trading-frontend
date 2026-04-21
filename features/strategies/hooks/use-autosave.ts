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
        overrides?: Partial<CanvasNode>
    ) => {
        if (!strategyId) return

        const currentNode = useCanvasStore
            .getState()
            .nodes.find((n) => n.id === nodeId)
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
                parentElementId: null,
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
