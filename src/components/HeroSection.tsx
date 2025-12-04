import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVisual from "@/assets/vora-hero-visual.png";
import { useRef } from "react";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section 
      ref={containerRef} 
      id="hero"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Full Background Hero Image */}
      <motion.div 
        style={{ scale: imageScale }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={heroVisual}
          alt="Vora AI - Where Human Vision Meets AI Intelligence"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-vora-navy/60 via-transparent to-vora-navy/80" />
      </motion.div>

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 lg:pt-40 min-h-screen flex flex-col">
        {/* Centered Top Content - Gamma Style */}
        <motion.div
          style={{ y, opacity }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8 text-white"
          >
            <motion.span 
              className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-[0.3em] mb-4 bg-gradient-to-r from-vora-coral via-vora-purple-light to-vora-cyan bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,127,102,0.5)]"
              initial={{ opacity: 0, scale: 0.8, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, scale: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              VORA
            </motion.span>
            Transform Ideas into
            <br />
            <span className="text-vora-coral">Stunning Presentations</span>
          </motion.h1>

          {/* CTA Button - Centered */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              variant="hero" 
              size="xl"
              className="bg-white/90 text-vora-navy hover:bg-white shadow-lg shadow-vora-navy/20"
            >
              Start Creating with Vora
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>

      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
};

export default HeroSection;
