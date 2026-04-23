import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { loginUser, logoutUser } from "../api/auth.api"
import { clearAuthTokens, setAuthTokens } from "@/configs/token-storage"
import { useAuthStore } from "../store/auth.store"
import type { LoginRequest, LoginResponse } from "../types/auth.types"
import { CURRENT_USER_QUERY_KEY } from "./use-auth-queries"


export function useLogin() {
    const router = useRouter()
    const setUser = useAuthStore((s) => s.setUser)

    const { mutate, isPending } = useMutation<
        LoginResponse,
        Error,
        LoginRequest
    >({
        mutationFn: loginUser,
        onSuccess: (response) => {
            const { accessToken, refreshToken } = response.data!

            setAuthTokens({ accessToken, refreshToken })
            setUser({
                id: "",
                username: "",
                fullName: "",
                email: "",
                emailVerifiedAt: "",
                isVerified: false,
                createdAt: "",
                updatedAt: "",
            })

            toast.success("Login successful")
            router.push("/dashboard")
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    return { login: mutate, isPending }
}

export function useLogout() {
    const clearAuth = useAuthStore((s) => s.clearAuth)
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation<void, Error>({
        mutationFn: logoutUser,
        onSuccess: () => {
            toast.success("Logout successful")
            clearAuthTokens()
            clearAuth()
            queryClient.removeQueries({ queryKey: [CURRENT_USER_QUERY_KEY] })
            window.location.href = "/"
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    return { logout: mutate, isPending }
}
