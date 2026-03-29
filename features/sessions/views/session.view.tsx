import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { Container } from "@/components/ui/container"
import SessionList from "../components/session-list"

export default function SessionView() {
    return (
        <Container size="2xl">
            <div className="space-y-6">
                <PageBreadcrumb
                    title="Sessions"
                    description="Manage your sessions for your trading experience."
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Pair", href: "/pair" },
                    ]}
                />

                <SessionList />
            </div>
        </Container>
    )
}
