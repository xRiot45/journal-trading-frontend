import { ApiSuccessResponse, httpClient } from "@/configs/http"
import {
    TradingPlanItemResponse,
    TradingPlanListResponse,
    TradingPlanRequest,
} from "../types/trading-plan.types"
import throwApiError from "@/helpers/throw-api-error"

const TRADING_PLANS_ENDPOINT = "/api/trading-plans"

export async function findAllTradingPlans(): Promise<TradingPlanListResponse> {
    try {
        return await httpClient.get<TradingPlanListResponse>(
            TRADING_PLANS_ENDPOINT,
            {
                withCredentials: true,
            }
        )
    } catch (err) {
        throwApiError(
            err,
            "Failed to fetch trading plans. Please try again later."
        )
    }
}

export async function createTradingPlan(
    payload: TradingPlanRequest
): Promise<TradingPlanItemResponse> {
    try {
        return await httpClient.post<
            TradingPlanItemResponse,
            TradingPlanRequest
        >(TRADING_PLANS_ENDPOINT, payload, {
            withCredentials: true,
        })
    } catch (err) {
        throwApiError(
            err,
            "Failed to create trading plan. Please try again later."
        )
    }
}

export async function findTradingPlanById(
    tradingPlanId: string
): Promise<TradingPlanItemResponse> {
    try {
        return await httpClient.get<TradingPlanItemResponse>(
            `${TRADING_PLANS_ENDPOINT}/${tradingPlanId}`,
            {
                withCredentials: true,
            }
        )
    } catch (err) {
        throwApiError(
            err,
            "Failed to fetch trading plan. Please try again later."
        )
    }
}

export async function updateTradingPlan(
    tradingPlanId: string,
    payload: TradingPlanRequest
): Promise<TradingPlanItemResponse> {
    try {
        return await httpClient.patch<
            TradingPlanItemResponse,
            TradingPlanRequest
        >(`${TRADING_PLANS_ENDPOINT}/${tradingPlanId}`, payload, {
            withCredentials: true,
        })
    } catch (err) {
        throwApiError(
            err,
            "Failed to update trading plan. Please try again later."
        )
    }
}

export async function deleteTradingPlan(
    tradingPlanId: string
): Promise<ApiSuccessResponse> {
    try {
        return await httpClient.delete<ApiSuccessResponse>(
            `${TRADING_PLANS_ENDPOINT}/${tradingPlanId}`,
            {
                withCredentials: true,
            }
        )
    } catch (err) {
        throwApiError(
            err,
            "Failed to delete trading plan. Please try again later."
        )
    }
}
