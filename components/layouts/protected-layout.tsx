import type { ReactNode } from "react"

import { Container } from "@/components/ui/container"
import { AppHeader } from "../headers/app-header"
import { DockBar } from "../dock"

type ProtectedLayoutProps = Readonly<{
    children: ReactNode
}>

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <AppHeader />

            <main className="pb-24">
                <Container size="full">{children}</Container>
            </main>

            <DockBar />
        </div>
    )
}
