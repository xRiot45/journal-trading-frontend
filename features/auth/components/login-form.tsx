"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Mail, Lock, Loader2, ArrowRight } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

import { loginSchema, type LoginFormValues } from "../schemas/login.schema"
import { useLoginMutation } from "../application/mutations"

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const { mutate: doLogin, isPending, error, isError } = useLoginMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = (values: LoginFormValues) => {
        doLogin(values, {
            onSuccess: () => router.push("/dashboard"),
        })
    }

    const apiErrorMessage =
        isError && error instanceof Error ? error.message : null

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
        >
            {/* API Error Banner */}
            {apiErrorMessage && (
                <div className="flex items-start gap-2.5 rounded-lg border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-red-400" />
                    {apiErrorMessage}
                </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
                <Label
                    htmlFor="email"
                    className="text-xs font-medium tracking-wider text-white/60 uppercase"
                >
                    Email address
                </Label>
                <div className="relative">
                    <Mail className="absolute top-1/2 left-3.5 size-3.75 -translate-y-1/2 text-white/30" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="trader@example.com"
                        autoComplete="email"
                        className={cn(
                            "h-11 rounded-xl border-white/10 bg-white/5 pl-10 text-sm text-white placeholder:text-white/20",
                            "transition-all focus-visible:border-blue-500/60 focus-visible:ring-1 focus-visible:ring-blue-500/30",
                            "hover:border-white/20",
                            errors.email &&
                                "border-red-500/40 focus-visible:border-red-500/60 focus-visible:ring-red-500/20"
                        )}
                        aria-invalid={!!errors.email}
                        {...register("email")}
                    />
                </div>
                {errors.email && (
                    <p className="flex items-center gap-1.5 text-xs text-red-400">
                        <span className="size-1 rounded-full bg-red-400" />
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                    <Label
                        htmlFor="password"
                        className="text-xs font-medium tracking-wider text-white/60 uppercase"
                    >
                        Password
                    </Label>
                    <button
                        type="button"
                        className="text-[11px] text-blue-400/80 transition-colors hover:text-blue-400"
                    >
                        Forgot password?
                    </button>
                </div>
                <div className="relative">
                    <Lock className="absolute top-1/2 left-3.5 size-3.75 -translate-y-1/2 text-white/30" />
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className={cn(
                            "h-11 rounded-xl border-white/10 bg-white/5 pr-10 pl-10 text-sm text-white placeholder:text-white/20",
                            "transition-all focus-visible:border-blue-500/60 focus-visible:ring-1 focus-visible:ring-blue-500/30",
                            "hover:border-white/20",
                            errors.password &&
                                "border-red-500/40 focus-visible:border-red-500/60 focus-visible:ring-red-500/20"
                        )}
                        aria-invalid={!!errors.password}
                        {...register("password")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={
                            showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute top-1/2 right-3.5 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60 focus:outline-none"
                    >
                        {showPassword ? (
                            <EyeOff className="size-3.75" />
                        ) : (
                            <Eye className="size-3.75" />
                        )}
                    </button>
                </div>
                {errors.password && (
                    <p className="flex items-center gap-1.5 text-xs text-red-400">
                        <span className="size-1 rounded-full bg-red-400" />
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Submit */}
            <div className="pt-1">
                <Button
                    type="submit"
                    disabled={isPending}
                    className={cn(
                        "group relative h-11 w-full overflow-hidden rounded-xl text-sm font-semibold",
                        "bg-blue-500 text-white transition-all",
                        "hover:bg-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]",
                        "disabled:cursor-not-allowed disabled:opacity-50"
                    )}
                >
                    {isPending ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="size-4 animate-spin" />
                            Signing in...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            Sign in
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                    )}
                </Button>
            </div>
        </form>
    )
}
