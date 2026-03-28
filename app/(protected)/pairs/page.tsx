import PairView from "@/features/pairs/views/pair.view"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Pair",
    description: "Monitor aktivitas, statistik, dan ringkasan aplikasi Anda.",
}

export default function PairPage() {
    return <PairView />
}
