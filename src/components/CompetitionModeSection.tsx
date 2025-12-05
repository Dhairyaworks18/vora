import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { 
  Sparkles, 
  Shuffle, 
  Eye, 
  Edit3, 
  BookOpen, 
  Trophy,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Sparkles,
    title: "Human-Like Content",
    description: "Naturally written content with storytelling, emotional flow, and tone variation — never robotic.",
  },
  {
    icon: Shuffle,
    title: "Unpredictable Design",
    description: "Randomized layouts, spacing, and structure so judges can't detect any 'AI design fingerprint.'",
  },
  {
    icon: Eye,
    title: "Visually Rich",
    description: "Original composition using strong visuals, balanced layouts, smart white space, and professional hierarchy.",
  },
  {
    icon: Edit3,
    title: "Editable Freedom",
    description: "Every element remains fully editable without breaking the design logic.",
  },
  {
    icon: BookOpen,
    title: "Narrative-Driven",
    description: "Slides are built around your story arc, not bullet points.",
  },
  {
    icon: Trophy,
    title: "Competition-Ready",
    description: "Optimized for hackathons, case competitions, research defenses, and startup pitches.",
  },
];

// Animated light beam component
const LightBeam = ({ delay, left, rotation }: { delay: number; left: string; rotation: number }) => (
  <motion.div
    initial={{ opacity: 0, y: -100 }}
    animate={{ 
      opacity: [0, 0.3, 0.15, 0.3, 0],
      y: [-100, 0, 50, 0, -100]
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute top-0 h-full pointer-events-none"
    style={{
      left,
      width: '120px',
      background: `linear-gradient(${rotation}deg, rgba(59, 130, 246, 0.4) 0%, rgba(147, 197, 253, 0.2) 30%, transparent 70%)`,
      filter: 'blur(30px)',
      transform: `rotate(${rotation}deg)`,
      transformOrigin: 'top center',
    }}
  />
);

// Floating particle
const Particle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.8, 0],
      scale: [0, 1, 0],
      y: [y, y - 50, y - 100],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeOut"
    }}
    className="absolute w-1.5 h-1.5 rounded-full"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      background: 'rgba(255, 255, 255, 0.6)',
      boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)',
    }}
  />
);

// Presenter silhouette using SVG
const PresenterSilhouette = () => (
  <svg 
    viewBox="0 0 200 350" 
    className="absolute bottom-0 left-[8%] h-[55%] opacity-90 z-10"
    style={{ filter: 'drop-shadow(0 0 30px rgba(249, 115, 22, 0.3))' }}
  >
    {/* Body */}
    <ellipse cx="100" cy="60" rx="28" ry="30" fill="url(#headGradient)" />
    {/* Torso */}
    <path 
      d="M60 100 Q100 85 140 100 L135 200 Q100 210 65 200 Z" 
      fill="url(#torsoGradient)" 
    />
    {/* Left arm (presenting) */}
    <path 
      d="M60 110 Q30 130 15 115 Q5 100 20 90 Q35 85 50 100" 
      fill="url(#armGradient)" 
      stroke="url(#armGradient)"
      strokeWidth="12"
      strokeLinecap="round"
    />
    {/* Right arm */}
    <path 
      d="M140 110 Q150 140 145 170" 
      fill="none" 
      stroke="url(#armGradient)"
      strokeWidth="14"
      strokeLinecap="round"
    />
    {/* Legs */}
    <path d="M75 200 L70 320 L80 325 L95 205" fill="url(#legGradient)" />
    <path d="M105 205 L120 325 L130 320 L125 200" fill="url(#legGradient)" />
    {/* Podium */}
    <rect x="55" y="280" width="90" height="70" rx="8" fill="url(#podiumGradient)" opacity="0.7" />
    <rect x="50" y="275" width="100" height="12" rx="4" fill="url(#podiumTopGradient)" opacity="0.8" />
    
    <defs>
      <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="torsoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="50%" stopColor="#ea580c" />
        <stop offset="100%" stopColor="#c2410c" />
      </linearGradient>
      <linearGradient id="armGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fb923c" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
      <linearGradient id="legGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1e3a5f" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="podiumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7c3aed" />
        <stop offset="100%" stopColor="#4c1d95" />
      </linearGradient>
      <linearGradient id="podiumTopGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
  </svg>
);

// Geometric shapes for depth
const GeometricShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Orange geometric blocks */}
    <motion.div
      animate={{ y: [0, -10, 0], opacity: [0.5, 0.7, 0.5] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[20%] left-[15%] w-16 h-24 rounded-lg opacity-50"
      style={{ 
        background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        transform: 'perspective(500px) rotateY(-15deg) rotateX(5deg)',
      }}
    />
    <motion.div
      animate={{ y: [0, 10, 0], opacity: [0.4, 0.6, 0.4] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute bottom-[25%] left-[22%] w-12 h-32 rounded-lg opacity-40"
      style={{ 
        background: 'linear-gradient(135deg, #c2410c 0%, #9a3412 100%)',
        transform: 'perspective(500px) rotateY(-10deg)',
      }}
    />
    {/* Purple accent shapes */}
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute bottom-[15%] left-[5%] w-20 h-8 rounded opacity-30"
      style={{ 
        background: 'linear-gradient(90deg, #7c3aed 0%, #5b21b6 100%)',
      }}
    />
  </div>
);

const CompetitionModeSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef}
      id="competition" 
      className="relative py-24 lg:py-32 overflow-hidden min-h-screen"
    >
      {/* Background - Deep blue to orange gradient with code-like implementation */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 40%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
              radial-gradient(ellipse 60% 50% at 80% 80%, rgba(249, 115, 22, 0.5) 0%, transparent 50%),
              radial-gradient(ellipse 100% 80% at 50% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 60%),
              linear-gradient(135deg, 
                #1e1b4b 0%, 
                #312e81 15%,
                #3730a3 25%,
                #4338ca 35%,
                #6366f1 45%,
                #7c3aed 55%,
                #a855f7 65%,
                #c026d3 72%,
                #db2777 78%,
                #f97316 85%,
                #fb923c 92%,
                #fdba74 100%
              )
            `,
          }}
        />
        
        {/* Animated light beams */}
        <LightBeam delay={0} left="10%" rotation={15} />
        <LightBeam delay={2} left="25%" rotation={8} />
        <LightBeam delay={4} left="5%" rotation={25} />
        <LightBeam delay={1} left="18%" rotation={12} />
        
        {/* Floating particles */}
        <Particle delay={0} x={15} y={60} />
        <Particle delay={1.5} x={25} y={70} />
        <Particle delay={3} x={10} y={50} />
        <Particle delay={2} x={30} y={80} />
        <Particle delay={0.5} x={20} y={65} />
        
        {/* Geometric shapes */}
        <GeometricShapes />
        
        {/* Presenter silhouette */}
        <PresenterSilhouette />
        
        {/* Subtle noise overlay for texture */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Dark overlay for text readability on right side */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, transparent 30%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.6) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto lg:ml-auto lg:mr-0 lg:text-right"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-white/90">Signature Feature</span>
          </motion.div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Competition Mode
          </h2>

          <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl lg:ml-auto">
            Designed for college students competing in hackathons, ideathons, business plan competitions, 
            and pitch events. Presentations created here must look completely human-crafted, not AI-generated.
          </p>
        </motion.div>

        {/* Feature Cards Grid - 3x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto lg:ml-auto lg:mr-0">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Card with glassmorphism */}
              <div 
                className="relative p-6 lg:p-8 rounded-2xl h-full transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
              >
                {/* Hover glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.15) 0%, transparent 60%)',
                  }}
                />
                
                {/* Icon */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.3) 0%, rgba(251, 146, 60, 0.2) 100%)',
                    border: '1px solid rgba(249, 115, 22, 0.3)',
                  }}
                >
                  <feature.icon className="w-6 h-6 text-amber-400" />
                </div>
                
                {/* Content */}
                <h3 className="font-semibold text-lg text-white mb-2 group-hover:text-amber-200 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 lg:mt-20 max-w-5xl mx-auto"
        >
          <div 
            className="relative p-8 lg:p-10 rounded-3xl text-center overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Accent glow */}
            <div 
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-40 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse, rgba(249, 115, 22, 0.2) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">
                  The Competitive Edge
                </span>
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
              
              <p className="text-xl lg:text-2xl text-white/90 font-medium leading-relaxed max-w-4xl mx-auto mb-8">
                "Competition Mode ensures your slides are authentic, original, and indistinguishable from 
                human-crafted presentations — giving you the edge you need to win."
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-orange-500/30"
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  Activate Competition Mode
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompetitionModeSection;