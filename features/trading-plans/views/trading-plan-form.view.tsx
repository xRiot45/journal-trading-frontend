"use client"

import { useForm } from "react-hook-form"
import { TradingPlanFormFields } from "../components/trading-plan-form-fields"
import {
    TradingPlanFormValues,
    tradingPlanSchema,
} from "../schemas/trading-plan.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateTradingPlanMutation } from "../hooks/use-trading-plan-mutations"
import { LoaderCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Container } from "@/components/ui/container"
import { useRouter } from "next/navigation"

export default function TradingPlanFormView() {
    const router = useRouter()
    const form = useForm<TradingPlanFormValues>({
        resolver: zodResolver(tradingPlanSchema),
        defaultValues: {
            title: "",
            date: "",
            description: "",
            pairId: "",
            thumbnail: undefined,
        },
        mode: "onSubmit",
    })

    const createMutation = useCreateTradingPlanMutation()

    const isProcessing = createMutation.status === "pending"

    const handleSubmit = (values: TradingPlanFormValues) => {
        const formData = new FormData()
        formData.append("title", values.title)
        formData.append("date", values.date)
        formData.append("pairId", values.pairId)
        formData.append("description", values.description)
        if (values.thumbnail) {
            formData.append("thumbnail", values.thumbnail)
        }

        createMutation.mutate(formData as unknown as TradingPlanFormValues)
    }

    return (
        <Container>
            <div className="min-h-screen bg-(--color-background)">
                <div className="mx-auto py-8">
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                        Create Trading Plan
                    </h1>
                    <p className="mt-2 text-sm text-zinc-500">
                        Build your trading plan with our intuitive editor.
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
                                Create Trading Plan
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Container>
    )
}
