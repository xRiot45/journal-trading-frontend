import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { fetchCurrentUser } from "../api/auth.api"
import { useAuthStore } from "../store/auth.store"
import type { UserResponse } from "../types/user.types"

export const CURRENT_USER_QUERY_KEY = "current-user" as const

export function useCurrentUser() {
    const setUser = useAuthStore((s) => s.setUser)

    const query = useQuery<UserResponse, Error>({
        queryKey: [CURRENT_USER_QUERY_KEY],
        queryFn: fetchCurrentUser,
    })

    useEffect(() => {
        if (query.data?.data) {
            setUser(query.data.data)
        }
    }, [query.data, setUser])

    return query
}
