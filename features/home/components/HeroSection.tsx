"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react"

const ticker = [
    { pair: "EUR/USD", pnl: "+$1,240", trend: "up" },
    { pair: "BTC/USDT", pnl: "-$380", trend: "down" },
    { pair: "GOLD", pnl: "+$640", trend: "up" },
    { pair: "NAS100", pnl: "+$2,100", trend: "up" },
    { pair: "GBP/JPY", pnl: "-$120", trend: "down" },
    { pair: "OIL", pnl: "+$310", trend: "up" },
]

function FloatingCard({
    delay,
    className,
    children,
    style,
}: {
    delay: number
    className?: string
    children: React.ReactNode
    style?: React.CSSProperties
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    )
}

export function HeroSection() {
    return (
        <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-white pt-16 dark:bg-black">
            {/* Subtle grid background */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />
            <div
                className="absolute inset-0 hidden opacity-[0.04] dark:block"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Radial glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-150 w-150 rounded-full bg-black/5 blur-[120px] dark:bg-white/5" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-32">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Left — Copy */}
                    <div>
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3.5 py-1.5 dark:border-white/10 dark:bg-white/5"
                        >
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                            <span className="text-xs font-medium tracking-wide text-black/70 dark:text-white/70">
                                Personal Trading Journal
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.1,
                                duration: 0.7,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="text-5xl leading-[1.05] font-bold tracking-tight text-black sm:text-6xl lg:text-7xl dark:text-white"
                            style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                            Track Your
                            <br />
                            <span className="text-black/40 dark:text-white/40">
                                Edge.
                            </span>{" "}
                            <br className="hidden sm:block" />
                            <span>Win More.</span>
                        </motion.h1>

                        {/* Sub */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="mt-6 max-w-md text-lg leading-relaxed text-black/50 dark:text-white/50"
                        >
                            A personal trading journal built to surface your
                            patterns, sharpen your strategy, and compound your
                            growth — trade by trade.
                        </motion.p>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="mt-10 flex flex-wrap items-center gap-4"
                        >
                            <Link
                                href="/dashboard"
                                className="group inline-flex h-12 items-center gap-2.5 rounded-xl bg-black px-6 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all hover:gap-3.5 hover:bg-black/85 dark:bg-white dark:text-black dark:shadow-white/10 dark:hover:bg-white/85"
                            >
                                Go To My Dashboard
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                            <a
                                href="#features"
                                className="inline-flex h-12 items-center gap-2 px-6 text-sm font-medium text-black/60 transition-colors hover:text-black dark:text-white/60 dark:hover:text-white"
                            >
                                See features
                            </a>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="mt-12 flex items-center gap-8"
                        >
                            {[
                                { value: "100%", label: "Private & Yours" },
                                { value: "∞", label: "Journal Entries" },
                                { value: "0", label: "Excuses" },
                            ].map((stat) => (
                                <div key={stat.label} className="flex flex-col">
                                    <span
                                        className="text-2xl font-bold text-black dark:text-white"
                                        style={{
                                            fontFamily: "'DM Mono', monospace",
                                        }}
                                    >
                                        {stat.value}
                                    </span>
                                    <span className="mt-0.5 text-xs text-black/40 dark:text-white/40">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right — Visual Cards */}
                    <div className="relative hidden h-120 lg:block">
                        {/* Main card */}
                        <FloatingCard
                            delay={0.4}
                            className="absolute top-0 right-0 w-85 rounded-2xl border border-black/10 bg-white/80 p-5 shadow-2xl shadow-black/10 backdrop-blur-sm dark:border-white/10 dark:bg-black/80 dark:shadow-black/40"
                        >
                            <div className="mb-5 flex items-center justify-between">
                                <span className="text-xs font-semibold tracking-widest text-black/40 uppercase dark:text-white/40">
                                    Monthly PnL
                                </span>
                                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-500">
                                    +18.4%
                                </span>
                            </div>
                            {/* Mini chart bars */}
                            <div className="flex h-20 items-end gap-1.5">
                                {[
                                    35, 55, 40, 70, 45, 88, 60, 92, 55, 78, 68,
                                    100,
                                ].map((h, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-1 flex-col items-center gap-0.5"
                                    >
                                        <div
                                            className="w-full rounded-sm"
                                            style={{
                                                height: `${h * 0.76}px`,
                                                background:
                                                    i >= 9
                                                        ? "#10b981"
                                                        : `rgba(0,0,0,${0.12 + (i / 12) * 0.35})`,
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3 flex justify-between text-[10px] text-black/25 dark:text-white/25">
                                <span>Jan</span>
                                <span>Apr</span>
                                <span>Jul</span>
                                <span>Oct</span>
                                <span>Dec</span>
                            </div>
                        </FloatingCard>

                        {/* Stats card */}
                        <FloatingCard
                            delay={0.55}
                            className="absolute top-42.5 left-0 w-55 rounded-2xl border border-black/10 bg-white/80 p-4 shadow-xl shadow-black/10 backdrop-blur-sm dark:border-white/10 dark:bg-black/80"
                        >
                            <p className="mb-3 text-[10px] font-semibold tracking-widest text-black/40 uppercase dark:text-white/40">
                                Win Rate
                            </p>
                            <div className="mb-2 flex items-end gap-2">
                                <span
                                    className="text-3xl font-bold text-black dark:text-white"
                                    style={{
                                        fontFamily: "'DM Mono', monospace",
                                    }}
                                >
                                    68.4
                                </span>
                                <span className="mb-0.5 text-lg text-black/50 dark:text-white/50">
                                    %
                                </span>
                            </div>
                            {/* Progress */}
                            <div className="h-1.5 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                                <div className="h-full w-[68%] rounded-full bg-black dark:bg-white" />
                            </div>
                            <p className="mt-2 text-[10px] text-black/35 dark:text-white/35">
                                Last 30 trades
                            </p>
                        </FloatingCard>

                        {/* Ticker cards */}
                        {ticker.slice(0, 3).map((t, i) => (
                            <FloatingCard
                                key={t.pair}
                                delay={0.65 + i * 0.08}
                                className="absolute right-0 flex items-center justify-between gap-6 rounded-xl border border-black/8 bg-white/70 px-4 py-2.5 backdrop-blur-sm dark:border-white/8 dark:bg-black/70"
                                style={
                                    {
                                        top: `${270 + i * 64}px`,
                                        width: "280px",
                                    } as React.CSSProperties
                                }
                            >
                                <div className="flex items-center gap-2.5">
                                    <div
                                        className={`flex h-6 w-6 items-center justify-center rounded-md ${t.trend === "up" ? "bg-emerald-500/15" : "bg-red-500/15"}`}
                                    >
                                        {t.trend === "up" ? (
                                            <TrendingUp className="h-3 w-3 text-emerald-500" />
                                        ) : (
                                            <TrendingDown className="h-3 w-3 text-red-500" />
                                        )}
                                    </div>
                                    <span className="text-sm font-semibold text-black dark:text-white">
                                        {t.pair}
                                    </span>
                                </div>
                                <span
                                    className={`text-sm font-semibold tabular-nums ${t.trend === "up" ? "text-emerald-500" : "text-red-500"}`}
                                >
                                    {t.pnl}
                                </span>
                            </FloatingCard>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-32 bg-linear-to-t from-white to-transparent dark:from-black" />
        </section>
    )
}
