import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from "axios"

const DEFAULT_TIMEOUT = 15000

function getBaseURL(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"
}

function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null
  }

  return localStorage.getItem("accessToken")
}

export const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getAccessToken()

    if (token) {
      if (!config.headers) {
        config.headers = new AxiosHeaders()
      }

      config.headers.set("Authorization", `Bearer ${token}`)
    }

    return config
  },
  (error: unknown) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    return Promise.reject(error)
  }
)
