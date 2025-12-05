import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CompetitionModeSection from "@/components/CompetitionModeSection";
import ProblemsSection from "@/components/ProblemsSection";
import DataVisualizationSection from "@/components/DataVisualizationSection";
import DualModesSection from "@/components/DualModesSection";
import TrustedBySection from "@/components/TrustedBySection";
import WhatMakesVoraDifferentSection from "@/components/WhatMakesVoraDifferentSection";
import WorkflowSection from "@/components/WorkflowSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Vora — AI Presentation Generator | Human-Like Decks That Win</title>
        <meta 
          name="description" 
          content="Create stunning, human-like presentations with Vora AI. Built for college competitions and corporate excellence. Unique designs, real storytelling, and natural content." 
        />
        <meta name="keywords" content="AI presentation, presentation generator, competition mode, hackathon presentation, corporate slides, AI slides, Vora" />
        <link rel="canonical" href="https://vora.ai" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Vora — AI Presentation Generator" />
        <meta property="og:description" content="Turn ideas into stunning, human-like presentations. Built for competitions and corporate excellence." />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vora — AI Presentation Generator" />
        <meta name="twitter:description" content="Turn ideas into stunning, human-like presentations. Built for competitions and corporate excellence." />
      </Helmet>

      <main className="relative overflow-hidden">
        <Navbar />
        <HeroSection />
        <TrustedBySection />
        <WhatMakesVoraDifferentSection />
        <CompetitionModeSection />
        <FeaturesSection />
        <ProblemsSection />
        <DataVisualizationSection />
        <DualModesSection />
        <WorkflowSection />
        <PricingSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
