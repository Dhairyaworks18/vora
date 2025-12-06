import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
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

// Animated AI TV Character Component
// Floating torch particles that drift toward cards
const TorchParticles = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="absolute pointer-events-none" style={{ right: '-5%', top: '15%', width: '60%', height: '50%' }}>
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: '0%',
            top: '30%',
            width: `${3 + Math.random() * 5}px`,
            height: `${3 + Math.random() * 5}px`,
            background: i % 3 === 0 
              ? 'radial-gradient(circle, #fbbf24 0%, #f97316 50%, transparent 100%)'
              : i % 3 === 1
              ? 'radial-gradient(circle, #fff7ed 0%, #fbbf24 50%, transparent 100%)'
              : 'radial-gradient(circle, #f97316 0%, #ea580c 50%, transparent 100%)',
            boxShadow: '0 0 6px rgba(251, 191, 36, 0.8)',
          }}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
          animate={isActive ? {
            opacity: [0, 1, 1, 0.8, 0],
            x: [0, 80 + i * 25, 180 + i * 30, 280 + i * 20],
            y: [0, -30 + Math.sin(i) * 40, -60 + Math.cos(i) * 50, -40 + Math.sin(i * 2) * 30],
            scale: [0.5, 1.2, 1, 0.6, 0],
          } : {
            opacity: [0, 0.8, 0.6, 0],
            x: [0, 60 + i * 15, 120 + i * 20],
            y: [0, -20 + Math.sin(i) * 25, -30 + Math.cos(i) * 20],
            scale: [0.3, 0.8, 0.5, 0],
          }}
          transition={{
            duration: isActive ? 3 + Math.random() * 1.5 : 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.25,
            ease: "easeOut",
          }}
        />
      ))}
      {/* Sparkle particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: '5%',
            top: '25%',
            width: '2px',
            height: '2px',
            background: '#fff',
            borderRadius: '50%',
            boxShadow: '0 0 4px #fbbf24, 0 0 8px #fff',
          }}
          animate={{
            opacity: [0, 1, 0],
            x: [0, 100 + i * 30, 200 + i * 25],
            y: [0, -40 + i * 8, -20 + i * 5],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2.5 + Math.random(),
            repeat: Infinity,
            delay: i * 0.4 + 0.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

const AITVCharacter = ({ hoveredCardIndex, mousePosition }: { hoveredCardIndex: number | null; mousePosition: { x: number; y: number } }) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isPresenting, setIsPresenting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);
    
    return () => clearInterval(blinkInterval);
  }, []);
  
  // Presenting gesture animation
  useEffect(() => {
    const presentInterval = setInterval(() => {
      setIsPresenting(true);
      setTimeout(() => setIsPresenting(false), 2000);
    }, 5000);
    
    return () => clearInterval(presentInterval);
  }, []);
  
  // Calculate eye position based on cursor position
  const getEyeOffset = () => {
    // If cursor is being tracked, follow cursor
    if (mousePosition.x !== 0 || mousePosition.y !== 0) {
      // Normalize mouse position to eye movement range (-8 to 8 for x, -6 to 6 for y)
      const maxOffsetX = 8;
      const maxOffsetY = 6;
      
      // Center is around (150, 140) in SVG coordinates, map mouse to this
      const eyeX = Math.max(-maxOffsetX, Math.min(maxOffsetX, (mousePosition.x - 0.3) * maxOffsetX * 2));
      const eyeY = Math.max(-maxOffsetY, Math.min(maxOffsetY, (mousePosition.y - 0.5) * maxOffsetY * 2));
      
      return { x: eyeX, y: eyeY };
    }
    
    // If hovering on a card, look at that card
    if (hoveredCardIndex !== null) {
      const row = Math.floor(hoveredCardIndex / 2);
      const col = hoveredCardIndex % 2;
      return { 
        x: 5 + col * 2, 
        y: -2 + row * 3 
      };
    }
    
    return { x: 2, y: 0 }; // Default: looking slightly toward cards
  };
  
  const eyeOffset = getEyeOffset();
  const isLookingAtCards = mousePosition.x > 0.5 || hoveredCardIndex !== null;
  
  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-full flex items-end justify-center pb-8 md:pb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Floating torch particles drifting toward cards */}
      <TorchParticles isActive={hoveredCardIndex !== null} />
      
      {/* AI TV Character SVG */}
      <motion.svg
        viewBox="0 0 300 400"
        className="w-[200px] md:w-[260px] lg:w-[300px] h-auto"
        animate={{ 
          y: [0, -4, 0],
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{
          filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))',
        }}
      >
        <defs>
          {/* Screen gradient */}
          <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="50%" stopColor="#0f0f1a" />
            <stop offset="100%" stopColor="#1a1a2e" />
          </linearGradient>
          
          {/* Screen glow */}
          <radialGradient id="screenGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(147, 197, 253, 0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          
          {/* Body gradient */}
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2d2d4a" />
            <stop offset="50%" stopColor="#1a1a2e" />
            <stop offset="100%" stopColor="#0f0f1a" />
          </linearGradient>
          
          {/* Arm gradient */}
          <linearGradient id="armGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3d3d5c" />
            <stop offset="100%" stopColor="#2d2d4a" />
          </linearGradient>
          
          {/* Foot gradient */}
          <linearGradient id="footGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a4a6a" />
            <stop offset="100%" stopColor="#2d2d4a" />
          </linearGradient>
          
          {/* Torch gradient */}
          <linearGradient id="torchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5a4a3a" />
            <stop offset="50%" stopColor="#4a3a2a" />
            <stop offset="100%" stopColor="#3a2a1a" />
          </linearGradient>
          
          {/* Torch flame gradient */}
          <radialGradient id="flameGradient" cx="50%" cy="70%" r="80%">
            <stop offset="0%" stopColor="#fff7ed" />
            <stop offset="30%" stopColor="#fbbf24" />
            <stop offset="60%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </radialGradient>
          
          {/* Torch glow */}
          <radialGradient id="torchGlow" cx="50%" cy="50%" r="100%">
            <stop offset="0%" stopColor="rgba(251, 191, 36, 0.8)" />
            <stop offset="50%" stopColor="rgba(251, 146, 60, 0.4)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          
          {/* Eye glow filter */}
          <filter id="eyeGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Outer glow filter */}
          <filter id="outerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Flame glow filter */}
          <filter id="flameGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Screen reflection */}
          <linearGradient id="screenReflection" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
        </defs>
        
        {/* Shadow under character */}
        <ellipse cx="150" cy="390" rx="60" ry="8" fill="rgba(0,0,0,0.4)" />
        
        {/* LEFT FOOT */}
        <motion.g
          animate={{ 
            rotate: [-1, 1, -1],
            y: [0, -1, 0]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.3
          }}
          style={{ transformOrigin: '105px 370px' }}
        >
          <ellipse cx="105" cy="375" rx="22" ry="12" fill="url(#footGradient)" />
          <ellipse cx="105" cy="372" rx="18" ry="8" fill="#5a5a7a" />
          <ellipse cx="100" cy="370" rx="8" ry="4" fill="rgba(255,255,255,0.1)" />
        </motion.g>
        
        {/* RIGHT FOOT */}
        <motion.g
          animate={{ 
            rotate: [1, -1, 1],
            y: [0, -1, 0]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
          style={{ transformOrigin: '195px 370px' }}
        >
          <ellipse cx="195" cy="375" rx="22" ry="12" fill="url(#footGradient)" />
          <ellipse cx="195" cy="372" rx="18" ry="8" fill="#5a5a7a" />
          <ellipse cx="190" cy="370" rx="8" ry="4" fill="rgba(255,255,255,0.1)" />
        </motion.g>
        
        {/* LEGS connecting to body */}
        <rect x="95" y="340" width="24" height="40" rx="8" fill="url(#bodyGradient)" />
        <rect x="181" y="340" width="24" height="40" rx="8" fill="url(#bodyGradient)" />
        
        {/* BODY - Rounded torso */}
        <motion.g
          animate={{ 
            scaleY: [1, 1.02, 1],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          style={{ transformOrigin: '150px 320px' }}
        >
          <rect x="85" y="260" width="130" height="100" rx="25" fill="url(#bodyGradient)" />
          <rect x="90" y="265" width="60" height="90" rx="20" fill="rgba(255,255,255,0.03)" />
          <rect x="85" y="260" width="130" height="100" rx="25" fill="none" stroke="rgba(147, 197, 253, 0.15)" strokeWidth="1" />
        </motion.g>
        
        {/* LEFT ARM */}
        <motion.g
          animate={isPresenting ? { 
            rotate: [0, -25, -25, 0],
          } : { 
            rotate: [0, -3, 0]
          }}
          transition={isPresenting ? { 
            duration: 2,
            times: [0, 0.3, 0.7, 1],
            ease: "easeInOut"
          } : { 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          style={{ transformOrigin: '85px 280px' }}
        >
          {/* Upper arm */}
          <rect x="45" y="270" width="50" height="20" rx="10" fill="url(#armGradient)" />
          {/* Forearm */}
          <rect x="30" y="280" width="35" height="18" rx="9" fill="url(#armGradient)" />
          {/* Hand */}
          <circle cx="25" cy="290" r="14" fill="#4a4a6a" />
          <circle cx="25" cy="288" r="10" fill="#5a5a7a" />
          {/* Fingers */}
          <ellipse cx="18" cy="298" rx="4" ry="6" fill="#5a5a7a" />
          <ellipse cx="25" cy="302" rx="4" ry="6" fill="#5a5a7a" />
          <ellipse cx="32" cy="298" rx="4" ry="6" fill="#5a5a7a" />
          <circle cx="22" cy="285" r="4" fill="rgba(255,255,255,0.1)" />
        </motion.g>
        
        {/* RIGHT ARM - Holding Torch */}
        <motion.g
          animate={isPresenting || isLookingAtCards ? { 
            rotate: [20, 30, 20],
          } : { 
            rotate: [20, 23, 20]
          }}
          transition={{ 
            duration: isPresenting ? 2 : 3.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.5
          }}
          style={{ transformOrigin: '215px 280px' }}
        >
          {/* Upper arm */}
          <rect x="205" y="270" width="50" height="20" rx="10" fill="url(#armGradient)" />
          {/* Forearm */}
          <rect x="240" y="255" width="35" height="18" rx="9" fill="url(#armGradient)" />
          {/* Hand */}
          <circle cx="280" cy="248" r="14" fill="#4a4a6a" />
          <circle cx="280" cy="246" r="10" fill="#5a5a7a" />
          
          {/* TORCH */}
          <g>
            {/* Torch handle */}
            <rect x="290" y="220" width="12" height="45" rx="4" fill="url(#torchGradient)" />
            <rect x="288" y="215" width="16" height="8" rx="3" fill="#6a5a4a" />
            
            {/* Large outer glow */}
            <motion.ellipse
              cx="296"
              cy="180"
              rx="50"
              ry="60"
              fill="url(#torchGlow)"
              opacity="0.5"
              animate={{
                rx: [45, 55, 45],
                ry: [55, 65, 55],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Torch flame glow */}
            <motion.ellipse
              cx="296"
              cy="185"
              rx="30"
              ry="40"
              fill="url(#torchGlow)"
              filter="url(#flameGlow)"
              animate={{
                rx: [28, 35, 28],
                ry: [35, 45, 35],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Torch flame */}
            <motion.g
              animate={{
                scaleY: [1, 1.2, 1],
                scaleX: [1, 0.85, 1],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: '296px 215px' }}
            >
              {/* Outer flame */}
              <motion.path
                d="M296 215 Q280 185 287 160 Q296 140 296 140 Q296 140 305 160 Q312 185 296 215 Z"
                fill="url(#flameGradient)"
                animate={{
                  d: [
                    "M296 215 Q280 185 287 160 Q296 140 296 140 Q296 140 305 160 Q312 185 296 215 Z",
                    "M296 215 Q278 180 285 150 Q296 130 296 130 Q296 130 307 150 Q314 180 296 215 Z",
                    "M296 215 Q280 185 287 160 Q296 140 296 140 Q296 140 305 160 Q312 185 296 215 Z",
                  ]
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Middle flame layer */}
              <motion.path
                d="M296 210 Q285 188 290 168 Q296 155 296 155 Q296 155 302 168 Q307 188 296 210 Z"
                fill="#fbbf24"
                animate={{
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Inner flame - bright core */}
              <motion.ellipse
                cx="296"
                cy="185"
                rx="8"
                ry="18"
                fill="#fff7ed"
                animate={{
                  ry: [16, 22, 16],
                  opacity: [0.95, 1, 0.95],
                }}
                transition={{
                  duration: 0.25,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Bright white center */}
              <motion.ellipse
                cx="296"
                cy="190"
                rx="4"
                ry="10"
                fill="#ffffff"
                animate={{
                  ry: [8, 12, 8],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.g>
            
            {/* Flame tip sparks */}
            <motion.circle
              cx="296"
              cy="145"
              r="3"
              fill="#fff7ed"
              animate={{
                y: [-5, -15, -5],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </g>
          
          {/* Grip fingers around torch */}
          <ellipse cx="285" cy="235" rx="4" ry="6" fill="#5a5a7a" />
          <ellipse cx="275" cy="238" rx="4" ry="5" fill="#5a5a7a" />
        </motion.g>
        
        {/* NECK */}
        <rect x="135" y="235" width="30" height="35" rx="8" fill="url(#bodyGradient)" />
        
        {/* TV HEAD */}
        <motion.g
          animate={isLookingAtCards ? { 
            rotate: [0, 3, 0],
          } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ transformOrigin: '150px 150px' }}
        >
          {/* Outer glow */}
          <motion.rect 
            x="60" 
            y="50" 
            width="180" 
            height="190" 
            rx="25" 
            fill="none"
            stroke="rgba(147, 197, 253, 0.3)"
            strokeWidth="3"
            filter="url(#outerGlow)"
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              strokeWidth: [2, 4, 2]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          
          {/* TV Frame */}
          <rect x="65" y="55" width="170" height="180" rx="22" fill="#1a1a2e" />
          <rect x="68" y="58" width="164" height="174" rx="20" fill="url(#screenGradient)" />
          
          {/* Screen inner glow */}
          <rect x="75" y="65" width="150" height="160" rx="16" fill="url(#screenGlow)" />
          
          {/* Screen reflection */}
          <path 
            d="M85 70 Q150 65 225 85 L225 100 Q150 80 85 95 Z" 
            fill="url(#screenReflection)"
          />
          
          {/* EYES - Follow cursor */}
          <motion.g
            animate={{ 
              x: eyeOffset.x,
              y: eyeOffset.y
            }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {/* Left Eye */}
            <motion.g
              animate={isBlinking ? { scaleY: 0.1 } : { scaleY: 1 }}
              transition={{ duration: 0.1 }}
              style={{ transformOrigin: '115px 140px' }}
            >
              <motion.ellipse 
                cx="115" 
                cy="140" 
                rx="22" 
                ry="28"
                fill="white"
                filter="url(#eyeGlow)"
                animate={isLookingAtCards ? {
                  fill: ["#ffffff", "#fffbeb", "#ffffff"]
                } : {}}
                transition={{ duration: 0.5 }}
              />
              {/* Pupil - moves with eye */}
              <motion.ellipse 
                cx="118" 
                cy="142" 
                rx="8" 
                ry="10" 
                fill="#1a1a2e"
              />
              {/* Eye sparkle */}
              <circle cx="110" cy="135" r="4" fill="rgba(255,255,255,0.8)" />
              <circle cx="122" cy="145" r="2" fill="rgba(255,255,255,0.5)" />
            </motion.g>
            
            {/* Right Eye */}
            <motion.g
              animate={isBlinking ? { scaleY: 0.1 } : { scaleY: 1 }}
              transition={{ duration: 0.1 }}
              style={{ transformOrigin: '185px 140px' }}
            >
              <motion.ellipse 
                cx="185" 
                cy="140" 
                rx="22" 
                ry="28"
                fill="white"
                filter="url(#eyeGlow)"
                animate={isLookingAtCards ? {
                  fill: ["#ffffff", "#fffbeb", "#ffffff"]
                } : {}}
                transition={{ duration: 0.5 }}
              />
              {/* Pupil - moves with eye */}
              <motion.ellipse 
                cx="188" 
                cy="142" 
                rx="8" 
                ry="10" 
                fill="#1a1a2e"
              />
              {/* Eye sparkle */}
              <circle cx="180" cy="135" r="4" fill="rgba(255,255,255,0.8)" />
              <circle cx="192" cy="145" r="2" fill="rgba(255,255,255,0.5)" />
            </motion.g>
          </motion.g>
          
          {/* Antenna - Glows brighter when hovering cards */}
          <motion.g
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: '150px 50px' }}
          >
            <rect x="145" y="25" width="10" height="30" rx="5" fill="#3d3d5c" />
            <circle cx="150" cy="18" r="10" fill="#4a4a6a" />
            {/* Outer glow ring when processing */}
            <motion.circle
              cx="150"
              cy="18"
              r="14"
              fill="none"
              stroke="#93c5fd"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={hoveredCardIndex !== null ? {
                opacity: [0, 0.8, 0],
                scale: [0.8, 1.5, 2],
              } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 1, repeat: hoveredCardIndex !== null ? Infinity : 0, ease: "easeOut" }}
            />
            {/* Secondary pulse ring */}
            <motion.circle
              cx="150"
              cy="18"
              r="12"
              fill="none"
              stroke="rgba(251, 191, 36, 0.6)"
              strokeWidth="1.5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={hoveredCardIndex !== null ? {
                opacity: [0, 0.6, 0],
                scale: [0.9, 1.3, 1.8],
              } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 1.2, repeat: hoveredCardIndex !== null ? Infinity : 0, delay: 0.2, ease: "easeOut" }}
            />
            {/* Main antenna light */}
            <motion.circle 
              cx="150" 
              cy="18" 
              r="6" 
              fill={hoveredCardIndex !== null ? "#fbbf24" : "#93c5fd"}
              animate={hoveredCardIndex !== null ? { 
                opacity: [0.8, 1, 0.8],
                r: [6, 9, 6],
                fill: ["#93c5fd", "#fbbf24", "#f97316", "#fbbf24", "#93c5fd"]
              } : { 
                opacity: [0.6, 1, 0.6],
                r: [5, 7, 5]
              }}
              transition={{ 
                duration: hoveredCardIndex !== null ? 0.8 : 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Intense glow when active */}
            <motion.circle
              cx="150"
              cy="18"
              r="8"
              fill="url(#torchGlow)"
              initial={{ opacity: 0 }}
              animate={hoveredCardIndex !== null ? {
                opacity: [0.3, 0.7, 0.3],
                r: [8, 12, 8],
              } : { opacity: 0 }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.g>
          
          {/* Frame edge highlights */}
          <rect x="65" y="55" width="170" height="180" rx="22" fill="none" stroke="rgba(147, 197, 253, 0.2)" strokeWidth="1" />
          <path d="M75 70 Q150 60 235 70" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
        </motion.g>
      </motion.svg>
      
      {/* Ground glow effect */}
      <div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[180px] h-[40px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(147, 197, 253, 0.3) 0%, transparent 70%)',
          filter: 'blur(15px)',
        }}
      />
      
      {/* Torch light reflection on ground */}
      <motion.div 
        className="absolute bottom-2 rounded-full pointer-events-none"
        style={{
          right: '10%',
          width: '150px',
          height: '30px',
          background: 'radial-gradient(ellipse, rgba(251, 191, 36, 0.4) 0%, transparent 70%)',
          filter: 'blur(10px)',
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Ambient character glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[350px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(147, 197, 253, 0.1) 0%, rgba(167, 139, 250, 0.05) 50%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
    </motion.div>
  );
};

// Animated spotlight beams
const SpotlightBeams = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
    <motion.div
      animate={{ opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-0 h-full"
      style={{
        left: '5%',
        width: '120px',
        background: `linear-gradient(180deg, rgba(147, 197, 253, 0.5) 0%, rgba(147, 197, 253, 0.1) 40%, transparent 70%)`,
        clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
        filter: 'blur(15px)',
      }}
    />
    <motion.div
      animate={{ opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute top-0 h-full"
      style={{
        left: '15%',
        width: '80px',
        background: `linear-gradient(180deg, rgba(167, 139, 250, 0.4) 0%, transparent 50%)`,
        clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)',
        filter: 'blur(12px)',
      }}
    />
  </div>
);

// Light streaks in background
const LightStreaks = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-[2px] bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"
        style={{
          top: `${15 + i * 18}%`,
          left: '-10%',
          width: '120%',
          transform: `rotate(${-2 + i * 0.5}deg)`,
        }}
        animate={{
          opacity: [0, 0.5, 0],
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 8 + i * 2,
          repeat: Infinity,
          delay: i * 1.5,
          ease: "linear",
        }}
      />
    ))}
  </div>
);

const CompetitionModeSection = () => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  
  // Track mouse position within the section
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
            radial-gradient(ellipse at 20% 80%, rgba(147, 197, 253, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(251, 146, 60, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(167, 139, 250, 0.08) 0%, transparent 60%)
          `,
        }}
      />
      
      <SpotlightBeams />
      <LightStreaks />
      
      {/* Cinematic vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.4) 100%)',
        }}
      />
      
      {/* Torch light beams - positioned BEFORE content so they appear behind cards but visible */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: '20%',
          top: '30%',
          width: '1000px',
          height: '800px',
          background: `conic-gradient(from -30deg at 0% 50%, 
            transparent 0deg, 
            rgba(251, 191, 36, 0.08) 8deg, 
            rgba(251, 191, 36, 0.25) 20deg, 
            rgba(251, 146, 60, 0.35) 32deg,
            rgba(251, 191, 36, 0.25) 44deg,
            rgba(251, 191, 36, 0.08) 56deg,
            transparent 65deg
          )`,
          filter: 'blur(30px)',
          transformOrigin: '0% 50%',
          zIndex: 5,
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
          rotate: [-4, 4, -4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Secondary intense light beam */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: '25%',
          top: '35%',
          width: '700px',
          height: '600px',
          background: `conic-gradient(from -25deg at 0% 50%, 
            transparent 0deg, 
            rgba(255, 247, 237, 0.15) 12deg, 
            rgba(251, 191, 36, 0.45) 28deg, 
            rgba(255, 247, 237, 0.15) 44deg,
            transparent 58deg
          )`,
          filter: 'blur(20px)',
          transformOrigin: '0% 50%',
          zIndex: 5,
        }}
        animate={{
          opacity: [0.6, 0.95, 0.6],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />
      
      {/* Torch source glow */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          left: '28%',
          top: '38%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255, 247, 237, 1) 0%, rgba(251, 191, 36, 0.8) 30%, rgba(249, 115, 22, 0.4) 60%, transparent 100%)',
          filter: 'blur(15px)',
          zIndex: 5,
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 0.7,
          repeat: Infinity,
          ease: "easeInOut",
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
        
        {/* Main Content - AI TV + Cards */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-12">
          {/* AI TV Character - Left Side */}
          <motion.div 
            className="w-full lg:w-[40%] flex items-center justify-center min-h-[400px] lg:min-h-[500px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <AITVCharacter hoveredCardIndex={hoveredCardIndex} mousePosition={mousePosition} />
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
                      boxShadow: '0 12px 40px rgba(147, 197, 253, 0.15)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Card glow on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'radial-gradient(circle at 50% 0%, rgba(147, 197, 253, 0.15) 0%, transparent 70%)',
                      }}
                    />
                    
                    {/* Icon */}
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative"
                      style={{
                        background: 'linear-gradient(135deg, rgba(147, 197, 253, 0.2) 0%, rgba(167, 139, 250, 0.2) 100%)',
                        border: '1px solid rgba(147, 197, 253, 0.3)',
                      }}
                    >
                      <feature.icon className="w-6 h-6 text-blue-300" />
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
                        background: 'linear-gradient(90deg, rgba(147, 197, 253, 0.5) 0%, rgba(251, 146, 60, 0.5) 100%)',
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
                background: 'linear-gradient(135deg, rgba(147, 197, 253, 0.1) 0%, rgba(251, 146, 60, 0.1) 100%)',
              }}
            />
            
            <p className="relative text-center text-lg md:text-xl text-gray-200 leading-relaxed">
              <span className="text-white font-semibold">Competition Mode</span> ensures your slides are 
              <span className="text-blue-300"> authentic</span>, 
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
