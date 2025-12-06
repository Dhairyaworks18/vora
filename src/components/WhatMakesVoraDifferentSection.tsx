import { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Sparkles, 
  Layers, 
  BarChart3, 
  FileText, 
  Users 
} from 'lucide-react';

// Colors extracted from reference image - cyan, blue, purple, magenta, coral, orange, yellow
const COLORS = {
  cyan: '#4DD9E8',
  blue: '#3B82F6',
  deepBlue: '#5B6BF5',
  purple: '#8B5CF6',
  magenta: '#EC4899',
  pink: '#F472B6',
  orange: '#F97316',
  yellow: '#FBBF24',
  coral: '#FB7185',
  orbit: 'rgba(156, 163, 175, 0.5)',
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

// Smooth morphing blob using Canvas for better performance
const AnimatedBlobCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const animationRef = useRef<number>();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const size = 600;
    canvas.width = size;
    canvas.height = size;
    
    const centerX = size / 2;
    const centerY = size / 2;
    
    // Create gradient
    const createGradient = () => {
      const gradient = ctx.createLinearGradient(100, 100, 500, 500);
      gradient.addColorStop(0, COLORS.cyan);
      gradient.addColorStop(0.3, COLORS.deepBlue);
      gradient.addColorStop(0.5, COLORS.purple);
      gradient.addColorStop(0.7, COLORS.magenta);
      gradient.addColorStop(0.85, COLORS.coral);
      gradient.addColorStop(1, COLORS.yellow);
      return gradient;
    };
    
    const generateBlobPoints = (t: number, numPoints: number = 6) => {
      const points: { x: number; y: number }[] = [];
      const baseRadius = 180;
      
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        // Smoother, more organic waves
        const wave1 = Math.sin(angle * 2 + t * 0.4) * 35;
        const wave2 = Math.cos(angle * 3 + t * 0.3) * 25;
        const wave3 = Math.sin(angle + t * 0.5) * 20;
        const radius = baseRadius + wave1 + wave2 + wave3;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        points.push({ x, y });
      }
      
      return points;
    };
    
    const drawSmoothBlob = (points: { x: number; y: number }[]) => {
      ctx.beginPath();
      
      // Use bezier curves for smooth shape
      const len = points.length;
      for (let i = 0; i < len; i++) {
        const curr = points[i];
        const next = points[(i + 1) % len];
        const nextNext = points[(i + 2) % len];
        
        const cp1x = curr.x + (next.x - points[(i - 1 + len) % len].x) / 4;
        const cp1y = curr.y + (next.y - points[(i - 1 + len) % len].y) / 4;
        const cp2x = next.x - (nextNext.x - curr.x) / 4;
        const cp2y = next.y - (nextNext.y - curr.y) / 4;
        
        if (i === 0) {
          ctx.moveTo(curr.x, curr.y);
        }
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, next.x, next.y);
      }
      
      ctx.closePath();
    };
    
    const animate = () => {
      timeRef.current += 0.012;
      
      ctx.clearRect(0, 0, size, size);
      
      // Draw soft glow behind blob
      const points = generateBlobPoints(timeRef.current);
      
      ctx.save();
      ctx.filter = 'blur(30px)';
      ctx.globalAlpha = 0.4;
      drawSmoothBlob(points);
      ctx.fillStyle = createGradient();
      ctx.fill();
      ctx.restore();
      
      // Draw main blob with sharper edges
      ctx.save();
      ctx.filter = 'blur(2px)';
      drawSmoothBlob(points);
      ctx.fillStyle = createGradient();
      ctx.fill();
      ctx.restore();
      
      // Draw highlight layer
      ctx.save();
      ctx.globalAlpha = 0.3;
      const highlightPoints = generateBlobPoints(timeRef.current + 0.5).map(p => ({
        x: p.x - 15,
        y: p.y - 15,
      }));
      drawSmoothBlob(highlightPoints);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fill();
      ctx.restore();
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute"
      style={{ 
        width: '100%', 
        height: '100%',
        maxWidth: '600px',
        maxHeight: '600px',
      }}
    />
  );
};

// Orbital system SVG overlay
const OrbitalSystem = () => {
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    let animationId: number;
    let startTime = performance.now();
    
    const animate = (timestamp: number) => {
      setTime((timestamp - startTime) / 1000);
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  // Define orbits matching reference image
  const orbits = useMemo(() => [
    { rx: 280, ry: 160, rotation: -25, dashed: false },
    { rx: 320, ry: 180, rotation: 35, dashed: false },
    { rx: 250, ry: 140, rotation: 75, dashed: true },
  ], []);
  
  // Define orbital dots
  const dots = useMemo(() => [
    { orbit: 0, angle: 0, size: 8, color: COLORS.coral, speed: 0.08 },
    { orbit: 0, angle: Math.PI, size: 6, color: COLORS.deepBlue, speed: 0.08 },
    { orbit: 1, angle: Math.PI / 3, size: 14, color: COLORS.purple, speed: 0.05 },
    { orbit: 1, angle: Math.PI * 1.3, size: 6, color: COLORS.cyan, speed: 0.05 },
    { orbit: 2, angle: Math.PI / 2, size: 10, color: COLORS.orange, speed: 0.06 },
    { orbit: 2, angle: Math.PI * 1.7, size: 5, color: COLORS.magenta, speed: 0.06 },
  ], []);
  
  const getDotPosition = (dot: typeof dots[0]) => {
    const orbit = orbits[dot.orbit];
    const angle = dot.angle + time * dot.speed;
    const radians = (orbit.rotation * Math.PI) / 180;
    
    // Position on ellipse
    const x = orbit.rx * Math.cos(angle);
    const y = orbit.ry * Math.sin(angle);
    
    // Rotate position
    const rotatedX = x * Math.cos(radians) - y * Math.sin(radians);
    const rotatedY = x * Math.sin(radians) + y * Math.cos(radians);
    
    return {
      x: 350 + rotatedX,
      y: 350 + rotatedY,
    };
  };
  
  return (
    <svg 
      viewBox="0 0 700 700" 
      className="absolute w-full h-full"
      style={{ 
        maxWidth: '700px',
        maxHeight: '700px',
      }}
    >
      {/* Orbital ellipses */}
      {orbits.map((orbit, i) => (
        <ellipse
          key={i}
          cx="350"
          cy="350"
          rx={orbit.rx}
          ry={orbit.ry}
          fill="none"
          stroke={COLORS.orbit}
          strokeWidth="1"
          strokeDasharray={orbit.dashed ? "4 8" : "none"}
          style={{
            transform: `rotate(${orbit.rotation}deg)`,
            transformOrigin: '350px 350px',
          }}
        />
      ))}
      
      {/* Orbiting dots */}
      {dots.map((dot, i) => {
        const pos = getDotPosition(dot);
        return (
          <circle
            key={i}
            cx={pos.x}
            cy={pos.y}
            r={dot.size}
            fill={dot.color}
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
            }}
          />
        );
      })}
      
      {/* Decorative star */}
      <path 
        d="M85 250 L90 260 L102 260 L93 268 L96 280 L85 272 L74 280 L77 268 L68 260 L80 260 Z" 
        fill={COLORS.cyan}
      />
      
      {/* Decorative triangles */}
      <polygon 
        points="620,380 632,405 608,405" 
        fill="none" 
        stroke={COLORS.orbit} 
        strokeWidth="1.5"
      />
      <polygon 
        points="80,450 92,475 68,475" 
        fill="none" 
        stroke={COLORS.orbit} 
        strokeWidth="1.5"
      />
      
      {/* Additional small dots for depth */}
      <circle cx="150" cy="320" r="3" fill={COLORS.coral} opacity="0.6" />
      <circle cx="580" cy="280" r="4" fill={COLORS.cyan} opacity="0.5" />
      <circle cx="520" cy="480" r="3" fill={COLORS.purple} opacity="0.5" />
    </svg>
  );
};

const WhatMakesVoraDifferentSection = () => {
  return (
    <section 
      id="what-makes-vora-different"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: COLORS.background }}
    >
      {/* Animated Background - Centered and prominent */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none flex items-center justify-center"
        style={{ 
          top: '80px',
          width: '700px',
          height: '700px',
        }}
      >
        {/* Blob Canvas */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatedBlobCanvas />
        </div>
        
        {/* Orbital System */}
        <OrbitalSystem />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Header - sits above the blob */}
        <motion.div 
          className="text-center mb-12"
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
        
        {/* Spacer to let blob show */}
        <div className="h-[280px] md:h-[320px] lg:h-[360px]" />
        
        {/* Feature Cards - 2 columns with wide gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02]"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                borderColor: 'rgba(200, 200, 220, 0.4)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.06)',
              }}
            >
              {/* Gradient accent on hover */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.cyan}08 0%, ${COLORS.magenta}08 100%)`,
                }}
              />
              
              <div className="relative z-10">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.cyan}25 0%, ${COLORS.purple}25 100%)`,
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
