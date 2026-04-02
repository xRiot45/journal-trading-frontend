import { create } from "zustand"
import { TradingPlan } from "../types/trading-plan.types"

interface TradingPlanFilter {
    month: string
    year: string
}

interface DeleteConfirmationState {
    isOpen: boolean
    targetId: string | null
    targetTitle: string | null
}

interface TradingPlanState {
    // Single plan detail
    tradingPlan: TradingPlan | null
    isLoading: boolean

    // List filters
    filter: TradingPlanFilter

    // Delete confirmation dialog
    deleteConfirmation: DeleteConfirmationState

    // Actions
    setTradingPlan: (data: TradingPlan | null) => void
    setIsLoading: (loading: boolean) => void

    setFilter: (filter: Partial<TradingPlanFilter>) => void
    resetFilter: () => void

    openDeleteConfirmation: (id: string, title?: string) => void
    closeDeleteConfirmation: () => void

    reset: () => void
}

const defaultFilter: TradingPlanFilter = {
    month: "",
    year: "",
}

const defaultDeleteConfirmation: DeleteConfirmationState = {
    isOpen: false,
    targetId: null,
    targetTitle: null,
}

export const useTradingPlanStore = create<TradingPlanState>((set) => ({
    tradingPlan: null,
    isLoading: false,
    filter: defaultFilter,
    deleteConfirmation: defaultDeleteConfirmation,

    setTradingPlan: (data) => set({ tradingPlan: data }),
    setIsLoading: (loading) => set({ isLoading: loading }),

    setFilter: (newFilter) =>
        set((state) => ({
            filter: { ...state.filter, ...newFilter },
        })),
    resetFilter: () => set({ filter: defaultFilter }),

    openDeleteConfirmation: (id, title) =>
        set({
            deleteConfirmation: {
                isOpen: true,
                targetId: id,
                targetTitle: title ?? null,
            },
        }),
    closeDeleteConfirmation: () =>
        set({ deleteConfirmation: defaultDeleteConfirmation }),

    reset: () =>
        set({
            tradingPlan: null,
            isLoading: false,
            filter: defaultFilter,
            deleteConfirmation: defaultDeleteConfirmation,
        }),
}))
