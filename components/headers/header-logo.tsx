import Link from "next/link"
import { PanelTop } from "lucide-react"

type HeaderLogoProps = {
    title?: string
    href?: string
}

export function HeaderLogo({
    title = "MyDashboard",
    href = "/",
}: HeaderLogoProps) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 rounded-xl transition-opacity outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                <PanelTop className="h-5 w-5" />
            </div>

            <div className="hidden sm:block">
                <p className="text-sm leading-none font-semibold">{title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                    Admin dashboard
                </p>
            </div>
        </Link>
    )
}
