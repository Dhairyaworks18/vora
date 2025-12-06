import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Check, Sparkles, Zap, Crown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    popular: false,
  },
];

const Pricing = () => {
  return (
    <>
      <Helmet>
        <title>Pricing — Vora AI Presentation Generator</title>
        <meta 
          name="description" 
          content="Simple, transparent pricing for Vora AI. Start free, upgrade when you're ready. No hidden fees." 
        />
        <link rel="canonical" href="https://vora.ai/pricing" />
      </Helmet>

      <main className="relative min-h-screen overflow-hidden bg-background">
        <Navbar />
        
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Soft gradient orbs */}
          <motion.div 
            className="absolute top-32 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
            style={{
              background: "radial-gradient(circle, hsl(var(--vora-coral) / 0.4), transparent 70%)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.25, 0.35, 0.25],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div 
            className="absolute bottom-32 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-25"
            style={{
              background: "radial-gradient(circle, hsl(var(--purple-deep) / 0.3), transparent 70%)",
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(var(--yellow-gold) / 0.2), transparent 70%)",
            }}
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 pt-32 lg:pt-40 pb-24 lg:pb-32">
          <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-16 lg:mb-20"
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block px-5 py-2 rounded-full bg-accent/15 backdrop-blur-sm border border-accent/20 text-yellow-gold text-sm font-medium mb-6"
              >
                Simple Pricing
              </motion.span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Choose Your Path to
                <br />
                <span className="text-gradient-hero">Stunning Presentations</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
                Start free, upgrade when you're ready. No hidden fees, no surprises.
              </p>
            </motion.div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.3 + index * 0.12, 
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="relative group"
                >
                  {/* Glassmorphic Card */}
                  <div 
                    className={`relative rounded-3xl p-[1px] transition-all duration-500 ${
                      plan.popular
                        ? "bg-gradient-to-br from-vora-coral via-secondary to-purple-deep"
                        : "bg-gradient-to-br from-border/60 via-border/40 to-border/60"
                    }`}
                  >
                    {/* Popular badge */}
                    {plan.popular && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
                      >
                        <motion.span 
                          animate={{ 
                            boxShadow: [
                              "0 0 20px hsl(var(--yellow-gold) / 0.3)",
                              "0 0 30px hsl(var(--yellow-gold) / 0.5)",
                              "0 0 20px hsl(var(--yellow-gold) / 0.3)",
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="px-5 py-1.5 bg-accent text-accent-foreground text-sm font-semibold rounded-full"
                        >
                          Most Popular
                        </motion.span>
                      </motion.div>
                    )}

                    {/* Inner glow effect for popular card */}
                    {plan.popular && (
                      <motion.div
                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: "radial-gradient(circle at 50% 0%, hsl(var(--vora-coral) / 0.15) 0%, transparent 60%)",
                        }}
                      />
                    )}
                    
                    <div className={`relative bg-background/95 backdrop-blur-xl rounded-[22px] p-6 lg:p-8 h-full flex flex-col overflow-hidden ${
                      plan.popular ? "bg-background/90" : ""
                    }`}>
                      {/* Subtle inner glow */}
                      <div 
                        className={`absolute inset-0 rounded-[22px] opacity-50 pointer-events-none ${
                          plan.popular 
                            ? "bg-gradient-to-b from-vora-coral/5 via-transparent to-transparent" 
                            : "bg-gradient-to-b from-white/[0.03] via-transparent to-transparent"
                        }`}
                      />

                      {/* Icon & Name */}
                      <div className="flex items-center gap-3 mb-5 relative z-10">
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-sm ${
                            plan.popular 
                              ? "bg-gradient-to-br from-vora-coral/20 to-purple-deep/20 border border-vora-coral/30" 
                              : "bg-muted/50 border border-border/50"
                          }`}
                        >
                          <plan.icon className={`w-6 h-6 ${plan.popular ? "text-vora-coral" : "text-muted-foreground"}`} />
                        </motion.div>
                        <h3 className="font-display text-xl font-bold text-foreground">
                          {plan.name}
                        </h3>
                      </div>

                      {/* Price */}
                      <div className="mb-4 relative z-10">
                        <span className="font-display text-4xl lg:text-5xl font-bold text-foreground">
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-muted-foreground text-lg">{plan.period}</span>
                        )}
                      </div>

                      <p className="text-muted-foreground mb-6 relative z-10">
                        {plan.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-3.5 mb-8 flex-grow relative z-10">
                        {plan.features.map((feature, featureIndex) => (
                          <motion.li 
                            key={feature}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 + featureIndex * 0.05 }}
                            className="flex items-start gap-3"
                          >
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              plan.popular 
                                ? "bg-vora-coral/20 text-vora-coral" 
                                : "bg-muted text-muted-foreground"
                            }`}>
                              <Check className="w-3 h-3" />
                            </div>
                            <span className="text-sm text-foreground/90">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <motion.div 
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 0.98 }}
                        className="relative z-10"
                      >
                        <Button 
                          variant={plan.popular ? "hero" : "heroOutline"} 
                          size="lg" 
                          className="w-full group/btn"
                        >
                          {plan.cta}
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-center text-muted-foreground text-sm mt-12"
            >
              All plans include a 14-day money-back guarantee. No questions asked.
            </motion.p>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Pricing;