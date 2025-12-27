import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SlideElement } from "./types";

interface CanvasElementProps {
  element: SlideElement;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<SlideElement>) => void;
  zoom: number;
}

const CanvasElement = ({
  element,
  isSelected,
  onSelect,
  onUpdate,
  zoom,
}: CanvasElementProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const textRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  const scale = zoom / 100;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
    
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - element.x * scale,
        y: e.clientY - element.y * scale,
      });
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent, handle: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      width: element.width,
      height: element.height,
      x: e.clientX,
      y: e.clientY,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = (e.clientX - dragStart.x) / scale;
        const newY = (e.clientY - dragStart.y) / scale;
        onUpdate({ x: Math.max(0, newX), y: Math.max(0, newY) });
      }
      
      if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        const newWidth = Math.max(50, resizeStart.width + deltaX / scale);
        const newHeight = Math.max(30, resizeStart.height + deltaY / scale);
        onUpdate({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeStart, scale, onUpdate]);

  const handleDoubleClick = () => {
    if (element.type === "text") {
      setIsEditing(true);
      setTimeout(() => textRef.current?.focus(), 0);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleTextInput = (e: React.FormEvent<HTMLDivElement>) => {
    onUpdate({ content: e.currentTarget.textContent || "" });
  };

  const renderElement = () => {
    switch (element.type) {
      case "text":
        return (
          <div
            ref={textRef}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={handleBlur}
            onInput={handleTextInput}
            className={cn(
              "w-full h-full outline-none cursor-move",
              isEditing && "cursor-text"
            )}
            style={{
              fontSize: element.style?.fontSize,
              fontFamily: element.style?.fontFamily,
              fontWeight: element.style?.fontWeight,
              color: element.style?.color,
              textAlign: element.style?.textAlign,
              lineHeight: 1.2,
            }}
          >
            {element.content}
          </div>
        );

      case "shape":
        if (element.shapeType === "triangle") {
          return (
            <div
              className="w-full h-full"
              style={{
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                backgroundColor: element.style?.backgroundColor,
              }}
            />
          );
        }
        return (
          <div
            className="w-full h-full"
            style={{
              backgroundColor: element.style?.backgroundColor,
              borderRadius: element.shapeType === "circle" ? "50%" : element.style?.borderRadius,
            }}
          />
        );

      case "chart":
        return (
          <div className="w-full h-full bg-card rounded-lg border border-border p-4 flex items-end justify-around gap-2">
            {element.chartType === "bar" && element.chartData?.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className="w-full bg-primary rounded-t"
                  style={{ height: `${item.value}%` }}
                />
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </div>
            ))}
            {element.chartType === "pie" && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary via-secondary to-accent" />
              </div>
            )}
            {element.chartType === "line" && (
              <svg className="w-full h-full" viewBox="0 0 300 150">
                <polyline
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  points={element.chartData?.map((item, i) => 
                    `${i * 75},${150 - item.value * 1.5}`
                  ).join(" ")}
                />
              </svg>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={elementRef}
      className={cn(
        "absolute",
        isSelected && "ring-2 ring-primary ring-offset-2",
        isDragging && "cursor-grabbing"
      )}
      style={{
        left: element.x * scale,
        top: element.y * scale,
        width: element.width * scale,
        height: element.height * scale,
        transform: `rotate(${element.rotation}deg)`,
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      {renderElement()}

      {/* Resize Handles */}
      {isSelected && !isEditing && (
        <>
          {/* Corner handles */}
          <div
            className="absolute -right-1.5 -bottom-1.5 w-3 h-3 bg-primary rounded-full cursor-se-resize z-10"
            onMouseDown={(e) => handleResizeMouseDown(e, "se")}
          />
          <div
            className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-primary rounded-full cursor-nw-resize z-10"
            onMouseDown={(e) => handleResizeMouseDown(e, "nw")}
          />
          <div
            className="absolute -right-1.5 -top-1.5 w-3 h-3 bg-primary rounded-full cursor-ne-resize z-10"
            onMouseDown={(e) => handleResizeMouseDown(e, "ne")}
          />
          <div
            className="absolute -left-1.5 -bottom-1.5 w-3 h-3 bg-primary rounded-full cursor-sw-resize z-10"
            onMouseDown={(e) => handleResizeMouseDown(e, "sw")}
          />
        </>
      )}
    </motion.div>
  );
};

export default CanvasElement;
