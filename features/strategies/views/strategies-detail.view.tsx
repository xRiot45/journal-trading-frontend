"use client"

import { Container } from "@/components/ui/container"
import { CanvasRoot } from "../components/strategy-detail/canvas-root"
import { useStrategyStore } from "../store/strategies.store"
import { useEffect } from "react"

export default function StrategiesDetailView({
    strategyId,
}: {
    strategyId: string
}) {
    const setSelectedStrategy = useStrategyStore(
        (state) => state.setSelectedStrategy
    )
    const reset = useStrategyStore((state) => state.reset)

    useEffect(() => {
        setSelectedStrategy(strategyId)

        return () => reset()
    }, [strategyId, setSelectedStrategy, reset])

    return (
        <Container size="none">
            <CanvasRoot />
        </Container>
    )
}
