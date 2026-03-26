import { PageBreadcrumb } from "@/components/page-breadcrumb"
import PairList from "../components/pair-list"

export default function PairView() {
    return (
        <div className="space-y-6">
            <PageBreadcrumb
                title="Pair"
                description="Monitor aktivitas, statistik, dan ringkasan aplikasi Anda."
                items={[
                    { label: "Home", href: "/" },
                    { label: "Pair", href: "/pair" },
                ]}
            />

            <PairList />
        </div>
    )
}
