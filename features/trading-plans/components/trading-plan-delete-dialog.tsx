"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Icon } from "@iconify/react"

interface TradingPlanDeleteDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
    planTitle?: string
}

export function TradingPlanDeleteDialog({
    open,
    onOpenChange,
    onConfirm,
    planTitle,
}: TradingPlanDeleteDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-start text-base font-bold">
                        Delete Trading Plan?
                    </DialogTitle>
                    <DialogDescription className="text-start text-sm">
                        {planTitle ? (
                            <>
                                You are about to delete{" "}
                                <span className="font-medium text-foreground">
                                    &quot;{planTitle}&quot;
                                </span>
                                . This action cannot be undone and all data
                                associated with this plan will be permanently
                                removed.
                            </>
                        ) : (
                            "This action cannot be undone and all data associated with this plan will be permanently removed."
                        )}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:justify-end">
                    <Button className="flex-1 sm:flex-none">Cancel</Button>
                    <Button
                        onClick={onConfirm}
                        className="flex-1 bg-destructive text-white hover:bg-destructive/90 sm:flex-none"
                    >
                        <Icon icon="lucide:trash-2" className="mr-1 size-3.5" />
                        Delete Plan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
