import CalendarView from "@/features/calendars/views/calendar.view"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Calendar",
    description: "Show data for your trading experience.",
}

export default function CalendarPage() {
    return <CalendarView />
}
