import { create } from "zustand"
import { Journal } from "../types/journal.type"

interface JournalMeta {
    page: number
    limit: number
    totalItems: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
}

interface JournalState {
    journal: Journal | null
    journals: Journal[]
    meta: JournalMeta | null
    isLoading: boolean
    isSubmitting: boolean
    selectedJournals: Journal[]
    isDeleteDialogOpen: boolean
    selectedJournal: Journal | null

    // Actions
    setJournal: (data: Journal | null) => void
    setJournals: (data: Journal[]) => void
    setMeta: (meta: JournalMeta | null) => void
    setIsLoading: (loading: boolean) => void
    setIsSubmitting: (submitting: boolean) => void
    setSelectedJournals: (journals: Journal[]) => void
    addJournal: (journal: Journal) => void
    updateJournal: (updated: Journal) => void
    removeJournal: (id: string) => void
    openDeleteDialog: (journal: Journal) => void
    closeDeleteDialog: () => void
    reset: () => void
}

const initialState = {
    journal: null,
    journals: [],
    meta: null,
    isLoading: false,
    isSubmitting: false,
    selectedJournals: [],
    isDeleteDialogOpen: false,
    selectedJournal: null,
}

export const useJournalStore = create<JournalState>((set) => ({
    ...initialState,

    setJournal: (data) => set({ journal: data }),

    setJournals: (data) => set({ journals: data }),

    setMeta: (meta) => set({ meta }),

    setIsLoading: (loading) => set({ isLoading: loading }),

    setIsSubmitting: (submitting) => set({ isSubmitting: submitting }),

    setSelectedJournals: (journals) => set({ selectedJournals: journals }),

    addJournal: (journal) =>
        set((state) => ({ journals: [journal, ...state.journals] })),

    updateJournal: (updated) =>
        set((state) => ({
            journals: state.journals.map((j) =>
                j.id === updated.id ? updated : j
            ),
            journal: state.journal?.id === updated.id ? updated : state.journal,
        })),

    removeJournal: (id) =>
        set((state) => ({
            journals: state.journals.filter((j) => j.id !== id),
            journal: state.journal?.id === id ? null : state.journal,
            selectedJournals: state.selectedJournals.filter((j) => j.id !== id),
        })),

    openDeleteDialog: (journal) =>
        set({ isDeleteDialogOpen: true, selectedJournal: journal }),

    closeDeleteDialog: () =>
        set({ isDeleteDialogOpen: false, selectedJournal: null }),

    reset: () => set(initialState),
}))
