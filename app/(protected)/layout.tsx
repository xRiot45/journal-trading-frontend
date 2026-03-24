import { DockBar } from "@/components/dock"
import { AppHeader } from "@/components/headers/app-header"
import { Container } from "@/components/ui/container"

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main>
            <AppHeader />
            <Container size="full">{children}</Container>
            <DockBar />
        </main>
    )
}
