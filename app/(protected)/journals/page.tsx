import JournalView from "@/features/journals/views/journal.view"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Journal",
    description: "Manage your journals for your trading experience.",
}

export default function JournalPage() {
    return <JournalView />
}
