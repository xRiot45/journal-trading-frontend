"use client"

import { TrendingUp, BarChart2, Activity, Shield } from "lucide-react"
import { LoginForm } from "../components/login-form"

export default function LoginView() {
  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* ─── LEFT PANEL — Form (narrower) ─────────────────────────────── */}
      <div className="relative z-10 flex w-full flex-col justify-center px-8 py-12 sm:px-12 lg:w-[38%] lg:px-16 xl:px-20">
        {/* Logo */}
        <div className="mb-10 flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500">
            <TrendingUp className="size-4 text-white" />
          </div>
          <span className="text-base font-semibold tracking-tight">
            TradeJournal
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8 space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to access your trading journal
          </p>
        </div>

        {/* Form */}
        <LoginForm />

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <button className="text-blue-500 transition-colors hover:text-blue-400">
            Create one
          </button>
        </p>

        <p className="mt-6 text-center text-xs text-muted-foreground/50">
          © {new Date().getFullYear()} TradeJournal. All rights reserved.
        </p>
      </div>

      {/* ─── RIGHT PANEL — Visual (wider) ─────────────────────────────── */}
      <div className="relative hidden flex-1 lg:flex">
        {/* Background */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 dark:from-slate-950 dark:via-blue-950/60 dark:to-slate-950" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,179,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Glow blobs */}
        <div className="absolute top-1/3 left-1/4 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[80px]" />
        <div className="absolute right-1/4 bottom-1/3 size-56 translate-x-1/2 translate-y-1/2 rounded-full bg-cyan-400/10 blur-[60px]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-12 p-16 text-white">
          {/* Fake candlestick-style chart */}
          <div className="w-full max-w-md space-y-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium tracking-widest text-blue-200/70 uppercase">
                Portfolio Performance
              </span>
              <span className="text-xs font-semibold text-emerald-400">
                +24.6%
              </span>
            </div>
            <div className="flex items-end justify-between gap-1.5">
              {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex flex-1 flex-col items-center gap-0.5"
                >
                  {/* Wick top */}
                  <div
                    className="w-px bg-blue-300/30"
                    style={{ height: `${h * 0.25}px` }}
                  />
                  {/* Body */}
                  <div
                    className="w-full rounded-sm"
                    style={{
                      height: `${h * 1.4}px`,
                      background:
                        i % 3 === 0
                          ? "rgba(52,211,153,0.7)"
                          : "rgba(96,165,250,0.7)",
                      opacity: 0.5 + (i / 12) * 0.5,
                    }}
                  />
                  {/* Wick bottom */}
                  <div
                    className="w-px bg-blue-300/30"
                    style={{ height: `${h * 0.15}px` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-[10px] text-blue-200/40">
              <span>Jan</span>
              <span>Mar</span>
              <span>Jun</span>
              <span>Sep</span>
              <span>Dec</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid w-full max-w-md grid-cols-3 gap-3">
            {[
              {
                label: "Win Rate",
                value: "68.4%",
                icon: Activity,
                color: "text-emerald-400",
              },
              {
                label: "Avg R:R",
                value: "2.3x",
                icon: BarChart2,
                color: "text-blue-300",
              },
              {
                label: "Trades",
                value: "1,240",
                icon: TrendingUp,
                color: "text-cyan-300",
              },
            ].map(({ label, value, icon: Icon, color }) => (
              <div
                key={label}
                className="rounded-xl border border-blue-400/20 bg-white/5 px-4 py-3 backdrop-blur-sm"
              >
                <Icon className={`mb-1.5 size-4 ${color}`} />
                <div className="text-lg leading-none font-semibold">
                  {value}
                </div>
                <div className="mt-1 text-[11px] text-blue-200/50">{label}</div>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              Trade smarter, <span className="text-blue-300">grow faster</span>
            </h2>
            <p className="text-sm text-blue-200/50">
              Track every trade, analyze your edge, and compound your results.
            </p>
          </div>

          {/* Trust badge */}
          <div className="flex items-center gap-2 text-[11px] text-blue-200/40">
            <Shield className="size-3.5" />
            <span>End-to-end encrypted · Secure storage · Privacy first</span>
          </div>
        </div>
      </div>
    </div>
  )
}
