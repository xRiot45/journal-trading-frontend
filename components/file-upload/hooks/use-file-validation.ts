import { useCallback } from "react"
import { FileValidationResult } from "../types/types"
import { formatBytes } from "../utils/format-bytes"

interface UseFileValidationOptions {
    accept?: string
    maxSize?: number
    maxFiles?: number
    currentFileCount?: number
}

/**
 * Returns a stable validate() function that checks a File against
 * the configured constraints (type, size, count).
 */
export function useFileValidation({
    accept,
    maxSize,
    maxFiles,
    currentFileCount = 0,
}: UseFileValidationOptions) {
    const validate = useCallback(
        (file: File, index = 0): FileValidationResult => {
            // --- Max files check ---
            if (
                maxFiles !== undefined &&
                currentFileCount + index >= maxFiles
            ) {
                return {
                    valid: false,
                    error: `Maximum ${maxFiles} file${maxFiles === 1 ? "" : "s"} allowed`,
                }
            }

            // --- File type check ---
            if (accept) {
                const accepted = accept
                    .split(",")
                    .map((s) => s.trim().toLowerCase())

                const mime = file.type.toLowerCase()
                const ext = `.${file.name.split(".").pop()?.toLowerCase()}`

                const isAccepted = accepted.some((pattern) => {
                    if (pattern.startsWith(".")) return ext === pattern
                    if (pattern.endsWith("/*"))
                        return mime.startsWith(pattern.slice(0, -1))
                    return mime === pattern
                })

                if (!isAccepted) {
                    return {
                        valid: false,
                        error: `File type "${file.type || ext}" is not accepted`,
                    }
                }
            }

            // --- File size check ---
            if (maxSize !== undefined && file.size > maxSize) {
                return {
                    valid: false,
                    error: `File exceeds maximum size of ${formatBytes(maxSize)}`,
                }
            }

            return { valid: true }
        },
        [accept, maxSize, maxFiles, currentFileCount]
    )

    return { validate }
}
