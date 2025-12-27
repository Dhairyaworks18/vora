import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slide, SlideElement, ToolType } from "./types";
import CanvasElement from "./CanvasElement";

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

const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 540;

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
  const [isDraggingNew, setIsDraggingNew] = useState(false);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      // Clicked on canvas background, deselect
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
    const id = `element-${Date.now()}`;
    let newElement: SlideElement | null = null;

    switch (activeTool) {
      case "text-heading":
        newElement = {
          id,
          type: "text",
          x: x - 150,
          y: y - 30,
          width: 300,
          height: 60,
          rotation: 0,
          content: "Add a heading",
          style: {
            fontSize: 48,
            fontFamily: "Space Grotesk",
            fontWeight: "bold",
            color: slide.backgroundColor === "#ffffff" ? "#000000" : "#ffffff",
            textAlign: "center",
          },
        };
        break;
      case "text-subheading":
        newElement = {
          id,
          type: "text",
          x: x - 120,
          y: y - 20,
          width: 240,
          height: 40,
          rotation: 0,
          content: "Add a subheading",
          style: {
            fontSize: 28,
            fontFamily: "Space Grotesk",
            fontWeight: "500",
            color: slide.backgroundColor === "#ffffff" ? "#000000" : "#ffffff",
            textAlign: "center",
          },
        };
        break;
      case "text-body":
        newElement = {
          id,
          type: "text",
          x: x - 100,
          y: y - 12,
          width: 200,
          height: 80,
          rotation: 0,
          content: "Add body text here. Click to edit.",
          style: {
            fontSize: 16,
            fontFamily: "DM Sans",
            fontWeight: "normal",
            color: slide.backgroundColor === "#ffffff" ? "#000000" : "#ffffff",
            textAlign: "left",
          },
        };
        break;
      case "shape-rectangle":
        newElement = {
          id,
          type: "shape",
          x: x - 75,
          y: y - 50,
          width: 150,
          height: 100,
          rotation: 0,
          shapeType: "rectangle",
          style: {
            backgroundColor: "#4169e1",
            borderRadius: 8,
          },
        };
        break;
      case "shape-circle":
        newElement = {
          id,
          type: "shape",
          x: x - 50,
          y: y - 50,
          width: 100,
          height: 100,
          rotation: 0,
          shapeType: "circle",
          style: {
            backgroundColor: "#8b5cf6",
            borderRadius: 9999,
          },
        };
        break;
      case "shape-triangle":
        newElement = {
          id,
          type: "shape",
          x: x - 50,
          y: y - 43,
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
          x: x - 75,
          y: y - 2,
          width: 150,
          height: 4,
          rotation: 0,
          shapeType: "line",
          style: {
            backgroundColor: "#1a1a2e",
          },
        };
        break;
      case "chart-bar":
        newElement = {
          id,
          type: "chart",
          x: x - 150,
          y: y - 100,
          width: 300,
          height: 200,
          rotation: 0,
          chartType: "bar",
          chartData: [
            { label: "A", value: 65 },
            { label: "B", value: 85 },
            { label: "C", value: 45 },
            { label: "D", value: 70 },
          ],
        };
        break;
      case "chart-line":
        newElement = {
          id,
          type: "chart",
          x: x - 150,
          y: y - 100,
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
          ],
        };
        break;
      case "chart-pie":
        newElement = {
          id,
          type: "chart",
          x: x - 100,
          y: y - 100,
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

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      if (selectedElementId && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        // Delete handled in parent
      }
    }
  }, [selectedElementId]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const zoomLevels = [50, 75, 100, 125, 150];

  return (
    <main className="flex-1 bg-muted/50 flex flex-col overflow-hidden">
      {/* Zoom Controls */}
      <div className="h-10 px-4 flex items-center justify-center gap-2 border-b border-border bg-background shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => onZoomChange(Math.max(50, zoom - 25))}
          disabled={zoom <= 50}
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <select
          value={zoom}
          onChange={(e) => onZoomChange(Number(e.target.value))}
          className="h-7 px-2 text-xs bg-muted border border-border rounded"
        >
          {zoomLevels.map((level) => (
            <option key={level} value={level}>
              {level}%
            </option>
          ))}
        </select>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => onZoomChange(Math.min(150, zoom + 25))}
          disabled={zoom >= 150}
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => onZoomChange(100)}
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-8">
        <motion.div
          ref={canvasRef}
          onClick={handleCanvasClick}
          className={cn(
            "relative shadow-2xl rounded-lg overflow-hidden",
            activeTool !== "select" && "cursor-crosshair"
          )}
          style={{
            width: CANVAS_WIDTH * (zoom / 100),
            height: CANVAS_HEIGHT * (zoom / 100),
            backgroundColor: slide.backgroundColor,
            backgroundImage: slide.backgroundGradient,
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Elements */}
          {slide.elements.map((element) => (
            <CanvasElement
              key={element.id}
              element={element}
              isSelected={selectedElementId === element.id}
              onSelect={() => onSelectElement(element.id)}
              onUpdate={(updates) => onUpdateElement(element.id, updates)}
              zoom={zoom}
            />
          ))}

          {/* Empty State */}
          {slide.elements.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className={cn(
                  "text-lg font-medium",
                  slide.backgroundColor === "#ffffff" ? "text-muted-foreground/50" : "text-white/30"
                )}>
                  Click anywhere to add elements
                </p>
                <p className={cn(
                  "text-sm mt-1",
                  slide.backgroundColor === "#ffffff" ? "text-muted-foreground/30" : "text-white/20"
                )}>
                  Select a tool from the sidebar
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
