import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { Container } from "@/components/ui/container"

export default function JournalView() {
    return (
        <Container size="2xl">
            <div className="space-y-6">
                <PageBreadcrumb
                    title="Journal"
                    description="Manage your journals for your trading experience."
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Journals", href: "/journals" },
                    ]}
                />
            </div>
        </Container>
    )
}
