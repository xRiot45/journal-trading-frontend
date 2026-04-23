import JournalFormView from "@/features/journals/views/journal-form.view"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Edit Journal",
    description: "Edit an existing journal.",
}

export default async function JournalEditPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    return <JournalFormView journalId={id} />
}
