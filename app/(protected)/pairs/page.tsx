import PairView from "@/features/pairs/views/pair.view"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Pair",
    description: "Manage and monitor asset pairs for your trading strategies.",
}

export default function PairPage() {
    return <PairView />
}
