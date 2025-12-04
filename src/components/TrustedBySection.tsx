import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Brain, Palette, Users, GraduationCap, Briefcase, Building2, Rocket } from "lucide-react";

const valueBlocks = [
  {
    icon: Sparkles,
    title: "Effortless Creation",
    description: "Turn raw ideas into beautifully crafted presentations — instantly.",
    gradient: "from-vora-coral/20 via-pink-blush/30 to-transparent",
    iconColor: "text-vora-coral",
    iconBg: "bg-vora-coral/20",
    glowColor: "rgba(255,127,102,0.3)",
  },
  {
    icon: Brain,
    title: "Human + AI Harmony",
    description: "Your creativity guides the AI — not the other way around.",
    gradient: "from-vora-cyan/20 via-purple-light/30 to-transparent",
    iconColor: "text-vora-cyan",
    iconBg: "bg-vora-cyan/20",
    glowColor: "rgba(74,125,199,0.3)",
  },
  {
    icon: Palette,
    title: "Truly Aesthetic Design",
    description: "Vora ensures every slide looks stunning, modern, and professional without effort.",
    gradient: "from-purple-deep/20 via-vora-coral/20 to-transparent",
    iconColor: "text-purple-light",
    iconBg: "bg-purple-deep/20",
    glowColor: "rgba(138,94,174,0.3)",
  },
  {
    icon: Users,
    title: "Universal Value",
    description: "Built for everyone who wants to present ideas beautifully.",
    gradient: "from-pink-blush/30 via-vora-cyan/20 to-transparent",
    iconColor: "text-pink-blush",
    iconBg: "bg-pink-blush/30",
    glowColor: "rgba(248,200,195,0.4)",
  },
];

const audiences = [
  { icon: GraduationCap, label: "Students", color: "text-vora-coral" },
  { icon: Briefcase, label: "Professionals", color: "text-vora-cyan" },
  { icon: Rocket, label: "Founders", color: "text-purple-light" },
  { icon: Building2, label: "Teams", color: "text-pink-blush" },
];

const TrustedBySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section 
      ref={containerRef}
      id="why-vora"
      className="py-32 lg:py-40 relative overflow-hidden"
    >
      {/* Cinematic Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-vora-navy via-[#1a1a3e] to-[#0d1b2a]" />
      
      {/* Animated Ambient Gradients - Coral/Pink/Blue/Violet */}
      <motion.div 
        style={{ y: y1, opacity: backgroundOpacity }}
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
        animate={{ 
          background: [
            "radial-gradient(circle, rgba(255,127,102,0.4) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(248,200,195,0.4) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(255,127,102,0.4) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full blur-[100px]"
        animate={{ 
          background: [
            "radial-gradient(circle, rgba(74,125,199,0.35) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(138,94,174,0.35) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(74,125,199,0.35) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        style={{ y: y3 }}
        className="absolute bottom-0 left-0 w-[700px] h-[400px] rounded-full blur-[150px]"
        animate={{ 
          background: [
            "radial-gradient(ellipse, rgba(138,94,174,0.3) 0%, transparent 60%)",
            "radial-gradient(ellipse, rgba(255,127,102,0.25) 0%, transparent 60%)",
            "radial-gradient(ellipse, rgba(138,94,174,0.3) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Soft Wave Shapes */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-96 h-96 opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full rounded-full border border-vora-coral/30" />
        <div className="absolute inset-4 rounded-full border border-vora-cyan/20" />
        <div className="absolute inset-8 rounded-full border border-purple-light/20" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-white">Why </span>
            <span className="bg-gradient-to-r from-vora-coral via-pink-blush to-vora-cyan bg-clip-text text-transparent">
              Vora
            </span>
            <span className="text-white"> Matters</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg sm:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            In a world where first impressions are made in seconds, Vora empowers you to 
            <span className="text-pink-blush"> create stunning presentations</span> that captivate, 
            persuade, and leave lasting impressions — effortlessly.
          </motion.p>
        </motion.div>

        {/* Value Blocks Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto mb-24">
          {valueBlocks.map((block, index) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ 
                y: -8, 
                transition: { duration: 0.3 } 
              }}
              className="group relative"
            >
              {/* Card */}
              <div 
                className="relative h-full rounded-3xl p-8 lg:p-10 border border-white/10 backdrop-blur-sm overflow-hidden transition-all duration-500 group-hover:border-white/20"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
                  boxShadow: `0 20px 60px -20px ${block.glowColor}, inset 0 1px 0 rgba(255,255,255,0.1)`,
                }}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${block.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />
                
                {/* Hover Glow */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                  style={{
                    boxShadow: `inset 0 0 80px ${block.glowColor}`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <motion.div 
                    className={`w-16 h-16 rounded-2xl ${block.iconBg} flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <block.icon className={`w-8 h-8 ${block.iconColor}`} />
                  </motion.div>
                  
                  <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">
                    {block.title}
                  </h3>
                  
                  <p className="text-white/60 text-lg leading-relaxed">
                    {block.description}
                  </p>
                </div>

                {/* Corner Accent */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 opacity-30 group-hover:opacity-50 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at top right, ${block.glowColor} 0%, transparent 70%)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Audience Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.p 
            className="text-white/50 text-sm uppercase tracking-[0.3em] mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Built for Everyone
          </motion.p>
          
          <div className="flex flex-wrap justify-center gap-6 lg:gap-10 mb-12">
            {audiences.map((audience, index) => (
              <motion.div
                key={audience.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-3 group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                  <audience.icon className={`w-7 h-7 ${audience.color}`} />
                </div>
                <span className="text-white/70 font-medium group-hover:text-white transition-colors">
                  {audience.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-xl lg:text-2xl text-white/80 font-light leading-relaxed">
              It&apos;s not just another AI PPT tool —
              <br />
              <span className="font-display font-semibold bg-gradient-to-r from-vora-coral via-pink-blush to-vora-cyan bg-clip-text text-transparent">
                it&apos;s the future of how the world presents ideas.
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default TrustedBySection;
