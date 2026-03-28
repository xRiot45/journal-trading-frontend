import { isHttpError } from "@/configs/http"

export default function throwApiError(err: unknown, fallback: string): never {
    if (isHttpError(err) && err.response?.data?.message) {
        throw new Error(err.response.data.message)
    }
    throw new Error(fallback)
}
