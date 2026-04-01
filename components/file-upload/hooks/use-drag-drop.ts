import { useState, useCallback, useRef, DragEvent } from "react"
import { DragDropState } from "../types/types"

interface UseDragDropOptions {
    disabled?: boolean
    onDrop: (files: File[]) => void
}

/**
 * Encapsulates all drag-and-drop event logic.
 * Returns event handlers and current drag state.
 */
export function useDragDrop({ disabled, onDrop }: UseDragDropOptions) {
    const [state, setState] = useState<DragDropState>({
        isDragging: false,
        isDragOver: false,
    })

    // Track drag-enter depth to handle nested children correctly
    const dragCounter = useRef(0)

    const handleDragEnter = useCallback(
        (e: DragEvent<HTMLElement>) => {
            e.preventDefault()
            e.stopPropagation()
            if (disabled) return
            dragCounter.current++
            if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
                setState((s) => ({ ...s, isDragOver: true, isDragging: true }))
            }
        },
        [disabled]
    )

    const handleDragLeave = useCallback(
        (e: DragEvent<HTMLElement>) => {
            e.preventDefault()
            e.stopPropagation()
            if (disabled) return
            dragCounter.current--
            if (dragCounter.current === 0) {
                setState((s) => ({
                    ...s,
                    isDragOver: false,
                    isDragging: false,
                }))
            }
        },
        [disabled]
    )

    const handleDragOver = useCallback(
        (e: DragEvent<HTMLElement>) => {
            e.preventDefault()
            e.stopPropagation()
            if (disabled) return
            e.dataTransfer.dropEffect = "copy"
        },
        [disabled]
    )

    const handleDrop = useCallback(
        (e: DragEvent<HTMLElement>) => {
            e.preventDefault()
            e.stopPropagation()
            dragCounter.current = 0
            setState({ isDragging: false, isDragOver: false })
            if (disabled) return

            const droppedFiles = Array.from(e.dataTransfer.files)
            if (droppedFiles.length > 0) {
                onDrop(droppedFiles)
            }
        },
        [disabled, onDrop]
    )

    return {
        isDragging: state.isDragging,
        isDragOver: state.isDragOver,
        dragHandlers: {
            onDragEnter: handleDragEnter,
            onDragLeave: handleDragLeave,
            onDragOver: handleDragOver,
            onDrop: handleDrop,
        },
    }
}
