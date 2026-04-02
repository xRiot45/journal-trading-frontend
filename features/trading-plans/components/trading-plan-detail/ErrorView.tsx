import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorViewProps {
    message?: string
}

export function ErrorView({ message }: ErrorViewProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-5 dark:bg-neutral-950">
            <div className="w-full max-w-170 space-y-4 text-center">
                <p className="text-5xl">📉</p>
                <h2 className="font-['Georgia',serif] text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    Plan not found
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400">
                    {message ?? "This trading plan could not be loaded."}
                </p>
                <Button
                    variant="outline"
                    onClick={() => window.history.back()}
                    className="mt-2 rounded-none border-neutral-900 text-neutral-900 dark:border-neutral-100 dark:text-neutral-100"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go back
                </Button>
            </div>
        </div>
    )
}
