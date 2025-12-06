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

// Animated Owl Character Component - Cute Black Owl
const OwlCharacter = ({ hoveredCardIndex, mousePosition, eyePositions }: { 
  hoveredCardIndex: number | null; 
  mousePosition: { x: number; y: number };
  eyePositions: React.MutableRefObject<{ left: { x: number; y: number }; right: { x: number; y: number } }>;
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const owlRef = useRef<SVGSVGElement>(null);
  
  // Blinking animation - more expressive
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 120);
    }, 2500 + Math.random() * 2000);
    
    return () => clearInterval(blinkInterval);
  }, []);
  
  // Calculate eye position based on cursor or hovered card
  const getEyeOffset = () => {
    if (mousePosition.x !== 0 || mousePosition.y !== 0) {
      const maxOffsetX = 5;
      const maxOffsetY = 3;
      const eyeX = Math.max(-maxOffsetX, Math.min(maxOffsetX, (mousePosition.x - 0.3) * maxOffsetX * 2));
      const eyeY = Math.max(-maxOffsetY, Math.min(maxOffsetY, (mousePosition.y - 0.5) * maxOffsetY * 2));
      return { x: eyeX, y: eyeY };
    }
    
    if (hoveredCardIndex !== null) {
      const row = Math.floor(hoveredCardIndex / 2);
      const col = hoveredCardIndex % 2;
      return { x: 3 + col * 2, y: -1 + row * 1.5 };
    }
    
    return { x: 2, y: 0 };
  };
  
  const eyeOffset = getEyeOffset();
  const isLookingAtCards = mousePosition.x > 0.4 || hoveredCardIndex !== null;
  
  // Update eye positions for beam calculation
  useEffect(() => {
    if (owlRef.current) {
      const svg = owlRef.current;
      const rect = svg.getBoundingClientRect();
      const svgWidth = rect.width;
      const svgHeight = rect.height;
      
      // Eye centers in viewBox coordinates (120, 115) and (180, 115) scaled to actual size
      const scale = svgWidth / 300;
      const leftEyeX = rect.left + (120 + eyeOffset.x) * scale;
      const leftEyeY = rect.top + (115 + eyeOffset.y) * scale;
      const rightEyeX = rect.left + (180 + eyeOffset.x) * scale;
      const rightEyeY = rect.top + (115 + eyeOffset.y) * scale;
      
      eyePositions.current = {
        left: { x: leftEyeX, y: leftEyeY },
        right: { x: rightEyeX, y: rightEyeY }
      };
    }
  }, [eyeOffset, eyePositions]);
  
  return (
    <motion.div
      className="relative w-full h-full flex items-end justify-center pb-8 md:pb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Owl Character SVG - Cute Black Owl */}
      <motion.svg
        ref={owlRef}
        viewBox="0 0 300 380"
        className="w-[200px] md:w-[260px] lg:w-[300px] h-auto"
        animate={{ 
          y: [0, -5, 0],
        }}
        transition={{ 
          duration: 3.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{
          filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.6))',
        }}
      >
        <defs>
          {/* Black body gradient with subtle purple/blue highlights */}
          <linearGradient id="blackOwlBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a2a3a" />
            <stop offset="30%" stopColor="#1a1a28" />
            <stop offset="60%" stopColor="#121218" />
            <stop offset="100%" stopColor="#0a0a10" />
          </linearGradient>
          
          {/* Feather highlight gradient */}
          <linearGradient id="featherHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a4a6a" />
            <stop offset="100%" stopColor="#2a2a3a" />
          </linearGradient>
          
          {/* Belly/chest gradient - darker with subtle warmth */}
          <radialGradient id="blackOwlBellyGradient" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#3a3a4a" />
            <stop offset="50%" stopColor="#252530" />
            <stop offset="100%" stopColor="#1a1a22" />
          </radialGradient>
          
          {/* Face mask - heart shape with soft cream tint */}
          <radialGradient id="blackOwlFaceGradient" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#f5f0e8" />
            <stop offset="60%" stopColor="#e8e0d4" />
            <stop offset="100%" stopColor="#d5cfc5" />
          </radialGradient>
          
          {/* Eye glow - warm amber with magical feel */}
          <radialGradient id="owlEyeGlowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>
          
          {/* Iris gradient - rich amber/gold */}
          <radialGradient id="owlIrisGradient" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="30%" stopColor="#fcd34d" />
            <stop offset="70%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </radialGradient>
          
          {/* Beak gradient */}
          <linearGradient id="owlBeakGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="100%" stopColor="#1f2937" />
          </linearGradient>
          
          {/* Feet gradient */}
          <linearGradient id="owlFeetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4b5563" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
          
          {/* Wing gradient */}
          <linearGradient id="blackWingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1f1f2f" />
            <stop offset="50%" stopColor="#15151f" />
            <stop offset="100%" stopColor="#0a0a12" />
          </linearGradient>
          
          {/* Glow filters */}
          <filter id="eyeGlowFilter" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Shadow under owl */}
        <ellipse cx="150" cy="365" rx="50" ry="8" fill="rgba(0,0,0,0.4)" />
        
        {/* FEET */}
        <motion.g
          animate={{ y: [0, 1.5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Left foot */}
          <g>
            <ellipse cx="118" cy="355" rx="16" ry="5" fill="url(#owlFeetGradient)" />
            <ellipse cx="106" cy="357" rx="5" ry="3.5" fill="url(#owlFeetGradient)" />
            <ellipse cx="118" cy="359" rx="5" ry="3.5" fill="url(#owlFeetGradient)" />
            <ellipse cx="130" cy="357" rx="5" ry="3.5" fill="url(#owlFeetGradient)" />
          </g>
          {/* Right foot */}
          <g>
            <ellipse cx="182" cy="355" rx="16" ry="5" fill="url(#owlFeetGradient)" />
            <ellipse cx="170" cy="357" rx="5" ry="3.5" fill="url(#owlFeetGradient)" />
            <ellipse cx="182" cy="359" rx="5" ry="3.5" fill="url(#owlFeetGradient)" />
            <ellipse cx="194" cy="357" rx="5" ry="3.5" fill="url(#owlFeetGradient)" />
          </g>
        </motion.g>
        
        {/* BODY - Cute rounded shape */}
        <motion.g
          animate={{ scaleY: [1, 1.015, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: '150px 280px' }}
        >
          {/* Main body */}
          <ellipse cx="150" cy="275" rx="78" ry="90" fill="url(#blackOwlBodyGradient)" />
          
          {/* Belly patch */}
          <ellipse cx="150" cy="290" rx="45" ry="50" fill="url(#blackOwlBellyGradient)" />
          
          {/* Feather pattern on belly - subtle V shapes */}
          <g opacity="0.25">
            {[...Array(4)].map((_, row) => (
              [...Array(row % 2 === 0 ? 3 : 2)].map((_, col) => (
                <path
                  key={`feather-${row}-${col}`}
                  d={`M${120 + col * 22 + (row % 2 === 0 ? 0 : 11)} ${265 + row * 16} l8 7 l8 -7`}
                  stroke="#5a5a7a"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinecap="round"
                />
              ))
            ))}
          </g>
          
          {/* Subtle body highlights */}
          <ellipse cx="120" cy="260" rx="15" ry="25" fill="url(#featherHighlight)" opacity="0.15" />
          <ellipse cx="180" cy="260" rx="15" ry="25" fill="url(#featherHighlight)" opacity="0.15" />
        </motion.g>
        
        {/* LEFT WING */}
        <motion.g
          animate={isLookingAtCards ? { rotate: [0, 4, 0] } : { rotate: [0, -1.5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: '85px 220px' }}
        >
          <path
            d="M72 185 Q45 225 52 275 Q58 295 72 305 Q82 300 87 285 Q92 255 95 225 Q95 200 82 185 Z"
            fill="url(#blackWingGradient)"
          />
          {/* Wing feather lines */}
          <path d="M62 230 Q70 248 74 275" stroke="#3a3a4a" strokeWidth="1.2" fill="none" opacity="0.4" />
          <path d="M70 222 Q76 240 80 265" stroke="#3a3a4a" strokeWidth="1.2" fill="none" opacity="0.4" />
        </motion.g>
        
        {/* RIGHT WING - more animated when looking at cards */}
        <motion.g
          animate={isLookingAtCards ? { rotate: [0, -6, -3, -6, 0] } : { rotate: [0, 1.5, 0] }}
          transition={{ duration: isLookingAtCards ? 2.5 : 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
          style={{ transformOrigin: '215px 220px' }}
        >
          <path
            d="M228 185 Q255 225 248 275 Q242 295 228 305 Q218 300 213 285 Q208 255 205 225 Q205 200 218 185 Z"
            fill="url(#blackWingGradient)"
          />
          {/* Wing feather lines */}
          <path d="M238 230 Q230 248 226 275" stroke="#3a3a4a" strokeWidth="1.2" fill="none" opacity="0.4" />
          <path d="M230 222 Q224 240 220 265" stroke="#3a3a4a" strokeWidth="1.2" fill="none" opacity="0.4" />
        </motion.g>
        
        {/* HEAD */}
        <motion.g
          animate={isLookingAtCards ? { rotate: [0, 4, 2, 4, 0], x: [0, 2, 0] } : { rotate: [0, -1.5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: '150px 130px' }}
        >
          {/* Head base - rounder for cuteness */}
          <ellipse cx="150" cy="130" rx="70" ry="68" fill="url(#blackOwlBodyGradient)" />
          
          {/* Ear tufts - left (smaller, cuter) */}
          <motion.path
            d="M88 75 Q80 50 92 38 Q100 46 100 62 Q96 75 92 82"
            fill="#1a1a28"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: '92px 60px' }}
          />
          <path d="M92 68 Q88 52 95 44" stroke="#2a2a3a" strokeWidth="2.5" fill="none" />
          
          {/* Ear tufts - right */}
          <motion.path
            d="M212 75 Q220 50 208 38 Q200 46 200 62 Q204 75 208 82"
            fill="#1a1a28"
            animate={{ rotate: [2, -2, 2] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            style={{ transformOrigin: '208px 60px' }}
          />
          <path d="M208 68 Q212 52 205 44" stroke="#2a2a3a" strokeWidth="2.5" fill="none" />
          
          {/* Face mask - heart shape, cream colored */}
          <path
            d="M150 182 Q95 168 90 122 Q90 85 118 78 Q138 73 150 92 Q162 73 182 78 Q210 85 210 122 Q205 168 150 182"
            fill="url(#blackOwlFaceGradient)"
          />
          
          {/* Face mask subtle pattern */}
          <path
            d="M150 175 Q100 162 96 122 Q96 90 120 84 Q138 80 150 95 Q162 80 180 84 Q204 90 204 122 Q200 162 150 175"
            fill="none"
            stroke="#c4b5a0"
            strokeWidth="2"
            opacity="0.3"
          />
          
          {/* EYES - Big and expressive */}
          <motion.g
            animate={{ x: eyeOffset.x, y: eyeOffset.y }}
            transition={{ duration: 0.12, ease: "easeOut" }}
          >
            {/* Left eye */}
            <motion.g
              animate={isBlinking ? { scaleY: 0.08 } : { scaleY: 1 }}
              transition={{ duration: 0.08 }}
              style={{ transformOrigin: '120px 115px' }}
            >
              {/* Eye outer glow - magical amber */}
              <motion.ellipse
                cx="120"
                cy="115"
                rx="26"
                ry="28"
                fill="rgba(251, 191, 36, 0.4)"
                filter="url(#eyeGlowFilter)"
                animate={{ 
                  opacity: [0.4, 0.7, 0.4], 
                  scale: [1, 1.08, 1] 
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Eye socket - dark ring */}
              <ellipse cx="120" cy="115" rx="24" ry="26" fill="#0a0a12" />
              {/* Iris - rich gold */}
              <ellipse cx="120" cy="115" rx="21" ry="23" fill="url(#owlIrisGradient)" />
              {/* Pupil - cute and large */}
              <motion.ellipse
                cx="121"
                cy="116"
                rx="10"
                ry="12"
                fill="#0a0a12"
                animate={{ 
                  rx: [10, 8, 10], 
                  ry: [12, 10, 12] 
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Eye sparkles - bigger for cute look */}
              <circle cx="112" cy="108" r="6" fill="rgba(255,255,255,0.95)" />
              <circle cx="126" cy="120" r="3" fill="rgba(255,255,255,0.7)" />
              <circle cx="115" cy="122" r="2" fill="rgba(255,255,255,0.5)" />
            </motion.g>
            
            {/* Right eye */}
            <motion.g
              animate={isBlinking ? { scaleY: 0.08 } : { scaleY: 1 }}
              transition={{ duration: 0.08 }}
              style={{ transformOrigin: '180px 115px' }}
            >
              {/* Eye outer glow */}
              <motion.ellipse
                cx="180"
                cy="115"
                rx="26"
                ry="28"
                fill="rgba(251, 191, 36, 0.4)"
                filter="url(#eyeGlowFilter)"
                animate={{ 
                  opacity: [0.4, 0.7, 0.4], 
                  scale: [1, 1.08, 1] 
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              />
              {/* Eye socket */}
              <ellipse cx="180" cy="115" rx="24" ry="26" fill="#0a0a12" />
              {/* Iris */}
              <ellipse cx="180" cy="115" rx="21" ry="23" fill="url(#owlIrisGradient)" />
              {/* Pupil */}
              <motion.ellipse
                cx="181"
                cy="116"
                rx="10"
                ry="12"
                fill="#0a0a12"
                animate={{ 
                  rx: [10, 8, 10], 
                  ry: [12, 10, 12] 
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
              />
              {/* Eye sparkles */}
              <circle cx="172" cy="108" r="6" fill="rgba(255,255,255,0.95)" />
              <circle cx="186" cy="120" r="3" fill="rgba(255,255,255,0.7)" />
              <circle cx="175" cy="122" r="2" fill="rgba(255,255,255,0.5)" />
            </motion.g>
          </motion.g>
          
          {/* BEAK - small and cute */}
          <motion.path
            d="M150 148 L143 162 Q150 170 157 162 Z"
            fill="url(#owlBeakGradient)"
            animate={{ scaleY: [1, 0.96, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: '150px 158px' }}
          />
          <path d="M150 150 L146 159" stroke="#1f2937" strokeWidth="0.8" opacity="0.4" />
          
          {/* Cheek blush - cute detail */}
          <ellipse cx="100" cy="135" rx="10" ry="6" fill="#fca5a5" opacity="0.15" />
          <ellipse cx="200" cy="135" rx="10" ry="6" fill="#fca5a5" opacity="0.15" />
        </motion.g>
      </motion.svg>
      
      {/* Ground glow from owl's eyes */}
      <motion.div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          width: '160px',
          height: '30px',
          background: 'radial-gradient(ellipse, rgba(251, 191, 36, 0.35) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 80%)',
          filter: 'blur(8px)',
        }}
        animate={{
          opacity: [0.35, 0.6, 0.35],
          scaleX: [0.95, 1.05, 0.95],
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

// Eye beam light effect - precisely from owl's eyes toward cards
const EyeBeamEffect = ({ hoveredCardIndex, sectionRef }: { 
  hoveredCardIndex: number | null;
  sectionRef: React.RefObject<HTMLElement>;
}) => {
  return (
    <div className="absolute pointer-events-none overflow-hidden" style={{ zIndex: 1, inset: 0 }}>
      {/* Dual curved beams from each eye */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          {/* Beam gradient - golden amber */}
          <linearGradient id="beamGradientLeft" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="rgba(251, 191, 36, 0.7)" />
            <stop offset="15%" stopColor="rgba(251, 191, 36, 0.4)" />
            <stop offset="40%" stopColor="rgba(251, 191, 36, 0.15)" />
            <stop offset="70%" stopColor="rgba(251, 191, 36, 0.05)" />
            <stop offset="100%" stopColor="rgba(251, 191, 36, 0)" />
          </linearGradient>
          <linearGradient id="beamGradientRight" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="rgba(245, 158, 11, 0.6)" />
            <stop offset="15%" stopColor="rgba(245, 158, 11, 0.35)" />
            <stop offset="40%" stopColor="rgba(245, 158, 11, 0.12)" />
            <stop offset="70%" stopColor="rgba(245, 158, 11, 0.04)" />
            <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
          </linearGradient>
          <filter id="beamBlur" x="-50%" y="-100%" width="200%" height="300%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <filter id="coreBeamBlur" x="-50%" y="-100%" width="200%" height="300%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        
        {/* Left eye beam - curved path */}
        <motion.path
          d="M 18% 42% Q 35% 38%, 55% 35% T 95% 40%"
          stroke="url(#beamGradientLeft)"
          strokeWidth="80"
          fill="none"
          filter="url(#beamBlur)"
          animate={{
            opacity: [0.4, 0.65, 0.4],
            strokeWidth: [75, 85, 75],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Right eye beam - slightly different curve */}
        <motion.path
          d="M 20% 44% Q 38% 48%, 58% 52% T 95% 58%"
          stroke="url(#beamGradientRight)"
          strokeWidth="70"
          fill="none"
          filter="url(#beamBlur)"
          animate={{
            opacity: [0.35, 0.55, 0.35],
            strokeWidth: [65, 78, 65],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />
        
        {/* Core beam - brighter center line */}
        <motion.path
          d="M 18% 43% Q 36% 42%, 56% 45% T 92% 48%"
          stroke="rgba(255, 247, 237, 0.35)"
          strokeWidth="25"
          fill="none"
          filter="url(#coreBeamBlur)"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.15,
          }}
        />
      </svg>
      
      {/* Eye glow source - left eye (precisely positioned) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: '16%',
          top: '40%',
          width: '45px',
          height: '45px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(251, 191, 36, 0.7) 30%, rgba(245, 158, 11, 0.3) 60%, transparent 100%)',
          filter: 'blur(4px)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Eye glow source - right eye */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: '19%',
          top: '42%',
          width: '40px',
          height: '40px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.85) 0%, rgba(245, 158, 11, 0.65) 35%, rgba(251, 191, 36, 0.25) 65%, transparent 100%)',
          filter: 'blur(4px)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.65, 0.95, 0.65],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.25,
        }}
      />
      
      {/* Shimmer particles traveling along beam */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`shimmer-${i}`}
          className="absolute rounded-full"
          style={{
            left: '18%',
            top: '42%',
            width: '10px',
            height: '10px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(251, 191, 36, 0.6) 50%, transparent 100%)',
            filter: 'blur(2px)',
          }}
          animate={{
            opacity: [0, 0.9, 0.7, 0],
            x: [0, 150 + i * 50, 350 + i * 50, 500 + i * 30],
            y: [0, -10 + i * 8, 20 + i * 5, 40 + i * 8],
            scale: [0.5, 1.2, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Enhanced beam on hover - intensifies toward hovered card */}
      <motion.div
        className="absolute"
        style={{
          left: '17%',
          top: '40%',
          width: '550px',
          height: '300px',
          background: `radial-gradient(ellipse at 0% 50%, 
            rgba(251, 191, 36, 0.45) 0%,
            rgba(251, 191, 36, 0.2) 30%,
            rgba(245, 158, 11, 0.08) 55%,
            transparent 100%
          )`,
          clipPath: 'polygon(0% 35%, 0% 65%, 100% 80%, 100% 20%)',
          filter: 'blur(20px)',
          transformOrigin: '0% 50%',
        }}
        animate={{
          opacity: hoveredCardIndex !== null ? [0.5, 0.8, 0.5] : 0,
          scaleY: hoveredCardIndex !== null ? [0.95, 1.05, 0.95] : 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

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
  const eyePositions = useRef({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
  
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
      
      <EyeBeamEffect hoveredCardIndex={hoveredCardIndex} sectionRef={sectionRef} />
      
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
            <OwlCharacter hoveredCardIndex={hoveredCardIndex} mousePosition={mousePosition} eyePositions={eyePositions} />
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
