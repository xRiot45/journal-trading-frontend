import { create } from "zustand"
import { Strategies } from "../types/strategies.types"

interface StrategyState {
    strategies: Strategies[]
    selectedStrategyId?: string

    // actions
    setStrategies: (data: Strategies[]) => void
    setSelectedStrategy: (id?: string) => void
    reset: () => void
}

export const useStrategyStore = create<StrategyState>((set) => ({
    strategies: [],
    selectedStrategyId: undefined,

    setStrategies: (data) =>
        set({
            strategies: data,
        }),

    setSelectedStrategy: (id) =>
        set({
            selectedStrategyId: id,
        }),

    reset: () =>
        set({
            strategies: [],
            selectedStrategyId: undefined,
        }),
}))
