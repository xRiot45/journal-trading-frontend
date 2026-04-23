import JournalFormView from "@/features/journals/views/journal-form.view"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Create Journal",
    description: "Create a new journal.",
}

export default function JournalCreatePage() {
    return <JournalFormView />
}
