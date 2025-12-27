import { useState, useRef, useCallback } from "react";
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
  Check,
  Sparkles,
  RectangleHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  ToolType, 
  SlideElement, 
  UploadedAsset,
  LAYOUT_TEMPLATES,
  THEME_PRESETS,
  BRAND_COLORS,
} from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface EditorSidebarProps {
  onSelectTool: (tool: ToolType) => void;
  activeTool: ToolType;
  onApplyLayout: (elements: Omit<SlideElement, 'id'>[]) => void;
  onAddImage: (imageUrl: string) => void;
  onApplyTheme: (theme: typeof THEME_PRESETS[0]) => void;
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
  { id: "charts" as const, icon: BarChart3, label: "Data" },
  { id: "brand" as const, icon: Palette, label: "Design" },
  { id: "uploads" as const, icon: Upload, label: "Uploads" },
];

const shapeItems = [
  { id: "shape-rectangle" as const, icon: Square, label: "Rectangle" },
  { id: "shape-rounded-rectangle" as const, icon: RectangleHorizontal, label: "Rounded" },
  { id: "shape-circle" as const, icon: Circle, label: "Circle" },
  { id: "shape-triangle" as const, icon: Triangle, label: "Triangle" },
  { id: "shape-line" as const, icon: Minus, label: "Line" },
];

const textItems = [
  { id: "text-heading" as const, icon: Heading1, label: "Heading", preview: "Add a heading", desc: "Large bold title" },
  { id: "text-subheading" as const, icon: Heading2, label: "Subheading", preview: "Add a subheading", desc: "Medium emphasis" },
  { id: "text-body" as const, icon: AlignLeft, label: "Body Text", preview: "Add body text", desc: "Regular paragraph" },
];

const chartItems = [
  { id: "chart-bar" as const, icon: BarChart3, label: "Bar Chart", desc: "Compare categories" },
  { id: "chart-line" as const, icon: TrendingUp, label: "Line Chart", desc: "Show trends" },
  { id: "chart-pie" as const, icon: PieChart, label: "Pie Chart", desc: "Show proportions" },
];

const stockImages = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop",
];

const EditorSidebar = ({ 
  onSelectTool, 
  activeTool, 
  onApplyLayout,
  onAddImage,
  onApplyTheme,
}: EditorSidebarProps) => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<SidebarSection>(null);
  const [uploadedAssets, setUploadedAssets] = useState<UploadedAsset[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSectionClick = (section: SidebarSection) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleToolClick = (tool: ToolType) => {
    onSelectTool(tool);
  };

  const handleLayoutClick = (layoutId: string) => {
    const layout = LAYOUT_TEMPLATES.find(l => l.id === layoutId);
    if (layout) {
      onApplyLayout(layout.elements);
      toast({
        title: "Layout applied",
        description: `${layout.name} layout has been applied to your slide.`,
      });
    }
  };

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const url = event.target?.result as string;
          const asset: UploadedAsset = {
            id: `asset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: file.name,
            url,
            type: 'image',
          };
          setUploadedAssets(prev => [...prev, asset]);
          toast({
            title: "Image uploaded",
            description: file.name,
          });
        };
        reader.readAsDataURL(file);
      }
    });
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [toast]);

  const handleStockImageClick = (url: string) => {
    onAddImage(url);
    toast({
      title: "Image added",
      description: "Stock image added to your slide.",
    });
  };

  const handleUploadedAssetClick = (asset: UploadedAsset) => {
    onAddImage(asset.url);
  };

  const handleThemeClick = (theme: typeof THEME_PRESETS[0]) => {
    setSelectedTheme(theme.id);
    onApplyTheme(theme);
    toast({
      title: "Theme applied",
      description: `${theme.name} theme has been applied.`,
    });
  };

  const renderLayoutPreview = (layoutId: string) => {
    switch (layoutId) {
      case 'title-only':
        return (
          <div className="w-full h-full flex items-center justify-center p-2">
            <div className="w-3/4 h-3 bg-foreground/40 rounded" />
          </div>
        );
      case 'title-subtitle':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 p-2">
            <div className="w-3/4 h-2.5 bg-foreground/40 rounded" />
            <div className="w-1/2 h-1.5 bg-foreground/20 rounded" />
          </div>
        );
      case 'title-content':
        return (
          <div className="w-full h-full flex flex-col p-2 gap-1">
            <div className="w-2/3 h-2 bg-foreground/40 rounded" />
            <div className="flex-1 flex flex-col gap-0.5 mt-1">
              <div className="w-full h-1 bg-foreground/15 rounded" />
              <div className="w-4/5 h-1 bg-foreground/15 rounded" />
              <div className="w-full h-1 bg-foreground/15 rounded" />
            </div>
          </div>
        );
      case 'two-column':
        return (
          <div className="w-full h-full flex flex-col p-2 gap-1">
            <div className="w-1/2 h-2 bg-foreground/40 rounded mx-auto" />
            <div className="flex-1 flex gap-1 mt-1">
              <div className="flex-1 bg-foreground/10 rounded" />
              <div className="flex-1 bg-foreground/10 rounded" />
            </div>
          </div>
        );
      case 'image-left':
        return (
          <div className="w-full h-full flex p-2 gap-1">
            <div className="w-1/2 bg-foreground/15 rounded" />
            <div className="w-1/2 flex flex-col gap-0.5 py-1">
              <div className="w-3/4 h-2 bg-foreground/40 rounded" />
              <div className="w-full h-1 bg-foreground/15 rounded mt-1" />
              <div className="w-4/5 h-1 bg-foreground/15 rounded" />
            </div>
          </div>
        );
      case 'full-visual':
        return (
          <div className="w-full h-full bg-foreground/20 rounded flex items-end justify-center p-2">
            <div className="w-2/3 h-2 bg-white/80 rounded" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full">
      {/* Icon Bar */}
      <aside className="w-[72px] bg-card border-r border-border flex flex-col items-center py-3 gap-0.5 shrink-0">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSectionClick(item.id)}
            className={cn(
              "w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200",
              activeSection === item.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-none">{item.label}</span>
          </button>
        ))}
      </aside>

      {/* Expanded Panel */}
      <AnimatePresence>
        {activeSection && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="bg-card border-r border-border overflow-hidden shrink-0"
          >
            <div className="w-[300px] h-full flex flex-col">
              {/* Panel Header */}
              <div className="h-14 px-4 flex items-center justify-between border-b border-border shrink-0">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {activeSection === "text" ? "Text Blocks" : 
                     activeSection === "elements" ? "Visual Assets" :
                     activeSection === "brand" ? "Design System" :
                     activeSection === "charts" ? "Data Visuals" :
                     activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {activeSection === "layouts" && "Apply pre-built layouts"}
                    {activeSection === "elements" && "Shapes and decorations"}
                    {activeSection === "text" && "Add text to your slide"}
                    {activeSection === "media" && "Images and videos"}
                    {activeSection === "charts" && "Charts and graphs"}
                    {activeSection === "brand" && "Colors and themes"}
                    {activeSection === "uploads" && "Your uploaded files"}
                  </p>
                </div>
                <button
                  onClick={() => setActiveSection(null)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Panel Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {/* Layouts Section */}
                {activeSection === "layouts" && (
                  <div className="grid grid-cols-2 gap-3">
                    {LAYOUT_TEMPLATES.map((layout) => (
                      <button
                        key={layout.id}
                        onClick={() => handleLayoutClick(layout.id)}
                        className="group flex flex-col gap-2"
                      >
                        <div className="aspect-video bg-muted rounded-lg border-2 border-border hover:border-primary transition-all duration-200 overflow-hidden group-hover:shadow-md">
                          {renderLayoutPreview(layout.id)}
                        </div>
                        <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                          {layout.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Elements Section */}
                {activeSection === "elements" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Basic Shapes
                      </h4>
                      <div className="grid grid-cols-5 gap-2">
                        {shapeItems.map((shape) => (
                          <button
                            key={shape.id}
                            onClick={() => handleToolClick(shape.id)}
                            className={cn(
                              "aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all duration-200",
                              activeTool === shape.id
                                ? "bg-primary/10 border-primary text-primary"
                                : "bg-muted/50 border-transparent hover:border-border hover:bg-muted"
                            )}
                          >
                            <shape.icon className="w-5 h-5" />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Quick Colors
                      </h4>
                      <div className="grid grid-cols-5 gap-2">
                        {BRAND_COLORS.slice(0, 10).map((color) => (
                          <button
                            key={color}
                            className="aspect-square rounded-lg border border-border hover:scale-110 transition-transform shadow-sm"
                            style={{ backgroundColor: color }}
                          />
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
                          "w-full p-4 rounded-xl border-2 text-left transition-all duration-200 group",
                          activeTool === text.id
                            ? "bg-primary/5 border-primary"
                            : "bg-muted/30 border-transparent hover:border-border hover:bg-muted/50"
                        )}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center",
                            activeTool === text.id ? "bg-primary/10" : "bg-background"
                          )}>
                            <text.icon className={cn(
                              "w-4 h-4",
                              activeTool === text.id ? "text-primary" : "text-muted-foreground"
                            )} />
                          </div>
                          <div>
                            <span className="text-sm font-medium block">{text.label}</span>
                            <span className="text-xs text-muted-foreground">{text.desc}</span>
                          </div>
                        </div>
                        <p className={cn(
                          "text-muted-foreground pl-11",
                          text.id === "text-heading" && "text-xl font-bold",
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
                  <div className="space-y-6">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full p-8 rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                    >
                      <Upload className="w-10 h-10 mx-auto text-muted-foreground group-hover:text-primary mb-3 transition-colors" />
                      <p className="text-sm font-medium text-foreground">
                        Upload Images
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </button>

                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Stock Library
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {stockImages.map((url, i) => (
                          <button
                            key={i}
                            onClick={() => handleStockImageClick(url)}
                            className="aspect-video rounded-lg overflow-hidden hover:ring-2 hover:ring-primary transition-all duration-200"
                          >
                            <img 
                              src={url} 
                              alt={`Stock ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
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
                          "w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all duration-200",
                          activeTool === chart.id
                            ? "bg-primary/5 border-primary"
                            : "bg-muted/30 border-transparent hover:border-border hover:bg-muted/50"
                        )}
                      >
                        <div className={cn(
                          "w-14 h-14 rounded-xl flex items-center justify-center",
                          activeTool === chart.id ? "bg-primary/10" : "bg-background border border-border"
                        )}>
                          <chart.icon className={cn(
                            "w-7 h-7",
                            activeTool === chart.id ? "text-primary" : "text-muted-foreground"
                          )} />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">{chart.label}</p>
                          <p className="text-xs text-muted-foreground">
                            {chart.desc}
                          </p>
                        </div>
                      </button>
                    ))}
                    
                    <div className="mt-6 p-4 bg-muted/30 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Pro Tip</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Double-click any chart to edit its data directly on the canvas.
                      </p>
                    </div>
                  </div>
                )}

                {/* Brand Styles Section */}
                {activeSection === "brand" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Brand Colors
                      </h4>
                      <div className="grid grid-cols-5 gap-2">
                        {BRAND_COLORS.map((color) => (
                          <button
                            key={color}
                            className="aspect-square rounded-lg border border-border hover:scale-110 transition-transform shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Theme Presets
                      </h4>
                      <div className="space-y-2">
                        {THEME_PRESETS.map((theme) => (
                          <button
                            key={theme.id}
                            onClick={() => handleThemeClick(theme)}
                            className={cn(
                              "w-full p-3 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3",
                              selectedTheme === theme.id
                                ? "border-primary bg-primary/5"
                                : "border-transparent bg-muted/30 hover:bg-muted/50 hover:border-border"
                            )}
                          >
                            <div className="flex gap-1">
                              {Object.values(theme.colors).slice(0, 4).map((color, i) => (
                                <div
                                  key={i}
                                  className="w-4 h-4 rounded-full border border-border/50"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium flex-1">{theme.name}</span>
                            {selectedTheme === theme.id && (
                              <Check className="w-4 h-4 text-primary" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Uploads Section */}
                {activeSection === "uploads" && (
                  <div className="space-y-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full p-6 rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                    >
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground group-hover:text-primary mb-2 transition-colors" />
                      <p className="text-sm text-muted-foreground group-hover:text-foreground text-center transition-colors">
                        Upload your assets
                      </p>
                    </button>

                    {uploadedAssets.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {uploadedAssets.map((asset) => (
                          <button
                            key={asset.id}
                            onClick={() => handleUploadedAssetClick(asset)}
                            className="aspect-video rounded-lg overflow-hidden hover:ring-2 hover:ring-primary transition-all duration-200 bg-muted"
                          >
                            <img 
                              src={asset.url} 
                              alt={asset.name}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                          <Image className="w-8 h-8 text-muted-foreground/50" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          No uploads yet
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-1">
                          Uploaded files will appear here
                        </p>
                      </div>
                    )}
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
