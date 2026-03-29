import { ApiSuccessResponse, FindAllParams, httpClient } from "@/configs/http"
import {
    PairItemResponse,
    PairListResponse,
    PairRequest,
} from "../types/pair.types"
import throwApiError from "@/helpers/throw-api-error"

const PAIRS_ENDPOINT = "/api/pairs"

export async function findAllPairs(
    params?: FindAllParams
): Promise<PairListResponse> {
    try {
        return await httpClient.get<PairListResponse>(PAIRS_ENDPOINT, {
            params,
            withCredentials: true,
        })
    } catch (err) {
        throwApiError(err, "Failed to fetch pairs. Please try again later.")
    }
}

export async function createPair(
    payload: PairRequest
): Promise<PairItemResponse> {
    try {
        return await httpClient.post<PairItemResponse, PairRequest>(
            PAIRS_ENDPOINT,
            payload,
            { withCredentials: true }
        )
    } catch (err) {
        throwApiError(err, "Failed to create pair. Please try again later.")
    }
}

export async function updatePair(
    id: string,
    payload: PairRequest
): Promise<PairItemResponse> {
    try {
        return await httpClient.patch<PairItemResponse, PairRequest>(
            `${PAIRS_ENDPOINT}/${id}`,
            payload,
            { withCredentials: true }
        )
    } catch (err) {
        throwApiError(err, "Failed to update pair. Please try again later.")
    }
}

export async function deletePair(id: string): Promise<ApiSuccessResponse> {
    try {
        return await httpClient.delete<ApiSuccessResponse>(
            `${PAIRS_ENDPOINT}/${id}`,
            { withCredentials: true }
        )
    } catch (err) {
        throwApiError(err, "Failed to delete pair. Please try again later.")
    }
}
