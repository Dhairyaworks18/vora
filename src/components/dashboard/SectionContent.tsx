import { motion } from "framer-motion";
import {
  Trophy,
  Layout,
  Palette,
  Image,
  Download,
  Settings,
  HelpCircle,
  Sparkles,
  Zap,
  FileText,
  Users,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useDashboard } from "@/contexts/DashboardContext";
import { Button } from "@/components/ui/button";

interface SectionContentProps {
  section: string;
  onCreateNew: (mode: string) => void;
}

const SectionContent = ({ section, onCreateNew }: SectionContentProps) => {
  const { presentations } = useDashboard();

  const renderContent = () => {
    switch (section) {
      case "competition":
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
                <Trophy className="w-6 h-6 text-accent" />
                Competition Mode
              </h1>
              <p className="text-muted-foreground mt-2">
                Create presentation decks optimized for hackathons and pitch competitions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-gradient-to-br from-vora-navy to-vora-purple rounded-2xl p-8 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-vora-coral/20 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <Zap className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Quick Competition Deck</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    AI generates a complete pitch deck in seconds. Perfect for last-minute presentations.
                  </p>
                  <Button variant="hero" onClick={() => onCreateNew("competition")}>
                    Start Creating
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative bg-gradient-to-br from-primary/20 to-vora-purple/20 rounded-2xl p-8 border border-border"
              >
                <Sparkles className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Features</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Human-like content generation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Randomized templates to avoid AI detection
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Original visual assets
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Story-driven narrative structure
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Competition Presentations */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Recent Competition Decks</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {presentations
                  .filter((p) => p.mode === "competition")
                  .slice(0, 3)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div
                        className="aspect-video rounded-lg mb-3"
                        style={{ background: p.thumbnail }}
                      />
                      <h3 className="font-medium text-foreground truncate">{p.title}</h3>
                      <p className="text-sm text-muted-foreground">{p.slideCount} slides</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        );

      case "templates":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
                <Layout className="w-6 h-6 text-primary" />
                Templates
              </h1>
              <p className="text-muted-foreground mt-2">
                Browse our collection of professionally designed templates
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {["Pitch Deck", "Business Plan", "Marketing", "Education", "Portfolio", "Report", "Proposal", "Creative"].map((template) => (
                <motion.div
                  key={template}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4 }}
                  className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-vora-purple/20" />
                  <div className="p-4">
                    <h3 className="font-medium text-foreground">{template}</h3>
                    <p className="text-sm text-muted-foreground">12 slides</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "brand-kits":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
                <Palette className="w-6 h-6 text-vora-coral" />
                Brand Kits
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your brand colors, fonts, and logos
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Default Brand Kit</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Primary Color</label>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-8 h-8 rounded-lg bg-primary" />
                      <span className="text-foreground">#4A7DC7</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Secondary Color</label>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-8 h-8 rounded-lg bg-vora-coral" />
                      <span className="text-foreground">#E88A6F</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border border-dashed rounded-xl p-6 flex items-center justify-center">
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Brand Kit
                </Button>
              </div>
            </div>
          </div>
        );

      case "ai-images":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
                <Image className="w-6 h-6 text-vora-cyan" />
                AI Images
              </h1>
              <p className="text-muted-foreground mt-2">
                Generate custom images with AI for your presentations
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Generate AI Images</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Describe what you want and our AI will create unique, royalty-free images for your slides.
              </p>
              <Button variant="hero">Start Generating</Button>
            </div>
          </div>
        );

      case "exports":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
                <Download className="w-6 h-6 text-primary" />
                Exports
              </h1>
              <p className="text-muted-foreground mt-2">
                Download your presentations in various formats
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {["PowerPoint (.pptx)", "PDF", "Google Slides", "Keynote", "HTML", "Images"].map((format) => (
                <div
                  key={format}
                  className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="p-3 rounded-lg bg-primary/10">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{format}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
                <Settings className="w-6 h-6 text-muted-foreground" />
                Settings & Members
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your account and team settings
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Members
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">D</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">Demo User</p>
                      <p className="text-xs text-muted-foreground">demo@vora.ai</p>
                    </div>
                    <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-1 rounded">Owner</span>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    <p className="text-foreground">demo@vora.ai</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Plan</label>
                    <p className="text-foreground">Demo (Prototype)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "support":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-primary" />
                Support
              </h1>
              <p className="text-muted-foreground mt-2">
                Get help with Vora
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <Mail className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Email Support</h3>
                <p className="text-muted-foreground text-sm mb-4">Get help via email</p>
                <Button variant="outline">Contact Support</Button>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <MessageSquare className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Live Chat</h3>
                <p className="text-muted-foreground text-sm mb-4">Chat with our team</p>
                <Button variant="outline">Start Chat</Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      key={section}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      {renderContent()}
    </motion.div>
  );
};

// Add missing Plus import
import { Plus } from "lucide-react";

export default SectionContent;
