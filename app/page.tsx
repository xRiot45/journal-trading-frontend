import HomeView from "@/features/home/views/home.view"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Home",
    description: "Journal Trading",
}

export default function Page() {
    return <HomeView />
}
