import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { Container } from "@/components/ui/container"
import JournalList from "../components/journal-list"

export default function JournalView() {
    return (
        <Container size="2xl">
            <div className="space-y-6">
                <PageBreadcrumb
                    title="Journal"
                    description="Log your trade entries, track executions, and review your performance."
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
