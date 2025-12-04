import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <section 
      ref={containerRef}
      id="competition" 
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-coral/5 via-background to-purple-deep/5" />
      
      {/* Parallax Decorative */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-20 left-20 w-64 h-64 bg-yellow-bright/10 rounded-full blur-3xl" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-20 right-20 w-80 h-80 bg-coral/10 rounded-full blur-3xl" 
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 mb-6"
            >
              <Trophy className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Signature Feature</span>
            </motion.div>

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
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                  >
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="coral" size="lg">
                Try Competition Mode
                <Trophy className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right - Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            style={{ rotate }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-coral via-secondary to-purple-deep rounded-3xl p-1">
              <div className="bg-background rounded-[22px] p-8">
                {/* Fake Slide Preview */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-muted rounded-2xl p-6 mb-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-coral" />
                    <div className="w-3 h-3 rounded-full bg-yellow-bright" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  <div className="space-y-3">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "75%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="h-4 bg-foreground/10 rounded" 
                    />
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="h-3 bg-foreground/5 rounded" 
                    />
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "83%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                      className="h-3 bg-foreground/5 rounded" 
                    />
                  </div>
                  <div className="flex gap-4 mt-6">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 }}
                      className="flex-1 h-24 bg-primary/10 rounded-lg" 
                    />
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 }}
                      className="flex-1 h-24 bg-secondary/10 rounded-lg" 
                    />
                  </div>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Win Rate", value: "94%" },
                    { label: "Unique Score", value: "100%" },
                    { label: "Human Feel", value: "A+" },
                  ].map((stat, index) => (
                    <motion.div 
                      key={stat.label} 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="text-center"
                    >
                      <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Check marks */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Original Content", "No AI Fingerprint", "Competition Ready"].map((tag, index) => (
                    <motion.span 
                      key={tag} 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="inline-flex items-center gap-1 text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {tag}
                    </motion.span>
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
