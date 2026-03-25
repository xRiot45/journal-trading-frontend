import { useMutation } from "@tanstack/react-query"
import { login, logout } from "../services/auth.service"
import type { LoginRequest, LoginResponse } from "../interfaces/auth.interface"
import { clearAuthTokens, setAuthTokens } from "@/configs/token-storage"

export function useLoginMutation() {
    return useMutation<LoginResponse, Error, LoginRequest>({
        mutationFn: login,
        onSuccess: (response) => {
            const { accessToken, refreshToken } = response?.data
            setAuthTokens({
                accessToken,
                refreshToken,
            })
        },
    })
}

export function useLogoutMutation() {
    return useMutation<void, Error>({
        mutationFn: logout,
        onSuccess: () => {
            clearAuthTokens()
            window.location.href = "/"
        },
    })
}
