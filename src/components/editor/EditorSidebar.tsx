import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Shapes,
  Type,
  Image,
  BarChart3,
  Palette,
  Upload,
  Square,
  Circle,
  Triangle,
  Minus,
  Heading1,
  Heading2,
  AlignLeft,
  PieChart,
  TrendingUp,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ToolType } from "./types";

interface EditorSidebarProps {
  onSelectTool: (tool: ToolType) => void;
  activeTool: ToolType;
}

type SidebarSection = 
  | "layouts" 
  | "elements" 
  | "text" 
  | "media" 
  | "charts" 
  | "brand" 
  | "uploads"
  | null;

const sidebarItems = [
  { id: "layouts" as const, icon: LayoutGrid, label: "Layouts" },
  { id: "elements" as const, icon: Shapes, label: "Elements" },
  { id: "text" as const, icon: Type, label: "Text" },
  { id: "media" as const, icon: Image, label: "Media" },
  { id: "charts" as const, icon: BarChart3, label: "Charts" },
  { id: "brand" as const, icon: Palette, label: "Brand" },
  { id: "uploads" as const, icon: Upload, label: "Uploads" },
];

const layoutPresets = [
  { id: "title", name: "Title Slide", preview: "grid-rows-2" },
  { id: "title-content", name: "Title + Content", preview: "grid-rows-3" },
  { id: "two-column", name: "Two Column", preview: "grid-cols-2" },
  { id: "image-left", name: "Image Left", preview: "grid-cols-2" },
  { id: "image-right", name: "Image Right", preview: "grid-cols-2" },
  { id: "full-image", name: "Full Image", preview: "" },
];

const shapeItems = [
  { id: "shape-rectangle" as const, icon: Square, label: "Rectangle" },
  { id: "shape-circle" as const, icon: Circle, label: "Circle" },
  { id: "shape-triangle" as const, icon: Triangle, label: "Triangle" },
  { id: "shape-line" as const, icon: Minus, label: "Line" },
];

const textItems = [
  { id: "text-heading" as const, icon: Heading1, label: "Heading", preview: "Add a heading" },
  { id: "text-subheading" as const, icon: Heading2, label: "Subheading", preview: "Add a subheading" },
  { id: "text-body" as const, icon: AlignLeft, label: "Body Text", preview: "Add body text" },
];

const chartItems = [
  { id: "chart-bar" as const, icon: BarChart3, label: "Bar Chart" },
  { id: "chart-line" as const, icon: TrendingUp, label: "Line Chart" },
  { id: "chart-pie" as const, icon: PieChart, label: "Pie Chart" },
];

const brandColors = [
  "#4169e1", // Primary Blue
  "#ff6b4a", // Coral
  "#8b5cf6", // Purple
  "#10b981", // Green
  "#f59e0b", // Amber
  "#1a1a2e", // Navy
];

const EditorSidebar = ({ onSelectTool, activeTool }: EditorSidebarProps) => {
  const [activeSection, setActiveSection] = useState<SidebarSection>(null);

  const handleSectionClick = (section: SidebarSection) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleToolClick = (tool: ToolType) => {
    onSelectTool(tool);
    // Keep panel open for browsing
  };

  return (
    <div className="flex h-full">
      {/* Icon Bar */}
      <aside className="w-16 bg-card border-r border-border flex flex-col items-center py-4 gap-1 shrink-0">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSectionClick(item.id)}
            className={cn(
              "w-12 h-12 rounded-lg flex flex-col items-center justify-center gap-1 transition-all",
              activeSection === item.id
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </aside>

      {/* Expanded Panel */}
      <AnimatePresence>
        {activeSection && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="bg-card border-r border-border overflow-hidden shrink-0"
          >
            <div className="w-[280px] h-full flex flex-col">
              {/* Panel Header */}
              <div className="h-12 px-4 flex items-center justify-between border-b border-border shrink-0">
                <h3 className="font-medium text-foreground capitalize">
                  {activeSection === "text" ? "Text Blocks" : 
                   activeSection === "elements" ? "Visual Assets" :
                   activeSection === "brand" ? "Brand Styles" :
                   activeSection}
                </h3>
                <button
                  onClick={() => setActiveSection(null)}
                  className="p-1 rounded hover:bg-muted"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Panel Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {/* Layouts Section */}
                {activeSection === "layouts" && (
                  <div className="grid grid-cols-2 gap-3">
                    {layoutPresets.map((layout) => (
                      <button
                        key={layout.id}
                        className="aspect-video bg-muted rounded-lg border border-border hover:border-primary transition-colors flex items-center justify-center group"
                      >
                        <div className={cn(
                          "w-3/4 h-3/4 bg-muted-foreground/20 rounded grid gap-1 p-1",
                          layout.preview
                        )}>
                          <div className="bg-muted-foreground/30 rounded" />
                          <div className="bg-muted-foreground/20 rounded" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Elements Section */}
                {activeSection === "elements" && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground uppercase mb-3">Shapes</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {shapeItems.map((shape) => (
                          <button
                            key={shape.id}
                            onClick={() => handleToolClick(shape.id)}
                            className={cn(
                              "aspect-square rounded-lg border flex items-center justify-center transition-all",
                              activeTool === shape.id
                                ? "bg-primary/10 border-primary"
                                : "bg-muted border-border hover:border-muted-foreground"
                            )}
                          >
                            <shape.icon className="w-6 h-6 text-muted-foreground" />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground uppercase mb-3">Decorative</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map((i) => (
                          <button
                            key={i}
                            className="aspect-square rounded-lg border border-border bg-muted hover:border-muted-foreground flex items-center justify-center"
                          >
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Text Section */}
                {activeSection === "text" && (
                  <div className="space-y-3">
                    {textItems.map((text) => (
                      <button
                        key={text.id}
                        onClick={() => handleToolClick(text.id)}
                        className={cn(
                          "w-full p-4 rounded-lg border text-left transition-all",
                          activeTool === text.id
                            ? "bg-primary/10 border-primary"
                            : "bg-muted border-border hover:border-muted-foreground"
                        )}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <text.icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{text.label}</span>
                        </div>
                        <p className={cn(
                          "text-muted-foreground",
                          text.id === "text-heading" && "text-lg font-bold",
                          text.id === "text-subheading" && "text-base font-medium",
                          text.id === "text-body" && "text-sm"
                        )}>
                          {text.preview}
                        </p>
                      </button>
                    ))}
                  </div>
                )}

                {/* Media Section */}
                {activeSection === "media" && (
                  <div className="space-y-4">
                    <button
                      onClick={() => handleToolClick("image")}
                      className="w-full p-6 rounded-lg border-2 border-dashed border-border hover:border-primary bg-muted/50 transition-colors"
                    >
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground text-center">
                        Click to upload or drag & drop
                      </p>
                      <p className="text-xs text-muted-foreground/70 text-center mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </button>

                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground uppercase mb-3">Stock Images</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {[1, 2, 3, 4].map((i) => (
                          <button
                            key={i}
                            className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 hover:opacity-80 transition-opacity"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Charts Section */}
                {activeSection === "charts" && (
                  <div className="space-y-3">
                    {chartItems.map((chart) => (
                      <button
                        key={chart.id}
                        onClick={() => handleToolClick(chart.id)}
                        className={cn(
                          "w-full p-4 rounded-lg border flex items-center gap-4 transition-all",
                          activeTool === chart.id
                            ? "bg-primary/10 border-primary"
                            : "bg-muted border-border hover:border-muted-foreground"
                        )}
                      >
                        <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center">
                          <chart.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">{chart.label}</p>
                          <p className="text-xs text-muted-foreground">
                            Click to add to slide
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Brand Styles Section */}
                {activeSection === "brand" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground uppercase mb-3">Brand Colors</h4>
                      <div className="grid grid-cols-6 gap-2">
                        {brandColors.map((color) => (
                          <button
                            key={color}
                            className="aspect-square rounded-lg border border-border hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground uppercase mb-3">Theme Presets</h4>
                      <div className="space-y-2">
                        {["Modern Dark", "Light Clean", "Corporate Blue", "Warm Sunset"].map((theme) => (
                          <button
                            key={theme}
                            className="w-full p-3 rounded-lg border border-border bg-muted hover:border-primary text-left transition-colors"
                          >
                            <span className="text-sm font-medium">{theme}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Uploads Section */}
                {activeSection === "uploads" && (
                  <div className="space-y-4">
                    <button className="w-full p-6 rounded-lg border-2 border-dashed border-border hover:border-primary bg-muted/50 transition-colors">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground text-center">
                        Upload your assets
                      </p>
                    </button>

                    <div className="text-center py-8">
                      <p className="text-sm text-muted-foreground">
                        No uploads yet
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        Uploaded files will appear here
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditorSidebar;
