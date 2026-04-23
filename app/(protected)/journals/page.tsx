import JournalView from "@/features/journals/views/journal.view"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Journal",
    description:
        "Log your trade entries, track executions, and review your performance.",
}

export default function JournalPage() {
    return <JournalView />
}
