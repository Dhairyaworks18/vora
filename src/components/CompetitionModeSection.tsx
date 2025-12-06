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

// High-quality semi-realistic presenter illustration
const PresenterFigure = () => (
  <div 
    className="absolute bottom-0 left-0 w-[48%] md:w-[42%] lg:w-[40%] h-full pointer-events-none"
    style={{ zIndex: 10 }}
  >
    <svg 
      viewBox="0 0 500 700" 
      className="absolute bottom-0 left-[5%] h-[82%] md:h-[85%] lg:h-[88%]"
      style={{ 
        filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.5)) drop-shadow(0 8px 20px rgba(0, 0, 0, 0.3))',
      }}
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        {/* Skin gradient with warmth */}
        <linearGradient id="skinTone" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5c4a8" />
          <stop offset="40%" stopColor="#e8b094" />
          <stop offset="100%" stopColor="#d9a080" />
        </linearGradient>
        <linearGradient id="skinShadow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4956e" />
          <stop offset="100%" stopColor="#c58560" />
        </linearGradient>
        
        {/* Orange sweater with rich gradients */}
        <linearGradient id="sweaterMain" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff9f43" />
          <stop offset="30%" stopColor="#f97316" />
          <stop offset="70%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
        <linearGradient id="sweaterHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffb347" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#d95a0c" />
        </linearGradient>
        <linearGradient id="sweaterShadow" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c2410c" />
          <stop offset="100%" stopColor="#9a3412" />
        </linearGradient>
        
        {/* Navy pants gradient */}
        <linearGradient id="pantsMain" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="50%" stopColor="#172554" />
          <stop offset="100%" stopColor="#0c1a3d" />
        </linearGradient>
        <linearGradient id="pantsHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#264a70" />
          <stop offset="100%" stopColor="#152344" />
        </linearGradient>
        
        {/* Hair gradient */}
        <linearGradient id="hairMain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2d2d3f" />
          <stop offset="50%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#0f0f1a" />
        </linearGradient>
        
        {/* Stage gradient */}
        <linearGradient id="stageTop" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4338ca" />
          <stop offset="100%" stopColor="#312e81" />
        </linearGradient>
        <linearGradient id="stageFront" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#312e81" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
        
        {/* Rim lights */}
        <linearGradient id="rimLightOrange" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ffb347" stopOpacity="0.6" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="rimLightBlue" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.4" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        
        {/* Glow effects */}
        <radialGradient id="presenterAura" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(147, 197, 253, 0.15)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Stage / Platform */}
      <g>
        {/* Stage top surface */}
        <path d="M60 620 L440 620 L400 590 L100 590 Z" fill="url(#stageTop)" />
        {/* Stage front */}
        <path d="M60 620 L440 620 L440 670 L60 670 Z" fill="url(#stageFront)" />
        {/* Stage edge highlight */}
        <path d="M60 620 L440 620" stroke="rgba(167, 139, 250, 0.5)" strokeWidth="2" />
        {/* Stage shadow */}
        <ellipse cx="250" cy="680" rx="200" ry="15" fill="rgba(0,0,0,0.4)" />
      </g>
      
      {/* Figure shadow on stage */}
      <ellipse cx="250" cy="588" rx="55" ry="12" fill="rgba(0,0,0,0.5)" />
      
      {/* LEFT LEG */}
      <path 
        d="M200 400 
           Q195 450 192 500 
           Q190 540 188 575 
           L182 575 
           Q178 540 176 500 
           Q172 450 178 400"
        fill="url(#pantsMain)"
      />
      {/* Left leg highlight */}
      <path 
        d="M198 410 Q196 450 194 500 Q192 540 190 570"
        stroke="url(#pantsHighlight)" 
        strokeWidth="4" 
        fill="none"
        opacity="0.5"
      />
      
      {/* RIGHT LEG */}
      <path 
        d="M280 400 
           Q285 450 288 500 
           Q290 540 292 575 
           L298 575 
           Q302 540 304 500 
           Q308 450 302 400"
        fill="url(#pantsMain)"
      />
      {/* Right leg highlight */}
      <path 
        d="M282 410 Q284 450 286 500 Q288 540 290 570"
        stroke="url(#pantsHighlight)" 
        strokeWidth="4" 
        fill="none"
        opacity="0.5"
      />
      
      {/* LEFT SHOE */}
      <ellipse cx="185" cy="587" rx="28" ry="10" fill="#1a1a2e" />
      <ellipse cx="185" cy="584" rx="24" ry="7" fill="#2d2d3f" />
      <ellipse cx="180" cy="582" rx="8" ry="3" fill="rgba(255,255,255,0.1)" />
      
      {/* RIGHT SHOE */}
      <ellipse cx="295" cy="587" rx="28" ry="10" fill="#1a1a2e" />
      <ellipse cx="295" cy="584" rx="24" ry="7" fill="#2d2d3f" />
      <ellipse cx="290" cy="582" rx="8" ry="3" fill="rgba(255,255,255,0.1)" />
      
      {/* TORSO - Orange sweater */}
      <path 
        d="M170 200 
           Q180 195 240 195 
           Q300 195 310 200
           L315 260
           Q318 320 315 380
           Q310 400 240 405
           Q170 400 165 380
           Q162 320 165 260
           Z"
        fill="url(#sweaterMain)"
      />
      
      {/* Sweater chest shading - left side */}
      <path 
        d="M175 210 Q170 280 175 380"
        stroke="url(#sweaterShadow)" 
        strokeWidth="20" 
        fill="none"
        opacity="0.6"
      />
      
      {/* Sweater highlight - right side */}
      <path 
        d="M300 215 Q310 280 305 375"
        stroke="url(#sweaterHighlight)" 
        strokeWidth="12" 
        fill="none"
        opacity="0.3"
      />
      
      {/* Sweater fold lines */}
      <path d="M200 250 Q205 280 200 320" stroke="rgba(154,52,18,0.3)" strokeWidth="3" fill="none" />
      <path d="M270 260 Q275 290 270 330" stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="none" />
      
      {/* Collar / Neckline */}
      <ellipse cx="240" cy="200" rx="35" ry="12" fill="url(#sweaterShadow)" />
      <ellipse cx="240" cy="198" rx="30" ry="8" fill="url(#skinTone)" />
      
      {/* NECK */}
      <rect x="222" y="165" width="36" height="40" rx="8" fill="url(#skinTone)" />
      <path d="M225 175 Q230 180 230 195" stroke="url(#skinShadow)" strokeWidth="3" fill="none" opacity="0.4" />
      
      {/* HEAD */}
      <ellipse cx="240" cy="115" rx="52" ry="60" fill="url(#skinTone)" />
      
      {/* Face shadow - left side */}
      <path 
        d="M195 90 Q188 120 195 150"
        stroke="url(#skinShadow)" 
        strokeWidth="10" 
        fill="none"
        opacity="0.3"
      />
      
      {/* Left EAR */}
      <ellipse cx="188" cy="120" rx="10" ry="16" fill="url(#skinTone)" />
      <ellipse cx="188" cy="120" rx="6" ry="10" fill="url(#skinShadow)" opacity="0.4" />
      
      {/* Right EAR */}
      <ellipse cx="292" cy="120" rx="10" ry="16" fill="url(#skinTone)" />
      <ellipse cx="292" cy="120" rx="6" ry="10" fill="url(#skinShadow)" opacity="0.3" />
      
      {/* HAIR - fuller, styled */}
      <path 
        d="M190 85 
           Q185 50 220 35 
           Q250 28 280 35
           Q295 50 290 85
           Q295 65 288 50
           Q265 25 240 22
           Q215 25 195 50
           Q185 65 190 85"
        fill="url(#hairMain)"
      />
      {/* Hair texture/volume */}
      <path d="M195 75 Q215 60 230 62" fill="#1a1a2e" />
      <path d="M265 62 Q280 60 288 75" fill="#1a1a2e" />
      {/* Hair highlights */}
      <path d="M215 40 Q235 35 255 40" stroke="rgba(80,80,100,0.3)" strokeWidth="3" fill="none" />
      
      {/* EYES */}
      {/* Left eye */}
      <ellipse cx="218" cy="108" rx="12" ry="8" fill="white" />
      <ellipse cx="220" cy="109" rx="6" ry="6" fill="#2d2d3f" />
      <circle cx="222" cy="107" r="2" fill="white" />
      {/* Left eyelid */}
      <path d="M206 104 Q218 100 230 104" stroke="url(#skinShadow)" strokeWidth="2" fill="none" opacity="0.5" />
      
      {/* Right eye */}
      <ellipse cx="262" cy="108" rx="12" ry="8" fill="white" />
      <ellipse cx="260" cy="109" rx="6" ry="6" fill="#2d2d3f" />
      <circle cx="262" cy="107" r="2" fill="white" />
      {/* Right eyelid */}
      <path d="M250 104 Q262 100 274 104" stroke="url(#skinShadow)" strokeWidth="2" fill="none" opacity="0.5" />
      
      {/* EYEBROWS */}
      <path d="M205 95 Q218 90 232 95" stroke="url(#hairMain)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M248 95 Q262 90 275 95" stroke="url(#hairMain)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      
      {/* NOSE */}
      <path d="M240 110 L238 130 Q240 135 242 130 L240 110" stroke="url(#skinShadow)" strokeWidth="2.5" fill="none" />
      <ellipse cx="240" cy="133" rx="6" ry="4" fill="url(#skinShadow)" opacity="0.2" />
      
      {/* MOUTH - friendly smile */}
      <path d="M225 148 Q240 158 255 148" stroke="#c07060" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Upper lip highlight */}
      <path d="M232 146 Q240 144 248 146" stroke="url(#skinShadow)" strokeWidth="1.5" fill="none" opacity="0.4" />
      
      {/* LEFT ARM - Extended presenting gesture toward cards */}
      <g>
        {/* Upper arm */}
        <path 
          d="M170 210 
             Q140 200 100 175 
             Q75 158 55 135"
          stroke="url(#sweaterMain)" 
          strokeWidth="38" 
          strokeLinecap="round"
          fill="none"
        />
        {/* Arm highlight */}
        <path 
          d="M165 205 Q135 195 100 172 Q80 158 62 140"
          stroke="url(#sweaterHighlight)" 
          strokeWidth="8" 
          fill="none"
          opacity="0.3"
        />
        
        {/* Hand base */}
        <ellipse cx="48" cy="125" rx="22" ry="20" fill="url(#skinTone)" />
        
        {/* Palm detail */}
        <ellipse cx="50" cy="128" rx="15" ry="14" fill="url(#skinShadow)" opacity="0.15" />
        
        {/* Fingers - spread open gesture */}
        <path d="M35 118 Q22 100 26 82" stroke="url(#skinTone)" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M44 110 Q38 88 44 68" stroke="url(#skinTone)" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M56 108 Q60 85 62 65" stroke="url(#skinTone)" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M68 115 Q80 95 88 78" stroke="url(#skinTone)" strokeWidth="9" strokeLinecap="round" fill="none" />
        
        {/* Thumb */}
        <path d="M30 132 Q15 140 8 132" stroke="url(#skinTone)" strokeWidth="9" strokeLinecap="round" fill="none" />
        
        {/* Finger highlights */}
        <path d="M28 95 Q30 88 28 82" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
        <path d="M46 80 Q47 74 46 68" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
        <path d="M62 78 Q63 72 62 66" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
      </g>
      
      {/* RIGHT ARM - Holding clicker */}
      <g>
        {/* Upper arm - bent at side */}
        <path 
          d="M310 210 
             Q330 240 328 290"
          stroke="url(#sweaterMain)" 
          strokeWidth="36" 
          strokeLinecap="round"
          fill="none"
        />
        {/* Arm shadow */}
        <path 
          d="M305 215 Q320 245 318 290"
          stroke="url(#sweaterShadow)" 
          strokeWidth="8" 
          fill="none"
          opacity="0.4"
        />
        
        {/* Hand */}
        <ellipse cx="325" cy="305" rx="18" ry="20" fill="url(#skinTone)" />
        
        {/* Fingers wrapped around clicker */}
        <path d="M315 295 Q310 310 318 320" stroke="url(#skinTone)" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M322 293 Q318 308 325 322" stroke="url(#skinTone)" strokeWidth="8" strokeLinecap="round" fill="none" />
        
        {/* Clicker device */}
        <rect x="314" y="280" width="20" height="40" rx="5" fill="#1a1a2e" />
        <rect x="318" y="286" width="12" height="6" rx="2" fill="#2d2d3f" />
        {/* LED light */}
        <circle cx="324" cy="289" r="2.5" fill="#4ade80" filter="url(#softGlow)" />
        {/* Clicker button */}
        <ellipse cx="324" cy="300" rx="6" ry="3" fill="#3d3d5c" />
      </g>
      
      {/* Rim lighting effects */}
      {/* Orange rim light - right side */}
      <path 
        d="M295 60 Q310 100 308 180 Q312 280 305 380"
        stroke="url(#rimLightOrange)" 
        strokeWidth="6" 
        fill="none"
      />
      
      {/* Blue rim light - left side */}
      <path 
        d="M185 70 Q172 110 175 180 Q170 280 178 370"
        stroke="url(#rimLightBlue)" 
        strokeWidth="5" 
        fill="none"
      />
      
      {/* Subtle body aura */}
      <ellipse cx="240" cy="280" rx="100" ry="180" fill="url(#presenterAura)" opacity="0.5" />
    </svg>
    
    {/* Background glow behind presenter */}
    <div 
      className="absolute bottom-[8%] left-[12%] w-[300px] h-[450px] rounded-full"
      style={{
        background: 'radial-gradient(ellipse, rgba(147, 197, 253, 0.18) 0%, rgba(167, 139, 250, 0.1) 40%, transparent 70%)',
        filter: 'blur(50px)',
        zIndex: -1,
      }}
    />
    
    {/* Warm accent glow */}
    <div 
      className="absolute bottom-[15%] left-[25%] w-[150px] h-[250px] rounded-full"
      style={{
        background: 'radial-gradient(ellipse, rgba(251, 146, 60, 0.12) 0%, transparent 70%)',
        filter: 'blur(30px)',
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
