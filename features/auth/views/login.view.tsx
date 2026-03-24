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
import ChartBars from "../components/charts-bar"
import StatBadge from "../components/stat-badge"
import FeatureItem from "../components/feature-item"

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
            linear-gradient(rgba(99,179,237,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.06) 1px, transparent 1px);
          background-size: 52px 52px;
        }
      `}</style>

            <div className="relative flex min-h-screen w-full overflow-hidden bg-[#070C18] font-[Outfit,system-ui,sans-serif]">
                {/* ── LEFT PANEL — Form ───────────────────────────────────────── */}
                <div className="relative z-10 flex w-full flex-col lg:w-[45%] xl:w-[42%]">
                    {/* Subtle left panel bg */}
                    <div className="absolute inset-0 bg-[#0B1120]" />
                    <div className="absolute inset-y-0 right-0 w-px bg-linear-to-b from-transparent via-white/8 to-transparent" />

                    <div className="relative flex flex-1 flex-col justify-center px-8 py-14 sm:px-12 lg:px-14 xl:px-16">
                        {/* Logo */}
                        <div className="mb-12 flex items-center gap-2.5">
                            <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]">
                                <TrendingUp className="size-4.5 text-white" />
                            </div>
                            <span className="text-[15px] font-semibold tracking-tight text-white">
                                TradeJournal
                            </span>
                        </div>

                        {/* Heading */}
                        <div className="mb-8 fade-in-1">
                            <p className="mb-1.5 text-xs font-medium tracking-[0.15em] text-blue-400/80 uppercase">
                                Welcome back
                            </p>
                            <h1 className="text-[28px] leading-tight font-semibold tracking-tight text-white">
                                Sign in to your
                                <br />
                                <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    trading dashboard
                                </span>
                            </h1>
                            <p className="mt-3 text-sm leading-relaxed text-white/40">
                                Access your journal, analytics, and performance
                                insights.
                            </p>
                        </div>

                        {/* Form card */}
                        <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm fade-in-2">
                            <LoginForm />
                        </div>

                        {/* Footer */}
                        <p className="mt-5 text-center text-[11px] text-white/15">
                            © {new Date().getFullYear()} TradeJournal · All
                            rights reserved
                        </p>
                    </div>
                </div>

                {/* ── RIGHT PANEL — Marketing ─────────────────────────────────── */}
                <div className="relative hidden overflow-hidden lg:grid lg:flex-1">
                    {/* Background */}
                    <div className="absolute inset-0 bg-linear-to-br from-[#060B18] via-[#0C1A3D] to-[#060B18]" />
                    <div className="grid-overlay absolute inset-0" />

                    {/* Glow blobs */}
                    <div
                        className="absolute top-[18%] left-[18%] size-96 rounded-full opacity-60 blur-3xl"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="absolute right-[10%] bottom-[18%] size-80 rounded-full opacity-50 blur-3xl"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(34,211,238,0.14) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="absolute top-[52%] left-[58%] size-64 rounded-full opacity-30 blur-3xl"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
                        }}
                    />

                    {/* Main content */}
                    <div className="relative z-10 grid h-full grid-cols-12 gap-6 px-10 py-12 xl:px-14 xl:py-14 2xl:px-16">
                        {/* Left content */}
                        <div className="col-span-12 grid content-start gap-6 xl:col-span-7">
                            {/* Hero */}
                            <div className="grid gap-4">
                                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
                                    <span className="size-1.5 animate-pulse rounded-full bg-blue-400" />
                                    Trusted by 12,000+ traders worldwide
                                </div>

                                <div className="grid gap-3">
                                    <h2 className="max-w-xl text-4xl leading-[1.1] font-semibold tracking-tight xl:text-[42px]">
                                        Track your edge.
                                        <br />
                                        <span
                                            className="bg-clip-text text-transparent"
                                            style={{
                                                backgroundImage:
                                                    "linear-gradient(135deg, #60A5FA 0%, #22D3EE 60%, #34D399 100%)",
                                            }}
                                        >
                                            Grow your capital.
                                        </span>
                                    </h2>

                                    <p className="max-w-lg text-sm leading-7 text-blue-100/60 xl:text-base">
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
                                    accent="text-emerald-400"
                                />
                                <StatBadge
                                    value="2.3×"
                                    label="Avg R:R"
                                    accent="text-blue-300"
                                />
                                <StatBadge
                                    value="1.2k+"
                                    label="Trades"
                                    accent="text-cyan-300"
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
                            <div className="grid gap-3 pt-2 text-[11px] text-blue-200/40 xl:grid-cols-3">
                                <span className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/4 px-3 py-2 backdrop-blur-sm">
                                    <Shield className="size-3.5" />
                                    End-to-end encrypted
                                </span>
                                <span className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/4 px-3 py-2 backdrop-blur-sm">
                                    <CheckCircle2 className="size-3.5" />
                                    SOC 2 compliant
                                </span>
                                <span className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/4 px-3 py-2 backdrop-blur-sm">
                                    <Activity className="size-3.5" />
                                    99.9% uptime
                                </span>
                            </div>
                        </div>

                        {/* Right content */}
                        <div className="col-span-12 grid content-start gap-6 xl:col-span-5">
                            {/* Chart card */}
                            <div className="rounded-2xl border border-white/8 bg-white/5 p-5 backdrop-blur-md">
                                <div className="mb-4 grid gap-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-medium tracking-widest text-blue-200/60 uppercase">
                                            Portfolio Performance
                                        </span>
                                        <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
                                            +24.6% YTD
                                        </span>
                                    </div>

                                    <p className="text-sm leading-6 text-blue-100/55">
                                        Track monthly growth and evaluate how
                                        your strategy performs across changing
                                        market conditions.
                                    </p>
                                </div>

                                <ChartBars />

                                <div className="mt-3 flex items-center justify-between text-[10px] text-blue-200/30">
                                    <span>Jan</span>
                                    <span>Mar</span>
                                    <span>Jun</span>
                                    <span>Sep</span>
                                    <span>Dec</span>
                                </div>
                            </div>

                            {/* Testimonial card */}
                            <div className="rounded-2xl border border-white/8 bg-white/5 p-5 backdrop-blur-md">
                                <div className="mb-3 flex gap-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <svg
                                            key={i}
                                            className="size-3.5 text-amber-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                <p className="text-sm leading-7 text-blue-100/60">
                                    &ldquo;TradeJournal completely changed how I
                                    review my trades. My consistency improved
                                    significantly within the first month.&rdquo;
                                </p>

                                <div className="mt-4 grid grid-cols-[auto_1fr] items-center gap-3">
                                    <div className="flex size-9 items-center justify-center rounded-full bg-linear-to-br from-blue-400 to-cyan-400 text-xs font-semibold text-white">
                                        AR
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white/85">
                                            Alex R.
                                        </p>
                                        <p className="text-xs text-blue-200/40">
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
