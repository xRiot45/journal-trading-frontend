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
import { useDeletePairMutation } from "../hooks/use-pair-mutations"
import { usePairStore } from "../store/pair.store"

export function PairDeleteDialog() {
    const { isDeleteDialogOpen, selectedPair, closeDeleteDialog } =
        usePairStore()

    const { mutate, status } = useDeletePairMutation(closeDeleteDialog)
    const isProcessing = status === "pending"

    const handleDelete = () => {
        if (!selectedPair) return
        mutate(selectedPair.id)
    }

    return (
        <Dialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
            <DialogContent showCloseButton={false} className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you want to delete pair{" "}
                    <strong>{selectedPair?.name}</strong>? This action cannot be
                    undone.
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
