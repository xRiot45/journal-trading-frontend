import { ApiSuccessResponse, httpClient } from "@/configs/http"
import {
    ElementItemResponse,
    ElementListResponse,
    ElementRequest,
    ElementUpdateRequest,
} from "../types/element.types"
import throwApiError from "@/helpers/throw-api-error"

const ELEMENTS_ENDPOINT = "/api/elements"

export async function createElement(
    payload: ElementRequest
): Promise<ElementItemResponse> {
    try {
        return await httpClient.post<ElementItemResponse>(
            ELEMENTS_ENDPOINT,
            payload,
            {
                withCredentials: true,
            }
        )
    } catch (err) {
        throwApiError(
            err,
            "Failed to create element. Please check your input and try again."
        )
    }
}

export async function getElementsByStrategyId(
    strategyId: string
): Promise<ElementListResponse> {
    try {
        return await httpClient.get<ElementListResponse>(
            `${ELEMENTS_ENDPOINT}/strategy/${strategyId}`,
            {
                withCredentials: true,
            }
        )
    } catch (err) {
        throwApiError(err, "Failed to fetch elements. Please try again later.")
    }
}

export async function updateElement(
    elementId: string,
    strategyId: string,
    payload: ElementUpdateRequest
): Promise<ElementItemResponse> {
    try {
        return await httpClient.patch<ElementItemResponse>(
            `${ELEMENTS_ENDPOINT}/${elementId}/strategy/${strategyId}`,
            payload,
            {
                withCredentials: true,
            }
        )
    } catch (err) {
        throwApiError(
            err,
            "Failed to update element. Please check your input and try again."
        )
    }
}

export async function upsertNode(
    payload: ElementRequest
): Promise<ElementItemResponse> {
    try {
        return await httpClient.put<ElementItemResponse>(
            `${ELEMENTS_ENDPOINT}/node`,
            payload,
            {
                withCredentials: true,
            }
        )
    } catch (err) {
        throwApiError(
            err,
            "Failed to create element. Please check your input and try again."
        )
    }
}

export async function removeElement(
    elementId: string
): Promise<ApiSuccessResponse> {
    try {
        return await httpClient.delete<ApiSuccessResponse>(
            `${ELEMENTS_ENDPOINT}/${elementId}`,
            {
                withCredentials: true,
            }
        )
    } catch (err) {
        throwApiError(err, "Failed to delete element. Please try again later.")
    }
}
