"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircleIcon } from "lucide-react"
import { TradingPlanFormFields } from "../components/trading-plan-form-fields"
import {
    CreateTradingPlanFormValues,
    createTradingPlanSchema,
    EditTradingPlanFormValues,
    editTradingPlanSchema,
    TradingPlanFormValues,
} from "../schemas/trading-plan.schema"
import {
    useCreateTradingPlanMutation,
    useUpdateTradingPlanMutation,
} from "../hooks/use-trading-plan-mutations"
import { useFindTradingPlanByIdQuery } from "../hooks/use-trading-plan-queries"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Container } from "@/components/ui/container"
import { TradingPlanRequest } from "../types/trading-plan.types"
import { useTradingPlanStore } from "../store/trading-plan.store"

interface TradingPlanFormViewProps {
    tradingPlanId?: string
}

export default function TradingPlanFormView({
    tradingPlanId,
}: TradingPlanFormViewProps) {
    const router = useRouter()
    const isEditing = !!tradingPlanId

    const { setTradingPlan, setIsLoading } = useTradingPlanStore()

    const { data: existingData, isLoading: isLoadingData } =
        useFindTradingPlanByIdQuery(tradingPlanId!)

    const form = useForm<
        CreateTradingPlanFormValues | EditTradingPlanFormValues
    >({
        resolver: zodResolver(
            isEditing ? editTradingPlanSchema : createTradingPlanSchema
        ),
        defaultValues: {
            title: "",
            date: "",
            description: "",
            pairId: "",
            thumbnail: undefined,
        },
        mode: "onSubmit",
    })

    useEffect(() => {
        setIsLoading(isLoadingData)
    }, [isLoadingData, setIsLoading])

    useEffect(() => {
        if (existingData?.data) {
            setTradingPlan(existingData.data)

            form.reset({
                title: existingData.data.title ?? "",
                date: existingData.data.date ?? "",
                pairId: existingData.data.pair?.id ?? "",
                description: existingData.data.description ?? "",
                thumbnail: undefined,
            })
        }
    }, [existingData, form, setTradingPlan])

    const createMutation = useCreateTradingPlanMutation()
    const updateMutation = useUpdateTradingPlanMutation()

    const isProcessing =
        createMutation.status === "pending" ||
        updateMutation.status === "pending"

    const buildFormData = (values: TradingPlanFormValues): FormData => {
        const formData = new FormData()

        const {
            title: titleValue,
            date: dateValue,
            pairId: pairIdValue,
            description: descriptionValue,
            thumbnail: thumbnailValue,
        } = values

        if (titleValue) formData.append("title", titleValue)
        if (dateValue) formData.append("date", dateValue)
        if (pairIdValue) formData.append("pairId", pairIdValue)
        if (descriptionValue) formData.append("description", descriptionValue)
        if (thumbnailValue) formData.append("thumbnail", thumbnailValue)

        return formData
    }

    const handleSubmit = (values: TradingPlanFormValues) => {
        const formData = buildFormData(values)

        if (isEditing && tradingPlanId) {
            updateMutation.mutate(
                {
                    tradingPlanId: tradingPlanId,
                    payload: formData as unknown as TradingPlanRequest,
                },
                {
                    onSuccess: () => router.push("/trading-plans"),
                }
            )
        } else {
            createMutation.mutate(formData as unknown as TradingPlanRequest, {
                onSuccess: () => router.push("/trading-plans"),
            })
        }
    }

    if (isEditing && isLoadingData) {
        return (
            <Container>
                <div className="flex min-h-screen items-center justify-center">
                    <LoaderCircleIcon className="animate-spin text-zinc-400" />
                </div>
            </Container>
        )
    }

    return (
        <Container>
            <div className="min-h-screen bg-(--color-background)">
                <div className="mx-auto py-8">
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                        {isEditing
                            ? "Edit Trading Plan"
                            : "Create Trading Plan"}
                    </h1>
                    <p className="mt-2 text-sm text-zinc-500">
                        {isEditing
                            ? "Update your existing trading plan."
                            : "Build your trading plan with our intuitive editor."}
                    </p>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-6"
                    >
                        <TradingPlanFormFields form={form} />
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isProcessing}
                                onClick={() => router.push("/trading-plans")}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isProcessing}>
                                {isProcessing && (
                                    <LoaderCircleIcon className="animate-spin" />
                                )}
                                {isEditing
                                    ? "Update Trading Plan"
                                    : "Create Trading Plan"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Container>
    )
}
