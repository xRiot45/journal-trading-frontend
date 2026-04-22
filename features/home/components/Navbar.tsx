"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Moon, Sun, TrendingUp, Menu, X } from "lucide-react"

export function Navbar() {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true)
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const navLinks = [
        { label: "Features", href: "#features" },
        { label: "Preview", href: "#preview" },
    ]

    return (
        <>
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? "border-b border-black/8 bg-white/80 backdrop-blur-xl dark:border-white/8 dark:bg-black/80"
                        : "bg-transparent"
                } `}
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="group flex items-center gap-2.5"
                        >
                            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-black dark:bg-white">
                                <TrendingUp className="relative z-10 h-4 w-4 text-white dark:text-black" />
                            </div>
                            <span className="text-[15px] font-semibold tracking-tight text-black dark:text-white">
                                TradeJournal
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden items-center gap-8 md:flex">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-black/55 transition-colors duration-200 hover:text-black dark:text-white/55 dark:hover:text-white"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            {/* Theme Toggle */}
                            <button
                                onClick={() =>
                                    setTheme(
                                        resolvedTheme === "dark"
                                            ? "light"
                                            : "dark"
                                    )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-black/5 transition-colors hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                                aria-label="Toggle theme"
                            >
                                {mounted ? (
                                    resolvedTheme === "dark" ? (
                                        <Sun className="h-3.5 w-3.5 text-white/70" />
                                    ) : (
                                        <Moon className="h-3.5 w-3.5 text-black/70" />
                                    )
                                ) : (
                                    <Moon className="h-3.5 w-3.5" />
                                )}
                            </button>

                            {/* CTA */}
                            <Link
                                href="/dashboard"
                                className="hidden h-9 items-center gap-1.5 rounded-lg bg-black px-4 text-sm font-medium text-white transition-colors hover:bg-black/85 md:inline-flex dark:bg-white dark:text-black dark:hover:bg-white/85"
                            >
                                Dashboard
                            </Link>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 md:hidden dark:border-white/10"
                            >
                                {mobileOpen ? (
                                    <X className="h-4 w-4 text-black dark:text-white" />
                                ) : (
                                    <Menu className="h-4 w-4 text-black dark:text-white" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-0 top-16 z-40 border-b border-black/8 bg-white/95 backdrop-blur-xl md:hidden dark:border-white/8 dark:bg-black/95"
                    >
                        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="border-b border-black/5 py-2 text-base text-black/70 transition-colors hover:text-black dark:border-white/5 dark:text-white/70 dark:hover:text-white"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <Link
                                href="/dashboard"
                                className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-black px-4 text-sm font-medium text-white dark:bg-white dark:text-black"
                            >
                                Go to Dashboard
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
