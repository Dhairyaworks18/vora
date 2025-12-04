import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for students and individuals getting started.",
    icon: Zap,
    features: [
      "5 presentations/month",
      "Basic templates",
      "Standard export (PDF)",
      "Community support",
    ],
    cta: "Get Started",
    variant: "heroOutline" as const,
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For students competing and professionals presenting.",
    icon: Sparkles,
    features: [
      "Unlimited presentations",
      "Competition Mode included",
      "All premium templates",
      "PPTX, PDF, HTML export",
      "Priority support",
      "Brand kit integration",
    ],
    cta: "Start Free Trial",
    variant: "hero" as const,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For teams and organizations with advanced needs.",
    icon: Crown,
    features: [
      "Everything in Pro",
      "Custom AI training",
      "SSO & admin controls",
      "API access",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    variant: "heroOutline" as const,
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-gradient-to-b from-background via-pink-blush/10 to-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-20 right-20 w-80 h-80 bg-yellow-bright/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-yellow-gold text-sm font-medium mb-4">
            Simple Pricing
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Choose Your Path to
            <br />
            <span className="text-gradient-hero">Stunning Presentations</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you're ready. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl p-1 ${
                plan.popular
                  ? "bg-gradient-to-br from-coral via-secondary to-purple-deep"
                  : "bg-border/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-full shadow-glow-yellow">
                  Most Popular
                </div>
              )}
              
              <div className="bg-background rounded-[22px] p-6 lg:p-8 h-full flex flex-col">
                {/* Icon & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    plan.popular ? "bg-primary/20" : "bg-muted"
                  }`}>
                    <plan.icon className={`w-6 h-6 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {plan.name}
                  </h3>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="font-display text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>

                <p className="text-muted-foreground mb-6">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button variant={plan.variant} size="lg" className="w-full">
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
