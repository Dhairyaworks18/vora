import { motion } from "framer-motion";
import { Trophy, Shuffle, Sparkles, Edit3, BookOpen, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Sparkles,
    title: "Human-Like Writing",
    description: "Naturally written content with tone variation that passes any AI detection.",
  },
  {
    icon: Shuffle,
    title: "Unpredictable Designs",
    description: "Randomized templates and variations to avoid the typical 'AI fingerprint'.",
  },
  {
    icon: BookOpen,
    title: "Narrative-Driven",
    description: "AI builds slides around your story, not just bullet points.",
  },
  {
    icon: Edit3,
    title: "Fully Editable",
    description: "Tweak any content freely without breaking the design integrity.",
  },
];

const CompetitionModeSection = () => {
  return (
    <section id="competition" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-coral/5 via-background to-purple-deep/5" />
      
      {/* Decorative */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-yellow-bright/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-coral/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 mb-6">
              <Trophy className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Signature Feature</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Competition Mode —
              <br />
              <span className="text-gradient-hero">Built to Win</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Designed especially for college students in competitions, hackathons, 
              and ideathons. Create presentations that judges remember, with content 
              that feels genuinely human-crafted.
            </p>

            {/* Benefits List */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button variant="coral" size="lg">
              Try Competition Mode
              <Trophy className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Right - Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-coral via-secondary to-purple-deep rounded-3xl p-1">
              <div className="bg-background rounded-[22px] p-8">
                {/* Fake Slide Preview */}
                <div className="bg-muted rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-coral" />
                    <div className="w-3 h-3 rounded-full bg-yellow-bright" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-foreground/10 rounded w-3/4" />
                    <div className="h-3 bg-foreground/5 rounded w-full" />
                    <div className="h-3 bg-foreground/5 rounded w-5/6" />
                  </div>
                  <div className="flex gap-4 mt-6">
                    <div className="flex-1 h-24 bg-primary/10 rounded-lg" />
                    <div className="flex-1 h-24 bg-secondary/10 rounded-lg" />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Win Rate", value: "94%" },
                    { label: "Unique Score", value: "100%" },
                    { label: "Human Feel", value: "A+" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Check marks */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Original Content", "No AI Fingerprint", "Competition Ready"].map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-yellow-bright text-accent-foreground px-4 py-2 rounded-xl font-semibold shadow-glow-yellow"
            >
              🏆 #1 for Competitions
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompetitionModeSection;
