export type FileCategory =
  | "image"
  | "video"
  | "audio"
  | "pdf"
  | "document"
  | "spreadsheet"
  | "presentation"
  | "archive"
  | "code"
  | "unknown"

const MIME_MAP: Record<string, FileCategory> = {
  // Images
  "image/jpeg": "image",
  "image/png": "image",
  "image/gif": "image",
  "image/webp": "image",
  "image/svg+xml": "image",
  "image/avif": "image",

  // Video
  "video/mp4": "video",
  "video/webm": "video",
  "video/ogg": "video",
  "video/quicktime": "video",

  // Audio
  "audio/mpeg": "audio",
  "audio/ogg": "audio",
  "audio/wav": "audio",
  "audio/webm": "audio",

  // Documents
  "application/pdf": "pdf",
  "application/msword": "document",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "document",
  "text/plain": "document",
  "text/markdown": "document",

  // Spreadsheets
  "application/vnd.ms-excel": "spreadsheet",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "spreadsheet",
  "text/csv": "spreadsheet",

  // Presentations
  "application/vnd.ms-powerpoint": "presentation",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "presentation",

  // Archives
  "application/zip": "archive",
  "application/x-tar": "archive",
  "application/x-rar-compressed": "archive",
  "application/x-7z-compressed": "archive",
  "application/gzip": "archive",

  // Code
  "application/json": "code",
  "application/javascript": "code",
  "text/javascript": "code",
  "text/html": "code",
  "text/css": "code",
  "application/typescript": "code",
}

export function getFileCategory(file: File): FileCategory {
  return MIME_MAP[file.type] ?? "unknown"
}

export function isImageFile(file: File): boolean {
  return getFileCategory(file) === "image"
}

export function getFileExtension(file: File): string {
  return file.name.split(".").pop()?.toLowerCase() ?? ""
}
