import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { DashboardProvider, useDashboard, Presentation } from "@/contexts/DashboardContext";
import { useAuth } from "@/contexts/AuthContext";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import PresentationsGrid from "@/components/dashboard/PresentationsGrid";
import EditorView from "@/components/dashboard/EditorView";
import SectionContent from "@/components/dashboard/SectionContent";
import { useToast } from "@/hooks/use-toast";

const DashboardContent = () => {
  const navigate = useNavigate();
  const { isDemoUser } = useAuth();
  const { activeSection, presentations, addPresentation } = useDashboard();
  const { toast } = useToast();
  
  const [editorState, setEditorState] = useState<{
    isOpen: boolean;
    presentation: Presentation | null;
    mode: string;
  }>({
    isOpen: false,
    presentation: null,
    mode: "quick",
  });

  // Check if user is logged in
  useEffect(() => {
    const demoSession = localStorage.getItem("vora_demo_session");
    if (!isDemoUser && demoSession !== "active") {
      navigate("/auth");
    }
  }, [isDemoUser, navigate]);

  const handleCreateNew = (mode: string) => {
    if (mode === "import") {
      toast({
        title: "Import",
        description: "File import dialog would open here.",
      });
      return;
    }

    // Create new presentation and open editor
    const newPresentation = addPresentation({
      title: mode === "blank" ? "Untitled Presentation" : `New ${mode.charAt(0).toUpperCase() + mode.slice(1)} Presentation`,
      thumbnail: mode === "competition"
        ? "linear-gradient(135deg, hsl(270 50% 35%) 0%, hsl(225 85% 55%) 100%)"
        : mode === "studio"
        ? "linear-gradient(135deg, hsl(25 85% 60%) 0%, hsl(350 55% 75%) 100%)"
        : "linear-gradient(135deg, hsl(185 75% 50%) 0%, hsl(220 70% 45%) 100%)",
      createdBy: "demo@vora.ai",
      isFavorite: false,
      mode: mode === "blank" ? "quick" : mode as "quick" | "studio" | "competition",
      slideCount: mode === "blank" ? 1 : 5,
    });

    setEditorState({
      isOpen: true,
      presentation: newPresentation,
      mode: mode === "blank" ? "quick" : mode,
    });
  };

  const handleOpenPresentation = (id: string) => {
    const presentation = presentations.find((p) => p.id === id);
    if (presentation) {
      setEditorState({
        isOpen: true,
        presentation,
        mode: presentation.mode,
      });
    }
  };

  const handleCloseEditor = () => {
    setEditorState({
      isOpen: false,
      presentation: null,
      mode: "quick",
    });
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <DashboardSidebar />
      
      <div className="flex-1 ml-[72px] lg:ml-64 transition-all duration-200">
        <DashboardTopBar onCreateNew={handleCreateNew} />
        
        <main className="p-6">
          <AnimatePresence mode="wait">
            {activeSection === "dashboard" || activeSection === "presentations" ? (
              <PresentationsGrid
                key="presentations"
                onOpenPresentation={handleOpenPresentation}
              />
            ) : (
              <SectionContent
                key={activeSection}
                section={activeSection}
                onCreateNew={handleCreateNew}
              />
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Editor Overlay */}
      <AnimatePresence>
        {editorState.isOpen && editorState.presentation && (
          <EditorView
            presentation={editorState.presentation}
            mode={editorState.mode}
            onBack={handleCloseEditor}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
};

export default Dashboard;
