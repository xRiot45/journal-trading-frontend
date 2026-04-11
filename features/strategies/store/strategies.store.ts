import { create } from "zustand"
import { Strategies } from "../types/strategies.types"

interface StrategyState {
    isDialogOpen: boolean
    isDeleteDialogOpen: boolean
    strategies: Strategies[]
    selectedStrategy: Strategies | null
    selectedStrategyId?: string
}

interface StrategyStoreActions {
    openCreateDialog: () => void
    openEditDialog: (strategy: Strategies) => void
    openDeleteDialog: (strategy: Strategies) => void
    closeDialog: () => void
    closeDeleteDialog: () => void
    setStrategies: (data: Strategies[]) => void
    setSelectedStrategy: (id?: string) => void
    reset: () => void
}

type StrategyStore = StrategyState & StrategyStoreActions

const initialState: StrategyState = {
    isDialogOpen: false,
    isDeleteDialogOpen: false,
    strategies: [],
    selectedStrategy: null,
    selectedStrategyId: undefined,
}

export const useStrategyStore = create<StrategyStore>((set) => ({
    ...initialState,

    openCreateDialog: () =>
        set({
            isDialogOpen: true,
            selectedStrategyId: undefined,
        }),

    openEditDialog: (strategy: Strategies) =>
        set({
            isDialogOpen: true,
            selectedStrategyId: strategy.id,
        }),

    openDeleteDialog: (strategy: Strategies) =>
        set({
            isDeleteDialogOpen: true,
            selectedStrategyId: strategy.id,
        }),

    closeDialog: () =>
        set({
            isDialogOpen: false,
            selectedStrategyId: undefined,
        }),

    closeDeleteDialog: () =>
        set({
            isDeleteDialogOpen: false,
            selectedStrategyId: undefined,
        }),

    setStrategies: (data: Strategies[]) =>
        set({
            strategies: data,
        }),

    setSelectedStrategy: (id?: string) =>
        set({
            selectedStrategyId: id,
        }),

    reset: () =>
        set({
            ...initialState,
        }),
}))
