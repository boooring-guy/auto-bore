"use client";

import { Navigation } from "../components/Navigation";
import { HeroSection } from "../components/HeroSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { IntegrationsSection } from "../components/IntegrationsSection";
import { CTASection } from "../components/CTASection";
import { Footer } from "../components/Footer";

export function LandingPageView() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/20">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <IntegrationsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

