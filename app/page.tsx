import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

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
