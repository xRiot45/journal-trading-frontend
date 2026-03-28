"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircleIcon } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { pairSchema, type PairFormValues } from "../schemas/pair.schema"
import {
    useCreatePairMutation,
    useUpdatePairMutation,
} from "../hooks/use-pair-mutations"
import { usePairStore } from "../store/pair.store"
import { PairFormFields } from "./pair-form-fields"

export function PairDialog() {
    const { isDialogOpen, selectedPair, closeDialog } = usePairStore()
    const isEditing = !!selectedPair?.id

    const form = useForm<PairFormValues>({
        resolver: zodResolver(pairSchema),
        defaultValues: {
            name: "",
            description: "",
        },
        mode: "onSubmit",
    })

    useEffect(() => {
        if (isDialogOpen) {
            form.reset({
                name: selectedPair?.name ?? "",
                description: selectedPair?.description ?? "",
            })
        }
    }, [isDialogOpen, selectedPair, form])

    const createMutation = useCreatePairMutation(closeDialog)
    const updateMutation = useUpdatePairMutation(closeDialog)

    const isProcessing =
        createMutation.status === "pending" ||
        updateMutation.status === "pending"

    const handleSubmit = (values: PairFormValues) => {
        if (isEditing) {
            updateMutation.mutate({ id: selectedPair.id, payload: values })
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
                        <PairFormFields form={form} />

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
                                {isEditing ? "Update Pair" : "Create Pair"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
