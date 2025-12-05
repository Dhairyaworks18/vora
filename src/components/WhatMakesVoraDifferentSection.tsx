import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Sparkles, 
  Layers, 
  BarChart3, 
  FileText, 
  Users 
} from 'lucide-react';

// Colors extracted from reference image
const COLORS = {
  cyan: '#4DD9E8',
  blue: '#3B82F6',
  purple: '#8B5CF6',
  magenta: '#EC4899',
  pink: '#F472B6',
  orange: '#F97316',
  yellow: '#FBBF24',
  coral: '#FB7185',
  orbit: '#9CA3AF',
  background: '#FFFBF5',
};

const features = [
  {
    icon: Palette,
    title: 'Intelligent Design Engine',
    items: [
      'Multiple design modes (Minimalist, Corporate, Creative, Pitch)',
      'Adaptive layout engine with dynamic structures',
      'Storytelling mode for compelling narrative arcs',
      'Smart Motion System with professional transitions',
    ],
  },
  {
    icon: Sparkles,
    title: 'Premium Visual Quality',
    items: [
      'Transparent free & premium tiers with stable features',
      'Style transfer engine for custom visual creation',
      'Fidelity Preview ensures perfect exports',
      'Lightweight, fast rendering for complex presentations',
    ],
  },
  {
    icon: Layers,
    title: 'Complete Presentation Suite',
    items: [
      'Deck Composer for full presentation creation',
      'Hybrid Editor combining visual and text editing',
      'Visual refinement engine (Sketch → Polished → Corporate)',
      'Template & Creator Marketplace for custom slides',
    ],
  },
  {
    icon: BarChart3,
    title: 'Data Intelligence',
    items: [
      'AI-generated charts and insights',
      'Natural commentary on data trends',
    ],
  },
  {
    icon: FileText,
    title: 'Original Content',
    items: [
      'Non-repetitive, human-like phrasing',
      'Every presentation feels unique',
    ],
  },
  {
    icon: Users,
    title: 'Built-in Collaboration',
    items: [
      'Version control and team editing',
      'Real-time collaboration features',
    ],
  },
];

// Animated orbital dot component
const OrbitingDot = ({ 
  radius, 
  duration, 
  delay, 
  size, 
  color,
  mouseOffset 
}: { 
  radius: number; 
  duration: number; 
  delay: number; 
  size: number; 
  color: string;
  mouseOffset: { x: number; y: number };
}) => {
  const [angle, setAngle] = useState(delay * Math.PI * 2);
  
  useEffect(() => {
    let animationId: number;
    let startTime: number | null = null;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const newAngle = delay * Math.PI * 2 + (elapsed / 1000) * (Math.PI * 2 / duration);
      setAngle(newAngle);
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [duration, delay]);
  
  const x = Math.cos(angle) * radius + mouseOffset.x * 0.02;
  const y = Math.sin(angle) * radius + mouseOffset.y * 0.02;
  
  return (
    <circle
      cx={250 + x}
      cy={250 + y}
      r={size}
      fill={color}
      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
    />
  );
};

// Morphing blob component using SVG
const MorphingBlob = ({ mouseOffset }: { mouseOffset: { x: number; y: number } }) => {
  const [pathData, setPathData] = useState('');
  const timeRef = useRef(0);
  
  useEffect(() => {
    let animationId: number;
    
    const generateBlobPath = (t: number) => {
      const points = 8;
      const baseRadius = 120;
      const path: string[] = [];
      
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const wave1 = Math.sin(angle * 3 + t * 0.5) * 25;
        const wave2 = Math.cos(angle * 2 + t * 0.7) * 20;
        const wave3 = Math.sin(angle * 4 + t * 0.3) * 15;
        const radius = baseRadius + wave1 + wave2 + wave3;
        
        const x = 250 + Math.cos(angle) * radius + mouseOffset.x * 0.05;
        const y = 250 + Math.sin(angle) * radius + mouseOffset.y * 0.05;
        
        if (i === 0) {
          path.push(`M ${x} ${y}`);
        } else {
          const prevAngle = ((i - 1) / points) * Math.PI * 2;
          const prevWave1 = Math.sin(prevAngle * 3 + t * 0.5) * 25;
          const prevWave2 = Math.cos(prevAngle * 2 + t * 0.7) * 20;
          const prevWave3 = Math.sin(prevAngle * 4 + t * 0.3) * 15;
          const prevRadius = baseRadius + prevWave1 + prevWave2 + prevWave3;
          const prevX = 250 + Math.cos(prevAngle) * prevRadius + mouseOffset.x * 0.05;
          const prevY = 250 + Math.sin(prevAngle) * prevRadius + mouseOffset.y * 0.05;
          
          const cp1x = prevX + (x - prevX) * 0.5 + Math.cos(prevAngle + Math.PI / 2) * 30;
          const cp1y = prevY + (y - prevY) * 0.5 + Math.sin(prevAngle + Math.PI / 2) * 30;
          
          path.push(`Q ${cp1x} ${cp1y} ${x} ${y}`);
        }
      }
      
      return path.join(' ') + ' Z';
    };
    
    const animate = () => {
      timeRef.current += 0.016;
      setPathData(generateBlobPath(timeRef.current));
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [mouseOffset.x, mouseOffset.y]);
  
  return (
    <defs>
      <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={COLORS.cyan} />
        <stop offset="25%" stopColor={COLORS.blue} />
        <stop offset="50%" stopColor={COLORS.purple} />
        <stop offset="75%" stopColor={COLORS.magenta} />
        <stop offset="100%" stopColor={COLORS.yellow} />
      </linearGradient>
      <filter id="blobShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
        <feOffset dx="0" dy="5" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.3" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <path id="blobPath" d={pathData} />
    </defs>
  );
};

const WhatMakesVoraDifferentSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setMouseOffset({
        x: (e.clientX - centerX) * 0.1,
        y: (e.clientY - centerY) * 0.1,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const orbitDots = [
    { radius: 180, duration: 20, delay: 0, size: 8, color: COLORS.coral },
    { radius: 180, duration: 20, delay: 0.5, size: 6, color: COLORS.blue },
    { radius: 150, duration: 15, delay: 0.2, size: 10, color: COLORS.purple },
    { radius: 150, duration: 15, delay: 0.7, size: 5, color: COLORS.cyan },
    { radius: 200, duration: 25, delay: 0.3, size: 12, color: COLORS.orange },
    { radius: 200, duration: 25, delay: 0.8, size: 7, color: COLORS.magenta },
    { radius: 170, duration: 18, delay: 0.4, size: 6, color: COLORS.pink },
    { radius: 170, duration: 18, delay: 0.9, size: 9, color: COLORS.yellow },
  ];
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: COLORS.background }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg 
          viewBox="0 0 500 500" 
          className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] opacity-60"
          style={{ 
            transform: `translate(${mouseOffset.x * 0.3}px, ${mouseOffset.y * 0.3}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <MorphingBlob mouseOffset={mouseOffset} />
          
          {/* Orbital rings */}
          <ellipse 
            cx="250" cy="250" rx="180" ry="100" 
            fill="none" 
            stroke={COLORS.orbit} 
            strokeWidth="1" 
            strokeDasharray="4 4"
            style={{ 
              transform: `rotate(-20deg)`,
              transformOrigin: 'center'
            }}
          />
          <ellipse 
            cx="250" cy="250" rx="200" ry="120" 
            fill="none" 
            stroke={COLORS.orbit} 
            strokeWidth="1"
            style={{ 
              transform: `rotate(30deg)`,
              transformOrigin: 'center'
            }}
          />
          <ellipse 
            cx="250" cy="250" rx="170" ry="90" 
            fill="none" 
            stroke={COLORS.orbit} 
            strokeWidth="1" 
            strokeDasharray="2 6"
            style={{ 
              transform: `rotate(70deg)`,
              transformOrigin: 'center'
            }}
          />
          
          {/* Central morphing blob */}
          <use 
            href="#blobPath" 
            fill="url(#blobGradient)" 
            filter="url(#blobShadow)"
          />
          
          {/* Orbiting dots */}
          {orbitDots.map((dot, index) => (
            <OrbitingDot key={index} {...dot} mouseOffset={mouseOffset} />
          ))}
          
          {/* Static decorative elements */}
          <path 
            d="M80 200 L85 210 L95 210 L87 217 L90 227 L80 220 L70 227 L73 217 L65 210 L75 210 Z" 
            fill={COLORS.cyan}
            style={{ 
              transform: `translate(${mouseOffset.x * 0.1}px, ${mouseOffset.y * 0.1}px)`,
            }}
          />
          <polygon 
            points="420,300 430,320 410,320" 
            fill="none" 
            stroke={COLORS.orbit} 
            strokeWidth="1.5"
          />
          <polygon 
            points="70,350 80,370 60,370" 
            fill="none" 
            stroke={COLORS.orbit} 
            strokeWidth="1.5"
          />
        </svg>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: '#1a1a2e' }}
          >
            What Makes{' '}
            <span 
              className="bg-clip-text text-transparent"
              style={{ 
                backgroundImage: `linear-gradient(135deg, ${COLORS.cyan} 0%, ${COLORS.purple} 50%, ${COLORS.magenta} 100%)`,
              }}
            >
              Vora
            </span>{' '}
            Different
          </h2>
          <p 
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: '#4a4a5a' }}
          >
            Built from the ground up to create presentations that feel human-crafted, not AI-generated.
          </p>
        </motion.div>
        
        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative rounded-2xl p-6 backdrop-blur-md border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                borderColor: 'rgba(200, 200, 220, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Gradient accent on hover */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.cyan}10 0%, ${COLORS.magenta}10 100%)`,
                }}
              />
              
              <div className="relative z-10">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.cyan}20 0%, ${COLORS.purple}20 100%)`,
                  }}
                >
                  <feature.icon 
                    className="w-6 h-6" 
                    style={{ color: COLORS.purple }}
                  />
                </div>
                
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ color: '#1a1a2e' }}
                >
                  {feature.title}
                </h3>
                
                <ul className="space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex}
                      className="text-sm flex items-start gap-2"
                      style={{ color: '#5a5a6a' }}
                    >
                      <span 
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: COLORS.coral }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatMakesVoraDifferentSection;
