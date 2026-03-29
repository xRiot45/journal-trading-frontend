import { create } from "zustand"
import { Session } from "../types/session.types"

interface SessionStoreState {
    isDialogOpen: boolean
    isDeleteDialogOpen: boolean
    selectedSession: Session | null
}

interface SessionStoreActions {
    openCreateDialog: () => void
    openEditDialog: (session: Session) => void
    openDeleteDialog: (session: Session) => void
    closeDialog: () => void
    closeDeleteDialog: () => void
}

type SessionStore = SessionStoreState & SessionStoreActions

const initialState: SessionStoreState = {
    isDialogOpen: false,
    isDeleteDialogOpen: false,
    selectedSession: null,
}

export const useSessionStore = create<SessionStore>((set) => ({
    ...initialState,
    
    openCreateDialog: () => set({ isDialogOpen: true, selectedSession: null }),

    openEditDialog: (session) =>
        set({ isDialogOpen: true, selectedSession: session }),

    openDeleteDialog: (session) =>
        set({ isDeleteDialogOpen: true, selectedSession: session }),

    closeDialog: () => set({ isDialogOpen: false, selectedSession: null }),

    closeDeleteDialog: () =>
        set({ isDeleteDialogOpen: false, selectedSession: null }),
}))
