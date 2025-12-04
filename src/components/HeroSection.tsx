import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, BarChart3, Palette, Users, FileText } from "lucide-react";
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
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 text-white"
          >
            Where Human Vision
            <br />
            <span className="text-vora-coral">Meets AI Intelligence</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg lg:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Vora blends human creativity with advanced AI reasoning to turn raw ideas into polished, presentation-ready decks.
          </motion.p>

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

        {/* Floating Cards - Positioned Around Visual */}
        <div className="flex-1 relative mt-12">
          {/* Left Side Cards */}
          <motion.div
            initial={{ opacity: 0, x: -60, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="absolute left-4 lg:left-16 top-1/4 glass-card-dark rounded-2xl p-4 shadow-xl max-w-[200px] animate-float"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-vora-coral/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-vora-coral" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">AI Storytelling</p>
                <p className="text-xs text-white/60">Human-like content</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -80, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="absolute left-8 lg:left-24 top-[55%] glass-card-dark rounded-2xl p-4 shadow-xl max-w-[180px] animate-float-delayed"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-vora-cyan/30 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-vora-cyan" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Smart Charts</p>
                <p className="text-xs text-white/60">Auto-generated</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side Cards */}
          <motion.div
            initial={{ opacity: 0, x: 60, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="absolute right-4 lg:right-16 top-[20%] glass-card-dark rounded-2xl p-4 shadow-xl max-w-[200px] animate-float"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-vora-purple/40 flex items-center justify-center">
                <Palette className="w-5 h-5 text-vora-purple-light" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Design Native</p>
                <p className="text-xs text-white/60">Polished slides</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="absolute right-8 lg:right-20 top-[50%] glass-card-dark rounded-2xl p-4 shadow-xl max-w-[190px] animate-float-delayed"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-vora-coral/30 flex items-center justify-center">
                <Users className="w-5 h-5 text-vora-coral" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Collaborative</p>
                <p className="text-xs text-white/60">Team editing</p>
              </div>
            </div>
          </motion.div>

          {/* Bottom Center Card - Blurred Background Style */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
            className="absolute bottom-8 lg:bottom-16 left-1/2 -translate-x-1/2 glass-card-dark rounded-2xl px-6 py-4 shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-vora-coral to-vora-purple flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">Export Anywhere</p>
                <p className="text-sm text-white/60">PowerPoint • Google Slides • PDF</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
};

export default HeroSection;
