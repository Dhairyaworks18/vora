import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Play,
  Settings,
  Layers,
  Type,
  Image,
  Shapes,
  LayoutGrid,
  Wand2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Presentation } from "@/contexts/DashboardContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface EditorViewProps {
  presentation: Presentation;
  mode: string;
  onBack: () => void;
}

const slides = [
  { id: 1, content: "Title Slide" },
  { id: 2, content: "Introduction" },
  { id: 3, content: "Problem Statement" },
  { id: 4, content: "Solution Overview" },
  { id: 5, content: "Key Features" },
];

const EditorView = ({ presentation, mode, onBack }: EditorViewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({ title: "Saved", description: "Your presentation has been saved." });
    }, 800);
  };

  const toolbarItems = [
    { icon: Type, label: "Text" },
    { icon: Image, label: "Image" },
    { icon: Shapes, label: "Shapes" },
    { icon: LayoutGrid, label: "Layout" },
    { icon: Wand2, label: "AI Generate" },
  ];

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-background flex items-center justify-center z-50"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"
          />
          <p className="mt-4 text-muted-foreground">
            Loading {mode === "competition" ? "Competition Mode" : mode === "studio" ? "Studio Mode" : "Quick Mode"}...
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-50 flex flex-col"
    >
      {/* Top Bar */}
      <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="h-6 w-px bg-border" />
          <h1 className="font-medium text-foreground truncate max-w-xs">{presentation.title}</h1>
          {mode === "competition" && (
            <span className="flex items-center gap-1 px-2 py-1 bg-accent/20 rounded-full text-xs font-medium text-accent-foreground">
              <Trophy className="w-3 h-3" />
              Competition Mode
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Play className="w-4 h-4" />
          </Button>
          <Button variant="hero" size="sm" onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Toolbar */}
        <aside className="w-14 bg-card border-r border-border flex flex-col items-center py-4 gap-2">
          {toolbarItems.map((item) => (
            <button
              key={item.label}
              className="w-10 h-10 rounded-lg hover:bg-muted flex items-center justify-center transition-colors group relative"
              title={item.label}
            >
              <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
            </button>
          ))}
        </aside>

        {/* Slide Panel */}
        <aside className="w-48 bg-muted/30 border-r border-border p-3 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground">SLIDES</span>
            <button className="w-6 h-6 rounded hover:bg-muted flex items-center justify-center">
              <Plus className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <div className="space-y-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "w-full aspect-video rounded-lg border-2 transition-all flex items-center justify-center text-xs font-medium",
                  currentSlide === index
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-muted-foreground/50"
                )}
              >
                {slide.content}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 bg-muted/50 p-8 flex items-center justify-center overflow-hidden">
          <div className="relative w-full max-w-4xl">
            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 rounded-full bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
              disabled={currentSlide === slides.length - 1}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 rounded-full bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Slide Canvas */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="aspect-video bg-card rounded-xl border border-border shadow-lg flex items-center justify-center"
                style={{
                  background: mode === "competition"
                    ? "linear-gradient(135deg, hsl(225 60% 15%) 0%, hsl(270 50% 25%) 100%)"
                    : "hsl(var(--card))",
                }}
              >
                {mode === "competition" && (
                  <div className="absolute inset-0 overflow-hidden rounded-xl">
                    {/* Competition Mode Visual Effects */}
                    <div className="absolute top-8 right-8 w-32 h-32 bg-vora-coral/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-8 left-8 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
                  </div>
                )}
                
                <div className={cn(
                  "text-center relative z-10",
                  mode === "competition" ? "text-foreground" : "text-foreground"
                )}>
                  <h2 className="text-3xl font-display font-bold mb-2">
                    {slides[currentSlide].content}
                  </h2>
                  <p className="text-muted-foreground">
                    Slide {currentSlide + 1} of {slides.length}
                  </p>
                  {mode === "quick" && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-primary">
                      <Wand2 className="w-4 h-4" />
                      <span>AI-generated content</span>
                    </div>
                  )}
                  {mode === "studio" && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-primary">
                      <Layers className="w-4 h-4" />
                      <span>Advanced editing enabled</span>
                    </div>
                  )}
                  {mode === "competition" && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-accent">
                      <Trophy className="w-4 h-4" />
                      <span>Competition-ready presentation</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Right Panel - Properties */}
        <aside className="w-64 bg-card border-l border-border p-4">
          <h3 className="font-medium text-foreground mb-4">Properties</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground block mb-2">Background</label>
              <div className="grid grid-cols-4 gap-2">
                {["#1a1a2e", "#16213e", "#0f3460", "#e94560"].map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded-lg border border-border"
                    style={{ background: color }}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-2">Theme</label>
              <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm">
                <option>Modern Dark</option>
                <option>Light Minimal</option>
                <option>Corporate</option>
                <option>Creative</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-2">Transitions</label>
              <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm">
                <option>Fade</option>
                <option>Slide</option>
                <option>Zoom</option>
                <option>None</option>
              </select>
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
};

export default EditorView;
