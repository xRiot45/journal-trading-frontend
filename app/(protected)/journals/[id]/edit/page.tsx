import JournalFormView from "@/features/journals/views/journal-form.view"

export default async function JournalEditPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    return <JournalFormView journalId={id} />
}
