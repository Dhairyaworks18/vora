import { motion } from "framer-motion";
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
    description: "Naturally written storytelling with emotional flow and tone variation — never robotic.",
  },
  {
    icon: Shuffle,
    title: "Unpredictable Design",
    description: "Randomized layouts and structure so judges cannot detect any 'AI fingerprint.'",
  },
  {
    icon: Eye,
    title: "Visually Rich",
    description: "Strong visual hierarchy, original composition, and balanced layouts.",
  },
  {
    icon: Edit3,
    title: "Editable Freedom",
    description: "Full creative control without breaking layout intelligence.",
  },
  {
    icon: BookOpen,
    title: "Narrative-Driven",
    description: "Slides are built around story arcs, not bullet dumping.",
  },
  {
    icon: Trophy,
    title: "Competition-Ready",
    description: "Optimized for hackathons, research defenses, case competitions, and live pitching.",
  },
];

// Animated spotlight beams
const SpotlightBeam = ({ delay, left, width, opacity }: { delay: number; left: string; width: string; opacity: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0, opacity, opacity * 0.6, opacity, 0],
    }}
    transition={{
      duration: 10,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute top-0 h-full pointer-events-none"
    style={{
      left,
      width,
      background: `linear-gradient(180deg, rgba(100, 149, 237, 0.5) 0%, rgba(100, 149, 237, 0.1) 40%, transparent 70%)`,
      clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
      filter: 'blur(8px)',
    }}
  />
);

// Stage presenter SVG - detailed man presenting
const PresenterFigure = () => (
  <svg 
    viewBox="0 0 300 500" 
    className="absolute bottom-0 left-[5%] md:left-[8%] lg:left-[10%] h-[70%] md:h-[75%] lg:h-[80%]"
    style={{ 
      filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))',
      zIndex: 15,
    }}
  >
    {/* Head */}
    <ellipse cx="150" cy="55" rx="32" ry="35" fill="url(#skinGrad)" />
    {/* Hair */}
    <path d="M118 45 Q150 15 182 45 Q185 30 175 25 Q150 10 125 25 Q115 30 118 45" fill="#1a1a2e" />
    {/* Neck */}
    <rect x="140" y="85" width="20" height="20" fill="url(#skinGrad)" />
    
    {/* Body - Orange sweater */}
    <path 
      d="M100 105 Q150 95 200 105 L195 220 Q150 230 105 220 Z" 
      fill="url(#sweaterGrad)" 
    />
    {/* Sweater collar */}
    <path d="M130 105 Q150 115 170 105" stroke="#c2410c" strokeWidth="3" fill="none" />
    
    {/* Left arm - extended presenting gesture */}
    <path 
      d="M100 115 Q70 120 45 100 Q35 95 30 85 Q25 75 35 70 Q50 65 60 80 Q75 100 100 110" 
      fill="url(#sweaterGrad)" 
    />
    {/* Left hand */}
    <ellipse cx="35" cy="75" rx="12" ry="10" fill="url(#skinGrad)" />
    {/* Fingers spread */}
    <path d="M28 70 Q22 60 25 55" stroke="url(#skinGrad)" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M32 68 Q30 55 33 50" stroke="url(#skinGrad)" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M38 68 Q40 55 40 50" stroke="url(#skinGrad)" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M44 70 Q50 58 52 55" stroke="url(#skinGrad)" strokeWidth="4" strokeLinecap="round" fill="none" />
    
    {/* Right arm - holding something */}
    <path 
      d="M200 115 Q220 140 215 180" 
      stroke="url(#sweaterGrad)" 
      strokeWidth="28" 
      strokeLinecap="round"
      fill="none"
    />
    {/* Right hand */}
    <ellipse cx="215" cy="185" rx="10" ry="12" fill="url(#skinGrad)" />
    {/* Device/clicker in hand */}
    <rect x="208" y="175" width="14" height="25" rx="3" fill="#1a1a2e" />
    
    {/* Pants */}
    <path d="M110 218 L100 400 L130 405 L145 225" fill="url(#pantsGrad)" />
    <path d="M155 225 L170 405 L200 400 L190 218" fill="url(#pantsGrad)" />
    
    {/* Shoes */}
    <ellipse cx="115" cy="410" rx="20" ry="8" fill="#0f172a" />
    <ellipse cx="185" cy="410" rx="20" ry="8" fill="#0f172a" />
    
    {/* Stage/podium blocks */}
    <rect x="60" y="380" width="50" height="120" rx="4" fill="url(#blockGrad1)" opacity="0.8" />
    <rect x="120" y="350" width="60" height="150" rx="4" fill="url(#blockGrad2)" opacity="0.9" />
    <rect x="190" y="400" width="45" height="100" rx="4" fill="url(#blockGrad3)" opacity="0.7" />
    
    <defs>
      <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f4a574" />
        <stop offset="100%" stopColor="#e8956a" />
      </linearGradient>
      <linearGradient id="sweaterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fb923c" />
        <stop offset="30%" stopColor="#f97316" />
        <stop offset="70%" stopColor="#ea580c" />
        <stop offset="100%" stopColor="#c2410c" />
      </linearGradient>
      <linearGradient id="pantsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1e3a5f" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="blockGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7c3aed" />
        <stop offset="100%" stopColor="#4c1d95" />
      </linearGradient>
      <linearGradient id="blockGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#c2410c" />
      </linearGradient>
      <linearGradient id="blockGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#4338ca" />
      </linearGradient>
    </defs>
  </svg>
);

// Floating geometric shapes for depth
const FloatingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 5 }}>
    {/* Large diagonal light streak */}
    <motion.div
      animate={{ opacity: [0.15, 0.25, 0.15] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-0 right-[20%] w-[300px] h-full"
      style={{
        background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
        transform: 'skewX(-15deg)',
      }}
    />
    <motion.div
      animate={{ opacity: [0.1, 0.2, 0.1] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute top-0 right-[35%] w-[200px] h-full"
      style={{
        background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
        transform: 'skewX(-20deg)',
      }}
    />
    
    {/* Small floating particles */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ 
          y: [0, -30, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ 
          duration: 5 + i, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: i * 0.5,
        }}
        className="absolute w-1 h-1 rounded-full bg-white/50"
        style={{
          left: `${20 + i * 8}%`,
          top: `${40 + (i % 3) * 20}%`,
        }}
      />
    ))}
  </div>
);

const CompetitionModeSection = () => {
  return (
    <section 
      id="competition" 
      className="relative py-20 lg:py-28 overflow-hidden min-h-screen flex items-center"
    >
      {/* Code-generated background - replicating the gradient style */}
      <div className="absolute inset-0">
        {/* Base gradient - deep blue to purple to orange */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(145deg, 
                #1a1a4e 0%, 
                #2d2a6e 12%,
                #3d3a8e 22%,
                #4a45a8 32%,
                #5b4fb8 42%,
                #7c5cc8 52%,
                #9b6bb8 60%,
                #b87a98 68%,
                #d58968 76%,
                #e89858 84%,
                #f5a848 92%,
                #ffb838 100%
              )
            `,
          }}
        />
        
        {/* Radial overlay for depth */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 120% 80% at 15% 50%, rgba(30, 58, 138, 0.6) 0%, transparent 50%),
              radial-gradient(ellipse 80% 60% at 85% 80%, rgba(249, 115, 22, 0.4) 0%, transparent 40%),
              radial-gradient(ellipse 60% 40% at 50% 10%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)
            `,
          }}
        />
        
        {/* Spotlight beams from top */}
        <SpotlightBeam delay={0} left="5%" width="120px" opacity={0.3} />
        <SpotlightBeam delay={1.5} left="18%" width="80px" opacity={0.2} />
        <SpotlightBeam delay={3} left="12%" width="100px" opacity={0.25} />
        
        {/* Floating shapes */}
        <FloatingShapes />
        
        {/* Presenter figure */}
        <PresenterFigure />
        
        {/* Subtle vignette for cinematic feel */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.3) 100%)',
          }}
        />
        
        {/* Right side dark overlay for card readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, transparent 35%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.5) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-end">
          {/* Right side content - header and cards */}
          <div className="lg:w-[60%] xl:w-[55%]">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 lg:mb-16"
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

              <p className="text-lg lg:text-xl text-white/85 leading-relaxed max-w-xl">
                Designed for college students competing in hackathons, ideathons, startup pitch events, and academic competitions. These presentations must feel completely human-crafted, not AI-generated.
              </p>
            </motion.div>

            {/* Feature Cards Grid - 2x3 on right side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group"
                >
                  <div 
                    className="relative p-5 lg:p-6 rounded-2xl h-full transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(24px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {/* Hover glow */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.2) 0%, transparent 60%)',
                      }}
                    />
                    
                    <div 
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.35) 0%, rgba(251, 146, 60, 0.2) 100%)',
                        border: '1px solid rgba(249, 115, 22, 0.3)',
                      }}
                    >
                      <feature.icon className="w-5 h-5 text-amber-400" />
                    </div>
                    
                    <h3 className="font-semibold text-base text-white mb-2 group-hover:text-amber-200 transition-colors">
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-12 lg:mt-14"
            >
              <div 
                className="relative p-6 lg:p-8 rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                }}
              >
                {/* Accent glow */}
                <div 
                  className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-32 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(249, 115, 22, 0.25) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-400 font-semibold text-xs uppercase tracking-wider">
                      The Competitive Edge
                    </span>
                  </div>
                  
                  <p className="text-base lg:text-lg text-white/90 font-medium leading-relaxed mb-6">
                    "Competition Mode ensures your slides are authentic, original, and indistinguishable from 
                    human-crafted presentations — giving you the edge you need to win."
                  </p>
                  
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-6 py-5 text-base rounded-xl shadow-lg shadow-orange-500/30"
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      Activate Competition Mode
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitionModeSection;
