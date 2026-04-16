import { httpClient } from "@/configs/http"
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
            `${ELEMENTS_ENDPOINT}/${strategyId}`,
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
