import * as React from "react"
import { cn } from "@/lib/utils"

type ContainerProps = React.ComponentProps<"div"> & {
    asChild?: false
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
}

const sizeClasses: Record<NonNullable<ContainerProps["size"]>, string> = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    "2xl": "max-w-[90rem]",
    full: "max-w-none",
}

export function Container({
    className,
    children,
    size = "xl",
    ...props
}: ContainerProps) {
    return (
        <div
            className={cn(
                "mx-auto w-full px-4 py-6 sm:px-6 lg:px-8",
                sizeClasses[size],
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}
