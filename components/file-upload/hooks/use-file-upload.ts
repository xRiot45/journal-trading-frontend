import { useReducer, useCallback, useEffect, useRef, useMemo } from "react"
import { UploadedFile, FileUploadState, FileUploadAction } from "../types/types"
import { generateId } from "../utils/generate-id"
import { isImageFile } from "../utils/file-type"
import { useFileValidation } from "./use-file-validation"

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function fileUploadReducer(
    state: FileUploadState,
    action: FileUploadAction
): FileUploadState {
    switch (action.type) {
        case "ADD_FILES":
            return { files: [...state.files, ...action.payload] }

        case "REMOVE_FILE":
            return { files: state.files.filter((f) => f.id !== action.payload) }

        case "UPDATE_FILE":
            return {
                files: state.files.map((f) =>
                    f.id === action.payload.id ? { ...f, ...action.payload } : f
                ),
            }

        case "REPLACE_FILES":
            return { files: action.payload }

        case "CLEAR":
            return { files: [] }

        default:
            return state
    }
}

// ---------------------------------------------------------------------------
// Options
// ---------------------------------------------------------------------------

interface UseFileUploadOptions {
    multiple?: boolean
    accept?: string
    maxSize?: number
    maxFiles?: number
    files?: UploadedFile[] // controlled
    onFilesChange?: (files: UploadedFile[]) => void
    onUpload?: (file: UploadedFile) => Promise<void>
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useFileUpload({
    multiple = false,
    accept,
    maxSize,
    maxFiles,
    files: controlledFiles,
    onFilesChange,
    onUpload,
}: UseFileUploadOptions) {
    const isControlled = controlledFiles !== undefined
    const [state, dispatch] = useReducer(fileUploadReducer, { files: [] })

    const files: UploadedFile[] = isControlled ? controlledFiles : state.files

    // Sync controlled → internal (needed for memoization of derived values)
    const filesRef = useRef(files)
    useEffect(() => {
        filesRef.current = files
    }, [files])

    // Validation
    const { validate } = useFileValidation({
        accept,
        maxSize,
        maxFiles,
        currentFileCount: files.length,
    })

    // Cleanup object URLs on unmount
    const previewUrls = useRef<Set<string>>(new Set())
    useEffect(() => {
        return () => {
            previewUrls.current.forEach((url) => URL.revokeObjectURL(url))
        }
    }, [])

    // ---------------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------------

    const updateFiles = useCallback(
        (next: UploadedFile[]) => {
            if (!isControlled) {
                dispatch({ type: "REPLACE_FILES", payload: next })
            }
            onFilesChange?.(next)
        },
        [isControlled, onFilesChange]
    )

    const updateOne = useCallback(
        (patch: Partial<UploadedFile> & { id: string }) => {
            const next = filesRef.current.map((f) =>
                f.id === patch.id ? { ...f, ...patch } : f
            )
            if (!isControlled) dispatch({ type: "UPDATE_FILE", payload: patch })
            onFilesChange?.(next)
        },
        [isControlled, onFilesChange]
    )

    // ---------------------------------------------------------------------------
    // processFiles — validate + create previews + optionally trigger upload
    // ---------------------------------------------------------------------------

    const processFiles = useCallback(
        async (rawFiles: File[]) => {
            const current = filesRef.current
            const slotsLeft =
                maxFiles !== undefined ? maxFiles - current.length : Infinity

            // Deduplicate by name+size
            const existingKeys = new Set(
                current.map((f) => `${f.file.name}:${f.file.size}`)
            )
            const unique = rawFiles.filter(
                (f) => !existingKeys.has(`${f.name}:${f.size}`)
            )

            // In single mode, replacing is the intended behavior
            const candidates = multiple
                ? unique.slice(0, slotsLeft)
                : unique.slice(0, 1)

            const newEntries: UploadedFile[] = candidates.map((file, i) => {
                const validation = validate(file, i)
                let preview: string | undefined

                if (validation.valid && isImageFile(file)) {
                    preview = URL.createObjectURL(file)
                    previewUrls.current.add(preview)
                }

                return {
                    id: generateId(),
                    file,
                    preview,
                    progress: 0,
                    status: validation.valid ? "idle" : "error",
                    error: validation.error,
                }
            })

            const next = multiple ? [...current, ...newEntries] : newEntries
            updateFiles(next)

            // Trigger upload for valid files
            if (onUpload) {
                for (const entry of newEntries) {
                    if (entry.status === "idle") {
                        updateOne({
                            id: entry.id,
                            status: "uploading",
                            progress: 0,
                        })
                        try {
                            await onUpload({ ...entry, status: "uploading" })
                            updateOne({
                                id: entry.id,
                                status: "success",
                                progress: 100,
                            })
                        } catch (err) {
                            const message =
                                err instanceof Error
                                    ? err.message
                                    : "Upload failed"
                            updateOne({
                                id: entry.id,
                                status: "error",
                                error: message,
                            })
                        }
                    }
                }
            }
        },
        [multiple, maxFiles, validate, updateFiles, updateOne, onUpload]
    )

    // ---------------------------------------------------------------------------
    // removeFile — revoke preview URL
    // ---------------------------------------------------------------------------

    const removeFile = useCallback(
        (id: string) => {
            const target = filesRef.current.find((f) => f.id === id)
            if (target?.preview) {
                URL.revokeObjectURL(target.preview)
                previewUrls.current.delete(target.preview)
            }

            const next = filesRef.current.filter((f) => f.id !== id)
            if (!isControlled) dispatch({ type: "REMOVE_FILE", payload: id })
            onFilesChange?.(next)
        },
        [isControlled, onFilesChange]
    )

    const clearFiles = useCallback(() => {
        filesRef.current.forEach((f) => {
            if (f.preview) {
                URL.revokeObjectURL(f.preview)
                previewUrls.current.delete(f.preview)
            }
        })
        updateFiles([])
    }, [updateFiles])

    // ---------------------------------------------------------------------------
    // Derived
    // ---------------------------------------------------------------------------

    const stats = useMemo(() => {
        const total = files.length
        const uploading = files.filter((f) => f.status === "uploading").length
        const errors = files.filter((f) => f.status === "error").length
        const success = files.filter((f) => f.status === "success").length
        return { total, uploading, errors, success }
    }, [files])

    const canAddMore = useMemo(() => {
        if (!multiple) return files.length === 0
        if (maxFiles !== undefined) return files.length < maxFiles
        return true
    }, [multiple, maxFiles, files.length])

    return {
        files,
        processFiles,
        removeFile,
        clearFiles,
        canAddMore,
        stats,
    }
}
