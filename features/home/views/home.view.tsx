import { Navbar } from "../components/Navbar"
import { HeroSection } from "../components/HeroSection"
import { FeaturesSection } from "../components/FeaturesSection"
import { PreviewSection } from "../components/PreviewSection"
import { CtaSection } from "../components/CtaSection"
import { Footer } from "../components/Footer"

export default function HomeView() {
    return (
        <main className="min-h-screen overflow-x-hidden bg-white antialiased dark:bg-black">
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <PreviewSection />
            <CtaSection />
            <Footer />
        </main>
    )
}
