import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { logoutUser } from "../api/auth.api"
import { clearAuthTokens } from "@/configs/token-storage"
import { useAuthStore } from "../store/auth.store"
import { CURRENT_USER_QUERY_KEY } from "./use-current-user"

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
