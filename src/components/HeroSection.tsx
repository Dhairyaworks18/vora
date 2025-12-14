import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.png";
import { useRef, useState, useEffect, useCallback } from "react";

// Shooting star component with smooth CSS animations
const ShootingStar = ({ 
  isActive,
  top,
  startX,
  onComplete
}: { 
  isActive: boolean;
  top: string;
  startX: string;
  onComplete: () => void;
}) => {
  const animationDuration = 2500; // 2.5 seconds for smooth motion

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        onComplete();
      }, animationDuration);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete, animationDuration]);

  if (!isActive) return null;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top,
        left: startX,
        width: '140px',
        height: '3px',
        transform: 'rotate(45deg)',
        animation: `shootingStarMove ${animationDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards,
                    shootingStarFade ${animationDuration}ms ease-in-out forwards`,
      }}
    >
      {/* Star head - bright point */}
      <div
        className="absolute right-0 top-0 rounded-full bg-white"
        style={{
          width: '4px',
          height: '4px',
          boxShadow: `0 0 8px 3px rgba(255,255,255,0.95), 0 0 16px 6px rgba(200,220,255,0.5)`,
        }}
      />
      {/* Main tail - crisp gradient */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2"
        style={{
          width: '100%',
          height: '2px',
          background: 'linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 15%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.15) 70%, transparent 100%)',
          borderRadius: '100px',
        }}
      />
      {/* Soft glow trail */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 opacity-60"
        style={{
          width: '100%',
          height: '6px',
          background: 'linear-gradient(to left, rgba(200,220,255,0.7) 0%, rgba(200,220,255,0.3) 30%, transparent 100%)',
          filter: 'blur(2px)',
          borderRadius: '100px',
        }}
      />
    </div>
  );
};

// Controller for sequenced shooting stars
const ShootingStarsController = () => {
  const [activeStarIndex, setActiveStarIndex] = useState<number | null>(null);
  const delayBetweenStars = 7000; // 7 seconds delay between stars
  
  // Star positions - upper sky area only (3-7% from top), avoiding center characters
  const starConfigs = [
    { top: '4%', startX: '12%' },   // Upper left sky
    { top: '5%', startX: '58%' },   // Upper right sky
  ];

  const scheduleNextStar = useCallback(() => {
    // Wait for delay, then show next star
    setTimeout(() => {
      setActiveStarIndex(prev => {
        const next = prev === null ? 0 : (prev + 1) % starConfigs.length;
        return next;
      });
    }, delayBetweenStars);
  }, [starConfigs.length, delayBetweenStars]);

  // Start the first star after initial delay
  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setActiveStarIndex(0);
    }, 2000); // Start first star after 2 seconds

    return () => clearTimeout(initialDelay);
  }, []);

  const handleStarComplete = useCallback(() => {
    setActiveStarIndex(null);
    scheduleNextStar();
  }, [scheduleNextStar]);

  return (
    <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
      {starConfigs.map((config, index) => (
        <ShootingStar
          key={index}
          isActive={activeStarIndex === index}
          top={config.top}
          startX={config.startX}
          onComplete={handleStarComplete}
        />
      ))}
    </div>
  );
};

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
          src={heroBg}
          alt="Human creativity meets AI intelligence"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-vora-navy/60 via-transparent to-vora-navy/80" />
      </motion.div>

      {/* Shooting Stars Layer - one at a time with smooth animation */}
      <ShootingStarsController />

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
      {/* Subtle bottom fade - gentle atmospheric mist, not obstructive */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/70 to-transparent z-20" />
    </section>
  );
};

export default HeroSection;
