"use client"

import { useQueryClient } from "@tanstack/react-query"
import { LoaderCircleIcon } from "lucide-react"
import { toast } from "sonner"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRemovePairMutation } from "../application/mutations"
import { PairResponseData } from "../interfaces/pair.interface"

interface PairDeleteDialogProps {
    open: boolean
    onClose: () => void
    pair: PairResponseData | null
}

export function PairDeleteDialog({
    open,
    onClose,
    pair,
}: PairDeleteDialogProps) {
    const queryClient = useQueryClient()
    const mutation = useRemovePairMutation()
    const isProcessing = mutation.status === "pending"

    const handleDelete = () => {
        if (!pair) return

        mutation.mutate(pair.id, {
            onSuccess: () => {
                toast.success("Pair deleted")
                queryClient.invalidateQueries({ queryKey: ["pairs"] })
                onClose()
            },
            onError: (error: Error) => {
                toast.error(error.message)
            },
        })
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent showCloseButton={false} className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you want to delete pair{" "}
                    <strong>{pair?.name}</strong>? This action cannot be undone.
                </DialogDescription>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onClose}
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
