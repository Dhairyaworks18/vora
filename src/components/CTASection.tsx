import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Gradient - coral to purple like reference */}
      <div className="absolute inset-0 bg-gradient-to-br from-coral via-secondary to-purple-deep" />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-bright/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-background/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/20 backdrop-blur-sm border border-background/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-yellow-bright" />
            <span className="text-sm font-medium text-background">
              Join 50,000+ users creating stunning presentations
            </span>
          </motion.div>

          {/* Headline */}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-background mb-6">
            Ready to Create
            <br />
            Presentations That Win?
          </h2>

          <p className="text-xl text-background/80 mb-10 max-w-2xl mx-auto">
            Stop using generic AI tools that make every deck look the same. 
            Start creating human-like, competition-ready presentations with Vora.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button 
              variant="accent" 
              size="xl"
              className="min-w-[200px]"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="glass" 
              size="xl"
              className="min-w-[200px] text-background"
            >
              Schedule a Demo
            </Button>
          </div>

          {/* Trust */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-background/70">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              <span>Upgrade anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
