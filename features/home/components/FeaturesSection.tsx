"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import {
    BookOpen,
    BarChart3,
    Target,
    CalendarRange,
    Layers,
    Zap,
} from "lucide-react"

const features = [
    {
        icon: BookOpen,
        title: "Structured Trade Journaling",
        description:
            "Log every trade with rich detail: entry/exit, lot size, PnL, direction, and notes. Never lose context again.",
        tag: "Core",
    },
    {
        icon: BarChart3,
        title: "Performance Analytics",
        description:
            "Visualize win rate, drawdown, expectancy, and risk-reward across any time range. See exactly where you shine.",
        tag: "Analytics",
    },
    {
        icon: Target,
        title: "Strategy Tracking",
        description:
            "Tag trades to specific strategies and discover which setups are actually profitable vs. just comfortable.",
        tag: "Strategy",
    },
    {
        icon: CalendarRange,
        title: "PnL Calendar",
        description:
            "A heatmap-style calendar view of your monthly trading performance. Spot patterns in days, weeks, and months.",
        tag: "Calendar",
    },
    {
        icon: Layers,
        title: "Trading Plans",
        description:
            "Document your pre-trade analysis and post-trade review. Build the habit of trading with a plan.",
        tag: "Planning",
    },
    {
        icon: Zap,
        title: "Session Intelligence",
        description:
            "Track performance by trading session — London, New York, or Asia. Know when you trade best.",
        tag: "Sessions",
    },
]

function FeatureCard({
    feature,
    index,
}: {
    feature: (typeof features)[0]
    index: number
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                delay: index * 0.08,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative space-x-2 rounded-2xl border border-black/8 bg-black/2 p-6 transition-all duration-300 hover:border-black/15 hover:bg-black/5 dark:border-white/8 dark:bg-white/2 dark:hover:border-white/15 dark:hover:bg-white/5"
        >
            {/* Icon */}
            <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-black/5 transition-colors group-hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:group-hover:bg-white/10">
                <feature.icon className="h-4.5 w-4.5 text-black dark:text-white" />
            </div>

            {/* Tag */}
            <span className="text-[10px] font-semibold tracking-widest text-black/30 uppercase dark:text-white/30">
                {feature.tag}
            </span>

            {/* Title */}
            <h3 className="mt-2 text-base leading-snug font-semibold text-black dark:text-white">
                {feature.title}
            </h3>

            {/* Description */}
            <p className="mt-2.5 text-sm leading-relaxed text-black/50 dark:text-white/50">
                {feature.description}
            </p>

            {/* Hover line accent */}
            <div className="absolute right-6 bottom-0 left-6 h-px bg-linear-to-r from-transparent via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:via-white/20" />
        </motion.div>
    )
}

export function FeaturesSection() {
    const titleRef = useRef(null)
    const titleInView = useInView(titleRef, { once: true, margin: "-50px" })

    return (
        <section
            id="features"
            className="relative bg-white py-28 dark:bg-black"
        >
            {/* Divider line top */}
            <div className="absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent via-black/15 to-transparent dark:via-white/15" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <div ref={titleRef} className="mb-16 max-w-2xl">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={titleInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-xs font-semibold tracking-[0.2em] text-black/40 uppercase dark:text-white/40"
                    >
                        What You Get
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={titleInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            delay: 0.1,
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="mt-4 text-4xl font-bold tracking-tight text-black lg:text-5xl dark:text-white"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                        Every tool you need.{" "}
                        <span className="text-black/35 dark:text-white/35">
                            Nothing you don&apos;t.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={titleInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mt-5 text-base leading-relaxed text-black/50 dark:text-white/50"
                    >
                        Purpose-built for serious traders who want clarity over
                        chaos — an opinionated toolkit that keeps you focused on
                        what matters.
                    </motion.p>
                </div>

                {/* Feature grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, i) => (
                        <FeatureCard
                            key={feature.title}
                            feature={feature}
                            index={i}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
