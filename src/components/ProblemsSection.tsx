import { motion } from "framer-motion";
import { X, Check, AlertTriangle } from "lucide-react";

const competitors = [
  {
    name: "Gamma",
    problems: [
      "Repetitive slide format — every deck looks identical",
      "Limited customization with only one layout style",
      "Predictable AI writing tone, easy to identify",
      "Lack of storytelling or branding integration",
    ],
  },
  {
    name: "Canva",
    problems: [
      "AI tools locked behind paywalls or credits",
      "Repetitive stock visuals feel generic",
      "Low-quality exports — animations collapse in PPTX",
      "Confusing pricing and inconsistent features",
    ],
  },
  {
    name: "Napkin",
    problems: [
      "Limited to single diagrams, not full presentations",
      "Often irrelevant visual outputs for prompts",
      "Too 'sketchy' visuals — not presentation-ready",
      "Weak collaboration and no marketplace",
    ],
  },
];

const voraFixes = [
  "Multiple design engines with adaptive layouts",
  "Transparent free & premium tiers with stable features",
  "Human-like writing with natural tone variation",
  "Full storytelling mode with narrative arcs",
  "Brand Kit integration for consistent identity",
  "Fidelity Preview ensures perfect exports",
  "Template & Creator Marketplace",
  "Built-in collaboration with version control",
];

const ProblemsSection = () => {
  return (
    <section id="solutions" className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-deep/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/10 text-coral-dark text-sm font-medium mb-4">
            <AlertTriangle className="w-4 h-4" />
            The Problem
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Existing AI Tools
            <br />
            <span className="text-gradient-hero">Fall Short</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Gamma, Canva, and Napkin dominate the space, but each has major limitations 
            that Vora overcomes.
          </p>
        </motion.div>

        {/* Competitors Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {competitors.map((competitor, index) => (
            <motion.div
              key={competitor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background rounded-2xl p-6 border border-border/50"
            >
              <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-coral/20 flex items-center justify-center text-sm">
                  {competitor.name[0]}
                </span>
                {competitor.name}
              </h3>
              <ul className="space-y-3">
                {competitor.problems.map((problem) => (
                  <li key={problem} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                    {problem}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Vora Solution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 rounded-3xl p-8 lg:p-12 border border-primary/20"
        >
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">
              How <span className="text-gradient-blue">Vora</span> Fixes Everything
            </h3>
            <p className="text-muted-foreground">
              Built from the ground up to solve these exact problems.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {voraFixes.map((fix, index) => (
              <motion.div
                key={fix}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-2 bg-background/80 rounded-xl p-4 border border-border/50"
              >
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground font-medium">{fix}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemsSection;
