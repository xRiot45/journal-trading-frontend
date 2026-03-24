import axios from "axios"
import { axiosInstance } from "./axios"
import type {
  ApiErrorResponse,
  HttpError,
  HttpRequestConfig,
} from "./http-types"

export class HttpClient {
  async get<TResponse>(
    url: string,
    config?: HttpRequestConfig
  ): Promise<TResponse> {
    const response = await axiosInstance.get<TResponse>(url, config)
    return response.data
  }

  async post<TResponse, TRequest = unknown>(
    url: string,
    data?: TRequest,
    config?: HttpRequestConfig<TRequest>
  ): Promise<TResponse> {
    const response = await axiosInstance.post<TResponse>(url, data, config)
    return response.data
  }

  async put<TResponse, TRequest = unknown>(
    url: string,
    data?: TRequest,
    config?: HttpRequestConfig<TRequest>
  ): Promise<TResponse> {
    const response = await axiosInstance.put<TResponse>(url, data, config)
    return response.data
  }

  async patch<TResponse, TRequest = unknown>(
    url: string,
    data?: TRequest,
    config?: HttpRequestConfig<TRequest>
  ): Promise<TResponse> {
    const response = await axiosInstance.patch<TResponse>(url, data, config)
    return response.data
  }

  async delete<TResponse>(
    url: string,
    config?: HttpRequestConfig
  ): Promise<TResponse> {
    const response = await axiosInstance.delete<TResponse>(url, config)
    return response.data
  }
}

export const httpClient = new HttpClient()

export function isHttpError(
  error: unknown
): error is HttpError<ApiErrorResponse> {
  return axios.isAxiosError(error)
}
