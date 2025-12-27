import { 
  Undo2, 
  Redo2, 
  Bold, 
  Italic, 
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Layers,
  ArrowUp,
  ArrowDown,
  Palette,
  Share2,
  Play,
  Save,
  ArrowLeft,
  ChevronDown,
  Trash2,
  Copy,
  Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { SlideElement, BRAND_COLORS } from "./types";

interface EditorToolbarProps {
  presentationTitle: string;
  onBack: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  selectedElement: SlideElement | null;
  onUpdateElement: (updates: Partial<SlideElement>) => void;
  onBringForward: () => void;
  onSendBackward: () => void;
  onDeleteElement: () => void;
  onDuplicateElement: () => void;
  onSave: () => void;
  isSaving: boolean;
  slideBackgroundColor: string;
  onChangeSlideBackground: (color: string) => void;
  onPresent: () => void;
}

const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96];
const fontFamilies = [
  { label: "Space Grotesk", value: "Space Grotesk" },
  { label: "DM Sans", value: "DM Sans" },
  { label: "Inter", value: "Inter" },
  { label: "Roboto", value: "Roboto" },
  { label: "Arial", value: "Arial" },
  { label: "Georgia", value: "Georgia" },
];

const backgroundColors = [
  "#ffffff",
  "#f8f9fa",
  "#f1f5f9",
  "#e5e7eb",
  "#1a1a2e",
  "#16213e",
  "#0f3460",
  "#1e3a5f",
  "#2d4a6f",
  "#000000",
];

const EditorToolbar = ({
  presentationTitle,
  onBack,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  selectedElement,
  onUpdateElement,
  onBringForward,
  onSendBackward,
  onDeleteElement,
  onDuplicateElement,
  onSave,
  isSaving,
  slideBackgroundColor,
  onChangeSlideBackground,
  onPresent,
}: EditorToolbarProps) => {
  const isTextElement = selectedElement?.type === 'text';
  const isShapeElement = selectedElement?.type === 'shape';
  const isImageElement = selectedElement?.type === 'image';

  const updateTextStyle = (key: string, value: string | number | boolean) => {
    if (!selectedElement) return;
    onUpdateElement({
      style: {
        ...selectedElement.style,
        [key]: value,
      },
    });
  };

  const updateOpacity = (value: number[]) => {
    if (!selectedElement) return;
    onUpdateElement({ opacity: value[0] });
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 shrink-0 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden md:inline">Back</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Return to dashboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="h-6 w-px bg-border" />
        
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground truncate max-w-[200px]">
            {presentationTitle}
          </span>
        </div>
      </div>

      {/* Center Section - Formatting Tools */}
      <div className="flex items-center gap-1">
        {/* Undo/Redo */}
        <div className="flex items-center gap-0.5 mr-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onUndo}
                  disabled={!canUndo}
                  className="h-9 w-9"
                >
                  <Undo2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onRedo}
                  disabled={!canRedo}
                  className="h-9 w-9"
                >
                  <Redo2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo (Ctrl+Shift+Z)</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="h-6 w-px bg-border mx-1" />

        {/* Text Formatting (when text element selected) */}
        {isTextElement && (
          <>
            {/* Font Family */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 gap-1.5 min-w-[120px] justify-between">
                  <span className="text-sm truncate">
                    {selectedElement.style?.fontFamily || "DM Sans"}
                  </span>
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {fontFamilies.map((font) => (
                  <DropdownMenuItem
                    key={font.value}
                    onClick={() => updateTextStyle("fontFamily", font.value)}
                    style={{ fontFamily: font.value }}
                    className={cn(
                      selectedElement.style?.fontFamily === font.value && "bg-muted"
                    )}
                  >
                    {font.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Font Size */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 gap-1 min-w-[70px] justify-between">
                  <span className="text-sm">
                    {selectedElement.style?.fontSize || 16}
                  </span>
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-64 overflow-y-auto">
                {fontSizes.map((size) => (
                  <DropdownMenuItem
                    key={size}
                    onClick={() => updateTextStyle("fontSize", size)}
                    className={cn(
                      selectedElement.style?.fontSize === size && "bg-muted"
                    )}
                  >
                    {size}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="h-6 w-px bg-border mx-1" />

            {/* Bold/Italic/Underline */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => updateTextStyle("fontWeight", selectedElement.style?.fontWeight === "bold" ? "normal" : "bold")}
                    className={cn("h-9 w-9", selectedElement.style?.fontWeight === "bold" && "bg-muted")}
                  >
                    <Bold className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Bold</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => updateTextStyle("italic", !selectedElement.style?.italic)}
                    className={cn("h-9 w-9", selectedElement.style?.italic && "bg-muted")}
                  >
                    <Italic className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Italic</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => updateTextStyle("underline", !selectedElement.style?.underline)}
                    className={cn("h-9 w-9", selectedElement.style?.underline && "bg-muted")}
                  >
                    <Underline className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Underline</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="h-6 w-px bg-border mx-1" />

            {/* Text Alignment */}
            <div className="flex items-center gap-0.5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateTextStyle("textAlign", "left")}
                      className={cn("h-9 w-9", selectedElement.style?.textAlign === "left" && "bg-muted")}
                    >
                      <AlignLeft className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Align left</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateTextStyle("textAlign", "center")}
                      className={cn("h-9 w-9", (!selectedElement.style?.textAlign || selectedElement.style?.textAlign === "center") && "bg-muted")}
                    >
                      <AlignCenter className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Align center</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateTextStyle("textAlign", "right")}
                      className={cn("h-9 w-9", selectedElement.style?.textAlign === "right" && "bg-muted")}
                    >
                      <AlignRight className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Align right</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="h-6 w-px bg-border mx-1" />

            {/* Text Color */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 gap-2 px-2">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-bold">A</span>
                    <div
                      className="w-5 h-1 rounded-full -mt-0.5"
                      style={{ backgroundColor: selectedElement.style?.color || "#000000" }}
                    />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3">
                <p className="text-xs font-medium text-muted-foreground mb-2">Text Color</p>
                <div className="grid grid-cols-5 gap-1.5">
                  {BRAND_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => updateTextStyle("color", color)}
                      className={cn(
                        "w-7 h-7 rounded-md border-2 hover:scale-110 transition-transform",
                        selectedElement.style?.color === color ? "border-primary" : "border-transparent"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </>
        )}

        {/* Shape/Image Color & Opacity */}
        {(isShapeElement || isImageElement) && (
          <>
            {isShapeElement && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 gap-2">
                    <div
                      className="w-5 h-5 rounded border border-border"
                      style={{ backgroundColor: selectedElement.style?.backgroundColor || "#4169e1" }}
                    />
                    <span className="text-sm hidden lg:inline">Fill</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Fill Color</p>
                  <div className="grid grid-cols-5 gap-1.5">
                    {BRAND_COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => updateTextStyle("backgroundColor", color)}
                        className={cn(
                          "w-7 h-7 rounded-md border-2 hover:scale-110 transition-transform",
                          selectedElement.style?.backgroundColor === color ? "border-primary" : "border-transparent"
                        )}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            )}

            {/* Opacity */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 gap-2">
                  <Settings2 className="w-4 h-4" />
                  <span className="text-sm hidden lg:inline">
                    {selectedElement.opacity !== undefined ? `${selectedElement.opacity}%` : '100%'}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4">
                <p className="text-xs font-medium text-muted-foreground mb-3">Opacity</p>
                <Slider
                  value={[selectedElement.opacity !== undefined ? selectedElement.opacity : 100]}
                  onValueChange={updateOpacity}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </PopoverContent>
            </Popover>
          </>
        )}

        {/* Layer Controls (when element selected) */}
        {selectedElement && (
          <>
            <div className="h-6 w-px bg-border mx-1" />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 gap-1.5">
                  <Layers className="w-4 h-4" />
                  <span className="text-sm hidden lg:inline">Layer</span>
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={onBringForward}>
                  <ArrowUp className="w-4 h-4 mr-2" />
                  Bring Forward
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onSendBackward}>
                  <ArrowDown className="w-4 h-4 mr-2" />
                  Send Backward
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onDuplicateElement}>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDeleteElement} className="text-destructive focus:text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}

        {/* Background Color (always visible) */}
        <div className="h-6 w-px bg-border mx-1" />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-9 gap-2">
              <Palette className="w-4 h-4" />
              <div
                className="w-5 h-5 rounded border border-border"
                style={{ backgroundColor: slideBackgroundColor }}
              />
              <span className="text-sm hidden xl:inline">Background</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3">
            <p className="text-xs font-medium text-muted-foreground mb-2">Slide Background</p>
            <div className="grid grid-cols-5 gap-1.5">
              {backgroundColors.map((color) => (
                <button
                  key={color}
                  onClick={() => onChangeSlideBackground(color)}
                  className={cn(
                    "w-8 h-8 rounded-md border-2 hover:scale-110 transition-transform",
                    slideBackgroundColor === color ? "border-primary ring-2 ring-primary/20" : "border-border"
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          <span className="hidden lg:inline">Share</span>
        </Button>
        
        <Button variant="outline" size="sm" className="gap-2" onClick={onPresent}>
          <Play className="w-4 h-4" />
          <span className="hidden lg:inline">Present</span>
        </Button>
        
        <Button 
          size="sm" 
          onClick={onSave} 
          disabled={isSaving}
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </header>
  );
};

export default EditorToolbar;
