"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useDeleteSessionMutation } from "../hooks/use-session-mutations"
import { useSessionStore } from "../store/session.store"
import { Button } from "@/components/ui/button"
import { LoaderCircleIcon } from "lucide-react"

export function SessionDeleteDialog() {
    const { isDeleteDialogOpen, selectedSession, closeDeleteDialog } =
        useSessionStore()

    const { mutate, status } = useDeleteSessionMutation(closeDeleteDialog)
    const isProcessing = status === "pending"

    const handleDelete = () => {
        if (!selectedSession) return
        mutate(selectedSession.id)
    }

    return (
        <Dialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
            <DialogContent showCloseButton={false} className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you want to delete session{" "}
                    <strong>{selectedSession?.name}</strong>? This action cannot
                    be undone.
                </DialogDescription>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={closeDeleteDialog}
                        disabled={isProcessing}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isProcessing}
                        className="text-white"
                    >
                        {isProcessing && (
                            <LoaderCircleIcon className="animate-spin" />
                        )}
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
