import { create } from "zustand"
import { TradingPlan } from "../types/trading-plan.types"

interface TradingPlanState {
    tradingPlan: TradingPlan | null
    isLoading: boolean
    setTradingPlan: (data: TradingPlan | null) => void
    setIsLoading: (loading: boolean) => void
    reset: () => void
}

export const useTradingPlanStore = create<TradingPlanState>((set) => ({
    tradingPlan: null,
    isLoading: false,
    setTradingPlan: (data) => set({ tradingPlan: data }),
    setIsLoading: (loading) => set({ isLoading: loading }),
    reset: () => set({ tradingPlan: null, isLoading: false }),
}))
