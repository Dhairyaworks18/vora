import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BarChart3, PieChart, TrendingUp, FileSpreadsheet, MessageSquare, Download } from "lucide-react";

const chartFeatures = [
  {
    icon: BarChart3,
    title: "Multiple Chart Types",
    description: "Bar, Line, Pie, Donut, Funnel, Heatmap, and Trend charts",
  },
  {
    icon: FileSpreadsheet,
    title: "Easy Data Import",
    description: "Input via CSV, Excel, or plain text — AI handles the rest",
  },
  {
    icon: TrendingUp,
    title: "Auto Trend Detection",
    description: "AI identifies patterns and suggests the best chart type",
  },
  {
    icon: MessageSquare,
    title: "Human-Style Commentary",
    description: "AI summarizes what your data means in natural language",
  },
];

const DataVisualizationSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const chartScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

  return (
    <section ref={containerRef} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-10 right-10 w-80 h-80 bg-coral/10 rounded-full blur-3xl" 
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Mock Chart Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            style={{ scale: chartScale }}
            className="order-2 lg:order-1"
          >
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-background rounded-3xl p-6 lg:p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all"
            >
              {/* Chart Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="font-semibold text-foreground">Revenue Growth</h4>
                  <p className="text-sm text-muted-foreground">Q1-Q4 2024</p>
                </div>
                <div className="flex gap-2">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0 }}
                    className="w-3 h-3 rounded-full bg-primary" 
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
                    className="w-3 h-3 rounded-full bg-secondary" 
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
                    className="w-3 h-3 rounded-full bg-yellow-bright" 
                  />
                </div>
              </div>

              {/* Mock Bar Chart */}
              <div className="flex items-end justify-between gap-3 h-48 mb-6">
                {[40, 65, 45, 80, 55, 90, 70, 95].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
                    whileHover={{ scaleY: 1.1, transition: { duration: 0.2 } }}
                    className={`flex-1 rounded-t-lg cursor-pointer ${
                      i % 3 === 0 ? "bg-primary" : i % 3 === 1 ? "bg-secondary" : "bg-yellow-bright"
                    }`}
                  />
                ))}
              </div>

              {/* AI Commentary */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-muted/50 rounded-xl p-4 border border-border/50"
              >
                <div className="flex items-start gap-3">
                  <motion.div 
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0"
                  >
                    <MessageSquare className="w-4 h-4 text-primary" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">AI Analysis</p>
                    <p className="text-sm text-muted-foreground">
                      "Revenue shows strong 45% YoY growth with Q4 being the peak quarter. 
                      Consider highlighting seasonal trends in your presentation."
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Export Button */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-4 flex justify-end"
              >
                <motion.span 
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-sm text-primary font-medium cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Export to slide
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            >
              <PieChart className="w-4 h-4" />
              Smart Data Visualization
            </motion.span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Your Data,
              <br />
              <span className="text-gradient-blue">Beautifully Visualized</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Vora's AI Graph Engine creates stunning data visuals naturally integrated 
              into your slides. Just upload your data and let AI do the heavy lifting.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4">
              {chartFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="flex items-start gap-3 bg-background rounded-xl p-4 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                  >
                    <feature.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DataVisualizationSection;
