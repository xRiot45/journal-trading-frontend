import { httpClient } from "@/configs/http"
import {
    StrategiesItemResponse,
    StrategiesListResponse,
    StrategiesRequest,
} from "../types/strategies.types"
import throwApiError from "@/helpers/throw-api-error"

const STRATEGIES_ENDPOINT = "/api/strategies"

export async function findAllStrategies(): Promise<StrategiesListResponse> {
    try {
        return await httpClient.get<StrategiesListResponse>(
            STRATEGIES_ENDPOINT,
            {
                withCredentials: true,
            }
        )
    } catch (err) {
        throwApiError(
            err,
            "Failed to fetch strategies. Please try again later."
        )
    }
}

export async function findStrategyById(
    strategyId: string
): Promise<StrategiesItemResponse> {
    try {
        return await httpClient.get<StrategiesItemResponse>(
            `${STRATEGIES_ENDPOINT}/${strategyId}`,
            {
                withCredentials: true,
            }
        )
    } catch (err) {
        throwApiError(
            err,
            "Failed to fetch strategy details. Please try again later."
        )
    }
}

export async function createStrategy(
    payload: StrategiesRequest
): Promise<StrategiesItemResponse> {
    try {
        return await httpClient.post<StrategiesItemResponse>(
            STRATEGIES_ENDPOINT,
            payload,
            {
                withCredentials: true,
            }
        )
    } catch (err) {
        throwApiError(
            err,
            "Failed to create strategy. Please check your input and try again."
        )
    }
}

export async function updateStrategy(
    id: string,
    payload: StrategiesRequest
): Promise<StrategiesItemResponse> {
    try {
        return await httpClient.put<StrategiesItemResponse>(
            `${STRATEGIES_ENDPOINT}/${id}`,
            payload,
            {
                withCredentials: true,
            }
        )
    } catch (err) {
        throwApiError(
            err,
            "Failed to update strategy. Please check your input and try again."
        )
    }
}

export async function deleteStrategy(id: string): Promise<void> {
    try {
        await httpClient.delete(`${STRATEGIES_ENDPOINT}/${id}`, {
            withCredentials: true,
        })
    } catch (err) {
        throwApiError(err, "Failed to delete strategy. Please try again later.")
    }
}
