"use client"

import { useEffect } from "react"
import {
    useCreateSessionMutation,
    useUpdateSessionMutation,
} from "../hooks/use-session-mutations"
import { SessionFormValues, sessionSchema } from "../schemas/session.schema"
import { useSessionStore } from "../store/session.store"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { SessionFormFields } from "./session-form-fields"
import { Button } from "@/components/ui/button"
import { LoaderCircleIcon } from "lucide-react"
import { toHHmmss } from "@/helpers/time"

export function SessionDialog() {
    const { isDialogOpen, selectedSession, closeDialog } = useSessionStore()
    const isEditing = !!selectedSession?.id

    const form = useForm<SessionFormValues>({
        resolver: zodResolver(sessionSchema),
        defaultValues: {
            name: "",
            startTime: "",
            endTime: "",
        },
        mode: "onSubmit",
    })

    useEffect(() => {
        if (isDialogOpen) {
            form.reset({
                name: selectedSession?.name ?? "",
                startTime: selectedSession?.startTime ?? "",
                endTime: selectedSession?.endTime ?? "",
            })
        }
    }, [isDialogOpen, selectedSession, form])

    const createMutation = useCreateSessionMutation(closeDialog)
    const updateMutation = useUpdateSessionMutation(closeDialog)

    const isProcessing =
        createMutation.status === "pending" ||
        updateMutation.status === "pending"

    const handleSubmit = (values: SessionFormValues) => {
        const payload = {
            ...values,
            startTime: toHHmmss(values.startTime),
            endTime: toHHmmss(values.endTime),
        }

        if (isEditing) {
            updateMutation.mutate({
                id: selectedSession.id,
                payload,
            })
        } else {
            createMutation.mutate(payload)
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
            <DialogContent showCloseButton={false} className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Edit Session" : "Add Session"}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-6"
                    >
                        <SessionFormFields form={form} />

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
                                    ? "Update Session"
                                    : "Create Session"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
