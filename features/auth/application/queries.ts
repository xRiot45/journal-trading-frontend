import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "../services/auth.service"
import { UserResponse } from "../interfaces/users.interface"

export function useGetCurrentUserQuery() {
    return useQuery<UserResponse, Error>({
        queryKey: ["current-user"],
        queryFn: getCurrentUser,
    })
}
