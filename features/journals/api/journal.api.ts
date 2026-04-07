import { ApiSuccessResponse, FindAllParams, httpClient } from "@/configs/http"
import {
    JournalItemResponse,
    JournalListResponse,
    JournalRequest,
} from "../types/journal.type"
import throwApiError from "@/helpers/throw-api-error"

const JOURNALS_ENDPOINT = "/api/journals"

export async function findAllJournals(
    params?: FindAllParams
): Promise<JournalListResponse> {
    try {
        return await httpClient.get<JournalListResponse>(JOURNALS_ENDPOINT, {
            params,
            withCredentials: true,
        })
    } catch (err) {
        throwApiError(err, "Failed to fetch journals. Please try again later.")
    }
}

export async function createJournal(
    payload: JournalRequest
): Promise<JournalItemResponse> {
    try {
        return await httpClient.post<JournalItemResponse, JournalRequest>(
            JOURNALS_ENDPOINT,
            payload,
            { withCredentials: true }
        )
    } catch (err) {
        throwApiError(err, "Failed to create journal. Please try again later.")
    }
}

export async function updateJournal(
    journalId: string,
    payload: JournalRequest
): Promise<JournalItemResponse> {
    try {
        return await httpClient.patch<JournalItemResponse, JournalRequest>(
            `${JOURNALS_ENDPOINT}/${journalId}`,
            payload,
            { withCredentials: true }
        )
    } catch (err) {
        throwApiError(err, "Failed to update journal. Please try again later.")
    }
}

export async function findJournalById(
    journalId: string
): Promise<JournalItemResponse> {
    try {
        return await httpClient.get<JournalItemResponse>(
            `${JOURNALS_ENDPOINT}/${journalId}`,
            { withCredentials: true }
        )
    } catch (err) {
        throwApiError(
            err,
            "Failed to fetch journal details. Please try again later."
        )
    }
}

export async function deleteJournal(
    journalId: string
): Promise<ApiSuccessResponse> {
    try {
        return await httpClient.delete<ApiSuccessResponse>(
            `${JOURNALS_ENDPOINT}/${journalId}`,
            { withCredentials: true }
        )
    } catch (err) {
        throwApiError(err, "Failed to delete journal. Please try again later.")
    }
}
