import { PageBreadcrumb } from "@/components/page-breadcrumb"

export default function DashboardPage() {
    return (
        <>
            <div className="space-y-6">
                <PageBreadcrumb
                    title="Dashboard"
                    description="Monitor aktivitas, statistik, dan ringkasan aplikasi Anda."
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Dashboard", href: "/dashboard" },
                    ]}
                />

                <section className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-black">
                    <h2 className="text-lg font-medium text-black dark:text-white">
                        Dashboard Content
                    </h2>
                    <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                        Isi halaman dashboard kamu taruh di sini.
                    </p>
                </section>
            </div>
        </>
    )
}
