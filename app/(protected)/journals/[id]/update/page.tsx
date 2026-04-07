import JournalFormView from "@/features/journals/views/journal-form.view"

export default async function JournalUpdatePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    return <JournalFormView journalId={id} />
}
