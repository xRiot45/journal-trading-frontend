"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardHeader, CardToolbar } from "@/components/ui/card"

interface ToolbarProps {
    isLoading: boolean
}

export function Toolbar({ isLoading }: ToolbarProps) {
    const router = useRouter()

    const handleAddNewEntry = () => {
        router.push("/journals/create")
    }

    return (
        <CardHeader className="flex items-center justify-end gap-4 py-5">
            <CardToolbar>
                <Button disabled={isLoading} onClick={handleAddNewEntry}>
                    <Plus />
                    Add New Trading Entry
                </Button>
            </CardToolbar>
        </CardHeader>
    )
}
