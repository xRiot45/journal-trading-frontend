import { httpClient } from "@/configs/http"
import { StrategiesListResponse } from "../types/strategies.types"
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
