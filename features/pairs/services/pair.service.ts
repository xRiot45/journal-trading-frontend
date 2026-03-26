import { httpClient, isHttpError } from "@/configs/http"
import { FindAllPairsParams, PairResponse } from "../interfaces/pair.interface"

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
