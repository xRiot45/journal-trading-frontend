import { httpClient, isHttpError } from "@/configs/http"
import {
    FindAllPairsParams,
    PairRequest,
    PairResponse,
} from "../interfaces/pair.interface"

export async function findAll(
    params?: FindAllPairsParams
): Promise<PairResponse> {
    try {
        return await httpClient.get<PairResponse>("/api/pairs", {
            params,
            withCredentials: true,
        })
    } catch (err: unknown) {
        if (isHttpError(err) && err.response?.data?.message) {
            throw new Error(err.response.data.message)
        }
        throw new Error("Failed to fetch pairs. Please try again later.")
    }
}

export async function create(payload: PairRequest): Promise<PairResponse> {
    try {
        return await httpClient.post<PairResponse, PairRequest>(
            "/api/pairs",
            payload,
            {
                withCredentials: true,
            }
        )
    } catch (err: unknown) {
        if (isHttpError(err) && err.response?.data?.message) {
            throw new Error(err.response.data.message)
        }
        throw new Error("Failed to create pair. Please try again later.")
    }
}

export async function update(
    id: string,
    payload: PairRequest
): Promise<PairResponse> {
    try {
        return await httpClient.patch<PairResponse, PairRequest>(
            `/api/pairs/${id}`,
            payload,
            {
                withCredentials: true,
            }
        )
    } catch (err: unknown) {
        if (isHttpError(err) && err.response?.data?.message) {
            throw new Error(err.response.data.message)
        }
        throw new Error("Failed to update pair. Please try again later.")
    }
}

export async function remove(id: string): Promise<PairResponse> {
    try {
        return await httpClient.delete<PairResponse>(`/api/pairs/${id}`, {
            withCredentials: true,
        })
    } catch (err: unknown) {
        if (isHttpError(err) && err.response?.data?.message) {
            throw new Error(err.response.data.message)
        }
        throw new Error("Failed to delete pair. Please try again later.")
    }
}
