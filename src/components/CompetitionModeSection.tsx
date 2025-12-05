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

// Animated spotlight beams from top
const SpotlightBeams = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
    {/* Main spotlight on presenter */}
    <motion.div
      animate={{ opacity: [0.4, 0.6, 0.4] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-0 h-full"
      style={{
        left: '8%',
        width: '160px',
        background: `linear-gradient(180deg, rgba(147, 197, 253, 0.6) 0%, rgba(147, 197, 253, 0.2) 30%, transparent 60%)`,
        clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
        filter: 'blur(12px)',
      }}
    />
    {/* Secondary spotlight */}
    <motion.div
      animate={{ opacity: [0.2, 0.35, 0.2] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute top-0 h-full"
      style={{
        left: '20%',
        width: '100px',
        background: `linear-gradient(180deg, rgba(165, 180, 252, 0.5) 0%, rgba(165, 180, 252, 0.1) 35%, transparent 55%)`,
        clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)',
        filter: 'blur(10px)',
      }}
    />
    {/* Accent beam */}
    <motion.div
      animate={{ opacity: [0.15, 0.25, 0.15] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      className="absolute top-0 h-full"
      style={{
        left: '3%',
        width: '80px',
        background: `linear-gradient(180deg, rgba(196, 181, 253, 0.4) 0%, transparent 40%)`,
        clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
        filter: 'blur(8px)',
      }}
    />
  </div>
);

// Enhanced presenter figure - more detailed and realistic
const PresenterFigure = () => (
  <div 
    className="absolute bottom-0 left-0 w-[45%] md:w-[40%] lg:w-[38%] h-full pointer-events-none"
    style={{ zIndex: 10 }}
  >
    <svg 
      viewBox="0 0 400 600" 
      className="absolute bottom-0 left-[10%] h-[85%] md:h-[88%]"
      style={{ 
        filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.6))',
      }}
      preserveAspectRatio="xMidYMax meet"
    >
      {/* Stage/podium blocks - behind the figure */}
      <rect x="80" y="480" width="70" height="120" rx="6" fill="url(#blockGradPurple)" opacity="0.85" />
      <rect x="160" y="440" width="90" height="160" rx="6" fill="url(#blockGradOrange)" opacity="0.9" />
      <rect x="265" y="500" width="60" height="100" rx="6" fill="url(#blockGradBlue)" opacity="0.75" />
      
      {/* Figure shadow on stage */}
      <ellipse cx="200" cy="510" rx="50" ry="12" fill="rgba(0,0,0,0.4)" />
      
      {/* Left leg */}
      <path d="M165 320 L155 490 C155 495 162 500 170 500 L175 500 C183 500 188 495 188 490 L185 335" fill="url(#pantsGrad)" />
      {/* Right leg */}
      <path d="M215 335 L212 490 C212 495 217 500 225 500 L230 500 C238 500 243 495 243 490 L235 320" fill="url(#pantsGrad)" />
      
      {/* Left shoe */}
      <ellipse cx="172" cy="505" rx="22" ry="8" fill="#0f172a" />
      <ellipse cx="172" cy="503" rx="18" ry="5" fill="#1e293b" />
      {/* Right shoe */}
      <ellipse cx="228" cy="505" rx="22" ry="8" fill="#0f172a" />
      <ellipse cx="228" cy="503" rx="18" ry="5" fill="#1e293b" />
      
      {/* Body - Orange sweater */}
      <path 
        d="M145 160 Q200 145 255 160 L250 330 Q200 345 150 330 Z" 
        fill="url(#sweaterGrad)" 
      />
      {/* Sweater shading */}
      <path 
        d="M150 180 Q160 200 155 250 Q150 300 155 330" 
        stroke="rgba(154,52,18,0.3)" 
        strokeWidth="8" 
        fill="none"
      />
      <path 
        d="M250 180 Q240 200 245 250 Q250 300 245 330" 
        stroke="rgba(255,255,255,0.1)" 
        strokeWidth="5" 
        fill="none"
      />
      {/* Sweater collar */}
      <path d="M170 160 Q200 175 230 160" stroke="#c2410c" strokeWidth="4" fill="none" />
      
      {/* Neck */}
      <rect x="185" y="130" width="30" height="35" rx="5" fill="url(#skinGrad)" />
      
      {/* Head */}
      <ellipse cx="200" cy="95" rx="42" ry="48" fill="url(#skinGrad)" />
      {/* Ear */}
      <ellipse cx="158" cy="100" rx="8" ry="12" fill="url(#skinGrad)" />
      <ellipse cx="158" cy="100" rx="5" ry="8" fill="#e8956a" />
      
      {/* Hair - styled dark hair */}
      <path 
        d="M158 75 Q165 35 200 30 Q235 35 242 75 Q245 55 238 45 Q220 20 200 18 Q180 20 162 45 Q155 55 158 75" 
        fill="#1a1a2e" 
      />
      <path d="M160 70 Q180 60 195 62 Q185 50 165 55 Q158 60 160 70" fill="#0f172a" />
      
      {/* Face features */}
      {/* Eyes */}
      <ellipse cx="182" cy="90" rx="6" ry="4" fill="#1a1a2e" />
      <ellipse cx="218" cy="90" rx="6" ry="4" fill="#1a1a2e" />
      <circle cx="184" cy="89" r="1.5" fill="white" />
      <circle cx="220" cy="89" r="1.5" fill="white" />
      {/* Eyebrows */}
      <path d="M174 82 Q182 79 190 82" stroke="#1a1a2e" strokeWidth="2.5" fill="none" />
      <path d="M210 82 Q218 79 226 82" stroke="#1a1a2e" strokeWidth="2.5" fill="none" />
      {/* Nose */}
      <path d="M200 95 L198 110 Q200 114 202 110 L200 95" stroke="#d4845a" strokeWidth="2" fill="none" />
      {/* Smile */}
      <path d="M188 120 Q200 130 212 120" stroke="#c2785a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      
      {/* Left arm - extended presenting gesture */}
      <path 
        d="M145 170 Q110 165 75 140 Q55 125 45 105" 
        stroke="url(#sweaterGrad)" 
        strokeWidth="32" 
        strokeLinecap="round"
        fill="none"
      />
      {/* Left hand - open palm gesture */}
      <ellipse cx="42" cy="95" rx="18" ry="15" fill="url(#skinGrad)" />
      {/* Fingers spread out */}
      <path d="M32 88 Q22 75 25 65" stroke="url(#skinGrad)" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M38 82 Q35 65 40 55" stroke="url(#skinGrad)" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M48 80 Q52 62 55 52" stroke="url(#skinGrad)" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M56 85 Q65 70 70 62" stroke="url(#skinGrad)" strokeWidth="7" strokeLinecap="round" fill="none" />
      {/* Thumb */}
      <path d="M28 98 Q18 105 15 100" stroke="url(#skinGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
      
      {/* Right arm - holding clicker */}
      <path 
        d="M255 170 Q275 195 270 240" 
        stroke="url(#sweaterGrad)" 
        strokeWidth="32" 
        strokeLinecap="round"
        fill="none"
      />
      {/* Right hand */}
      <ellipse cx="268" cy="250" rx="14" ry="16" fill="url(#skinGrad)" />
      {/* Clicker device */}
      <rect x="260" y="235" width="16" height="32" rx="4" fill="#1a1a2e" />
      <rect x="264" y="240" width="8" height="4" rx="1" fill="#4ade80" />
      
      {/* Subtle highlight on presenter */}
      <ellipse cx="200" cy="200" rx="60" ry="100" fill="url(#presenterGlow)" opacity="0.15" />
      
      <defs>
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f4a574" />
          <stop offset="50%" stopColor="#eda06a" />
          <stop offset="100%" stopColor="#e8956a" />
        </linearGradient>
        <linearGradient id="sweaterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="25%" stopColor="#f97316" />
          <stop offset="60%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
        <linearGradient id="pantsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="50%" stopColor="#172554" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="blockGradPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <linearGradient id="blockGradOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#9a3412" />
        </linearGradient>
        <linearGradient id="blockGradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#3730a3" />
        </linearGradient>
        <radialGradient id="presenterGlow" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
    </svg>
    
    {/* Soft glow behind presenter for depth separation */}
    <div 
      className="absolute bottom-[10%] left-[15%] w-[250px] h-[400px] rounded-full"
      style={{
        background: 'radial-gradient(ellipse, rgba(147, 197, 253, 0.2) 0%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: -1,
      }}
    />
  </div>
);

// Floating light streaks for atmosphere
const LightStreaks = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 3 }}>
    {/* Diagonal light rays */}
    <motion.div
      animate={{ opacity: [0.08, 0.15, 0.08] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-0 right-[15%] w-[400px] h-full"
      style={{
        background: 'linear-gradient(125deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
        transform: 'skewX(-15deg)',
      }}
    />
    <motion.div
      animate={{ opacity: [0.05, 0.1, 0.05] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      className="absolute top-0 right-[30%] w-[250px] h-full"
      style={{
        background: 'linear-gradient(130deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
        transform: 'skewX(-20deg)',
      }}
    />
    
    {/* Floating particles */}
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ 
          y: [0, -40, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ 
          duration: 6 + i * 0.5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: i * 0.7,
        }}
        className="absolute w-1 h-1 rounded-full"
        style={{
          left: `${15 + i * 7}%`,
          top: `${30 + (i % 4) * 15}%`,
          background: 'rgba(255, 255, 255, 0.6)',
          boxShadow: '0 0 4px rgba(255, 255, 255, 0.4)',
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
      {/* Code-generated background */}
      <div className="absolute inset-0">
        {/* Base gradient - matching the reference image */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(155deg, 
                #1a1a4e 0%, 
                #252570 10%,
                #3535a0 20%,
                #4545b8 30%,
                #5858c8 40%,
                #7060c0 48%,
                #9068b0 55%,
                #b07898 62%,
                #d08870 70%,
                #e89850 78%,
                #f5a840 86%,
                #ffb830 95%,
                #ffc020 100%
              )
            `,
          }}
        />
        
        {/* Radial overlays for depth and lighting */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 100% 80% at 20% 60%, rgba(30, 64, 175, 0.5) 0%, transparent 50%),
              radial-gradient(ellipse 70% 50% at 80% 70%, rgba(251, 146, 60, 0.35) 0%, transparent 45%),
              radial-gradient(ellipse 50% 30% at 50% 0%, rgba(124, 58, 237, 0.25) 0%, transparent 50%)
            `,
          }}
        />
        
        {/* Spotlight beams */}
        <SpotlightBeams />
        
        {/* Light streaks and particles */}
        <LightStreaks />
        
        {/* Presenter figure */}
        <PresenterFigure />
        
        {/* Cinematic vignette */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 110% 100% at 50% 50%, transparent 35%, rgba(0,0,0,0.35) 100%)',
            zIndex: 4,
          }}
        />
        
        {/* Right side overlay for card readability */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0.45) 100%)',
            zIndex: 5,
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-end">
          {/* Right side content - header and cards */}
          <div className="lg:w-[58%] xl:w-[55%]">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10 lg:mb-14"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-white/90">Signature Feature</span>
              </motion.div>

              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 drop-shadow-lg">
                Competition Mode
              </h2>

              <p className="text-lg lg:text-xl text-white/85 leading-relaxed max-w-xl">
                Designed for college students competing in hackathons, ideathons, startup pitch events, and academic competitions. These presentations must feel completely human-crafted, not AI-generated.
              </p>
            </motion.div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <div 
                    className="relative p-5 rounded-2xl h-full transition-all duration-300"
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
                        background: 'radial-gradient(circle at 50% 0%, rgba(251, 146, 60, 0.2) 0%, transparent 60%)',
                      }}
                    />
                    
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.35) 0%, rgba(251, 146, 60, 0.15) 100%)',
                        border: '1px solid rgba(251, 146, 60, 0.3)',
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
              className="mt-10 lg:mt-12"
            >
              <div 
                className="relative p-6 lg:p-7 rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                }}
              >
                {/* Accent glow */}
                <div 
                  className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-24 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(251, 146, 60, 0.25) 0%, transparent 70%)',
                    filter: 'blur(25px)',
                  }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-400 font-semibold text-xs uppercase tracking-wider">
                      The Competitive Edge
                    </span>
                  </div>
                  
                  <p className="text-base lg:text-lg text-white/90 font-medium leading-relaxed mb-5">
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
