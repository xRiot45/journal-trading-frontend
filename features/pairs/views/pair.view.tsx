import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { Container } from "@/components/ui/container"
import PairList from "../components/pair-list"

export default function PairView() {
    return (
        <Container size="2xl">
            <div className="space-y-6">
                <PageBreadcrumb
                    title="Pair"
                    description="Manage your pairs for your trading experience."
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Pair", href: "/pair" },
                    ]}
                />

                <PairList />
            </div>
        </Container>
    )
}
