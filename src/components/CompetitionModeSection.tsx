import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  Shuffle, 
  Eye, 
  Edit3, 
  BookOpen, 
  Trophy,
} from "lucide-react";

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

// Animated Owl Character Component
const OwlCharacter = ({ hoveredCardIndex, mousePosition }: { hoveredCardIndex: number | null; mousePosition: { x: number; y: number } }) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [eyeBeamPulse, setEyeBeamPulse] = useState(0);
  
  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);
    
    return () => clearInterval(blinkInterval);
  }, []);
  
  // Eye beam pulse cycle
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setEyeBeamPulse(prev => (prev + 1) % 3);
    }, 2000);
    
    return () => clearInterval(pulseInterval);
  }, []);
  
  // Calculate eye position based on cursor position
  const getEyeOffset = () => {
    if (mousePosition.x !== 0 || mousePosition.y !== 0) {
      const maxOffsetX = 6;
      const maxOffsetY = 4;
      const eyeX = Math.max(-maxOffsetX, Math.min(maxOffsetX, (mousePosition.x - 0.3) * maxOffsetX * 2));
      const eyeY = Math.max(-maxOffsetY, Math.min(maxOffsetY, (mousePosition.y - 0.5) * maxOffsetY * 2));
      return { x: eyeX, y: eyeY };
    }
    
    if (hoveredCardIndex !== null) {
      const row = Math.floor(hoveredCardIndex / 2);
      const col = hoveredCardIndex % 2;
      return { x: 4 + col * 2, y: -1 + row * 2 };
    }
    
    return { x: 3, y: 0 };
  };
  
  const eyeOffset = getEyeOffset();
  const isLookingAtCards = mousePosition.x > 0.5 || hoveredCardIndex !== null;
  
  return (
    <motion.div
      className="relative w-full h-full flex items-end justify-center pb-8 md:pb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Owl Character SVG */}
      <motion.svg
        viewBox="0 0 300 380"
        className="w-[220px] md:w-[280px] lg:w-[320px] h-auto"
        animate={{ 
          y: [0, -6, 0],
        }}
        transition={{ 
          duration: 3.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{
          filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))',
        }}
      >
        <defs>
          {/* Body gradient - warm brown tones */}
          <linearGradient id="owlBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a67c52" />
            <stop offset="40%" stopColor="#8b6645" />
            <stop offset="100%" stopColor="#6b4e35" />
          </linearGradient>
          
          {/* Face mask gradient - white/cream */}
          <radialGradient id="owlFaceGradient" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#f5f0e6" />
            <stop offset="100%" stopColor="#e8dfd0" />
          </radialGradient>
          
          {/* Belly gradient */}
          <radialGradient id="owlBellyGradient" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="80%" stopColor="#f0ebe3" />
            <stop offset="100%" stopColor="#e0d8cc" />
          </radialGradient>
          
          {/* Wing gradient */}
          <linearGradient id="owlWingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9a7048" />
            <stop offset="50%" stopColor="#7a5a3a" />
            <stop offset="100%" stopColor="#5a4028" />
          </linearGradient>
          
          {/* Eye glow */}
          <radialGradient id="eyeGlowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </radialGradient>
          
          {/* Eye iris gradient */}
          <radialGradient id="irisGradient" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </radialGradient>
          
          {/* Eye beam gradient */}
          <linearGradient id="eyeBeamGradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="rgba(251, 191, 36, 0.9)" />
            <stop offset="30%" stopColor="rgba(251, 191, 36, 0.5)" />
            <stop offset="60%" stopColor="rgba(251, 191, 36, 0.2)" />
            <stop offset="100%" stopColor="rgba(251, 191, 36, 0)" />
          </linearGradient>
          
          {/* Beak gradient */}
          <linearGradient id="beakGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          
          {/* Feet gradient */}
          <linearGradient id="feetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          
          {/* Glow filters */}
          <filter id="owlEyeGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="beamGlow" x="-50%" y="-200%" width="200%" height="500%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3" />
          </filter>
        </defs>
        
        {/* Shadow under owl */}
        <ellipse cx="150" cy="365" rx="55" ry="10" fill="rgba(0,0,0,0.35)" />
        
        {/* FEET */}
        <motion.g
          animate={{ y: [0, 2, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Left foot */}
          <g>
            <ellipse cx="115" cy="355" rx="18" ry="6" fill="url(#feetGradient)" />
            <ellipse cx="102" cy="358" rx="6" ry="4" fill="url(#feetGradient)" />
            <ellipse cx="115" cy="360" rx="6" ry="4" fill="url(#feetGradient)" />
            <ellipse cx="128" cy="358" rx="6" ry="4" fill="url(#feetGradient)" />
          </g>
          {/* Right foot */}
          <g>
            <ellipse cx="185" cy="355" rx="18" ry="6" fill="url(#feetGradient)" />
            <ellipse cx="172" cy="358" rx="6" ry="4" fill="url(#feetGradient)" />
            <ellipse cx="185" cy="360" rx="6" ry="4" fill="url(#feetGradient)" />
            <ellipse cx="198" cy="358" rx="6" ry="4" fill="url(#feetGradient)" />
          </g>
        </motion.g>
        
        {/* BODY - Main rounded shape */}
        <motion.g
          animate={{ scaleY: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: '150px 280px' }}
        >
          {/* Main body */}
          <ellipse cx="150" cy="270" rx="85" ry="95" fill="url(#owlBodyGradient)" filter="url(#softShadow)" />
          
          {/* Belly patch */}
          <ellipse cx="150" cy="290" rx="50" ry="55" fill="url(#owlBellyGradient)" />
          
          {/* Belly feather details */}
          <g opacity="0.4">
            {[...Array(5)].map((_, row) => (
              [...Array(row % 2 === 0 ? 4 : 3)].map((_, col) => (
                <path
                  key={`feather-${row}-${col}`}
                  d={`M${115 + col * 20 + (row % 2 === 0 ? 0 : 10)} ${255 + row * 18} q8 8 0 14`}
                  stroke="#c4a574"
                  strokeWidth="1.5"
                  fill="none"
                />
              ))
            ))}
          </g>
        </motion.g>
        
        {/* LEFT WING */}
        <motion.g
          animate={isLookingAtCards ? { rotate: [0, 5, 0] } : { rotate: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: '90px 220px' }}
        >
          <path
            d="M70 180 Q40 220 50 280 Q55 300 70 310 Q80 305 85 290 Q90 260 95 230 Q95 200 80 180 Z"
            fill="url(#owlWingGradient)"
          />
          {/* Wing feather lines */}
          <path d="M60 230 Q70 250 75 280" stroke="#5a4028" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M68 220 Q75 240 80 270" stroke="#5a4028" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M75 215 Q82 235 85 255" stroke="#5a4028" strokeWidth="1.5" fill="none" opacity="0.5" />
        </motion.g>
        
        {/* RIGHT WING */}
        <motion.g
          animate={isLookingAtCards ? { rotate: [0, -8, -5, -8, 0] } : { rotate: [0, 2, 0] }}
          transition={{ duration: isLookingAtCards ? 2.5 : 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          style={{ transformOrigin: '210px 220px' }}
        >
          <path
            d="M230 180 Q260 220 250 280 Q245 300 230 310 Q220 305 215 290 Q210 260 205 230 Q205 200 220 180 Z"
            fill="url(#owlWingGradient)"
          />
          {/* Wing feather lines */}
          <path d="M240 230 Q230 250 225 280" stroke="#5a4028" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M232 220 Q225 240 220 270" stroke="#5a4028" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M225 215 Q218 235 215 255" stroke="#5a4028" strokeWidth="1.5" fill="none" opacity="0.5" />
        </motion.g>
        
        {/* HEAD */}
        <motion.g
          animate={isLookingAtCards ? { rotate: [0, 5, 3, 5, 0], x: [0, 3, 0] } : { rotate: [0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: '150px 140px' }}
        >
          {/* Head base */}
          <ellipse cx="150" cy="130" rx="75" ry="70" fill="url(#owlBodyGradient)" />
          
          {/* Ear tufts - left */}
          <motion.path
            d="M85 70 Q75 40 90 25 Q100 35 100 55 Q95 70 90 80"
            fill="#8b6645"
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: '90px 60px' }}
          />
          <path d="M90 65 Q85 45 95 35" stroke="#a67c52" strokeWidth="3" fill="none" />
          
          {/* Ear tufts - right */}
          <motion.path
            d="M215 70 Q225 40 210 25 Q200 35 200 55 Q205 70 210 80"
            fill="#8b6645"
            animate={{ rotate: [3, -3, 3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            style={{ transformOrigin: '210px 60px' }}
          />
          <path d="M210 65 Q215 45 205 35" stroke="#a67c52" strokeWidth="3" fill="none" />
          
          {/* Face mask - heart shape */}
          <path
            d="M150 185 Q90 170 85 120 Q85 80 120 75 Q140 70 150 90 Q160 70 180 75 Q215 80 215 120 Q210 170 150 185"
            fill="url(#owlFaceGradient)"
          />
          
          {/* Face mask border/outline pattern */}
          <path
            d="M150 180 Q95 165 90 120 Q90 85 120 80 Q140 75 150 92 Q160 75 180 80 Q210 85 210 120 Q205 165 150 180"
            fill="none"
            stroke="#c4a574"
            strokeWidth="3"
            opacity="0.6"
          />
          
          {/* EYES - with glow */}
          <motion.g
            animate={{ x: eyeOffset.x, y: eyeOffset.y }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {/* Left eye */}
            <motion.g
              animate={isBlinking ? { scaleY: 0.1 } : { scaleY: 1 }}
              transition={{ duration: 0.1 }}
              style={{ transformOrigin: '115px 115px' }}
            >
              {/* Eye outer glow */}
              <motion.ellipse
                cx="115"
                cy="115"
                rx="28"
                ry="30"
                fill="rgba(251, 191, 36, 0.3)"
                filter="url(#owlEyeGlow)"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Eye white/outer ring */}
              <ellipse cx="115" cy="115" rx="25" ry="27" fill="#1a1a2e" />
              {/* Iris - golden */}
              <ellipse cx="115" cy="115" rx="22" ry="24" fill="url(#irisGradient)" />
              {/* Pupil */}
              <motion.ellipse
                cx="117"
                cy="117"
                rx="9"
                ry="11"
                fill="#1a1a2e"
                animate={{ rx: [9, 7, 9], ry: [11, 9, 11] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Eye sparkles */}
              <circle cx="108" cy="108" r="5" fill="rgba(255,255,255,0.9)" />
              <circle cx="120" cy="120" r="2.5" fill="rgba(255,255,255,0.6)" />
            </motion.g>
            
            {/* Right eye */}
            <motion.g
              animate={isBlinking ? { scaleY: 0.1 } : { scaleY: 1 }}
              transition={{ duration: 0.1 }}
              style={{ transformOrigin: '185px 115px' }}
            >
              {/* Eye outer glow */}
              <motion.ellipse
                cx="185"
                cy="115"
                rx="28"
                ry="30"
                fill="rgba(251, 191, 36, 0.3)"
                filter="url(#owlEyeGlow)"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              {/* Eye white/outer ring */}
              <ellipse cx="185" cy="115" rx="25" ry="27" fill="#1a1a2e" />
              {/* Iris - golden */}
              <ellipse cx="185" cy="115" rx="22" ry="24" fill="url(#irisGradient)" />
              {/* Pupil */}
              <motion.ellipse
                cx="187"
                cy="117"
                rx="9"
                ry="11"
                fill="#1a1a2e"
                animate={{ rx: [9, 7, 9], ry: [11, 9, 11] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              />
              {/* Eye sparkles */}
              <circle cx="178" cy="108" r="5" fill="rgba(255,255,255,0.9)" />
              <circle cx="190" cy="120" r="2.5" fill="rgba(255,255,255,0.6)" />
            </motion.g>
          </motion.g>
          
          {/* BEAK */}
          <motion.path
            d="M150 145 L142 162 Q150 172 158 162 Z"
            fill="url(#beakGradient)"
            animate={{ scaleY: [1, 0.95, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: '150px 155px' }}
          />
          <path d="M150 147 L145 158" stroke="#b45309" strokeWidth="1" opacity="0.5" />
        </motion.g>
      </motion.svg>
      
      {/* Ground glow from owl's eyes */}
      <motion.div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          width: '180px',
          height: '35px',
          background: 'radial-gradient(ellipse, rgba(251, 191, 36, 0.4) 0%, rgba(245, 158, 11, 0.2) 50%, transparent 80%)',
          filter: 'blur(10px)',
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scaleX: [0.95, 1.08, 0.95],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

// Eye beam light effect from owl's eyes toward cards
const EyeBeamEffect = ({ hoveredCardIndex }: { hoveredCardIndex: number | null }) => (
  <div className="absolute pointer-events-none overflow-hidden" style={{ zIndex: 1, inset: 0 }}>
    {/* Main beam from eyes toward cards area */}
    <motion.div
      className="absolute"
      style={{
        left: '20%',
        top: '40%',
        width: '550px',
        height: '350px',
        background: `linear-gradient(70deg, 
          rgba(251, 191, 36, 0.35) 0%,
          rgba(251, 191, 36, 0.15) 20%,
          rgba(245, 158, 11, 0.08) 40%,
          rgba(251, 191, 36, 0.03) 65%,
          transparent 100%
        )`,
        clipPath: 'polygon(0% 35%, 0% 65%, 100% 80%, 100% 20%)',
        filter: 'blur(18px)',
        transformOrigin: '0% 50%',
      }}
      animate={{
        opacity: [0.4, 0.7, 0.4],
        scaleY: [0.97, 1.03, 0.97],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Inner concentrated beam core */}
    <motion.div
      className="absolute"
      style={{
        left: '20%',
        top: '42%',
        width: '400px',
        height: '200px',
        background: `linear-gradient(70deg, 
          rgba(255, 247, 237, 0.3) 0%,
          rgba(251, 191, 36, 0.18) 25%,
          rgba(251, 191, 36, 0.06) 55%,
          transparent 100%
        )`,
        clipPath: 'polygon(0% 40%, 0% 60%, 100% 68%, 100% 32%)',
        filter: 'blur(10px)',
        transformOrigin: '0% 50%',
      }}
      animate={{
        opacity: [0.35, 0.6, 0.35],
        scaleY: [0.98, 1.02, 0.98],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.2,
      }}
    />
    
    {/* Shimmer particles within beam */}
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={`shimmer-${i}`}
        className="absolute rounded-full"
        style={{
          left: `${22 + i * 12}%`,
          top: `${44 + Math.sin(i) * 8}%`,
          width: '8px',
          height: '8px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(251, 191, 36, 0.5) 50%, transparent 100%)',
          filter: 'blur(2px)',
        }}
        animate={{
          opacity: [0, 0.8, 0],
          x: [0, 80 + i * 20, 160 + i * 20],
          scale: [0.5, 1, 0.3],
        }}
        transition={{
          duration: 2.5 + i * 0.3,
          repeat: Infinity,
          delay: i * 0.5,
          ease: "easeInOut",
        }}
      />
    ))}
    
    {/* Eye glow source points */}
    <motion.div
      className="absolute rounded-full"
      style={{
        left: '17%',
        top: '38%',
        width: '50px',
        height: '50px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(251, 191, 36, 0.8) 35%, rgba(245, 158, 11, 0.4) 60%, transparent 100%)',
        filter: 'blur(5px)',
      }}
      animate={{
        scale: [1, 1.25, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Secondary eye glow */}
    <motion.div
      className="absolute rounded-full"
      style={{
        left: '19%',
        top: '40%',
        width: '40px',
        height: '40px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(251, 191, 36, 0.7) 40%, transparent 100%)',
        filter: 'blur(4px)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.6, 0.9, 0.6],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.3,
      }}
    />
    
    {/* Enhanced beam on hover */}
    <motion.div
      className="absolute"
      style={{
        left: '20%',
        top: '41%',
        width: '500px',
        height: '280px',
        background: `linear-gradient(70deg, 
          rgba(251, 191, 36, 0.5) 0%,
          rgba(251, 191, 36, 0.25) 25%,
          rgba(245, 158, 11, 0.1) 50%,
          transparent 100%
        )`,
        clipPath: 'polygon(0% 38%, 0% 62%, 100% 75%, 100% 25%)',
        filter: 'blur(15px)',
        transformOrigin: '0% 50%',
      }}
      animate={{
        opacity: hoveredCardIndex !== null ? [0.5, 0.8, 0.5] : 0,
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

// Card glow effect component - illuminates when owl's light "reaches" the card
const CardEyeGlow = ({ cardIndex }: { cardIndex: number }) => {
  const row = Math.floor(cardIndex / 2);
  const delay = row * 0.4 + (cardIndex % 2) * 0.2;
  
  return (
    <>
      {/* Left edge glow - where light arrives */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(251, 191, 36, 0.8) 0%, rgba(245, 158, 11, 0.6) 50%, rgba(251, 191, 36, 0.8) 100%)',
          boxShadow: '0 0 12px rgba(251, 191, 36, 0.6), inset 0 0 8px rgba(255, 255, 255, 0.3)',
        }}
        animate={{
          opacity: [0, 0.85, 0.5, 0.85, 0],
          scaleY: [0.3, 1, 1, 1, 0.3],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          delay: delay,
          ease: "easeInOut",
        }}
      />
      
      {/* Corner glow pulse */}
      <motion.div
        className="absolute -left-1 top-1/2 -translate-y-1/2 w-6 h-16 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at left, rgba(251, 191, 36, 0.5) 0%, transparent 70%)',
          filter: 'blur(6px)',
        }}
        animate={{
          opacity: [0, 0.75, 0.4, 0.75, 0],
          scale: [0.8, 1.15, 1, 1.15, 0.8],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          delay: delay + 0.35,
          ease: "easeInOut",
        }}
      />
      
      {/* Icon glow when light arrives */}
      <motion.div
        className="absolute top-4 left-4 w-14 h-14 rounded-xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.35) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
        animate={{
          opacity: [0, 0.6, 0.35, 0.6, 0],
          scale: [0.9, 1.2, 1.1, 1.2, 0.9],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          delay: delay + 0.5,
          ease: "easeInOut",
        }}
      />
    </>
  );
};

const CompetitionModeSection = () => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };
  
  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };
  
  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen py-16 md:py-24 overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, 
            #0a0a1a 0%, 
            #1a1a3a 15%,
            #2a1a4a 30%, 
            #3a1a5a 45%,
            #4a2a5a 55%,
            #5a3a4a 70%,
            #6a4a3a 85%,
            #7a5a2a 100%
          )
        `,
      }}
    >
      {/* Background overlays */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 80%, rgba(147, 197, 253, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(251, 146, 60, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(167, 139, 250, 0.08) 0%, transparent 60%)
          `,
        }}
      />
      
      <EyeBeamEffect hoveredCardIndex={hoveredCardIndex} />
      
      {/* Cinematic vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.4) 100%)',
        }}
      />

      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(251, 146, 60, 0.15)',
              border: '1px solid rgba(251, 146, 60, 0.3)',
            }}
          >
            <Trophy className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 text-sm font-medium">Win Every Competition</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Competition </span>
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #fb923c 0%, #f472b6 50%, #a78bfa 100%)',
              }}
            >
              Mode
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-300/80 max-w-3xl mx-auto leading-relaxed">
            Designed for college students competing in hackathons, ideathons, startup pitch events, 
            and academic competitions. These presentations must feel completely human-crafted, not AI-generated.
          </p>
        </motion.div>
        
        {/* Main Content - Owl + Cards */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-12">
          {/* Owl Character - Left Side */}
          <motion.div 
            className="w-full lg:w-[40%] flex items-center justify-center min-h-[400px] lg:min-h-[500px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <OwlCharacter hoveredCardIndex={hoveredCardIndex} mousePosition={mousePosition} />
          </motion.div>
          
          {/* Feature Cards - Right Side */}
          <div className="w-full lg:w-[60%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredCardIndex(index)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                  className="group relative"
                >
                  <motion.div
                    className="relative p-5 md:p-6 rounded-2xl h-full cursor-pointer overflow-hidden"
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      y: -4,
                      boxShadow: '0 15px 45px rgba(251, 191, 36, 0.15)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Eye light arrival glow effect */}
                    <CardEyeGlow cardIndex={index} />
                    
                    {/* Card glow on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'radial-gradient(circle at 0% 50%, rgba(251, 191, 36, 0.2) 0%, transparent 60%)',
                      }}
                    />
                    
                    {/* Icon */}
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative"
                      style={{
                        background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.15) 100%)',
                        border: '1px solid rgba(251, 191, 36, 0.3)',
                      }}
                    >
                      <feature.icon className="w-6 h-6 text-amber-300" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2 relative">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed relative">
                      {feature.description}
                    </p>
                    
                    {/* Bottom accent line */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
                      style={{
                        background: 'linear-gradient(90deg, rgba(251, 191, 36, 0.6) 0%, rgba(245, 158, 11, 0.4) 100%)',
                      }}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Statement Banner */}
        <motion.div
          className="mt-12 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div 
            className="relative p-6 md:p-8 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Banner glow */}
            <div 
              className="absolute inset-0 opacity-50"
              style={{
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.08) 100%)',
              }}
            />
            
            <p className="relative text-center text-lg md:text-xl text-gray-200 leading-relaxed">
              <span className="text-white font-semibold">Competition Mode</span> ensures your slides are 
              <span className="text-amber-300"> authentic</span>, 
              <span className="text-purple-300"> original</span>, and 
              <span className="text-orange-300"> indistinguishable from human-crafted presentations</span> — 
              giving you the edge you need to <span className="text-white font-semibold">win</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompetitionModeSection;
