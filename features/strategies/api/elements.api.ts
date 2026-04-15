import { httpClient } from "@/configs/http"
import { ElementItemResponse, ElementRequest } from "../types/element.types"
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
