"use client"

import { TrendingUp } from "lucide-react"
import Link from "next/link"

export function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="relative border-t border-black/8 dark:border-white/8 bg-white dark:bg-black">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black dark:bg-white">
                            <TrendingUp className="h-3.5 w-3.5 text-white dark:text-black" />
                        </div>
                        <span className="text-sm font-semibold text-black dark:text-white tracking-tight">
                            TradeJournal
                        </span>
                    </div>

                    {/* Links */}
                    <nav className="flex items-center gap-6 text-xs text-black/40 dark:text-white/40">
                        <a href="#features" className="hover:text-black dark:hover:text-white transition-colors">
                            Features
                        </a>
                        <a href="#preview" className="hover:text-black dark:hover:text-white transition-colors">
                            Preview
                        </a>
                        <Link href="/dashboard" className="hover:text-black dark:hover:text-white transition-colors">
                            Dashboard
                        </Link>
                    </nav>

                    {/* Copyright */}
                    <p className="text-xs text-black/30 dark:text-white/30">
                        © {year} TradeJournal. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
