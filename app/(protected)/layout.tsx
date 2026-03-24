import { DockBar } from "@/components/dock"
import { AppHeader } from "@/components/headers/app-header"

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main>
            <AppHeader />
            {children}
            <DockBar />
        </main>
    )
}
