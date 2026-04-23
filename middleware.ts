import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    // 1. Ambil token dari Cookies (BUKAN localStorage)
    const token = request.cookies.get("accessToken")?.value
    const { pathname } = request.nextUrl

    // 2. Daftar route yang masuk dalam kategori (protected)
    // Catatan: Route group (protected) tidak muncul di URL, jadi kita cek path aslinya.
    const protectedRoutes = [
        "/dashboard",
        "/calendar",
        "/journals",
        "/pairs",
        "/sessions",
        "/strategies",
        "/trading-plans",
    ]

    // 3. Cek apakah user sedang mengakses salah satu route yang diproteksi
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    )

    // 4. Jika mengakses halaman terproteksi TANPA token, lempar ke /auth/login
    if (isProtectedRoute && !token) {
        const loginUrl = new URL("/auth/login", request.url)
        // Opsional: Bawa URL asal sebagai query parameter agar bisa di-redirect balik setelah login
        loginUrl.searchParams.set("callbackUrl", pathname)
        return NextResponse.redirect(loginUrl)
    }

    // 5. (Opsional) Jika user SUDAH login tapi malah buka halaman login, lempar ke dashboard
    if (pathname.startsWith("/auth/login") && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Lanjutkan request jika semua aman
    return NextResponse.next()
}

// 6. Konfigurasi Matcher agar middleware tidak dijalankan di file statis & API untuk efisiensi
export const config = {
    matcher: [
        /*
         * Jalankan middleware di semua path KECUALI:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}
