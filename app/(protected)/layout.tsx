import { DockBar } from "@/components/dock"

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            {children}
            <DockBar />
        </>
    )
}
