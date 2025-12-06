import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.png";
import { useRef } from "react";

// Shooting Star Component
const ShootingStar = ({ delay, duration, top, left, angle }: { 
  delay: number; 
  duration: number; 
  top: string; 
  left: string; 
  angle: number;
}) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ top, left, rotate: `${angle}deg` }}
    initial={{ opacity: 0, x: 0, y: 0 }}
    animate={{ 
      opacity: [0, 1, 1, 0],
      x: [0, 150, 300],
      y: [0, 75, 150],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 8 + 4,
      ease: "easeOut"
    }}
  >
    <div className="relative">
      {/* Star head */}
      <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_4px_rgba(255,255,255,0.8)]" />
      {/* Star tail */}
      <div 
        className="absolute top-1/2 right-full -translate-y-1/2 w-20 h-[2px] bg-gradient-to-l from-white via-white/60 to-transparent"
        style={{ filter: 'blur(0.5px)' }}
      />
    </div>
  </motion.div>
);

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Shooting stars configuration
  const shootingStars = [
    { delay: 0, duration: 1.5, top: '15%', left: '10%', angle: 35 },
    { delay: 3, duration: 1.2, top: '25%', left: '60%', angle: 40 },
    { delay: 6, duration: 1.8, top: '10%', left: '75%', angle: 30 },
    { delay: 9, duration: 1.4, top: '20%', left: '30%', angle: 38 },
    { delay: 12, duration: 1.6, top: '8%', left: '85%', angle: 42 },
    { delay: 15, duration: 1.3, top: '18%', left: '45%', angle: 33 },
  ];

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
          src={heroBg}
          alt="Human creativity meets AI intelligence"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-vora-navy/60 via-transparent to-vora-navy/80" />
      </motion.div>

      {/* Shooting Stars Layer */}
      <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
        {shootingStars.map((star, index) => (
          <ShootingStar key={index} {...star} />
        ))}
      </div>

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 lg:pt-40 min-h-screen flex flex-col">
        {/* Centered Top Content */}
        <motion.div
          style={{ y, opacity }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Stylized VORA Text Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, scale: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-4"
          >
            <span 
              className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-[0.3em] bg-gradient-to-r from-vora-coral via-[#FFD700] via-[#F5B5A8] to-vora-cyan bg-clip-text text-transparent"
              style={{ 
                textShadow: '0 0 60px rgba(255,127,102,0.5), 0 0 100px rgba(255,215,0,0.3)',
                filter: 'drop-shadow(0 0 30px rgba(255,127,102,0.4))'
              }}
            >
              VORA
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight mb-6 text-white/90"
          >
            Transform Ideas into
            <br />
            Stunning Presentations
          </motion.h1>

          {/* CTA Buttons - Centered */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              variant="hero" 
              size="xl"
              className="bg-vora-coral/90 text-white hover:bg-vora-coral shadow-[0_0_30px_rgba(255,127,102,0.6)] hover:shadow-[0_0_40px_rgba(255,127,102,0.8)] transition-all duration-300"
            >
              Start Creating with Vora
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Demo Video
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
