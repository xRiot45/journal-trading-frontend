"use client"

import {
    TrendingUp,
    BarChart2,
    Activity,
    Shield,
    Bell,
    BookOpen,
    Zap,
    CheckCircle2,
} from "lucide-react"
import { LoginForm } from "../components/login-form"
import ChartBars from "../components/ui/charts-bar"
import StatBadge from "../components/ui/stat-badge"
import FeatureItem from "../components/ui/feature-item"

export default function LoginView() {
    return (
        <>
            <style>{`
        @keyframes blob-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.97); }
        }
        @keyframes float-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bar-rise {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        .blob-1 { animation: blob-drift 12s ease-in-out infinite; }
        .blob-2 { animation: blob-drift 16s ease-in-out infinite reverse; }
        .fade-in-1 { animation: float-up 0.5s ease forwards; }
        .fade-in-2 { animation: float-up 0.5s 0.1s ease both; }
        .fade-in-3 { animation: float-up 0.5s 0.2s ease both; }
        .fade-in-4 { animation: float-up 0.5s 0.3s ease both; }
        .grid-overlay {
          background-image:
            linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
          background-size: 52px 52px;
        }
        .dark .grid-overlay {
          background-image:
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
        }
      `}</style>

            <div className="relative flex min-h-screen w-full overflow-hidden bg-white font-[Outfit,system-ui,sans-serif] text-black transition-colors dark:bg-black dark:text-white">
                {/* ── LEFT PANEL — Form ───────────────────────────────────────── */}
                <div className="relative z-10 flex w-full flex-col lg:w-[45%] xl:w-[42%]">
                    <div className="absolute inset-0 bg-[#fafafa] dark:bg-[#0a0a0a]" />
                    <div className="absolute inset-y-0 right-0 w-px bg-linear-to-b from-transparent via-black/10 to-transparent dark:via-white/10" />

                    <div className="relative flex flex-1 flex-col justify-center px-8 py-14 sm:px-12 lg:px-14 xl:px-32">
                        {/* Logo */}
                        <div className="mb-12 flex items-center gap-2.5">
                            <div className="flex size-9 items-center justify-center rounded-xl bg-black text-white shadow-[0_0_20px_rgba(0,0,0,0.08)] dark:bg-white dark:text-black dark:shadow-[0_0_20px_rgba(255,255,255,0.12)]">
                                <TrendingUp className="size-4.5" />
                            </div>
                            <span className="text-[15px] font-semibold tracking-tight text-black dark:text-white">
                                TradeJournal
                            </span>
                        </div>

                        {/* Heading */}
                        <div className="mb-8 fade-in-1">
                            <p className="mb-1.5 text-xs font-medium tracking-[0.15em] text-black/55 uppercase dark:text-white/55">
                                Welcome back
                            </p>
                            <h1 className="text-[28px] leading-tight font-semibold tracking-tight text-black dark:text-white">
                                Sign in to your
                                <br />
                                <span className="text-black/70 dark:text-white/75">
                                    trading dashboard
                                </span>
                            </h1>
                            <p className="mt-3 text-sm leading-relaxed text-black/45 dark:text-white/40">
                                Access your journal, analytics, and performance
                                insights.
                            </p>
                        </div>

                        {/* Form card */}
                        <div className="rounded-2xl backdrop-blur-sm fade-in-2">
                            <LoginForm />
                        </div>

                        {/* Footer */}
                        <p className="mt-5 text-center text-[11px] text-black/20 dark:text-white/15">
                            © {new Date().getFullYear()} TradeJournal · All
                            rights reserved
                        </p>
                    </div>
                </div>

                {/* ── RIGHT PANEL — Marketing ─────────────────────────────────── */}
                <div className="relative hidden overflow-hidden lg:grid lg:flex-1">
                    {/* Background */}
                    <div className="absolute inset-0 bg-linear-to-br from-white via-[#f4f4f4] to-white dark:from-black dark:via-[#111111] dark:to-black" />
                    <div className="grid-overlay absolute inset-0" />

                    {/* Glow blobs */}
                    <div
                        className="blob-1 absolute top-[18%] left-[18%] size-96 rounded-full opacity-60 blur-3xl dark:opacity-50"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(0,0,0,0.08) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="blob-2 absolute right-[10%] bottom-[18%] size-80 rounded-full opacity-50 blur-3xl dark:opacity-40"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(0,0,0,0.06) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="absolute top-[52%] left-[58%] size-64 rounded-full opacity-40 blur-3xl dark:opacity-30"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%)",
                        }}
                    />

                    <div
                        className="pointer-events-none absolute top-[18%] left-[18%] hidden size-96 rounded-full blur-3xl dark:block"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="pointer-events-none absolute right-[10%] bottom-[18%] hidden size-80 rounded-full blur-3xl dark:block"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="pointer-events-none absolute top-[52%] left-[58%] hidden size-64 rounded-full blur-3xl dark:block"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)",
                        }}
                    />

                    {/* Main content */}
                    <div className="relative z-10 grid h-full grid-cols-12 gap-6 px-10 py-12 xl:px-14 xl:py-14 2xl:px-16">
                        {/* Left content */}
                        <div className="col-span-12 grid content-start gap-6 xl:col-span-7">
                            {/* Hero */}
                            <div className="grid gap-4">
                                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3.5 py-1.5 text-xs font-medium text-black/80 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
                                    <span className="size-1.5 animate-pulse rounded-full bg-black/75 dark:bg-white/80" />
                                    Trusted by 12,000+ traders worldwide
                                </div>

                                <div className="grid gap-3">
                                    <h2 className="max-w-xl text-4xl leading-[1.1] font-semibold tracking-tight text-black xl:text-[42px] dark:text-white">
                                        Track your edge.
                                        <br />
                                        <span className="text-black/65 dark:text-white/65">
                                            Grow your capital.
                                        </span>
                                    </h2>

                                    <p className="max-w-lg text-sm leading-7 text-black/55 xl:text-base dark:text-white/55">
                                        The professional trading journal that
                                        helps you analyze performance, discover
                                        repeatable patterns, and make sharper
                                        decisions with confidence.
                                    </p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid max-w-xl grid-cols-3 gap-3">
                                <StatBadge
                                    value="68.4%"
                                    label="Win Rate"
                                    accent="text-black dark:text-white"
                                />
                                <StatBadge
                                    value="2.3×"
                                    label="Avg R:R"
                                    accent="text-black dark:text-white"
                                />
                                <StatBadge
                                    value="1.2k+"
                                    label="Trades"
                                    accent="text-black dark:text-white"
                                />
                            </div>

                            {/* Features */}
                            <div className="grid max-w-2xl grid-cols-1 gap-3 2xl:grid-cols-2">
                                <FeatureItem
                                    icon={BarChart2}
                                    title="Deep performance analytics"
                                    description="Visualize your win rate, drawdown, expectancy, and more."
                                />
                                <FeatureItem
                                    icon={Bell}
                                    title="Real-time trade alerts"
                                    description="Get notified the moment your setups trigger across markets."
                                />
                                <FeatureItem
                                    icon={BookOpen}
                                    title="Structured trade journal"
                                    description="Log entries, notes, screenshots, and tags in seconds."
                                />
                                <FeatureItem
                                    icon={Zap}
                                    title="AI-powered insights"
                                    description="Automatically surface patterns and areas for improvement."
                                />
                            </div>

                            {/* Trust bar */}
                            <div className="grid gap-3 pt-2 text-[11px] text-black/45 xl:grid-cols-3 dark:text-white/45">
                                <span className="flex items-center gap-2 rounded-lg border border-black/10 bg-black/5 px-3 py-2 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                                    <Shield className="size-3.5" />
                                    End-to-end encrypted
                                </span>
                                <span className="flex items-center gap-2 rounded-lg border border-black/10 bg-black/5 px-3 py-2 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                                    <CheckCircle2 className="size-3.5" />
                                    SOC 2 compliant
                                </span>
                                <span className="flex items-center gap-2 rounded-lg border border-black/10 bg-black/5 px-3 py-2 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                                    <Activity className="size-3.5" />
                                    99.9% uptime
                                </span>
                            </div>
                        </div>

                        {/* Right content */}
                        <div className="col-span-12 grid content-start gap-6 xl:col-span-5">
                            {/* Chart card */}
                            <div className="rounded-2xl border border-black/10 bg-black/5 p-5 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
                                <div className="mb-4 grid gap-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-medium tracking-widest text-black/50 uppercase dark:text-white/50">
                                            Portfolio Performance
                                        </span>
                                        <span className="rounded-full bg-black/10 px-2.5 py-1 text-[11px] font-semibold text-black dark:bg-white/10 dark:text-white">
                                            +24.6% YTD
                                        </span>
                                    </div>

                                    <p className="text-sm leading-6 text-black/50 dark:text-white/50">
                                        Track monthly growth and evaluate how
                                        your strategy performs across changing
                                        market conditions.
                                    </p>
                                </div>

                                <ChartBars />

                                <div className="mt-3 flex items-center justify-between text-[10px] text-black/25 dark:text-white/25">
                                    <span>Jan</span>
                                    <span>Mar</span>
                                    <span>Jun</span>
                                    <span>Sep</span>
                                    <span>Dec</span>
                                </div>
                            </div>

                            {/* Testimonial card */}
                            <div className="rounded-2xl border border-black/10 bg-black/5 p-5 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
                                <div className="mb-3 flex gap-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <svg
                                            key={i}
                                            className="size-3.5 text-black/85 dark:text-white/85"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                <p className="text-sm leading-7 text-black/60 dark:text-white/60">
                                    &ldquo;TradeJournal completely changed how I
                                    review my trades. My consistency improved
                                    significantly within the first month.&rdquo;
                                </p>

                                <div className="mt-4 grid grid-cols-[auto_1fr] items-center gap-3">
                                    <div className="flex size-9 items-center justify-center rounded-full bg-black text-xs font-semibold text-white dark:bg-white dark:text-black">
                                        AR
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-black/85 dark:text-white/85">
                                            Alex R.
                                        </p>
                                        <p className="text-xs text-black/35 dark:text-white/35">
                                            Futures trader · 4 yrs experience
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
