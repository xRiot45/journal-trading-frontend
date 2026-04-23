import SessionView from "@/features/sessions/views/session.view"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Sessions",
    description: "Track and manage active market hours and trading periods.",
}

export default function SessionPage() {
    return <SessionView />
}
