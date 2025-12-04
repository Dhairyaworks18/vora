import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Sparkles, Zap, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVisual from "@/assets/hero-visual.png";
import { useRef } from "react";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Gradient Background - matching reference coral/purple */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-blush via-coral-light/30 to-purple-deep/20" />
      
      {/* Parallax Decorative Elements */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
        className="absolute top-20 left-10 w-72 h-72 bg-coral/20 rounded-full blur-3xl animate-pulse-slow" 
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-cobalt/20 rounded-full blur-3xl animate-pulse-slow" 
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-deep/10 rounded-full blur-3xl" 
      />
      
      <div className="container mx-auto px-4 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            style={{ y, opacity }}
            className="relative z-10"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                AI-Powered Presentation Engine
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-foreground">Vora — Turn</span>
              <br />
              <span className="text-gradient-hero">Ideas Into Reality</span>
              <br />
              <span className="text-foreground">With AI</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed"
            >
              Create stunning, human-like presentations built for college competitions 
              and corporate excellence. Unique designs, real storytelling, and natural 
              content that helps you truly stand out.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Button variant="hero" size="xl">
                Start Creating Free
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="heroOutline" size="xl">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-bright" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-coral" />
                <span>Competition-ready templates</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            style={{ y: imageY, scale }}
            className="relative"
          >
            {/* Main Visual */}
            <motion.div 
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src={heroVisual}
                alt="Vora AI Presentation Platform - Human and AI collaboration visualization"
                className="w-full h-auto object-cover"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/30 to-transparent" />
            </motion.div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="absolute -bottom-6 -left-6 bg-background rounded-2xl p-4 shadow-lg border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-coral/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-coral" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Competition Mode</p>
                  <p className="text-sm text-muted-foreground">Win-ready decks</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05, y: 5 }}
              className="absolute -top-4 -right-4 bg-background rounded-2xl p-4 shadow-lg border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Human-Like</p>
                  <p className="text-sm text-muted-foreground">Natural content</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-coral-light/20 to-transparent" />
    </section>
  );
};

export default HeroSection;
