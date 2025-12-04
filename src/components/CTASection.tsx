import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section ref={containerRef} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Gradient - coral to purple like reference */}
      <div className="absolute inset-0 bg-gradient-to-br from-coral via-secondary to-purple-deep" />
      
      {/* Parallax Decorative Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-10 left-10 w-64 h-64 bg-yellow-bright/20 rounded-full blur-3xl" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-10 right-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl" 
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [30, -30]) }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-background/10 rounded-full blur-3xl" 
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          style={{ scale }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            animate={{ y: [0, -5, 0] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/20 backdrop-blur-sm border border-background/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-yellow-bright" />
            <span className="text-sm font-medium text-background">
              Join 50,000+ users creating stunning presentations
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-background mb-6"
          >
            Ready to Create
            <br />
            Presentations That Win?
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl text-background/80 mb-10 max-w-2xl mx-auto"
          >
            Stop using generic AI tools that make every deck look the same. 
            Start creating human-like, competition-ready presentations with Vora.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="accent" 
                size="xl"
                className="min-w-[200px]"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="glass" 
                size="xl"
                className="min-w-[200px] text-background"
              >
                Schedule a Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-background/70"
          >
            {[
              { icon: Zap, text: "Free to start" },
              { icon: Sparkles, text: "No credit card required" },
              { icon: ArrowRight, text: "Upgrade anytime" },
            ].map((item, index) => (
              <motion.div 
                key={item.text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
