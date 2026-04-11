import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { Container } from "@/components/ui/container"

export default function StrategiesView() {
    return (
        <Container size="2xl">
            <div className="space-y-6">
                <PageBreadcrumb
                    title="Strategies"
                    description="Manage your strategies for your trading experience."
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Strategies", href: "/strategies" },
                    ]}
                />
            </div>
        </Container>
    )
}
