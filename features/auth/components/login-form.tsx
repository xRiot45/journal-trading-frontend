"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
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
            onSuccess: () => {
                router.push("/dashboard")
            },
        })
    }

    const apiErrorMessage =
        isError && error instanceof Error ? error.message : null

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
        >
            {/* API Error Banner */}
            {apiErrorMessage && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {apiErrorMessage}
                </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                    <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="trader@example.com"
                        className={cn(
                            "h-10 pl-9",
                            errors.email &&
                                "border-destructive focus-visible:ring-destructive/20"
                        )}
                        aria-invalid={!!errors.email}
                        autoComplete="email"
                        {...register("email")}
                    />
                </div>
                {errors.email && (
                    <p className="text-xs text-destructive">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={cn(
                            "h-10 pr-10 pl-9",
                            errors.password &&
                                "border-destructive focus-visible:ring-destructive/20"
                        )}
                        aria-invalid={!!errors.password}
                        autoComplete="current-password"
                        {...register("password")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                            showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
                    >
                        {showPassword ? (
                            <EyeOff className="size-4" />
                        ) : (
                            <Eye className="size-4" />
                        )}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-xs text-destructive">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
                <button
                    type="button"
                    className="text-xs text-blue-500 transition-colors hover:text-blue-400 focus:outline-none"
                >
                    Forgot password?
                </button>
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={isPending}
                className="h-10 w-full bg-blue-500 text-white transition-all hover:bg-blue-400 disabled:opacity-60"
            >
                {isPending ? (
                    <span className="flex items-center gap-2">
                        <Spinner className="size-4" />
                        Signing in...
                    </span>
                ) : (
                    "Sign In"
                )}
            </Button>
        </form>
    )
}
