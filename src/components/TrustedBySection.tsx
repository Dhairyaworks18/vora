import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, GraduationCap, Briefcase, Users } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const enterpriseTools = [
  {
    company: "Deloitte",
    tool: "PairD",
    description: "AI assistant helping over 75,000 employees draft slides, research data, and create client-ready presentations.",
    tagline: "AI is becoming the foundation of modern communication",
  },
  {
    company: "Boston Consulting Group",
    tool: "Deckster",
    description: "AI slides assistant trained on hundreds of templates to build polished and strategic presentations in minutes.",
    tagline: "Improving speed and consistency across projects",
  },
  {
    company: "McKinsey & Company",
    tool: "Lilli",
    description: "Generative AI system for research, content summarization, and presentation workflows.",
    tagline: "Creating data-backed, story-driven decks faster than ever",
  },
];

const voraForEveryone = [
  {
    icon: GraduationCap,
    audience: "For Students",
    description: "Generate human-like, competition-ready presentations that stand out.",
    color: "bg-vora-coral/20 text-vora-coral",
  },
  {
    icon: Briefcase,
    audience: "For Corporates",
    description: "Produce brand-consistent, data-rich, polished decks for pitches and reports.",
    color: "bg-vora-cyan/20 text-vora-cyan",
  },
  {
    icon: Users,
    audience: "For Everyone",
    description: "Simplify presentation-making with top-tier AI assistance at your fingertips.",
    color: "bg-pink-blush/30 text-pink-blush",
  },
];

const TrustedBySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section 
      ref={containerRef}
      id="why-vora"
      className="py-24 lg:py-32 relative overflow-hidden min-h-screen"
    >
      {/* Background Image */}
      <motion.div 
        style={{ scale: imageScale }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={heroBg}
          alt="Human and AI collaboration"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-vora-navy/80 via-vora-navy/60 to-vora-navy/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-vora-navy/50 via-transparent to-vora-navy/50" />
      </motion.div>

      {/* Parallax Ambient Glows */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-20 left-0 w-96 h-96 bg-vora-coral/20 rounded-full blur-[100px]" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-20 right-0 w-96 h-96 bg-vora-cyan/20 rounded-full blur-[100px]" 
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            Why Vora Matters —
            <br />
            <span className="bg-gradient-to-r from-vora-coral via-pink-blush to-vora-cyan bg-clip-text text-transparent">
              Inspired by the Best
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            The world&apos;s leading consulting firms have already adopted AI-powered 
            presentation tools to boost productivity, storytelling, and visual design.
          </p>
        </motion.div>

        {/* Enterprise Tools Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {enterpriseTools.map((item, index) => (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-vora-coral/30 hover:bg-white/10 transition-all duration-300"
                style={{
                  boxShadow: '0 20px 40px -20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                    <span className="font-display text-xl font-bold text-white">
                      {item.company[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-display font-bold text-white">{item.company}</p>
                    <p className="text-sm text-vora-coral font-medium">{item.tool}</p>
                  </div>
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-3">
                  {item.description}
                </p>
                <p className="text-xs text-vora-cyan/80 italic">
                  {item.tagline}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vora Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-md rounded-3xl p-8 lg:p-12 border border-white/10 mb-16"
          style={{
            boxShadow: '0 30px 60px -20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-16 h-16 mx-auto rounded-2xl bg-vora-coral/20 flex items-center justify-center mb-4 border border-vora-coral/30"
            >
              <Sparkles className="w-8 h-8 text-vora-coral" />
            </motion.div>
            <h3 className="font-display text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4">
              Now, with <span className="bg-gradient-to-r from-vora-coral via-pink-blush to-vora-cyan bg-clip-text text-transparent">Vora</span> — That Power is Yours
            </h3>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Vora takes the same world-class AI presentation technology used by Deloitte, BCG, 
              and McKinsey — and makes it accessible to students, startups, and professionals everywhere.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {voraForEveryone.map((item, index) => (
              <motion.div
                key={item.audience}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}
                >
                  <item.icon className="w-6 h-6" />
                </motion.div>
                <h4 className="font-display text-lg font-semibold text-white mb-2">
                  {item.audience}
                </h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-10 pt-8 border-t border-white/10"
          >
            <p className="text-lg font-medium text-white">
              What global consulting giants use internally, <span className="text-vora-coral">Vora brings to you publicly.</span>
            </p>
            <p className="text-white/50 mt-3 text-lg">
              It&apos;s not just another AI PPT tool — <span className="bg-gradient-to-r from-vora-coral via-pink-blush to-vora-cyan bg-clip-text text-transparent font-semibold">it&apos;s the future of how the world presents ideas.</span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
};

export default TrustedBySection;
