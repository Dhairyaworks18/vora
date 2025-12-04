import { motion } from "framer-motion";
import { Zap, Settings, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const modes = [
  {
    icon: Zap,
    name: "Quick Mode",
    tagline: "Instant Presentations",
    description: "Enter your topic, get a beautiful deck in seconds. Perfect for time-sensitive projects and rapid prototyping.",
    features: ["Instant generation", "AI-optimized layouts", "One-click polish", "Fast iterations"],
    color: "bg-yellow-bright",
    textColor: "text-yellow-gold",
    bgColor: "bg-yellow-bright/10",
  },
  {
    icon: Settings,
    name: "Studio Mode",
    tagline: "Full Creative Control",
    description: "Advanced editing with granular control over every element. Build presentations exactly as you envision them.",
    features: ["Drag-and-drop editor", "Custom animations", "Brand kit integration", "Pixel-perfect control"],
    color: "bg-primary",
    textColor: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const DualModesSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-coral/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-coral-dark text-sm font-medium mb-4">
            Dual Editing Modes
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Your Workflow,
            <br />
            <span className="text-gradient-hero">Your Choice</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you need speed or precision, Vora adapts to how you work best.
          </p>
        </motion.div>

        {/* Modes Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {modes.map((mode, index) => (
            <motion.div
              key={mode.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background rounded-3xl p-6 lg:p-8 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all group"
            >
              {/* Icon & Badge */}
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl ${mode.color} flex items-center justify-center shadow-md`}>
                  <mode.icon className="w-7 h-7 text-background" />
                </div>
                <span className={`px-3 py-1 rounded-full ${mode.bgColor} ${mode.textColor} text-xs font-medium`}>
                  {mode.tagline}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                {mode.name}
              </h3>

              <p className="text-muted-foreground mb-6">
                {mode.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {mode.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                    <div className={`w-1.5 h-1.5 rounded-full ${mode.color}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button variant="ghost" className="group-hover:text-primary transition-colors">
                Learn more
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DualModesSection;
