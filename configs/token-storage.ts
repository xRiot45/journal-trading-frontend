import Cookies from "js-cookie"

const ACCESS_TOKEN_KEY = "accessToken"
const REFRESH_TOKEN_KEY = "refreshToken"

export function getAccessToken(): string | undefined {
    return Cookies.get("accessToken")
}

export function getRefreshToken(): string | undefined {
    return Cookies.get("refreshToken")
}

export function setAuthTokens(params: {
    accessToken: string
    refreshToken: string
}): void {
    // Set cookie dengan opsi keamanan
    Cookies.set(ACCESS_TOKEN_KEY, params.accessToken, {
        expires: 1, // Kadaluarsa dalam 1 hari
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    })

    Cookies.set(REFRESH_TOKEN_KEY, params.refreshToken, {
        expires: 7, // Kadaluarsa dalam 7 hari untuk refresh token
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    })
}

export function clearAuthTokens(): void {
    Cookies.remove(ACCESS_TOKEN_KEY)
    Cookies.remove(REFRESH_TOKEN_KEY)
}
