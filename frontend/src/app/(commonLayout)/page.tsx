import Navbar from "@/components/layout/Navbar";

import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/modules/Home/HeroSection";
import FeaturesSection from "@/components/modules/Home/FeaturesSection";
import StatsSection from "@/components/modules/Home/StatsSection";
import SecuritySection from "@/components/modules/Home/SecuritySection";
import AppPreviewSection from "@/components/modules/Home/AppPreviewSection";
import { CTASection } from "@/components/modules/Home/CTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <SecuritySection />
        <AppPreviewSection />
        <CTASection />
      </main>
    </div>
  );
}
