import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"

export interface ApiSuccessResponse<TData = undefined> {
    success: boolean
    statusCode: number
    message: string
    timestamp: string
    data?: TData
}

export interface ApiErrorResponse {
    success: boolean
    statusCode: number
    error?: string | string[]
    message: string
    path: string
    timestamp: string
    stack?: string
}

export type HttpRequestConfig<TData = unknown> = AxiosRequestConfig<TData>

export type HttpResponse<TData> = AxiosResponse<TData>

export type HttpError<TError = ApiErrorResponse> = AxiosError<TError>

export interface PaginationMeta {
    page: number
    limit: number
    totalItems: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
}

export interface ApiPaginatedData<TItem> {
    data: TItem[]
    meta: PaginationMeta
}

export interface FindAllParams {
    page?: number
    limit?: number
    search?: string
    sortBy?: string
    order?: "ASC" | "DESC"
}
