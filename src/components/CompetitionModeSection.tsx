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

// Outstanding Cute Owl Character - Premium Quality
const OwlCharacter = ({ hoveredCardIndex, mousePosition }: { 
  hoveredCardIndex: number | null; 
  mousePosition: { x: number; y: number };
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [expressionState, setExpressionState] = useState<'neutral' | 'happy' | 'curious'>('neutral');
  
  // Natural blinking pattern
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 100);
      // Sometimes double blink
      if (Math.random() > 0.7) {
        setTimeout(() => {
          setIsBlinking(true);
          setTimeout(() => setIsBlinking(false), 80);
        }, 200);
      }
    }, 2800 + Math.random() * 1500);
    
    return () => clearInterval(blinkInterval);
  }, []);
  
  // Expression changes based on interaction
  useEffect(() => {
    if (hoveredCardIndex !== null) {
      setExpressionState('happy');
    } else if (mousePosition.x > 0.5) {
      setExpressionState('curious');
    } else {
      setExpressionState('neutral');
    }
  }, [hoveredCardIndex, mousePosition]);
  
  // Calculate eye tracking
  const getEyeOffset = () => {
    if (mousePosition.x !== 0 || mousePosition.y !== 0) {
      const maxOffsetX = 4;
      const maxOffsetY = 2.5;
      const eyeX = Math.max(-maxOffsetX, Math.min(maxOffsetX, (mousePosition.x - 0.3) * maxOffsetX * 2));
      const eyeY = Math.max(-maxOffsetY, Math.min(maxOffsetY, (mousePosition.y - 0.5) * maxOffsetY * 2));
      return { x: eyeX, y: eyeY };
    }
    
    if (hoveredCardIndex !== null) {
      const row = Math.floor(hoveredCardIndex / 2);
      const col = hoveredCardIndex % 2;
      return { x: 2.5 + col * 1.5, y: -0.5 + row * 1.2 };
    }
    
    return { x: 1.5, y: 0 };
  };
  
  const eyeOffset = getEyeOffset();
  const isLookingRight = mousePosition.x > 0.4 || hoveredCardIndex !== null;
  
  return (
    <motion.div
      className="relative w-full h-full flex items-end justify-center pb-6 md:pb-10"
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Ambient glow behind owl */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          width: '280px',
          height: '280px',
          background: 'radial-gradient(ellipse, rgba(167, 139, 250, 0.15) 0%, rgba(251, 146, 60, 0.08) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Main Owl SVG */}
      <motion.svg
        viewBox="0 0 320 400"
        className="w-[220px] md:w-[280px] lg:w-[340px] h-auto relative z-10"
        animate={{ 
          y: [0, -6, 0],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{
          filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))',
        }}
      >
        <defs>
          {/* Rich dark feather gradient */}
          <linearGradient id="premiumBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d3d5c" />
            <stop offset="25%" stopColor="#2d2d42" />
            <stop offset="50%" stopColor="#1f1f30" />
            <stop offset="75%" stopColor="#18182a" />
            <stop offset="100%" stopColor="#12121f" />
          </linearGradient>
          
          {/* Soft feather highlight */}
          <linearGradient id="featherSheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5a5a80" />
            <stop offset="50%" stopColor="#4a4a6a" />
            <stop offset="100%" stopColor="#3a3a55" />
          </linearGradient>
          
          {/* Beautiful chest/belly gradient */}
          <radialGradient id="chestGradient" cx="50%" cy="25%" r="80%">
            <stop offset="0%" stopColor="#4a4a65" />
            <stop offset="40%" stopColor="#35354a" />
            <stop offset="70%" stopColor="#28283a" />
            <stop offset="100%" stopColor="#1f1f2e" />
          </radialGradient>
          
          {/* Creamy face mask with warmth */}
          <radialGradient id="faceMaskGradient" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#faf8f5" />
            <stop offset="40%" stopColor="#f5f0e8" />
            <stop offset="70%" stopColor="#ebe4d8" />
            <stop offset="100%" stopColor="#ddd5c8" />
          </radialGradient>
          
          {/* Stunning eye iris - deep amber with gold */}
          <radialGradient id="irisGradient" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fff7e6" />
            <stop offset="20%" stopColor="#fcd34d" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="75%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </radialGradient>
          
          {/* Eye depth ring */}
          <radialGradient id="eyeRingGradient" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#1a1a25" />
            <stop offset="85%" stopColor="#0f0f18" />
            <stop offset="100%" stopColor="#050508" />
          </radialGradient>
          
          {/* Wing gradient */}
          <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a2a40" />
            <stop offset="40%" stopColor="#1f1f32" />
            <stop offset="100%" stopColor="#141422" />
          </linearGradient>
          
          {/* Beak gradient */}
          <linearGradient id="beakGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a4a5a" />
            <stop offset="50%" stopColor="#3a3a48" />
            <stop offset="100%" stopColor="#2a2a38" />
          </linearGradient>
          
          {/* Feet gradient */}
          <linearGradient id="feetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5a5a6a" />
            <stop offset="100%" stopColor="#3a3a48" />
          </linearGradient>
          
          {/* Feather texture pattern */}
          <pattern id="featherPattern" patternUnits="userSpaceOnUse" width="20" height="15">
            <path d="M0 12 Q5 8 10 12 Q15 8 20 12" stroke="#4a4a6a" strokeWidth="0.5" fill="none" opacity="0.3"/>
          </pattern>
          
          {/* Soft glow filter */}
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Eye sparkle filter */}
          <filter id="sparkleGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Ground shadow */}
        <ellipse cx="160" cy="385" rx="55" ry="10" fill="rgba(0,0,0,0.35)">
          <animate attributeName="rx" values="55;58;55" dur="4s" repeatCount="indefinite"/>
        </ellipse>
        
        {/* === FEET === */}
        <motion.g
          animate={{ y: [0, 2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Left foot */}
          <g>
            <ellipse cx="125" cy="372" rx="18" ry="6" fill="url(#feetGradient)" />
            <ellipse cx="110" cy="375" rx="7" ry="4" fill="url(#feetGradient)" />
            <ellipse cx="125" cy="377" rx="7" ry="4" fill="url(#feetGradient)" />
            <ellipse cx="140" cy="375" rx="7" ry="4" fill="url(#feetGradient)" />
            {/* Toe highlights */}
            <ellipse cx="110" cy="374" rx="3" ry="1.5" fill="#7a7a8a" opacity="0.4" />
            <ellipse cx="125" cy="376" rx="3" ry="1.5" fill="#7a7a8a" opacity="0.4" />
            <ellipse cx="140" cy="374" rx="3" ry="1.5" fill="#7a7a8a" opacity="0.4" />
          </g>
          {/* Right foot */}
          <g>
            <ellipse cx="195" cy="372" rx="18" ry="6" fill="url(#feetGradient)" />
            <ellipse cx="180" cy="375" rx="7" ry="4" fill="url(#feetGradient)" />
            <ellipse cx="195" cy="377" rx="7" ry="4" fill="url(#feetGradient)" />
            <ellipse cx="210" cy="375" rx="7" ry="4" fill="url(#feetGradient)" />
            {/* Toe highlights */}
            <ellipse cx="180" cy="374" rx="3" ry="1.5" fill="#7a7a8a" opacity="0.4" />
            <ellipse cx="195" cy="376" rx="3" ry="1.5" fill="#7a7a8a" opacity="0.4" />
            <ellipse cx="210" cy="374" rx="3" ry="1.5" fill="#7a7a8a" opacity="0.4" />
          </g>
        </motion.g>
        
        {/* === BODY === */}
        <motion.g
          animate={{ scaleY: [1, 1.012, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: '160px 290px' }}
        >
          {/* Main body shape */}
          <ellipse cx="160" cy="285" rx="85" ry="100" fill="url(#premiumBodyGradient)" />
          
          {/* Body feather texture overlay */}
          <ellipse cx="160" cy="285" rx="82" ry="97" fill="url(#featherPattern)" opacity="0.5" />
          
          {/* Chest/belly area */}
          <ellipse cx="160" cy="300" rx="52" ry="60" fill="url(#chestGradient)" />
          
          {/* Detailed feather chevrons on chest */}
          <g opacity="0.35">
            {[...Array(5)].map((_, row) => (
              <g key={`feather-row-${row}`}>
                {[...Array(row % 2 === 0 ? 4 : 3)].map((_, col) => (
                  <path
                    key={`chevron-${row}-${col}`}
                    d={`M${118 + col * 22 + (row % 2 === 0 ? 0 : 11)} ${268 + row * 14} l10 8 l10 -8`}
                    stroke="#6a6a8a"
                    strokeWidth="1.3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}
              </g>
            ))}
          </g>
          
          {/* Subtle body shine */}
          <ellipse cx="130" cy="265" rx="18" ry="35" fill="url(#featherSheen)" opacity="0.12" />
          <ellipse cx="190" cy="265" rx="18" ry="35" fill="url(#featherSheen)" opacity="0.12" />
        </motion.g>
        
        {/* === LEFT WING === */}
        <motion.g
          animate={isLookingRight ? { rotate: [0, 3, 1, 3, 0] } : { rotate: [0, -2, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: '90px 230px' }}
        >
          <path
            d="M78 195 Q48 240 55 295 Q62 320 78 330 Q90 324 96 305 Q102 265 105 225 Q104 200 90 190 Z"
            fill="url(#wingGradient)"
          />
          {/* Wing feather details */}
          <path d="M65 245 Q74 268 78 300" stroke="#3a3a50" strokeWidth="1.3" fill="none" opacity="0.5" />
          <path d="M74 235 Q82 258 86 285" stroke="#3a3a50" strokeWidth="1.3" fill="none" opacity="0.5" />
          <path d="M82 228 Q88 248 92 270" stroke="#3a3a50" strokeWidth="1.3" fill="none" opacity="0.5" />
          {/* Wing highlight */}
          <path d="M75 210 Q65 250 70 290" stroke="#5a5a75" strokeWidth="2" fill="none" opacity="0.2" />
        </motion.g>
        
        {/* === RIGHT WING === */}
        <motion.g
          animate={isLookingRight ? { rotate: [0, -5, -2, -5, 0] } : { rotate: [0, 2, 0] }}
          transition={{ duration: isLookingRight ? 2.2 : 2.7, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
          style={{ transformOrigin: '230px 230px' }}
        >
          <path
            d="M242 195 Q272 240 265 295 Q258 320 242 330 Q230 324 224 305 Q218 265 215 225 Q216 200 230 190 Z"
            fill="url(#wingGradient)"
          />
          {/* Wing feather details */}
          <path d="M255 245 Q246 268 242 300" stroke="#3a3a50" strokeWidth="1.3" fill="none" opacity="0.5" />
          <path d="M246 235 Q238 258 234 285" stroke="#3a3a50" strokeWidth="1.3" fill="none" opacity="0.5" />
          <path d="M238 228 Q232 248 228 270" stroke="#3a3a50" strokeWidth="1.3" fill="none" opacity="0.5" />
          {/* Wing highlight */}
          <path d="M245 210 Q255 250 250 290" stroke="#5a5a75" strokeWidth="2" fill="none" opacity="0.2" />
        </motion.g>
        
        {/* === HEAD === */}
        <motion.g
          animate={isLookingRight 
            ? { rotate: [0, 6, 4, 6, 0], x: [0, 3, 1, 3, 0] } 
            : { rotate: [0, -2, 0, -2, 0] }
          }
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: '160px 140px' }}
        >
          {/* Head base */}
          <ellipse cx="160" cy="138" rx="78" ry="75" fill="url(#premiumBodyGradient)" />
          
          {/* Head feather texture */}
          <ellipse cx="160" cy="138" rx="75" ry="72" fill="url(#featherPattern)" opacity="0.4" />
          
          {/* === EAR TUFTS === */}
          {/* Left ear tuft */}
          <motion.g
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: '95px 65px' }}
          >
            <path
              d="M90 80 Q78 50 92 32 Q102 42 103 62 Q100 78 95 88"
              fill="#1f1f30"
            />
            <path d="M94 72 Q88 52 96 40" stroke="#2a2a40" strokeWidth="2.5" fill="none" />
            <path d="M92 65 Q90 55 94 48" stroke="#3a3a50" strokeWidth="1.5" fill="none" opacity="0.5" />
          </motion.g>
          
          {/* Right ear tuft */}
          <motion.g
            animate={{ rotate: [3, -3, 3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
            style={{ transformOrigin: '225px 65px' }}
          >
            <path
              d="M230 80 Q242 50 228 32 Q218 42 217 62 Q220 78 225 88"
              fill="#1f1f30"
            />
            <path d="M226 72 Q232 52 224 40" stroke="#2a2a40" strokeWidth="2.5" fill="none" />
            <path d="M228 65 Q230 55 226 48" stroke="#3a3a50" strokeWidth="1.5" fill="none" opacity="0.5" />
          </motion.g>
          
          {/* === FACE MASK (Heart Shape) === */}
          <path
            d="M160 195 Q98 178 92 128 Q92 88 125 80 Q148 74 160 98 Q172 74 195 80 Q228 88 228 128 Q222 178 160 195"
            fill="url(#faceMaskGradient)"
          />
          
          {/* Face mask rim detail */}
          <path
            d="M160 188 Q105 172 100 128 Q100 95 128 88 Q148 83 160 102 Q172 83 192 88 Q220 95 220 128 Q215 172 160 188"
            fill="none"
            stroke="#c9bfb0"
            strokeWidth="2.5"
            opacity="0.4"
          />
          
          {/* Face mask inner texture - soft speckles */}
          <g opacity="0.15">
            {[...Array(12)].map((_, i) => (
              <circle
                key={`speckle-${i}`}
                cx={130 + Math.cos(i * 0.8) * 25 + Math.random() * 10}
                cy={130 + Math.sin(i * 0.6) * 20 + Math.random() * 10}
                r={1 + Math.random() * 1.5}
                fill="#a09080"
              />
            ))}
          </g>
          
          {/* === EYES === */}
          <motion.g
            animate={{ x: eyeOffset.x, y: eyeOffset.y }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          >
            {/* Left Eye */}
            <motion.g
              animate={isBlinking ? { scaleY: 0.05 } : { scaleY: 1 }}
              transition={{ duration: 0.06 }}
              style={{ transformOrigin: '128px 122px' }}
            >
              {/* Eye socket shadow */}
              <ellipse cx="128" cy="124" rx="30" ry="32" fill="#0a0a12" opacity="0.3" />
              
              {/* Eye outer ring */}
              <ellipse cx="128" cy="122" rx="28" ry="30" fill="url(#eyeRingGradient)" />
              
              {/* Iris */}
              <ellipse cx="128" cy="122" rx="24" ry="26" fill="url(#irisGradient)" />
              
              {/* Iris detail ring */}
              <ellipse cx="128" cy="122" rx="24" ry="26" fill="none" stroke="#b45309" strokeWidth="1" opacity="0.3" />
              
              {/* Pupil */}
              <motion.ellipse
                cx="129"
                cy="123"
                rx={expressionState === 'happy' ? 8 : 11}
                ry={expressionState === 'happy' ? 9 : 13}
                fill="#050508"
                animate={{ 
                  rx: expressionState === 'happy' ? [8, 7, 8] : [11, 9, 11],
                  ry: expressionState === 'happy' ? [9, 8, 9] : [13, 11, 13]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Primary sparkle - large */}
              <motion.circle
                cx="118"
                cy="112"
                r="7"
                fill="white"
                filter="url(#sparkleGlow)"
                animate={{ opacity: [0.95, 1, 0.95], scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Secondary sparkle */}
              <circle cx="135" cy="128" r="3.5" fill="rgba(255,255,255,0.8)" />
              
              {/* Tertiary sparkle */}
              <circle cx="122" cy="130" r="2" fill="rgba(255,255,255,0.6)" />
              
              {/* Subtle iris glow */}
              <ellipse cx="128" cy="122" rx="26" ry="28" fill="none" stroke="rgba(251, 191, 36, 0.2)" strokeWidth="3" filter="url(#softGlow)" />
            </motion.g>
            
            {/* Right Eye */}
            <motion.g
              animate={isBlinking ? { scaleY: 0.05 } : { scaleY: 1 }}
              transition={{ duration: 0.06 }}
              style={{ transformOrigin: '192px 122px' }}
            >
              {/* Eye socket shadow */}
              <ellipse cx="192" cy="124" rx="30" ry="32" fill="#0a0a12" opacity="0.3" />
              
              {/* Eye outer ring */}
              <ellipse cx="192" cy="122" rx="28" ry="30" fill="url(#eyeRingGradient)" />
              
              {/* Iris */}
              <ellipse cx="192" cy="122" rx="24" ry="26" fill="url(#irisGradient)" />
              
              {/* Iris detail ring */}
              <ellipse cx="192" cy="122" rx="24" ry="26" fill="none" stroke="#b45309" strokeWidth="1" opacity="0.3" />
              
              {/* Pupil */}
              <motion.ellipse
                cx="193"
                cy="123"
                rx={expressionState === 'happy' ? 8 : 11}
                ry={expressionState === 'happy' ? 9 : 13}
                fill="#050508"
                animate={{ 
                  rx: expressionState === 'happy' ? [8, 7, 8] : [11, 9, 11],
                  ry: expressionState === 'happy' ? [9, 8, 9] : [13, 11, 13]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              />
              
              {/* Primary sparkle - large */}
              <motion.circle
                cx="182"
                cy="112"
                r="7"
                fill="white"
                filter="url(#sparkleGlow)"
                animate={{ opacity: [0.95, 1, 0.95], scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
              
              {/* Secondary sparkle */}
              <circle cx="199" cy="128" r="3.5" fill="rgba(255,255,255,0.8)" />
              
              {/* Tertiary sparkle */}
              <circle cx="186" cy="130" r="2" fill="rgba(255,255,255,0.6)" />
              
              {/* Subtle iris glow */}
              <ellipse cx="192" cy="122" rx="26" ry="28" fill="none" stroke="rgba(251, 191, 36, 0.2)" strokeWidth="3" filter="url(#softGlow)" />
            </motion.g>
          </motion.g>
          
          {/* === BEAK === */}
          <motion.g
            animate={{ scaleY: [1, 0.97, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: '160px 165px' }}
          >
            <path
              d="M160 158 L150 175 Q160 185 170 175 Z"
              fill="url(#beakGradient)"
            />
            {/* Beak highlight */}
            <path d="M160 160 L153 172" stroke="#5a5a6a" strokeWidth="1" opacity="0.5" />
            {/* Beak nostril hints */}
            <ellipse cx="156" cy="165" rx="1.5" ry="1" fill="#2a2a38" />
            <ellipse cx="164" cy="165" rx="1.5" ry="1" fill="#2a2a38" />
          </motion.g>
          
          {/* === CHEEK BLUSH === */}
          <motion.ellipse
            cx="105"
            cy="148"
            rx="12"
            ry="7"
            fill="#f472b6"
            opacity={expressionState === 'happy' ? 0.25 : 0.12}
            animate={{ opacity: expressionState === 'happy' ? [0.2, 0.3, 0.2] : [0.1, 0.15, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.ellipse
            cx="215"
            cy="148"
            rx="12"
            ry="7"
            fill="#f472b6"
            opacity={expressionState === 'happy' ? 0.25 : 0.12}
            animate={{ opacity: expressionState === 'happy' ? [0.2, 0.3, 0.2] : [0.1, 0.15, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          />
          
          {/* Eyebrow feather tufts (subtle) */}
          <path d="M100 98 Q110 92 125 95" stroke="#2a2a40" strokeWidth="2" fill="none" opacity="0.4" />
          <path d="M220 98 Q210 92 195 95" stroke="#2a2a40" strokeWidth="2" fill="none" opacity="0.4" />
        </motion.g>
      </motion.svg>
      
      {/* Floating sparkles around owl */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: '6px',
            height: '6px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(251, 191, 36, 0.5) 50%, transparent 100%)',
            left: `${35 + i * 10}%`,
            bottom: `${25 + (i % 2) * 15}%`,
          }}
          animate={{
            y: [-10, -25, -10],
            x: [0, (i % 2 === 0 ? 8 : -8), 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Soft ground reflection */}
      <motion.div 
        className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          width: '140px',
          height: '20px',
          background: 'radial-gradient(ellipse, rgba(167, 139, 250, 0.2) 0%, rgba(251, 146, 60, 0.1) 50%, transparent 80%)',
          filter: 'blur(8px)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scaleX: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
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
