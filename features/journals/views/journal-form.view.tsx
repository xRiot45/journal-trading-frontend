"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import {
    createJournalSchema,
    JouralFormValues,
    updateJournalSchema,
} from "../schemas/journal.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFindJournalByIdQuery } from "../hooks/use-journal-queries"
import { Form } from "@/components/ui/form"
import { JournalFormFields } from "../components/journal-form-fields"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { useEffect } from "react"
import { useJournalStore } from "../store/journal.store"
import { useCreateJournalMutation } from "../hooks/use-journal-mutations"

interface JournalFormViewProps {
    journalId?: string
}

export default function JournalFormView({ journalId }: JournalFormViewProps) {
    const router = useRouter()
    const isEditing = !!journalId

    const { setJournal, setIsLoading } = useJournalStore()

    const { data: existingData, isLoading: isLoadingData } =
        useFindJournalByIdQuery(journalId!)

    const form = useForm<JouralFormValues>({
        resolver: zodResolver(
            isEditing ? updateJournalSchema : createJournalSchema
        ),
        defaultValues: isEditing
            ? {
                  date: existingData?.data?.date ?? "",
                  direction: existingData?.data?.direction,
                  status: existingData?.data?.status,
                  lotSize: existingData?.data?.lotSize ?? undefined,
                  entryPrice: existingData?.data?.entryPrice ?? undefined,
                  entryTime: existingData?.data?.entryTime,
                  closingPrice: existingData?.data?.closingPrice ?? undefined,
                  closingTime: existingData?.data?.closingTime,
                  takeProfit: existingData?.data?.takeProfit ?? undefined,
                  stopLoss: existingData?.data?.stopLoss ?? undefined,
                  profitAndLoss: existingData?.data?.profitAndLost ?? undefined,
                  riskRatio: existingData?.data?.riskRatio ?? undefined,
                  rewardRatio: existingData?.data?.rewardRation ?? undefined,
                  basedOnPlan: existingData?.data?.basedOnPlan,
                  note: existingData?.data?.note ?? "",
                  pairId: existingData?.data?.pair?.id,
                  strategyId: existingData?.data?.strategy?.id,
              }
            : {
                  date: "",
                  direction: undefined,
                  status: undefined,
                  lotSize: undefined,
                  entryPrice: undefined,
                  entryTime: "",
                  closingPrice: undefined,
                  closingTime: "",
                  takeProfit: undefined,
                  stopLoss: undefined,
                  profitAndLoss: undefined,
                  riskRatio: undefined,
                  rewardRatio: undefined,
                  basedOnPlan: undefined,
                  note: "",
                  pairId: "",
                  strategyId: "",
              },
    })

    useEffect(() => {
        setIsLoading(isLoadingData)
    }, [isLoadingData, setIsLoading])

    useEffect(() => {
        if (existingData?.data) {
            setJournal(existingData.data)
        }
    }, [existingData, setJournal])

    const createMutation = useCreateJournalMutation()

    const isProcessing = createMutation.status === "pending"

    const handleSubmit = (values: JouralFormValues) => {
        if (isEditing) {
            console.log(values)
            return
        } else {
            createMutation.mutate(values)
        }
    }

    return (
        <>
            <Container size="2xl">
                <div className="min-h-screen bg-(--color-background)">
                    <div className="mx-auto">
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                            {isEditing ? "Edit journal" : "Create journal"}
                        </h1>
                        <p className="mt-2 text-sm text-zinc-500">
                            {isEditing
                                ? "Update your existing journal."
                                : "Build your journal with our intuitive editor."}
                        </p>
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className="mt-12 space-y-8"
                        >
                            <JournalFormFields form={form} />
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.push("/journals")}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    {isEditing
                                        ? "Update Journal"
                                        : "Create Journal"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </Container>
        </>
    )
}
