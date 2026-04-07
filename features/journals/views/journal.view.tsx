import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { Container } from "@/components/ui/container"
import JournalList from "../components/journal-list"

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

                <JournalList />
            </div>
        </Container>
    )
}
