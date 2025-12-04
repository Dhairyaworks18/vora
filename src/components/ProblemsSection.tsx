import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Shield, Lightbulb, Palette, Zap, Users, FileCheck, Sparkles } from "lucide-react";
import { useRef } from "react";

const commonProblems = [
  {
    problem: "Repetitive slide formats that make every deck look identical",
    icon: Palette,
  },
  {
    problem: "AI writing that's easily detectable and sounds robotic",
    icon: Sparkles,
  },
  {
    problem: "Limited customization with rigid layout options",
    icon: Lightbulb,
  },
  {
    problem: "Poor export quality — animations collapse in PPTX",
    icon: FileCheck,
  },
  {
    problem: "Tools locked behind confusing paywalls or credit systems",
    icon: Zap,
  },
  {
    problem: "Weak collaboration and no version control",
    icon: Users,
  },
];

const voraFixes = [
  {
    title: "Multiple Design Engines",
    description: "Minimalist, Corporate, Creative, Pitch, and Competition styles with adaptive layouts",
    icon: Palette,
  },
  {
    title: "Human-Like Writing",
    description: "Natural tone variation with authentic phrasing that passes any detection",
    icon: Sparkles,
  },
  {
    title: "Full Storytelling Mode",
    description: "Narrative arcs built around your story — Problem → Solution → Impact",
    icon: Lightbulb,
  },
  {
    title: "Fidelity Preview & Export",
    description: "What you see is what you get. Perfect exports to PPTX, PDF, or HTML",
    icon: FileCheck,
  },
  {
    title: "Transparent Pricing",
    description: "Clear free & premium tiers with stable, predictable features",
    icon: Zap,
  },
  {
    title: "Built-in Collaboration",
    description: "Real-time editing with version control and Brand Kit integration",
    icon: Users,
  },
];

const ProblemsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      id="solutions" 
      className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden"
    >
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-0 left-0 w-96 h-96 bg-coral/10 rounded-full blur-3xl" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-deep/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/10 text-coral-dark text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            The Vora Difference
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Common AI Tool Problems
            <br />
            <span className="text-gradient-hero">Vora Solves</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Most AI presentation tools share the same limitations. 
            Vora was built from the ground up to fix every single one.
          </p>
        </motion.div>

        {/* Problems Grid */}
        <motion.div 
          style={{ opacity }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
        >
          {commonProblems.map((item, index) => (
            <motion.div
              key={item.problem}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="bg-background/80 backdrop-blur-sm rounded-xl p-5 border border-destructive/20 hover:border-destructive/40 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5 text-destructive" />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed pt-2">
                  {item.problem}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Vora Solution */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 rounded-3xl p-8 lg:p-12 border border-primary/20 relative overflow-hidden"
        >
          {/* Decorative gradient orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-coral/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center mb-4"
              >
                <Check className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">
                How <span className="text-gradient-blue">Vora</span> Fixes Everything
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Built from the ground up to solve these exact problems with innovative solutions.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {voraFixes.map((fix, index) => (
                <motion.div
                  key={fix.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-background/90 backdrop-blur-sm rounded-xl p-5 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <fix.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                    {fix.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {fix.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemsSection;
