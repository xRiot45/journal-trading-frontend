import { Bookmark, MoreHorizontal, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { TradingPlan } from "../../types/trading-plan.types"

interface ActionBarProps {
    plan: TradingPlan
}

export function ActionBar({ plan }: ActionBarProps) {
    return (
        <div className="flex items-center justify-between border-y border-neutral-200 py-4 dark:border-neutral-800">
            <div className="flex items-center gap-5">
                <TooltipProvider delayDuration={300}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2 px-0 text-neutral-500 hover:bg-transparent hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                            >
                                <Bookmark className="h-5 w-5" />
                                <span className="text-sm">Save</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            Save to library
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2 px-0 text-neutral-500 hover:bg-transparent hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                            >
                                <Share2 className="h-5 w-5" />
                                <span className="text-sm">Share</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            Share plan
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <Button
                variant="ghost"
                size="icon"
                className="text-neutral-400 hover:bg-transparent hover:text-neutral-900 dark:hover:text-neutral-100"
            >
                <MoreHorizontal className="h-5 w-5" />
            </Button>
        </div>
    )
}
