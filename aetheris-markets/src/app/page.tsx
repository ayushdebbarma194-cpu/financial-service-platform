import { Navbar, Footer } from "@/components/layout";
import {
  HeroSection,
  TrustSection,
  HowItWorksSection,
  PricingSection,
  FAQSection,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustSection />
        <HowItWorksSection />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
