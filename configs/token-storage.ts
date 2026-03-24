const ACCESS_TOKEN_KEY = "accessToken"
const REFRESH_TOKEN_KEY = "refreshToken"

export function getAccessToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setAuthTokens(params: {
    accessToken: string
    refreshToken: string
}): void {
    if (typeof window === "undefined") return

    localStorage.setItem(ACCESS_TOKEN_KEY, params.accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, params.refreshToken)
}

export function clearAuthTokens(): void {
    if (typeof window === "undefined") return

    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
}
