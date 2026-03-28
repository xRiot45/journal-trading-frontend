import { create } from "zustand"
import type { User } from "../types/user.types"

interface AuthStoreState {
    user: User | null
    isAuthenticated: boolean
}

interface AuthStoreActions {
    setUser: (user: User) => void
    clearAuth: () => void
}

type AuthStore = AuthStoreState & AuthStoreActions

const initialState: AuthStoreState = {
    user: null,
    isAuthenticated: false,
}

export const useAuthStore = create<AuthStore>((set) => ({
    ...initialState,
    setUser: (user) => set({ user, isAuthenticated: true }),
    clearAuth: () => set(initialState),
}))

export const selectUser = (s: AuthStore) => s.user
export const selectIsAuthenticated = (s: AuthStore) => s.isAuthenticated
