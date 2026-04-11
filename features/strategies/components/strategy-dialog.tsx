"use client"

import { useForm } from "react-hook-form"
import { StrategyFormValues, strategySchema } from "../schemas/strategy.schema"
import { useStrategyStore } from "../store/strategies.store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Form } from "@/components/ui/form"
import {
    useCreateStrategyMutation,
    useUpdateStrategyMutation,
} from "../hooks/use-strategies-mutations"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { StrategyFormFields } from "./strategy-form-fields"
import { Button } from "@/components/ui/button"
import { LoaderCircleIcon } from "lucide-react"

export function StrategyDialog() {
    const { isDialogOpen, selectedStrategy, closeDialog } = useStrategyStore()
    const isEditing = !!selectedStrategy?.id

    const form = useForm<StrategyFormValues>({
        resolver: zodResolver(strategySchema),
        defaultValues: {
            title: "",
            description: "",
        },
        mode: "onSubmit",
    })

    useEffect(() => {
        if (isDialogOpen && selectedStrategy) {
            form.reset({
                title: selectedStrategy.title ?? "",
                description: selectedStrategy.description ?? "",
            })
        }
    }, [isDialogOpen, selectedStrategy, form])

    const createMutation = useCreateStrategyMutation(closeDialog)
    const updateMutation = useUpdateStrategyMutation(closeDialog)

    const isProcessing =
        createMutation.status === "pending" ||
        updateMutation.status === "pending"

    const handleSubmit = (values: StrategyFormValues) => {
        if (isEditing) {
            updateMutation.mutate({ id: selectedStrategy.id, payload: values })
        } else {
            createMutation.mutate(values)
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
            <DialogContent showCloseButton={false} className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Edit Pair" : "Add Pair"}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-6"
                    >
                        <StrategyFormFields form={form} />

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeDialog}
                                disabled={isProcessing}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isProcessing}>
                                {isProcessing && (
                                    <LoaderCircleIcon className="animate-spin" />
                                )}
                                {isEditing
                                    ? "Update Strategy"
                                    : "Create Strategy"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
