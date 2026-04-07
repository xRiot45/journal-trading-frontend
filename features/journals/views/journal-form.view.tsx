"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import {
    CreateJournalFormValues,
    createJournalSchema,
    JournalFormValues,
    UpdateJournalFormValues,
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
import {
    useCreateJournalMutation,
    useUpdateJournalMutation,
} from "../hooks/use-journal-mutations"
import { LoaderCircleIcon } from "lucide-react"

interface JournalFormViewProps {
    journalId?: string
}

export default function JournalFormView({ journalId }: JournalFormViewProps) {
    const router = useRouter()
    const isEditing = !!journalId

    const { setIsLoading } = useJournalStore()

    const { data: existingData, isLoading: isLoadingData } =
        useFindJournalByIdQuery(journalId!)

    const form = useForm<CreateJournalFormValues | UpdateJournalFormValues>({
        resolver: zodResolver(
            isEditing ? updateJournalSchema : createJournalSchema
        ),
        defaultValues: {
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
        mode: "onSubmit",
    })

    useEffect(() => {
        setIsLoading(isLoadingData)
    }, [isLoadingData, setIsLoading])

    useEffect(() => {
        if (!existingData?.data) return

        const d = existingData.data
        form.reset({
            date: d.date ? d.date.split("T")[0] : "",
            direction: d.direction,
            status: d.status,
            lotSize: d.lotSize ?? undefined,
            entryPrice: d.entryPrice ?? undefined,
            entryTime: d.entryTime,
            closingPrice: d.closingPrice ?? undefined,
            closingTime: d.closingTime,
            takeProfit: d.takeProfit ?? undefined,
            stopLoss: d.stopLoss ?? undefined,
            profitAndLoss: d.profitAndLoss ?? undefined,
            riskRatio: d.riskRatio ?? undefined,
            rewardRatio: d.rewardRatio ?? undefined,
            basedOnPlan: d.basedOnPlan,
            note: d.note ?? "",
            pairId: d.pair?.id ?? "",
            strategyId: d.strategy?.id ?? "",
        })
    }, [existingData, form])

    const createMutation = useCreateJournalMutation()
    const updateMutation = useUpdateJournalMutation()

    const isProcessing =
        createMutation.status === "pending" ||
        updateMutation.status === "pending"

    const handleSubmit = (values: JournalFormValues) => {
        if (isEditing && journalId) {
            updateMutation.mutate({ journalId, payload: values })
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
                            className="space-y-6"
                        >
                            <JournalFormFields form={form} />
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={isProcessing}
                                    onClick={() => router.push("/journals")} // ✅ fix route
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isProcessing}>
                                    {isProcessing && (
                                        <LoaderCircleIcon className="animate-spin" />
                                    )}
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
