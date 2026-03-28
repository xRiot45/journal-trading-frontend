import { create } from "zustand"
import { Pair } from "../types/pair.types"

interface PairStoreState {
    isDialogOpen: boolean
    isDeleteDialogOpen: boolean
    selectedPair: Pair | null
}

interface PairStoreActions {
    openCreateDialog: () => void
    openEditDialog: (pair: Pair) => void
    openDeleteDialog: (pair: Pair) => void
    closeDialog: () => void
    closeDeleteDialog: () => void
}

type PairStore = PairStoreState & PairStoreActions

const initialState: PairStoreState = {
    isDialogOpen: false,
    isDeleteDialogOpen: false,
    selectedPair: null,
}

export const usePairStore = create<PairStore>((set) => ({
    ...initialState,

    openCreateDialog: () => set({ isDialogOpen: true, selectedPair: null }),

    openEditDialog: (pair) => set({ isDialogOpen: true, selectedPair: pair }),

    openDeleteDialog: (pair) =>
        set({ isDeleteDialogOpen: true, selectedPair: pair }),

    closeDialog: () => set({ isDialogOpen: false, selectedPair: null }),

    closeDeleteDialog: () =>
        set({ isDeleteDialogOpen: false, selectedPair: null }),
}))
