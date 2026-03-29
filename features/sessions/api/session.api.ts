import { ApiSuccessResponse, FindAllParams, httpClient } from "@/configs/http"
import {
    SessionItemResponse,
    SessionListResponse,
    SessionRequest,
} from "../types/session.types"
import throwApiError from "@/helpers/throw-api-error"

const SESSIONS_ENDPOINT = "/api/sessions"

export async function findAllSessions(
    params?: FindAllParams
): Promise<SessionListResponse> {
    try {
        return await httpClient.get<SessionListResponse>(SESSIONS_ENDPOINT, {
            params,
            withCredentials: true,
        })
    } catch (err) {
        throwApiError(err, "Failed to fetch sessions. Please try again later.")
    }
}

export async function createSession(
    payload: SessionRequest
): Promise<SessionItemResponse> {
    try {
        return await httpClient.post<SessionItemResponse, SessionRequest>(
            SESSIONS_ENDPOINT,
            payload,
            { withCredentials: true }
        )
    } catch (err) {
        throwApiError(err, "Failed to create session. Please try again later.")
    }
}

export async function updateSession(
    id: string,
    payload: SessionRequest
): Promise<SessionItemResponse> {
    try {
        return await httpClient.patch<SessionItemResponse, SessionRequest>(
            `${SESSIONS_ENDPOINT}/${id}`,
            payload,
            { withCredentials: true }
        )
    } catch (err) {
        throwApiError(err, "Failed to update session. Please try again later.")
    }
}

export async function deleteSession(id: string): Promise<ApiSuccessResponse> {
    try {
        return await httpClient.delete<ApiSuccessResponse>(
            `${SESSIONS_ENDPOINT}/${id}`,
            { withCredentials: true }
        )
    } catch (err) {
        throwApiError(err, "Failed to delete session. Please try again later.")
    }
}
