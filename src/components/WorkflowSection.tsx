import { motion } from "framer-motion";
import { Upload, Wand2, Palette, Download, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Input Your Ideas",
    description: "Enter your topic, upload data, or describe your story. Vora understands context.",
    color: "bg-primary",
  },
  {
    icon: Wand2,
    step: "02",
    title: "AI Generates Decks",
    description: "Multiple deck versions created instantly with unique layouts and human-like content.",
    color: "bg-secondary",
  },
  {
    icon: Palette,
    step: "03",
    title: "Select Your Style",
    description: "Choose Competition Mode for hackathons or Corporate Mode for business presentations.",
    color: "bg-purple-deep",
  },
  {
    icon: Download,
    step: "04",
    title: "Export & Present",
    description: "Download as PPTX, PDF, or interactive HTML. What you see is what you get.",
    color: "bg-yellow-bright",
  },
];

const WorkflowSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-yellow-bright/20 text-yellow-gold text-sm font-medium mb-4">
            Simple Workflow
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            From Idea to Presentation
            <br />
            <span className="text-gradient-hero">In Minutes</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-20 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-secondary to-yellow-bright opacity-30" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              <div className="bg-background rounded-2xl p-6 border border-border/50 h-full hover:border-primary/30 hover:shadow-lg transition-all group">
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-5xl font-display font-bold text-muted/50 group-hover:text-muted transition-colors">
                    {step.step}
                  </span>
                  <div className={`w-14 h-14 rounded-xl ${step.color} flex items-center justify-center shadow-md`}>
                    <step.icon className="w-7 h-7 text-background" />
                  </div>
                </div>

                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>

              {/* Arrow (not on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-20 -right-3 w-6 h-6 bg-background rounded-full items-center justify-center border border-border z-10">
                  <ArrowRight className="w-3 h-3 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
