import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Building2, GraduationCap, Briefcase, Award, Sparkles, Users, TrendingUp } from "lucide-react";

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
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Briefcase,
    audience: "For Corporates",
    description: "Produce brand-consistent, data-rich, polished decks for pitches and reports.",
    color: "bg-secondary/20 text-secondary",
  },
  {
    icon: Users,
    audience: "For Everyone",
    description: "Simplify presentation-making with top-tier AI assistance at your fingertips.",
    color: "bg-yellow-bright/20 text-yellow-gold",
  },
];

const stats = [
  { icon: Building2, value: "500+", label: "Enterprises Trust Us" },
  { icon: GraduationCap, value: "50K+", label: "Students Empowered" },
  { icon: TrendingUp, value: "1M+", label: "Presentations Created" },
  { icon: Award, value: "94%", label: "Competition Win Rate" },
];

const TrustedBySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section 
      ref={containerRef}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-0 left-0 w-96 h-96 bg-purple-deep/5 rounded-full blur-3xl" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" 
      />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-deep/5 via-background to-primary/5" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Briefcase className="w-4 h-4" />
            Inspired by the Best
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Vora Matters —
            <br />
            <span className="text-gradient-blue">Inspired by the Best</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
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
          className="mb-16"
        >
          <p className="text-center text-sm text-muted-foreground uppercase tracking-wider mb-8">
            What Global Giants Use Internally
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {enterpriseTools.map((item, index) => (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-muted/30 rounded-2xl p-6 border border-border/50 hover:border-primary/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center border border-border/50">
                    <span className="font-display text-lg font-bold text-foreground">
                      {item.company[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground">{item.company}</p>
                    <p className="text-sm text-primary font-medium">{item.tool}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {item.description}
                </p>
                <p className="text-xs text-primary/80 italic">
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
          className="bg-gradient-to-br from-primary/5 via-background to-coral/5 rounded-3xl p-8 lg:p-12 border border-primary/20 mb-16"
        >
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center mb-4"
            >
              <Sparkles className="w-8 h-8 text-primary" />
            </motion.div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
              Now, with <span className="text-gradient-hero">Vora</span> — That Power is Yours
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
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
                className="bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}
                >
                  <item.icon className="w-6 h-6" />
                </motion.div>
                <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                  {item.audience}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
            className="text-center mt-10 pt-8 border-t border-border/50"
          >
            <p className="text-lg font-medium text-foreground">
              What global consulting giants use internally, <span className="text-primary">Vora brings to you publicly.</span>
            </p>
            <p className="text-muted-foreground mt-2">
              It&apos;s not just another AI PPT tool — it&apos;s the future of how the world presents ideas.
            </p>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="text-center bg-background rounded-2xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4"
              >
                <stat.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-1"
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
