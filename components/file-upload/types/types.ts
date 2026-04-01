export type FileStatus = "idle" | "uploading" | "success" | "error"

export interface UploadedFile {
    id: string
    file: File
    preview?: string
    progress?: number
    status: FileStatus
    error?: string
}

export type FileUploadVariant = "default" | "outline" | "minimal"
export type FileUploadLayout = "grid" | "list"

export interface FileUploadProps {
    // Core
    multiple?: boolean
    accept?: string
    maxSize?: number // bytes
    maxFiles?: number
    disabled?: boolean
    value?: File | null

    // Appearance
    variant?: FileUploadVariant
    layout?: FileUploadLayout

    // Controlled mode
    files?: UploadedFile[]
    onFilesChange?: (files: UploadedFile[]) => void

    // Upload integration
    onUpload?: (file: UploadedFile) => Promise<void>

    // Copy
    label?: string
    description?: string
    className?: string
}

export interface DragDropState {
    isDragging: boolean
    isDragOver: boolean
}

export interface FileValidationResult {
    valid: boolean
    error?: string
}

export interface FileUploadState {
    files: UploadedFile[]
}

export type FileUploadAction =
    | { type: "ADD_FILES"; payload: UploadedFile[] }
    | { type: "REMOVE_FILE"; payload: string }
    | { type: "UPDATE_FILE"; payload: Partial<UploadedFile> & { id: string } }
    | { type: "REPLACE_FILES"; payload: UploadedFile[] }
    | { type: "CLEAR" }
