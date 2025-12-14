import { createContext, useContext, useState, ReactNode, useCallback } from "react";

export interface Presentation {
  id: string;
  title: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  isFavorite: boolean;
  mode: "quick" | "studio" | "competition";
  slideCount: number;
}

interface DashboardContextType {
  presentations: Presentation[];
  activeSection: string;
  viewMode: "grid" | "list";
  setActiveSection: (section: string) => void;
  setViewMode: (mode: "grid" | "list") => void;
  addPresentation: (presentation: Omit<Presentation, "id" | "createdAt" | "updatedAt">) => Presentation;
  deletePresentation: (id: string) => void;
  duplicatePresentation: (id: string) => Presentation | null;
  renamePresentation: (id: string, newTitle: string) => void;
  toggleFavorite: (id: string) => void;
  credits: number;
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Demo presentations data
const demoThumbnails = [
  "linear-gradient(135deg, hsl(225 85% 55%) 0%, hsl(270 50% 35%) 100%)",
  "linear-gradient(135deg, hsl(25 85% 60%) 0%, hsl(350 55% 75%) 100%)",
  "linear-gradient(135deg, hsl(185 75% 50%) 0%, hsl(220 70% 45%) 100%)",
  "linear-gradient(135deg, hsl(45 90% 60%) 0%, hsl(25 85% 60%) 100%)",
  "linear-gradient(135deg, hsl(270 50% 35%) 0%, hsl(225 85% 55%) 100%)",
];

const initialPresentations: Presentation[] = [
  {
    id: "1",
    title: "Q4 Marketing Strategy",
    thumbnail: demoThumbnails[0],
    createdAt: new Date("2024-12-10"),
    updatedAt: new Date("2024-12-13"),
    createdBy: "demo@vora.ai",
    isFavorite: true,
    mode: "studio",
    slideCount: 12,
  },
  {
    id: "2",
    title: "Product Launch Deck",
    thumbnail: demoThumbnails[1],
    createdAt: new Date("2024-12-08"),
    updatedAt: new Date("2024-12-12"),
    createdBy: "demo@vora.ai",
    isFavorite: false,
    mode: "quick",
    slideCount: 8,
  },
  {
    id: "3",
    title: "Startup Pitch - TechCrunch",
    thumbnail: demoThumbnails[2],
    createdAt: new Date("2024-12-05"),
    updatedAt: new Date("2024-12-11"),
    createdBy: "demo@vora.ai",
    isFavorite: true,
    mode: "competition",
    slideCount: 15,
  },
  {
    id: "4",
    title: "Annual Report 2024",
    thumbnail: demoThumbnails[3],
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2024-12-09"),
    createdBy: "demo@vora.ai",
    isFavorite: false,
    mode: "studio",
    slideCount: 24,
  },
  {
    id: "5",
    title: "Team Onboarding",
    thumbnail: demoThumbnails[4],
    createdAt: new Date("2024-11-28"),
    updatedAt: new Date("2024-12-07"),
    createdBy: "demo@vora.ai",
    isFavorite: false,
    mode: "quick",
    slideCount: 6,
  },
];

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Welcome to Vora!",
    message: "Start creating stunning presentations with AI.",
    read: false,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "New Templates Available",
    message: "Check out our latest premium templates.",
    read: false,
    createdAt: new Date(Date.now() - 86400000),
  },
];

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [presentations, setPresentations] = useState<Presentation[]>(initialPresentations);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [credits] = useState(250);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const addPresentation = useCallback((data: Omit<Presentation, "id" | "createdAt" | "updatedAt">) => {
    const newPresentation: Presentation = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setPresentations(prev => [newPresentation, ...prev]);
    return newPresentation;
  }, []);

  const deletePresentation = useCallback((id: string) => {
    setPresentations(prev => prev.filter(p => p.id !== id));
  }, []);

  const duplicatePresentation = useCallback((id: string) => {
    const original = presentations.find(p => p.id === id);
    if (!original) return null;
    
    const duplicate: Presentation = {
      ...original,
      id: Date.now().toString(),
      title: `${original.title} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date(),
      isFavorite: false,
    };
    setPresentations(prev => [duplicate, ...prev]);
    return duplicate;
  }, [presentations]);

  const renamePresentation = useCallback((id: string, newTitle: string) => {
    setPresentations(prev => 
      prev.map(p => p.id === id ? { ...p, title: newTitle, updatedAt: new Date() } : p)
    );
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setPresentations(prev =>
      prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p)
    );
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  return (
    <DashboardContext.Provider value={{
      presentations,
      activeSection,
      viewMode,
      setActiveSection,
      setViewMode,
      addPresentation,
      deletePresentation,
      duplicatePresentation,
      renamePresentation,
      toggleFavorite,
      credits,
      notifications,
      markNotificationRead,
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
};
