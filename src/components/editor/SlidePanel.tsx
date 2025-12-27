import { useState } from "react";
import { motion, Reorder } from "framer-motion";
import { Plus, Copy, Trash2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Slide } from "./types";

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

  return (
    <aside className="w-48 bg-muted/30 border-r border-border flex flex-col shrink-0">
      {/* Header */}
      <div className="h-12 px-3 flex items-center justify-between border-b border-border shrink-0">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Slides
        </span>
        <button
          onClick={onAddSlide}
          className="p-1.5 rounded-md hover:bg-muted transition-colors"
          title="Add slide"
        >
          <Plus className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Slides List */}
      <div className="flex-1 overflow-y-auto p-3">
        <Reorder.Group
          axis="y"
          values={slides}
          onReorder={onReorderSlides}
          className="space-y-2"
        >
          {slides.map((slide, index) => (
            <Reorder.Item
              key={slide.id}
              value={slide}
              className="relative"
              onMouseEnter={() => setHoveredSlide(index)}
              onMouseLeave={() => setHoveredSlide(null)}
            >
              <motion.button
                onClick={() => onSelectSlide(index)}
                className={cn(
                  "w-full aspect-video rounded-lg border-2 transition-all relative overflow-hidden cursor-grab active:cursor-grabbing",
                  currentSlideIndex === index
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-muted-foreground"
                )}
                style={{ backgroundColor: slide.backgroundColor }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Slide Number */}
                <span className="absolute top-1 left-1 text-[10px] font-medium bg-background/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-foreground">
                  {index + 1}
                </span>

                {/* Mini Preview of Elements */}
                <div className="absolute inset-2 flex items-center justify-center">
                  {slide.elements.length > 0 ? (
                    <div className="w-full h-full relative">
                      {slide.elements.slice(0, 3).map((el) => (
                        <div
                          key={el.id}
                          className="absolute bg-muted-foreground/20 rounded"
                          style={{
                            left: `${(el.x / 960) * 100}%`,
                            top: `${(el.y / 540) * 100}%`,
                            width: `${(el.width / 960) * 100}%`,
                            height: `${(el.height / 540) * 100}%`,
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <span className="text-[8px] text-muted-foreground/50">
                      Empty slide
                    </span>
                  )}
                </div>

                {/* Hover Actions */}
                {hoveredSlide === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-1 right-1"
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 rounded bg-background/80 backdrop-blur-sm hover:bg-background"
                        >
                          <MoreVertical className="w-3 h-3" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onDuplicateSlide(index);
                          }}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
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
              </motion.button>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {/* Add Slide Button */}
        <button
          onClick={onAddSlide}
          className="w-full aspect-video mt-2 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center group"
        >
          <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
        </button>
      </div>
    </aside>
  );
};

export default SlidePanel;
