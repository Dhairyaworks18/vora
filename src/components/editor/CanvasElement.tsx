import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SlideElement, CANVAS_WIDTH, CANVAS_HEIGHT } from "./types";
import { RotateCw } from "lucide-react";

interface CanvasElementProps {
  element: SlideElement;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<SlideElement>) => void;
  zoom: number;
  canvasRef: React.RefObject<HTMLDivElement>;
}

const CanvasElement = ({
  element,
  isSelected,
  onSelect,
  onUpdate,
  zoom,
  canvasRef,
}: CanvasElementProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, elementX: 0, elementY: 0 });
  const [resizeStart, setResizeStart] = useState({ 
    width: 0, height: 0, x: 0, y: 0, 
    elementX: 0, elementY: 0, handle: '' 
  });
  const [rotateStart, setRotateStart] = useState({ angle: 0, startAngle: 0 });
  
  const textRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  const scale = zoom / 100;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
    
    if (e.button === 0 && !isEditing) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX,
        y: e.clientY,
        elementX: element.x,
        elementY: element.y,
      });
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent, handle: string) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    setResizeStart({
      width: element.width,
      height: element.height,
      x: e.clientX,
      y: e.clientY,
      elementX: element.x,
      elementY: element.y,
      handle,
    });
  };

  const handleRotateMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    const rect = elementRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    
    setIsRotating(true);
    setRotateStart({
      angle: element.rotation,
      startAngle,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = (e.clientX - dragStart.x) / scale;
        const deltaY = (e.clientY - dragStart.y) / scale;
        
        let newX = dragStart.elementX + deltaX;
        let newY = dragStart.elementY + deltaY;
        
        // Constrain to canvas bounds
        newX = Math.max(0, Math.min(CANVAS_WIDTH - element.width, newX));
        newY = Math.max(0, Math.min(CANVAS_HEIGHT - element.height, newY));
        
        onUpdate({ x: newX, y: newY });
      }
      
      if (isResizing) {
        const deltaX = (e.clientX - resizeStart.x) / scale;
        const deltaY = (e.clientY - resizeStart.y) / scale;
        const { handle } = resizeStart;
        
        let newWidth = resizeStart.width;
        let newHeight = resizeStart.height;
        let newX = resizeStart.elementX;
        let newY = resizeStart.elementY;
        
        // Handle different resize directions
        if (handle.includes('e')) {
          newWidth = Math.max(40, resizeStart.width + deltaX);
        }
        if (handle.includes('w')) {
          const widthChange = Math.min(deltaX, resizeStart.width - 40);
          newWidth = resizeStart.width - widthChange;
          newX = resizeStart.elementX + widthChange;
        }
        if (handle.includes('s')) {
          newHeight = Math.max(20, resizeStart.height + deltaY);
        }
        if (handle.includes('n')) {
          const heightChange = Math.min(deltaY, resizeStart.height - 20);
          newHeight = resizeStart.height - heightChange;
          newY = resizeStart.elementY + heightChange;
        }
        
        onUpdate({ width: newWidth, height: newHeight, x: newX, y: newY });
      }
      
      if (isRotating) {
        const rect = elementRef.current?.getBoundingClientRect();
        if (!rect) return;
        
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
        const deltaAngle = currentAngle - rotateStart.startAngle;
        
        let newRotation = rotateStart.angle + deltaAngle;
        
        // Snap to 15 degree increments when shift is held
        if (e.shiftKey) {
          newRotation = Math.round(newRotation / 15) * 15;
        }
        
        onUpdate({ rotation: newRotation });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setIsRotating(false);
    };

    if (isDragging || isResizing || isRotating) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, isRotating, dragStart, resizeStart, rotateStart, scale, onUpdate, element]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (element.type === "text") {
      setIsEditing(true);
      setTimeout(() => {
        textRef.current?.focus();
        // Select all text
        const selection = window.getSelection();
        const range = document.createRange();
        if (textRef.current && selection) {
          range.selectNodeContents(textRef.current);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }, 0);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleTextInput = (e: React.FormEvent<HTMLDivElement>) => {
    onUpdate({ content: e.currentTarget.textContent || "" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      textRef.current?.blur();
    }
  };

  const renderElement = () => {
    const opacity = element.opacity !== undefined ? element.opacity / 100 : 1;
    
    switch (element.type) {
      case "text":
        return (
          <div
            ref={textRef}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={handleBlur}
            onInput={handleTextInput}
            onKeyDown={handleKeyDown}
            className={cn(
              "w-full h-full outline-none overflow-hidden",
              !isEditing && "cursor-move",
              isEditing && "cursor-text ring-2 ring-primary/50 rounded"
            )}
            style={{
              fontSize: element.style?.fontSize,
              fontFamily: element.style?.fontFamily,
              fontWeight: element.style?.fontWeight,
              fontStyle: element.style?.italic ? 'italic' : 'normal',
              textDecoration: element.style?.underline ? 'underline' : 'none',
              color: element.style?.color,
              textAlign: element.style?.textAlign,
              lineHeight: element.style?.lineHeight || 1.3,
              letterSpacing: element.style?.letterSpacing,
              opacity,
              wordBreak: 'break-word',
            }}
          >
            {element.content}
          </div>
        );

      case "shape":
        if (element.shapeType === "triangle") {
          return (
            <div
              className="w-full h-full transition-colors"
              style={{
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                backgroundColor: element.style?.backgroundColor,
                opacity,
              }}
            />
          );
        }
        if (element.shapeType === "line") {
          return (
            <div
              className="w-full transition-colors"
              style={{
                height: Math.max(2, element.height),
                backgroundColor: element.style?.backgroundColor,
                opacity,
              }}
            />
          );
        }
        return (
          <div
            className="w-full h-full transition-colors"
            style={{
              backgroundColor: element.style?.backgroundColor,
              borderRadius: element.shapeType === "circle" 
                ? "50%" 
                : element.shapeType === "rounded-rectangle"
                ? element.style?.borderRadius || 12
                : element.style?.borderRadius || 0,
              borderWidth: element.style?.borderWidth,
              borderColor: element.style?.borderColor,
              borderStyle: element.style?.borderWidth ? 'solid' : 'none',
              opacity,
            }}
          />
        );

      case "image":
        return (
          <div 
            className="w-full h-full overflow-hidden rounded"
            style={{ opacity }}
          >
            {element.imageUrl ? (
              <img
                src={element.imageUrl}
                alt=""
                className="w-full h-full"
                style={{ 
                  objectFit: element.imageFit || 'cover',
                }}
                draggable={false}
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded">
                <span className="text-muted-foreground text-sm">Image</span>
              </div>
            )}
          </div>
        );

      case "chart":
        return (
          <div 
            className="w-full h-full bg-card rounded-xl border border-border p-4 flex flex-col"
            style={{ opacity }}
          >
            {element.chartType === "bar" && (
              <div className="flex-1 flex items-end justify-around gap-2 pt-4">
                {element.chartData?.map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 flex-1">
                    <div
                      className="w-full rounded-t-md transition-all hover:opacity-80"
                      style={{ 
                        height: `${Math.max(10, item.value)}%`,
                        backgroundColor: element.chartColors?.[i] || CHART_COLORS[i % CHART_COLORS.length],
                      }}
                    />
                    <span className="text-[10px] text-muted-foreground font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            )}
            {element.chartType === "pie" && (
              <div className="flex-1 flex items-center justify-center">
                <div 
                  className="w-[80%] aspect-square rounded-full"
                  style={{
                    background: `conic-gradient(${element.chartData?.map((item, i, arr) => {
                      const total = arr.reduce((sum, d) => sum + d.value, 0);
                      const start = arr.slice(0, i).reduce((sum, d) => sum + d.value, 0) / total * 360;
                      const end = start + (item.value / total * 360);
                      const color = element.chartColors?.[i] || CHART_COLORS[i % CHART_COLORS.length];
                      return `${color} ${start}deg ${end}deg`;
                    }).join(', ')})`,
                  }}
                />
              </div>
            )}
            {element.chartType === "line" && (
              <svg className="w-full flex-1" viewBox="0 0 300 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`gradient-${element.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  fill={`url(#gradient-${element.id})`}
                  d={`M0,${120 - (element.chartData?.[0]?.value || 0) * 1.1} ${element.chartData?.map((item, i) => 
                    `L${i * (300 / Math.max(1, (element.chartData?.length || 1) - 1))},${120 - item.value * 1.1}`
                  ).join(' ')} L300,120 L0,120 Z`}
                />
                <polyline
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={element.chartData?.map((item, i) => 
                    `${i * (300 / Math.max(1, (element.chartData?.length || 1) - 1))},${120 - item.value * 1.1}`
                  ).join(" ")}
                />
                {element.chartData?.map((item, i) => (
                  <circle
                    key={i}
                    cx={i * (300 / Math.max(1, (element.chartData?.length || 1) - 1))}
                    cy={120 - item.value * 1.1}
                    r="4"
                    fill="hsl(var(--primary))"
                  />
                ))}
              </svg>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const CHART_COLORS = ['#4169e1', '#ff6b4a', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];

  return (
    <motion.div
      ref={elementRef}
      className={cn(
        "absolute group",
        isSelected && !isEditing && "ring-2 ring-primary",
        isDragging && "cursor-grabbing z-50",
        !isDragging && !isEditing && "cursor-move"
      )}
      style={{
        left: element.x * scale,
        top: element.y * scale,
        width: element.width * scale,
        height: element.height * scale,
        transform: `rotate(${element.rotation}deg)`,
        transformOrigin: 'center center',
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      initial={false}
      animate={{
        boxShadow: isSelected ? '0 0 0 1px hsl(var(--primary))' : 'none',
      }}
    >
      {renderElement()}

      {/* Selection Handles */}
      {isSelected && !isEditing && (
        <>
          {/* Corner resize handles */}
          <div
            className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-primary rounded-full cursor-nw-resize z-20 shadow-sm hover:scale-125 transition-transform"
            onMouseDown={(e) => handleResizeMouseDown(e, "nw")}
          />
          <div
            className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-primary rounded-full cursor-ne-resize z-20 shadow-sm hover:scale-125 transition-transform"
            onMouseDown={(e) => handleResizeMouseDown(e, "ne")}
          />
          <div
            className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-primary rounded-full cursor-sw-resize z-20 shadow-sm hover:scale-125 transition-transform"
            onMouseDown={(e) => handleResizeMouseDown(e, "sw")}
          />
          <div
            className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-primary rounded-full cursor-se-resize z-20 shadow-sm hover:scale-125 transition-transform"
            onMouseDown={(e) => handleResizeMouseDown(e, "se")}
          />
          
          {/* Edge resize handles */}
          <div
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-2 bg-primary rounded-full cursor-n-resize z-20 opacity-0 group-hover:opacity-100 transition-opacity"
            onMouseDown={(e) => handleResizeMouseDown(e, "n")}
          />
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-2 bg-primary rounded-full cursor-s-resize z-20 opacity-0 group-hover:opacity-100 transition-opacity"
            onMouseDown={(e) => handleResizeMouseDown(e, "s")}
          />
          <div
            className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-6 bg-primary rounded-full cursor-w-resize z-20 opacity-0 group-hover:opacity-100 transition-opacity"
            onMouseDown={(e) => handleResizeMouseDown(e, "w")}
          />
          <div
            className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-6 bg-primary rounded-full cursor-e-resize z-20 opacity-0 group-hover:opacity-100 transition-opacity"
            onMouseDown={(e) => handleResizeMouseDown(e, "e")}
          />

          {/* Rotation handle */}
          <div
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-6 h-6 bg-background border-2 border-primary rounded-full cursor-grab z-20 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
            onMouseDown={handleRotateMouseDown}
          >
            <RotateCw className="w-3 h-3 text-primary" />
          </div>
          <div
            className="absolute -top-5 left-1/2 w-px h-4 bg-primary z-10"
            style={{ transform: 'translateX(-50%)' }}
          />
        </>
      )}
    </motion.div>
  );
};

export default CanvasElement;
