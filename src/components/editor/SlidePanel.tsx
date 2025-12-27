import { useState, useCallback } from "react";
import { motion, Reorder } from "framer-motion";
import { Plus, Copy, Trash2, MoreVertical, GripVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Slide, CANVAS_WIDTH, CANVAS_HEIGHT } from "./types";

interface SlidePanelProps {
  slides: Slide[];
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
  onAddSlide: () => void;
  onDuplicateSlide: (index: number) => void;
  onDeleteSlide: (index: number) => void;
  onReorderSlides: (newOrder: Slide[]) => void;
}

const SlidePanel = ({
  slides,
  currentSlideIndex,
  onSelectSlide,
  onAddSlide,
  onDuplicateSlide,
  onDeleteSlide,
  onReorderSlides,
}: SlidePanelProps) => {
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null);

  const renderMiniElement = useCallback((element: any, scale: number) => {
    const style: React.CSSProperties = {
      position: 'absolute',
      left: `${(element.x / CANVAS_WIDTH) * 100}%`,
      top: `${(element.y / CANVAS_HEIGHT) * 100}%`,
      width: `${(element.width / CANVAS_WIDTH) * 100}%`,
      height: `${(element.height / CANVAS_HEIGHT) * 100}%`,
      transform: `rotate(${element.rotation || 0}deg)`,
    };

    switch (element.type) {
      case 'text':
        return (
          <div
            key={element.id}
            style={style}
            className="overflow-hidden"
          >
            <div
              className="w-full h-full flex items-center"
              style={{
                fontSize: `${Math.max(4, (element.style?.fontSize || 16) * 0.08)}px`,
                fontFamily: element.style?.fontFamily,
                fontWeight: element.style?.fontWeight,
                color: element.style?.color,
                textAlign: element.style?.textAlign,
                lineHeight: 1,
              }}
            >
              <span className="truncate">{element.content?.slice(0, 20)}</span>
            </div>
          </div>
        );
      case 'shape':
        return (
          <div
            key={element.id}
            style={{
              ...style,
              backgroundColor: element.style?.backgroundColor,
              borderRadius: element.shapeType === 'circle' ? '50%' : 
                           element.shapeType === 'rounded-rectangle' ? '4px' : 
                           element.style?.borderRadius || 0,
              clipPath: element.shapeType === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : undefined,
            }}
          />
        );
      case 'chart':
        return (
          <div
            key={element.id}
            style={style}
            className="bg-muted-foreground/20 rounded flex items-center justify-center"
          >
            <div className="w-1/2 h-1/2 bg-muted-foreground/30 rounded" />
          </div>
        );
      case 'image':
        return (
          <div
            key={element.id}
            style={style}
            className="bg-muted-foreground/20 rounded overflow-hidden"
          >
            {element.imageUrl && (
              <img 
                src={element.imageUrl} 
                alt="" 
                className="w-full h-full object-cover"
              />
            )}
          </div>
        );
      default:
        return null;
    }
  }, []);

  return (
    <aside className="w-52 bg-muted/20 border-r border-border flex flex-col shrink-0">
      {/* Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-border shrink-0">
        <div>
          <span className="text-sm font-semibold text-foreground">
            Slides
          </span>
          <span className="text-xs text-muted-foreground ml-2">
            {slides.length}
          </span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onAddSlide}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Plus className="w-4 h-4 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Add slide</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Slides List */}
      <div className="flex-1 overflow-y-auto p-3">
        <Reorder.Group
          axis="y"
          values={slides}
          onReorder={onReorderSlides}
          className="space-y-3"
        >
          {slides.map((slide, index) => (
            <Reorder.Item
              key={slide.id}
              value={slide}
              className="relative group"
              onMouseEnter={() => setHoveredSlide(index)}
              onMouseLeave={() => setHoveredSlide(null)}
            >
              <motion.div
                onClick={() => onSelectSlide(index)}
                className={cn(
                  "relative rounded-lg overflow-hidden transition-all duration-200 cursor-pointer",
                  currentSlideIndex === index
                    ? "ring-2 ring-primary shadow-lg"
                    : "ring-1 ring-border hover:ring-muted-foreground"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Slide Thumbnail */}
                <div
                  className="aspect-video relative overflow-hidden"
                  style={{ 
                    backgroundColor: slide.backgroundColor,
                    backgroundImage: slide.backgroundGradient,
                  }}
                >
                  {/* Render mini elements */}
                  {slide.elements.map((el) => renderMiniElement(el, 0.15))}
                  
                  {/* Empty state */}
                  {slide.elements.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={cn(
                        "text-[8px]",
                        slide.backgroundColor === "#ffffff" || slide.backgroundColor === "#f8f9fa"
                          ? "text-muted-foreground/40"
                          : "text-white/30"
                      )}>
                        Empty
                      </span>
                    </div>
                  )}
                </div>

                {/* Slide Number Badge */}
                <div className={cn(
                  "absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[10px] font-medium",
                  currentSlideIndex === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-background/90 text-foreground backdrop-blur-sm"
                )}>
                  {index + 1}
                </div>

                {/* Drag Handle */}
                <div className={cn(
                  "absolute top-1/2 -translate-y-1/2 left-0 w-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing",
                )}>
                  <GripVertical className="w-3 h-3 text-muted-foreground" />
                </div>

                {/* Actions Dropdown */}
                {hoveredSlide === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-1.5 right-1.5"
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 rounded bg-background/90 backdrop-blur-sm hover:bg-background shadow-sm"
                        >
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onDuplicateSlide(index);
                          }}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteSlide(index);
                          }}
                          disabled={slides.length <= 1}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </motion.div>
                )}
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {/* Add Slide Button */}
        <button
          onClick={onAddSlide}
          className="w-full aspect-video mt-3 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 flex items-center justify-center group"
        >
          <div className="flex flex-col items-center gap-1">
            <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Add slide</span>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default SlidePanel;
