import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  Palette, 
  Brain, 
  BarChart3, 
  Users, 
  Layers, 
  Globe, 
  Wand2,
  FileCheck
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Human-Like Content",
    description: "AI that writes naturally, with varied tone and authentic phrasing that doesn't feel robotic.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Palette,
    title: "Unique Designs",
    description: "Multiple design engines — Minimalist, Corporate, Creative, Pitch, and Competition styles.",
    color: "bg-secondary/20 text-secondary",
  },
  {
    icon: BarChart3,
    title: "Smart Data Visuals",
    description: "AI auto-generates charts, graphs, and insights from your CSV, Excel, or plain text data.",
    color: "bg-yellow-bright/20 text-yellow-gold",
  },
  {
    icon: Wand2,
    title: "Storytelling Mode",
    description: "Build narrative arcs — Problem → Solution → Impact — for compelling presentations.",
    color: "bg-purple-light/20 text-purple-deep",
  },
  {
    icon: Layers,
    title: "Adaptive Layouts",
    description: "Randomized, refined slide structures that keep every deck looking fresh and original.",
    color: "bg-coral/20 text-coral-dark",
  },
  {
    icon: FileCheck,
    title: "Fidelity Export",
    description: "What you see is what you get. Perfect exports to PPTX, PDF, or interactive HTML.",
    color: "bg-cyan-accent/20 text-cyan-accent",
  },
  {
    icon: Users,
    title: "Collaboration Tools",
    description: "Built-in team features with version control and real-time editing capabilities.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Create presentations in multiple languages for global audiences.",
    color: "bg-secondary/20 text-secondary",
  },
];

const FeaturesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section 
      ref={containerRef}
      id="features" 
      className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-background via-pink-blush/20 to-background"
    >
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute top-0 right-0 w-96 h-96 bg-coral/20 rounded-full blur-3xl" 
      />
      <motion.div 
        style={{ y: backgroundY2 }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" 
      />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Powerful Features
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need to
            <br />
            <span className="text-gradient-blue">Create Stunning Decks</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vora combines AI intelligence with human creativity to deliver presentations 
            that captivate your audience and win competitions.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="h-full bg-background rounded-2xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-5 transition-transform`}
                >
                  <feature.icon className="w-7 h-7" />
                </motion.div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
