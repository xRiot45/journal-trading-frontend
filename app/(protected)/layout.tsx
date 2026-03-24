import ProtectedLayout from "@/components/layouts/protected-layout"

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <ProtectedLayout>{children}</ProtectedLayout>
}
