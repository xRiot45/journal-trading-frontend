import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { loginUser } from "../api/auth.api"
import { setAuthTokens } from "@/configs/token-storage"
import { useAuthStore } from "../store/auth.store"
import type { LoginRequest, LoginResponse } from "../types/auth.types"

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
