/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // Development
            {
                protocol: "http",
                hostname: "localhost",
                port: "3000",
                pathname: "/**",
            },
            // Production — sesuaikan dengan domain API kamu
            {
                protocol: "https",
                hostname: "api.yourdomain.com",
                pathname: "/**",
            },
        ],
    },
}

export default nextConfig
