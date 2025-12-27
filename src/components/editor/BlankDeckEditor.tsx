import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Presentation } from "@/contexts/DashboardContext";
import { useToast } from "@/hooks/use-toast";
import { Slide, SlideElement, ToolType, EditorState } from "./types";
import EditorToolbar from "./EditorToolbar";
import EditorSidebar from "./EditorSidebar";
import SlidePanel from "./SlidePanel";
import EditorCanvas from "./EditorCanvas";

interface BlankDeckEditorProps {
  presentation: Presentation;
  onBack: () => void;
}

const createEmptySlide = (): Slide => ({
  id: `slide-${Date.now()}`,
  elements: [],
  backgroundColor: "#ffffff",
});

const BlankDeckEditor = ({ presentation, onBack }: BlankDeckEditorProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Editor state
  const [slides, setSlides] = useState<Slide[]>([createEmptySlide()]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<ToolType>("select");
  const [zoom, setZoom] = useState(100);
  
  // History for undo/redo
  const [history, setHistory] = useState<Slide[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Save state to history
  const saveToHistory = useCallback((newSlides: Slide[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newSlides)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  // Current slide
  const currentSlide = slides[currentSlideIndex];
  const selectedElement = currentSlide?.elements.find(el => el.id === selectedElementId) || null;

  // Slide operations
  const handleAddSlide = useCallback(() => {
    const newSlides = [...slides];
    const newSlide = createEmptySlide();
    newSlides.splice(currentSlideIndex + 1, 0, newSlide);
    setSlides(newSlides);
    setCurrentSlideIndex(currentSlideIndex + 1);
    setSelectedElementId(null);
    saveToHistory(newSlides);
  }, [slides, currentSlideIndex, saveToHistory]);

  const handleDuplicateSlide = useCallback((index: number) => {
    const newSlides = [...slides];
    const duplicatedSlide: Slide = {
      ...JSON.parse(JSON.stringify(slides[index])),
      id: `slide-${Date.now()}`,
    };
    newSlides.splice(index + 1, 0, duplicatedSlide);
    setSlides(newSlides);
    setCurrentSlideIndex(index + 1);
    saveToHistory(newSlides);
  }, [slides, saveToHistory]);

  const handleDeleteSlide = useCallback((index: number) => {
    if (slides.length <= 1) return;
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
    setCurrentSlideIndex(Math.min(currentSlideIndex, newSlides.length - 1));
    setSelectedElementId(null);
    saveToHistory(newSlides);
  }, [slides, currentSlideIndex, saveToHistory]);

  const handleReorderSlides = useCallback((newOrder: Slide[]) => {
    setSlides(newOrder);
    saveToHistory(newOrder);
  }, [saveToHistory]);

  // Element operations
  const handleAddElement = useCallback((element: SlideElement) => {
    const newSlides = [...slides];
    newSlides[currentSlideIndex].elements.push(element);
    setSlides(newSlides);
    saveToHistory(newSlides);
    setActiveTool("select");
  }, [slides, currentSlideIndex, saveToHistory]);

  const handleUpdateElement = useCallback((id: string, updates: Partial<SlideElement>) => {
    const newSlides = [...slides];
    const elementIndex = newSlides[currentSlideIndex].elements.findIndex(el => el.id === id);
    if (elementIndex !== -1) {
      newSlides[currentSlideIndex].elements[elementIndex] = {
        ...newSlides[currentSlideIndex].elements[elementIndex],
        ...updates,
        style: {
          ...newSlides[currentSlideIndex].elements[elementIndex].style,
          ...updates.style,
        },
      };
      setSlides(newSlides);
    }
  }, [slides, currentSlideIndex]);

  const handleUpdateSelectedElement = useCallback((updates: Partial<SlideElement>) => {
    if (selectedElementId) {
      handleUpdateElement(selectedElementId, updates);
    }
  }, [selectedElementId, handleUpdateElement]);

  const handleBringForward = useCallback(() => {
    if (!selectedElementId) return;
    const newSlides = [...slides];
    const elements = newSlides[currentSlideIndex].elements;
    const index = elements.findIndex(el => el.id === selectedElementId);
    if (index < elements.length - 1) {
      [elements[index], elements[index + 1]] = [elements[index + 1], elements[index]];
      setSlides(newSlides);
      saveToHistory(newSlides);
    }
  }, [selectedElementId, slides, currentSlideIndex, saveToHistory]);

  const handleSendBackward = useCallback(() => {
    if (!selectedElementId) return;
    const newSlides = [...slides];
    const elements = newSlides[currentSlideIndex].elements;
    const index = elements.findIndex(el => el.id === selectedElementId);
    if (index > 0) {
      [elements[index], elements[index - 1]] = [elements[index - 1], elements[index]];
      setSlides(newSlides);
      saveToHistory(newSlides);
    }
  }, [selectedElementId, slides, currentSlideIndex, saveToHistory]);

  // Background
  const handleChangeSlideBackground = useCallback((color: string) => {
    const newSlides = [...slides];
    newSlides[currentSlideIndex].backgroundColor = color;
    setSlides(newSlides);
    saveToHistory(newSlides);
  }, [slides, currentSlideIndex, saveToHistory]);

  // Undo/Redo
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setSlides(JSON.parse(JSON.stringify(history[historyIndex - 1])));
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setSlides(JSON.parse(JSON.stringify(history[historyIndex + 1])));
    }
  }, [history, historyIndex]);

  // Save
  const handleSave = useCallback(() => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Saved",
        description: "Your presentation has been saved.",
      });
    }, 800);
  }, [toast]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedElementId && document.activeElement?.tagName !== "INPUT" && 
            !document.activeElement?.hasAttribute("contenteditable")) {
          e.preventDefault();
          const newSlides = [...slides];
          newSlides[currentSlideIndex].elements = newSlides[currentSlideIndex].elements
            .filter(el => el.id !== selectedElementId);
          setSlides(newSlides);
          setSelectedElementId(null);
          saveToHistory(newSlides);
        }
      }
      if (e.key === "Escape") {
        setSelectedElementId(null);
        setActiveTool("select");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo, handleSave, selectedElementId, slides, currentSlideIndex, saveToHistory]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-background flex items-center justify-center z-50"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"
          />
          <p className="mt-4 text-muted-foreground">Loading editor...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-50 flex flex-col"
    >
      {/* Toolbar */}
      <EditorToolbar
        presentationTitle={presentation.title}
        onBack={onBack}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        selectedElement={selectedElement}
        onUpdateElement={handleUpdateSelectedElement}
        onBringForward={handleBringForward}
        onSendBackward={handleSendBackward}
        onSave={handleSave}
        isSaving={isSaving}
        slideBackgroundColor={currentSlide.backgroundColor}
        onChangeSlideBackground={handleChangeSlideBackground}
      />

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <EditorSidebar
          onSelectTool={setActiveTool}
          activeTool={activeTool}
        />

        {/* Slide Panel */}
        <SlidePanel
          slides={slides}
          currentSlideIndex={currentSlideIndex}
          onSelectSlide={(index) => {
            setCurrentSlideIndex(index);
            setSelectedElementId(null);
          }}
          onAddSlide={handleAddSlide}
          onDuplicateSlide={handleDuplicateSlide}
          onDeleteSlide={handleDeleteSlide}
          onReorderSlides={handleReorderSlides}
        />

        {/* Canvas */}
        <EditorCanvas
          slide={currentSlide}
          selectedElementId={selectedElementId}
          onSelectElement={setSelectedElementId}
          onUpdateElement={handleUpdateElement}
          onAddElement={handleAddElement}
          activeTool={activeTool}
          zoom={zoom}
          onZoomChange={setZoom}
        />
      </div>
    </motion.div>
  );
};

export default BlankDeckEditor;
