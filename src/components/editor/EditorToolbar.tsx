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
import { cn } from "@/lib/utils";
import { SlideElement } from "./types";

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
  onSave: () => void;
  isSaving: boolean;
  slideBackgroundColor: string;
  onChangeSlideBackground: (color: string) => void;
}

const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72];
const fontFamilies = [
  { label: "Space Grotesk", value: "Space Grotesk" },
  { label: "DM Sans", value: "DM Sans" },
  { label: "Inter", value: "Inter" },
  { label: "Roboto", value: "Roboto" },
  { label: "Arial", value: "Arial" },
];

const backgroundColors = [
  "#ffffff",
  "#f8f9fa",
  "#e9ecef",
  "#1a1a2e",
  "#16213e",
  "#0f3460",
  "#1e3a5f",
  "#2d4a6f",
];

const elementColors = [
  "#000000",
  "#ffffff",
  "#4169e1",
  "#ff6b4a",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#ec4899",
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
  onSave,
  isSaving,
  slideBackgroundColor,
  onChangeSlideBackground,
}: EditorToolbarProps) => {
  const isTextElement = selectedElement?.type === 'text';

  const updateTextStyle = (key: string, value: string | number) => {
    if (!selectedElement) return;
    onUpdateElement({
      style: {
        ...selectedElement.style,
        [key]: value,
      },
    });
  };

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 shrink-0">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="h-6 w-px bg-border" />
        <span className="font-medium text-foreground truncate max-w-[200px]">
          {presentationTitle}
        </span>
      </div>

      {/* Center Section - Formatting Tools */}
      <div className="flex items-center gap-1">
        {/* Undo/Redo */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onUndo}
          disabled={!canUndo}
          className="h-8 w-8"
        >
          <Undo2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRedo}
          disabled={!canRedo}
          className="h-8 w-8"
        >
          <Redo2 className="w-4 h-4" />
        </Button>

        <div className="h-6 w-px bg-border mx-2" />

        {/* Text Formatting (when text element selected) */}
        {isTextElement && (
          <>
            {/* Font Family */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-1 min-w-[100px] justify-between">
                  <span className="text-xs truncate">
                    {selectedElement.style?.fontFamily || "DM Sans"}
                  </span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {fontFamilies.map((font) => (
                  <DropdownMenuItem
                    key={font.value}
                    onClick={() => updateTextStyle("fontFamily", font.value)}
                    style={{ fontFamily: font.value }}
                  >
                    {font.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Font Size */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-1 min-w-[60px] justify-between">
                  <span className="text-xs">
                    {selectedElement.style?.fontSize || 16}
                  </span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {fontSizes.map((size) => (
                  <DropdownMenuItem
                    key={size}
                    onClick={() => updateTextStyle("fontSize", size)}
                  >
                    {size}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="h-6 w-px bg-border mx-1" />

            {/* Bold/Italic/Underline */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateTextStyle("fontWeight", selectedElement.style?.fontWeight === "bold" ? "normal" : "bold")}
              className={cn("h-8 w-8", selectedElement.style?.fontWeight === "bold" && "bg-muted")}
            >
              <Bold className="w-4 h-4" />
            </Button>

            <div className="h-6 w-px bg-border mx-1" />

            {/* Text Alignment */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateTextStyle("textAlign", "left")}
              className={cn("h-8 w-8", selectedElement.style?.textAlign === "left" && "bg-muted")}
            >
              <AlignLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateTextStyle("textAlign", "center")}
              className={cn("h-8 w-8", (!selectedElement.style?.textAlign || selectedElement.style?.textAlign === "center") && "bg-muted")}
            >
              <AlignCenter className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateTextStyle("textAlign", "right")}
              className={cn("h-8 w-8", selectedElement.style?.textAlign === "right" && "bg-muted")}
            >
              <AlignRight className="w-4 h-4" />
            </Button>

            <div className="h-6 w-px bg-border mx-1" />

            {/* Text Color */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-bold">A</span>
                    <div
                      className="w-4 h-1 rounded-full"
                      style={{ backgroundColor: selectedElement.style?.color || "#000000" }}
                    />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <div className="grid grid-cols-5 gap-1">
                  {elementColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => updateTextStyle("color", color)}
                      className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </>
        )}

        {/* Shape Color (when shape selected) */}
        {selectedElement?.type === 'shape' && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 gap-2">
                <div
                  className="w-4 h-4 rounded border border-border"
                  style={{ backgroundColor: selectedElement.style?.backgroundColor || "#4169e1" }}
                />
                <span className="text-xs">Fill Color</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <div className="grid grid-cols-5 gap-1">
                {elementColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => updateTextStyle("backgroundColor", color)}
                    className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Layer Controls (when element selected) */}
        {selectedElement && (
          <>
            <div className="h-6 w-px bg-border mx-2" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <Layers className="w-4 h-4" />
                  <span className="text-xs">Layer</span>
                  <ChevronDown className="w-3 h-3" />
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
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}

        {/* Background Color */}
        <div className="h-6 w-px bg-border mx-2" />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-2">
              <Palette className="w-4 h-4" />
              <div
                className="w-4 h-4 rounded border border-border"
                style={{ backgroundColor: slideBackgroundColor }}
              />
              <span className="text-xs hidden lg:inline">Background</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <div className="grid grid-cols-4 gap-1">
              {backgroundColors.map((color) => (
                <button
                  key={color}
                  onClick={() => onChangeSlideBackground(color)}
                  className={cn(
                    "w-8 h-8 rounded border-2 hover:scale-110 transition-transform",
                    slideBackgroundColor === color ? "border-primary" : "border-border"
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
        <Button variant="outline" size="sm" className="gap-2">
          <Play className="w-4 h-4" />
          <span className="hidden lg:inline">Present</span>
        </Button>
        <Button variant="hero" size="sm" onClick={onSave} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </header>
  );
};

export default EditorToolbar;
