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
import { useStrategyStore } from "../store/strategies.store"
import { useDeleteStrategyMutation } from "../hooks/use-strategies-mutations"

export function StrategyDeleteDialog() {
    const { isDeleteDialogOpen, selectedStrategy, closeDeleteDialog } =
        useStrategyStore()

    const { mutate, status } = useDeleteStrategyMutation(closeDeleteDialog)
    const isProcessing = status === "pending"

    const handleDelete = () => {
        if (!selectedStrategy) return
        mutate(selectedStrategy.id)
    }

    return (
        <Dialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
            <DialogContent showCloseButton={false} className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you want to delete strategy{" "}
                    <strong>{selectedStrategy?.title}</strong>? This action
                    cannot be undone.
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
