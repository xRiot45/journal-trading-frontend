import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { Container } from "@/components/ui/container"
import SessionList from "../components/session-list"

export default function SessionView() {
    return (
        <Container size="2xl">
            <div className="space-y-6">
                <PageBreadcrumb
                    title="Sessions"
                    description="Track and manage active market hours and trading periods."
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Sessions", href: "/sessions" },
                    ]}
                />

                <SessionList />
            </div>
        </Container>
    )
}
