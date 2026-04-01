import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from "axios"
import { getAccessToken } from "../token-storage"

const DEFAULT_TIMEOUT = 15000

function getBaseURL(): string {
    return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"
}

export const axiosInstance = axios.create({
    baseURL: getBaseURL(),
    timeout: DEFAULT_TIMEOUT,
    headers: {
        Accept: "application/json",
    },
})

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = getAccessToken()

        if (!config.headers) {
            config.headers = new AxiosHeaders()
        }

        if (token) {
            config.headers.set("Authorization", `Bearer ${token}`)
        }

        if (config.data instanceof FormData) {
            config.headers.set("Content-Type", "multipart/form-data")
        } else {
            config.headers.set("Content-Type", "application/json")
        }

        return config
    },
    (error: unknown) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(error)
)
