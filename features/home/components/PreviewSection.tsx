"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

const tradeRows = [
    {
        date: "2025-01-15",
        pair: "EUR/USD",
        dir: "Buy",
        status: "Profit",
        pnl: "+$1,240",
        rr: "1:2.4",
        session: "London",
    },
    {
        date: "2025-01-14",
        pair: "BTC/USDT",
        dir: "Sell",
        status: "Loss",
        pnl: "-$380",
        rr: "1:1.2",
        session: "NY",
    },
    {
        date: "2025-01-13",
        pair: "NAS100",
        dir: "Buy",
        status: "Profit",
        pnl: "+$2,100",
        rr: "1:3.1",
        session: "NY",
    },
    {
        date: "2025-01-12",
        pair: "GOLD",
        dir: "Buy",
        status: "Profit",
        pnl: "+$640",
        rr: "1:2.0",
        session: "London",
    },
    {
        date: "2025-01-11",
        pair: "GBP/JPY",
        dir: "Sell",
        status: "Loss",
        pnl: "-$120",
        rr: "1:1.5",
        session: "Asia",
    },
]

const calDays = [
    null,
    null,
    { p: 0 },
    { p: 320 },
    { p: -80 },
    { p: 440 },
    { p: 0 },
    null,
    { p: 0 },
    { p: 1240 },
    { p: -380 },
    { p: 620 },
    { p: 0 },
    null,
    { p: 0 },
    { p: 840 },
    { p: -120 },
    { p: 2100 },
    { p: 640 },
    { p: 0 },
    null,
    { p: 0 },
    { p: 980 },
    { p: 0 },
    { p: -200 },
    { p: 0 },
    { p: 1100 },
    null,
    null,
    null,
    { p: 0 },
]

export function PreviewSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-80px" })

    return (
        <section
            id="preview"
            ref={ref}
            className="relative bg-black/2 py-28 dark:bg-white/2"
        >
            {/* top / bottom border */}
            <div className="absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent via-black/12 to-transparent dark:via-white/12" />
            <div className="absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent via-black/12 to-transparent dark:via-white/12" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16"
                >
                    <span className="text-xs font-semibold tracking-[0.2em] text-black/40 uppercase dark:text-white/40">
                        In Action
                    </span>
                    <h2
                        className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-black lg:text-5xl dark:text-white"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                        Your data.{" "}
                        <span className="text-black/35 dark:text-white/35">
                            Your clarity.
                        </span>
                    </h2>
                </motion.div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Journal Table Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                            delay: 0.15,
                            duration: 0.7,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-black"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-black/8 px-5 py-4 dark:border-white/8">
                            <div>
                                <p className="text-xs font-semibold tracking-widest text-black/40 uppercase dark:text-white/40">
                                    Trade Journal
                                </p>
                                <p className="mt-0.5 text-sm font-semibold text-black dark:text-white">
                                    January 2025
                                </p>
                            </div>
                            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                +$4,020 net
                            </span>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="border-b border-black/5 dark:border-white/5">
                                        {[
                                            "Date",
                                            "Pair",
                                            "Dir",
                                            "PnL",
                                            "R:R",
                                        ].map((h) => (
                                            <th
                                                key={h}
                                                className="px-4 py-2.5 text-left text-[10px] font-medium tracking-wide text-black/35 uppercase dark:text-white/35"
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tradeRows.map((row, i) => (
                                        <motion.tr
                                            key={row.date}
                                            initial={{ opacity: 0 }}
                                            animate={
                                                isInView ? { opacity: 1 } : {}
                                            }
                                            transition={{
                                                delay: 0.3 + i * 0.07,
                                            }}
                                            className="border-b border-black/4 transition-colors last:border-0 hover:bg-black/2 dark:border-white/4 dark:hover:bg-white/2"
                                        >
                                            <td className="px-4 py-3 font-mono text-[11px] text-black/45 dark:text-white/45">
                                                {row.date.slice(5)}
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-black dark:text-white">
                                                {row.pair}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`flex items-center gap-1 ${row.dir === "Buy" ? "text-blue-500" : "text-orange-500"}`}
                                                >
                                                    {row.dir === "Buy" ? (
                                                        <TrendingUp className="h-3 w-3" />
                                                    ) : (
                                                        <TrendingDown className="h-3 w-3" />
                                                    )}
                                                    {row.dir}
                                                </span>
                                            </td>
                                            <td
                                                className={`px-4 py-3 font-mono font-semibold ${row.status === "Profit" ? "text-emerald-500" : "text-red-500"}`}
                                            >
                                                {row.pnl}
                                            </td>
                                            <td className="px-4 py-3 font-mono text-black/50 dark:text-white/50">
                                                {row.rr}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Calendar + Stats */}
                    <div className="flex flex-col gap-5">
                        {/* PnL Calendar */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{
                                delay: 0.2,
                                duration: 0.7,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="rounded-2xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-black"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-semibold tracking-widest text-black/40 uppercase dark:text-white/40">
                                        PnL Calendar
                                    </p>
                                    <p className="mt-0.5 text-sm font-semibold text-black dark:text-white">
                                        January 2025
                                    </p>
                                </div>
                                <span className="text-xs text-black/40 dark:text-white/40">
                                    Month view
                                </span>
                            </div>

                            {/* Days of week */}
                            <div className="mb-1.5 grid grid-cols-7">
                                {["S", "M", "T", "W", "T", "F", "S"].map(
                                    (d, i) => (
                                        <div
                                            key={i}
                                            className="py-1 text-center text-[10px] font-medium text-black/25 dark:text-white/25"
                                        >
                                            {d}
                                        </div>
                                    )
                                )}
                            </div>
                            {/* Day cells */}
                            <div className="grid grid-cols-7 gap-1">
                                {calDays.map((day, i) => (
                                    <div
                                        key={i}
                                        className={`flex aspect-square items-center justify-center rounded-md font-mono text-[10px] ${
                                            !day
                                                ? "opacity-0"
                                                : day.p > 0
                                                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                                                  : day.p < 0
                                                    ? "bg-red-500/12 text-red-500"
                                                    : "bg-black/4 text-black/25 dark:bg-white/4 dark:text-white/25"
                                        }`}
                                    >
                                        {day && day.p !== 0 && (
                                            <span>
                                                {day.p > 0 ? "+" : ""}
                                                {day.p > 0
                                                    ? `${Math.round(day.p / 100)}`
                                                    : `-${Math.round(Math.abs(day.p) / 100)}`}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Quick stats row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.35, duration: 0.6 }}
                            className="grid grid-cols-3 gap-3"
                        >
                            {[
                                {
                                    label: "Win Rate",
                                    value: "68.4%",
                                    color: "emerald",
                                },
                                {
                                    label: "Avg R:R",
                                    value: "2.24",
                                    color: "blue",
                                },
                                {
                                    label: "Total Trades",
                                    value: "47",
                                    color: "default",
                                },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-xl border border-black/8 bg-white p-4 dark:border-white/8 dark:bg-black"
                                >
                                    <p className="text-[10px] font-semibold tracking-widest text-black/35 uppercase dark:text-white/35">
                                        {stat.label}
                                    </p>
                                    <p
                                        className="mt-1.5 text-xl font-bold text-black dark:text-white"
                                        style={{
                                            fontFamily: "'DM Mono', monospace",
                                        }}
                                    >
                                        {stat.value}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
