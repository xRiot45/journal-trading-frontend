"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const points = [
    "No subscription fees. No limits.",
    "Your data, always yours.",
    "Built for serious traders.",
]

export function CtaSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-60px" })

    return (
        <section
            ref={ref}
            className="relative overflow-hidden bg-white py-28 dark:bg-black"
        >
            <div className="absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent via-black/12 to-transparent dark:via-white/12" />

            {/* Background accent */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-100 w-200 rounded-full bg-black/4 blur-[100px] dark:bg-white/4" />
            </div>

            <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
                {/* Label */}
                <motion.span
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-5 inline-block text-xs font-semibold tracking-[0.2em] text-black/40 uppercase dark:text-white/40"
                >
                    Ready?
                </motion.span>

                {/* Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 28 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                        delay: 0.1,
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-5xl leading-[1.1] font-bold tracking-tight text-black lg:text-6xl dark:text-white"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                >
                    Stop guessing.
                    <br />
                    <span className="text-black/35 dark:text-white/35">
                        Start knowing.
                    </span>
                </motion.h2>

                {/* Sub */}
                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-black/50 dark:text-white/50"
                >
                    Your edge is already in your data. Open your journal and
                    start finding it.
                </motion.p>

                {/* Points */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8"
                >
                    {points.map((p) => (
                        <div
                            key={p}
                            className="flex items-center gap-2 text-sm text-black/55 dark:text-white/55"
                        >
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-black/40 dark:text-white/40" />
                            {p}
                        </div>
                    ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                        delay: 0.4,
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mt-12"
                >
                    <Link
                        href="/dashboard"
                        className="group inline-flex h-14 items-center gap-3 rounded-2xl bg-black px-8 text-base font-semibold text-white shadow-2xl shadow-black/20 transition-all hover:gap-4 hover:bg-black/85 hover:shadow-black/30 dark:bg-white dark:text-black dark:shadow-white/10 dark:hover:bg-white/85 dark:hover:shadow-white/20"
                    >
                        Open My Dashboard
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
