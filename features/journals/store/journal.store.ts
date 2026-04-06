import { create } from "zustand"
import { Journal } from "../types/journal.type"

interface JournalState {
    journal: Journal | null
    isLoading: boolean

    // Actions
    setJournal: (data: Journal | null) => void
    setIsLoading: (loading: boolean) => void
}

export const useJournalStore = create<JournalState>((set) => ({
    journal: null,
    isLoading: false,
    setJournal: (data) => set({ journal: data }),
    setIsLoading: (loading) => set({ isLoading: loading }),
}))
