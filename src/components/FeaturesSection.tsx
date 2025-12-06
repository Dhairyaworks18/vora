import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { 
  BarChart3, 
  Sliders, 
  Palette, 
  Globe, 
  BookOpen, 
  ShieldCheck
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "AI Graph Engine",
    description: "Auto-generate bar, line, pie, funnel charts with smart labels and natural commentary.",
    color: "bg-yellow-bright/20 text-yellow-gold",
    glowColor: "rgba(251, 191, 36, 0.4)",
  },
  {
    icon: Sliders,
    title: "Dual Editing Modes",
    description: "Quick Mode for instant presentations, Studio Mode for advanced editing and control.",
    color: "bg-primary/10 text-primary",
    glowColor: "rgba(74, 125, 199, 0.4)",
  },
  {
    icon: Palette,
    title: "Smart Brand Kits",
    description: "Consistent professional identity across all slides for enterprise users.",
    color: "bg-coral/20 text-coral-dark",
    glowColor: "rgba(251, 113, 133, 0.4)",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Create presentations in multiple languages with AI translation.",
    color: "bg-secondary/20 text-secondary",
    glowColor: "rgba(139, 92, 246, 0.4)",
  },
  {
    icon: BookOpen,
    title: "Storyline Generator",
    description: "AI-powered narrative flows that create impactful presentation arcs.",
    color: "bg-purple-light/20 text-purple-deep",
    glowColor: "rgba(167, 139, 250, 0.4)",
  },
  {
    icon: ShieldCheck,
    title: "Fact-Check & Sources",
    description: "AI verifies content and adds source links to improve credibility.",
    color: "bg-cyan-accent/20 text-cyan-accent",
    glowColor: "rgba(77, 217, 232, 0.4)",
  },
];

// Animated background orb component
const FloatingOrb = ({ 
  size, 
  color, 
  initialX, 
  initialY, 
  duration 
}: { 
  size: number; 
  color: string; 
  initialX: number; 
  initialY: number; 
  duration: number;
}) => {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        left: `${initialX}%`,
        top: `${initialY}%`,
        opacity: 0.3,
      }}
      animate={{
        x: [0, 30, -20, 10, 0],
        y: [0, -20, 15, -10, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Animated orbit ring
const OrbitRing = ({ 
  size, 
  delay, 
  duration 
}: { 
  size: number; 
  delay: number; 
  duration: number;
}) => {
  return (
    <motion.div
      className="absolute rounded-full border pointer-events-none"
      style={{
        width: size,
        height: size,
        left: '50%',
        top: '50%',
        marginLeft: -size / 2,
        marginTop: -size / 2,
        borderColor: 'rgba(74, 125, 199, 0.08)',
      }}
      animate={{
        rotate: 360,
        scale: [1, 1.02, 1],
      }}
      transition={{
        rotate: { duration, repeat: Infinity, ease: "linear" },
        scale: { duration: duration / 2, repeat: Infinity, ease: "easeInOut" },
        delay,
      }}
    />
  );
};

// Small floating particle
const FloatingParticle = ({ 
  x, 
  y, 
  size, 
  delay 
}: { 
  x: number; 
  y: number; 
  size: number; 
  delay: number;
}) => {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: 'linear-gradient(135deg, rgba(74, 125, 199, 0.3), rgba(139, 92, 246, 0.2))',
      }}
      animate={{
        y: [0, -15, 0],
        opacity: [0.2, 0.5, 0.2],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
};

const FeaturesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section 
      ref={containerRef}
      id="features" 
      className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-background via-pink-blush/20 to-background"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating orbs */}
        <FloatingOrb size={300} color="rgba(251, 113, 133, 0.15)" initialX={-5} initialY={10} duration={20} />
        <FloatingOrb size={250} color="rgba(74, 125, 199, 0.12)" initialX={85} initialY={60} duration={25} />
        <FloatingOrb size={200} color="rgba(139, 92, 246, 0.1)" initialX={50} initialY={80} duration={18} />
        <FloatingOrb size={180} color="rgba(251, 191, 36, 0.08)" initialX={20} initialY={70} duration={22} />
        
        {/* Orbit rings */}
        <OrbitRing size={600} delay={0} duration={60} />
        <OrbitRing size={800} delay={2} duration={80} />
        <OrbitRing size={1000} delay={4} duration={100} />
        
        {/* Small floating particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <FloatingParticle 
            key={i}
            x={10 + (i * 7) % 80}
            y={15 + (i * 11) % 70}
            size={4 + (i % 3) * 2}
            delay={i * 0.5}
          />
        ))}
      </div>

      {/* Parallax gradient blobs */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute top-0 right-0 w-96 h-96 bg-coral/15 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        style={{ y: backgroundY2 }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Powerful Features
          </motion.span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Powerful Features for
            <br />
            <span className="text-gradient-blue">Every Need</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From data visualization to storytelling, Vora has everything you need 
            to create exceptional presentations.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.25 } 
              }}
              className="group"
            >
              <div 
                className="h-full bg-background/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 
                  hover:border-primary/40 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                }}
              >
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${feature.glowColor} 0%, transparent 60%)`,
                  }}
                />
                
                {/* Icon with glow */}
                <motion.div 
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  className={`relative w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-5 transition-all duration-300`}
                >
                  {/* Icon glow on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      boxShadow: `0 0 20px ${feature.glowColor}, 0 0 40px ${feature.glowColor}`,
                    }}
                  />
                  <feature.icon className="w-7 h-7 relative z-10" />
                </motion.div>
                
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
