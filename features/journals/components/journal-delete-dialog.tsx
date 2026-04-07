"use client"

import { LoaderCircleIcon } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useDeleteJournalMutation } from "../hooks/use-journal-mutations"
import { useJournalStore } from "../store/journal.store"

export function JournalDeleteDialog() {
    const { isDeleteDialogOpen, selectedJournal, closeDeleteDialog } =
        useJournalStore()
    const { mutate, status } = useDeleteJournalMutation(closeDeleteDialog)
    const isProcessing = status === "pending"

    const handleDelete = () => {
        if (!selectedJournal) return
        mutate(selectedJournal.id)
    }

    return (
        <Dialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
            <DialogContent showCloseButton={false} className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you want to delete journal{" "}
                    <strong>{selectedJournal?.date}</strong>? This action cannot
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
