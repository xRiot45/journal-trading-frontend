import SessionView from "@/features/sessions/views/session.view"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Sessions",
    description: "Manage your sessions for your trading experience.",
}

export default function SessionPage() {
    return <SessionView />
}
