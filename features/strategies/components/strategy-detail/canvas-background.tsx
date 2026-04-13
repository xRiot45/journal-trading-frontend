"use client"

import { CanvasSettings, Viewport } from "../../types/canvas"

interface Props {
    settings: CanvasSettings
    viewport: Viewport
}

export function CanvasBackground({ settings, viewport }: Props) {
    const { background, gridSize } = settings
    const size = gridSize * viewport.zoom
    const ox = viewport.x % size
    const oy = viewport.y % size

    if (background === "none") return null

    if (background === "dots") {
        return (
            <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                style={{ opacity: 0.35 }}
            >
                <defs>
                    <pattern
                        id="dots"
                        x={ox}
                        y={oy}
                        width={size}
                        height={size}
                        patternUnits="userSpaceOnUse"
                    >
                        <circle
                            cx={1}
                            cy={1}
                            r={1}
                            fill="var(--canvas-muted)"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
        )
    }

    if (background === "grid") {
        return (
            <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                style={{ opacity: 0.25 }}
            >
                <defs>
                    <pattern
                        id="grid"
                        x={ox}
                        y={oy}
                        width={size}
                        height={size}
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d={`M ${size} 0 L 0 0 0 ${size}`}
                            fill="none"
                            stroke="var(--canvas-muted)"
                            strokeWidth="0.5"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        )
    }

    return null
}
