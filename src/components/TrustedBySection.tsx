import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Building2, GraduationCap, Briefcase, Award } from "lucide-react";

const stats = [
  { icon: Building2, value: "500+", label: "Enterprises Trust Us" },
  { icon: GraduationCap, value: "50K+", label: "Students Empowered" },
  { icon: Briefcase, value: "1M+", label: "Presentations Created" },
  { icon: Award, value: "94%", label: "Competition Win Rate" },
];

const companies = [
  "Deloitte",
  "McKinsey",
  "BCG",
  "Accenture",
  "KPMG",
  "PwC",
];

const TrustedBySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section 
      ref={containerRef}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-0 left-0 w-96 h-96 bg-purple-deep/5 rounded-full blur-3xl" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" 
      />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-deep/5 via-background to-primary/5" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Vora Matters —
            <br />
            <span className="text-gradient-blue">Inspired by the Best</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The world's leading consulting and corporate firms have already adopted AI-powered 
            presentation tools. Deloitte uses its in-house AI assistant PairD to help over 
            75,000 employees draft slides, research data, and create client-ready presentations.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="text-center bg-background rounded-2xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4"
              >
                <stat.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-1"
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Companies Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {companies.map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.1, y: -3 }}
                className="px-6 py-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
              >
                <span className="font-display text-xl font-semibold text-muted-foreground">
                  {company}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
