import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import FeatureGrid from "@/components/sections/FeatureGrid";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-surface-lowest">
      <Navbar />
      <Hero />
      <FeatureGrid />
      <CTASection />
      <Footer />
    </main>
  );
}
