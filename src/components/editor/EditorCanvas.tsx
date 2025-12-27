import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, Maximize2, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slide, SlideElement, ToolType, CANVAS_WIDTH, CANVAS_HEIGHT } from "./types";
import CanvasElement from "./CanvasElement";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EditorCanvasProps {
  slide: Slide;
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<SlideElement>) => void;
  onAddElement: (element: SlideElement) => void;
  activeTool: ToolType;
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

const EditorCanvas = ({
  slide,
  selectedElementId,
  onSelectElement,
  onUpdateElement,
  onAddElement,
  activeTool,
  zoom,
  onZoomChange,
}: EditorCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [showGrid, setShowGrid] = useState(false);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Only deselect if clicking directly on canvas background
    if (target === canvasRef.current || target.classList.contains('canvas-background')) {
      if (activeTool === "select") {
        onSelectElement(null);
      } else {
        // Create new element at click position
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = (e.clientX - rect.left) / (zoom / 100);
        const y = (e.clientY - rect.top) / (zoom / 100);

        createElementAtPosition(x, y);
      }
    }
  }, [activeTool, zoom, onSelectElement]);

  const createElementAtPosition = (x: number, y: number) => {
    const id = `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    let newElement: SlideElement | null = null;

    const textColor = slide.backgroundColor === "#ffffff" || slide.backgroundColor === "#f8f9fa" 
      ? "#1a1a2e" 
      : "#ffffff";

    switch (activeTool) {
      case "text-heading":
        newElement = {
          id,
          type: "text",
          x: Math.max(20, x - 200),
          y: Math.max(20, y - 40),
          width: 400,
          height: 80,
          rotation: 0,
          content: "Add a heading",
          style: {
            fontSize: 48,
            fontFamily: "Space Grotesk",
            fontWeight: "bold",
            color: textColor,
            textAlign: "center",
          },
        };
        break;
      case "text-subheading":
        newElement = {
          id,
          type: "text",
          x: Math.max(20, x - 150),
          y: Math.max(20, y - 25),
          width: 300,
          height: 50,
          rotation: 0,
          content: "Add a subheading",
          style: {
            fontSize: 28,
            fontFamily: "Space Grotesk",
            fontWeight: "500",
            color: textColor,
            textAlign: "center",
          },
        };
        break;
      case "text-body":
        newElement = {
          id,
          type: "text",
          x: Math.max(20, x - 125),
          y: Math.max(20, y - 30),
          width: 250,
          height: 80,
          rotation: 0,
          content: "Add body text here. Click to edit.",
          style: {
            fontSize: 16,
            fontFamily: "DM Sans",
            fontWeight: "normal",
            color: textColor,
            textAlign: "left",
            lineHeight: 1.5,
          },
        };
        break;
      case "shape-rectangle":
        newElement = {
          id,
          type: "shape",
          x: Math.max(20, x - 75),
          y: Math.max(20, y - 50),
          width: 150,
          height: 100,
          rotation: 0,
          shapeType: "rectangle",
          style: {
            backgroundColor: "#4169e1",
            borderRadius: 0,
          },
        };
        break;
      case "shape-rounded-rectangle":
        newElement = {
          id,
          type: "shape",
          x: Math.max(20, x - 75),
          y: Math.max(20, y - 50),
          width: 150,
          height: 100,
          rotation: 0,
          shapeType: "rounded-rectangle",
          style: {
            backgroundColor: "#4169e1",
            borderRadius: 12,
          },
        };
        break;
      case "shape-circle":
        newElement = {
          id,
          type: "shape",
          x: Math.max(20, x - 50),
          y: Math.max(20, y - 50),
          width: 100,
          height: 100,
          rotation: 0,
          shapeType: "circle",
          style: {
            backgroundColor: "#8b5cf6",
          },
        };
        break;
      case "shape-triangle":
        newElement = {
          id,
          type: "shape",
          x: Math.max(20, x - 50),
          y: Math.max(20, y - 43),
          width: 100,
          height: 86,
          rotation: 0,
          shapeType: "triangle",
          style: {
            backgroundColor: "#ff6b4a",
          },
        };
        break;
      case "shape-line":
        newElement = {
          id,
          type: "shape",
          x: Math.max(20, x - 75),
          y: Math.max(20, y - 2),
          width: 150,
          height: 4,
          rotation: 0,
          shapeType: "line",
          style: {
            backgroundColor: "#1a1a2e",
          },
        };
        break;
      case "image":
        newElement = {
          id,
          type: "image",
          x: Math.max(20, x - 100),
          y: Math.max(20, y - 75),
          width: 200,
          height: 150,
          rotation: 0,
          imageUrl: "",
          imageFit: "cover",
        };
        break;
      case "chart-bar":
        newElement = {
          id,
          type: "chart",
          x: Math.max(20, x - 150),
          y: Math.max(20, y - 100),
          width: 300,
          height: 200,
          rotation: 0,
          chartType: "bar",
          chartData: [
            { label: "Q1", value: 65 },
            { label: "Q2", value: 85 },
            { label: "Q3", value: 45 },
            { label: "Q4", value: 70 },
          ],
        };
        break;
      case "chart-line":
        newElement = {
          id,
          type: "chart",
          x: Math.max(20, x - 150),
          y: Math.max(20, y - 100),
          width: 300,
          height: 200,
          rotation: 0,
          chartType: "line",
          chartData: [
            { label: "Jan", value: 30 },
            { label: "Feb", value: 45 },
            { label: "Mar", value: 35 },
            { label: "Apr", value: 60 },
            { label: "May", value: 55 },
            { label: "Jun", value: 75 },
          ],
        };
        break;
      case "chart-pie":
        newElement = {
          id,
          type: "chart",
          x: Math.max(20, x - 100),
          y: Math.max(20, y - 100),
          width: 200,
          height: 200,
          rotation: 0,
          chartType: "pie",
          chartData: [
            { label: "A", value: 35 },
            { label: "B", value: 25 },
            { label: "C", value: 20 },
            { label: "D", value: 20 },
          ],
        };
        break;
    }

    if (newElement) {
      onAddElement(newElement);
      onSelectElement(newElement.id);
    }
  };

  const zoomLevels = [50, 75, 100, 125, 150];

  return (
    <main className="flex-1 bg-[#f5f5f7] flex flex-col overflow-hidden relative">
      {/* Zoom Controls */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={showGrid ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setShowGrid(!showGrid)}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle grid</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onZoomChange(Math.max(50, zoom - 25))}
                  disabled={zoom <= 50}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom out</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <select
            value={zoom}
            onChange={(e) => onZoomChange(Number(e.target.value))}
            className="h-8 px-3 text-sm bg-background border border-border rounded-md cursor-pointer hover:border-muted-foreground transition-colors"
          >
            {zoomLevels.map((level) => (
              <option key={level} value={level}>
                {level}%
              </option>
            ))}
          </select>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onZoomChange(Math.min(150, zoom + 25))}
                  disabled={zoom >= 150}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom in</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="w-px h-5 bg-border mx-1" />
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onZoomChange(100)}
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset zoom</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="w-[88px]" /> {/* Spacer for balance */}
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-8">
        <motion.div
          ref={canvasRef}
          onClick={handleCanvasClick}
          className={cn(
            "relative rounded-lg overflow-hidden transition-shadow duration-300",
            activeTool !== "select" && "cursor-crosshair"
          )}
          style={{
            width: CANVAS_WIDTH * (zoom / 100),
            height: CANVAS_HEIGHT * (zoom / 100),
            backgroundColor: slide.backgroundColor,
            backgroundImage: slide.backgroundGradient || (slide.backgroundImage ? `url(${slide.backgroundImage})` : undefined),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Grid Overlay */}
          {showGrid && (
            <div 
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
                `,
                backgroundSize: `${40 * (zoom / 100)}px ${40 * (zoom / 100)}px`,
              }}
            />
          )}

          {/* Canvas Background (for click detection) */}
          <div className="canvas-background absolute inset-0" />

          {/* Elements */}
          {slide.elements.map((element) => (
            <CanvasElement
              key={element.id}
              element={element}
              isSelected={selectedElementId === element.id}
              onSelect={() => onSelectElement(element.id)}
              onUpdate={(updates) => onUpdateElement(element.id, updates)}
              zoom={zoom}
              canvasRef={canvasRef}
            />
          ))}

          {/* Empty State */}
          {slide.elements.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center max-w-md px-8">
                <div className={cn(
                  "w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center",
                  slide.backgroundColor === "#ffffff" || slide.backgroundColor === "#f8f9fa"
                    ? "bg-muted"
                    : "bg-white/10"
                )}>
                  <svg
                    className={cn(
                      "w-8 h-8",
                      slide.backgroundColor === "#ffffff" || slide.backgroundColor === "#f8f9fa"
                        ? "text-muted-foreground"
                        : "text-white/50"
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <p className={cn(
                  "text-lg font-medium mb-1",
                  slide.backgroundColor === "#ffffff" || slide.backgroundColor === "#f8f9fa"
                    ? "text-muted-foreground"
                    : "text-white/60"
                )}>
                  Start creating
                </p>
                <p className={cn(
                  "text-sm",
                  slide.backgroundColor === "#ffffff" || slide.backgroundColor === "#f8f9fa"
                    ? "text-muted-foreground/70"
                    : "text-white/40"
                )}>
                  Select a tool from the sidebar or apply a layout template
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default EditorCanvas;
