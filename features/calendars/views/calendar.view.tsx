import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { Container } from "@/components/ui/container"
import { CalendarContainer } from "../components"


export default function CalendarView() {
    return (
        <Container size="2xl">
            <div className="space-y-6">
                <PageBreadcrumb
                    title="Calendar"
                    description="Show data for your trading experience."
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Pair", href: "/pair" },
                    ]}
                />

                <CalendarContainer />
            </div>
        </Container>
    )
}
