import { ApiSuccessResponse } from "@/configs/http"

export enum CanvasBackground {
    WHITE = "white",
    GRID = "grid",
    DOTS = "dots",
    LINES = "lines",
}

export enum HistoryActionType {
    CREATE_ELEMENT = "create_element",
    UPDATE_ELEMENT = "update_element",
    DELETE_ELEMENT = "delete_element",
    MOVE_ELEMENTS = "move_elements",
    REPARENT_ELEMENT = "reparent_element",
    BULK_UPDATE = "bulk_update",
    CANVAS_SETTINGS = "canvas_settings",
    RESTORE = "restore",
}

export interface StrategiesRequest {
    title: string
    description: string
}

export interface Viewport {
    viewportX: number
    viewportY: number
    zoom: number
}

export interface CanvasSettings {
    background: CanvasBackground
    backgroundColor: string
    snapToGrid: boolean
    gridSize: number
}

export interface CanvasHistoryItem {
    id: string
    actionType: HistoryActionType
    label: string | null
    stackIndex: number
    createdAt: Date
}

export interface StrategyResponse {
    id: string
    title: string
    content: string | null
    description: string | null
    lastEditedAt: Date
    viewport: Viewport
    canvasSettings: CanvasSettings
    createdAt: Date
    updatedAt: Date
}

export interface RestoreSnapshotResult {
    restoredFromId: string
    elementCount: number
}

export type StrategiesListResponse = ApiSuccessResponse<StrategyResponse[]>

export type StrategiesItemResponse = ApiSuccessResponse<StrategyResponse>
