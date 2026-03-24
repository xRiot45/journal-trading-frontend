import Link from "next/link"
import { TrendingUp } from "lucide-react"

type HeaderLogoProps = {
    title?: string
    href?: string
}

export function HeaderLogo({ href = "/" }: HeaderLogoProps) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 rounded-xl transition-opacity outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
            <div className="flex size-9 items-center justify-center rounded-xl bg-black text-white shadow-[0_0_20px_rgba(0,0,0,0.08)] dark:bg-white dark:text-black dark:shadow-[0_0_20px_rgba(255,255,255,0.12)]">
                <TrendingUp className="size-4.5" />
            </div>

            <div className="hidden sm:block">
                <span className="text-[15px] font-semibold tracking-tight text-black dark:text-white">
                    TradeJournal
                </span>
            </div>
        </Link>
    )
}
