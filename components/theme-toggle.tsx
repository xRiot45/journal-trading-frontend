"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const isDark = mounted && resolvedTheme === "dark"

    function handleToggle(): void {
        setTheme(isDark ? "light" : "dark")
    }

    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-11 w-11 rounded-2xl"
            onClick={handleToggle}
            aria-label="Toggle theme"
            title="Toggle theme (Press D)"
        >
            {mounted ? (
                isDark ? (
                    <Moon className="h-5 w-5" />
                ) : (
                    <Sun className="h-5 w-5" />
                )
            ) : (
                <Sun className="h-5 w-5" />
            )}
        </Button>
    )
}
