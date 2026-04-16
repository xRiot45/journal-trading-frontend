import { ApiSuccessResponse } from "@/configs/http"

export enum ElementType {
    NODE = "node", // node mind map
    EDGE = "edge", // connector antar node
}

export interface ElementRequest {
    strategyId: string | string[] // id dari strategy yang menjadi parent dari element ini
    type: ElementType
    identifier: string //  title dari node
    x: number
    y: number
    width: number
    height: number
    zIndex: number
    parentElementId: string | null // id dari parent element, null jika tidak memiliki parent (contohnya: node kedua yang terhubung dengan node pertama, maka node kedua memiliki parentElementId yang berisi id dari node pertama)
    isLocked?: boolean
    isVisible?: boolean
}

export interface ElementResponse {
    id: string
    strategyId: string
    type: ElementType
    identifier: string
    x: number
    y: number
    width: number
    height: number
    zIndex: number
    parentElementId: string | null // id dari parent element, null jika tidak memiliki parent (contohnya: node kedua yang terhubung dengan node pertama, maka node kedua memiliki parentElementId yang berisi id dari node pertama)
    isLocked?: boolean
    isVisible?: boolean
    createdAt: string
    updatedAt: string
}

export type ElementListResponse = ApiSuccessResponse<ElementResponse[]>

export type ElementItemResponse = ApiSuccessResponse<ElementResponse>
