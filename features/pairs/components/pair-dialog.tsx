"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { LoaderCircleIcon } from "lucide-react"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { pairSchema, PairFormValues } from "../schemas/pair.schema"
import {
    useCreatePairMutation,
    useUpdatePairMutation,
} from "../application/mutations"
import { PairResponseData } from "../interfaces/pair.interface"

interface PairDialogProps {
    open: boolean
    onClose: () => void
    pair?: PairResponseData | null
}

export function PairDialog({ open, onClose, pair }: PairDialogProps) {
    const queryClient = useQueryClient()
    const isEditing = !!pair?.id

    const form = useForm<PairFormValues>({
        resolver: zodResolver(pairSchema),
        defaultValues: {
            name: "",
            description: "",
        },
        mode: "onSubmit",
    })

    useEffect(() => {
        if (open) {
            form.reset({
                name: pair?.name ?? "",
                description: pair?.description ?? "",
            })
        }
    }, [open, pair, form])

    const createMutation = useCreatePairMutation()
    const updateMutation = useUpdatePairMutation()

    const mutation = isEditing ? updateMutation : createMutation
    const isProcessing = mutation.status === "pending"

    const handleSubmit = (values: PairFormValues) => {
        const onSuccess = () => {
            toast.success(isEditing ? "Pair updated" : "Pair created")
            queryClient.invalidateQueries({ queryKey: ["pairs"] })
            onClose()
        }

        const onError = (error: Error) => {
            toast.error(error.message)
        }

        if (isEditing) {
            updateMutation.mutate(
                { id: pair.id, payload: values },
                { onSuccess, onError }
            )
        } else {
            createMutation.mutate(values, { onSuccess, onError })
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
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
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="rounded-md py-5"
                                            placeholder="Enter pair name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="rounded-md"
                                            placeholder="Enter pair description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
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
