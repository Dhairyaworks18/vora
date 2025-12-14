import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3X3, List, Search } from "lucide-react";
import { useDashboard } from "@/contexts/DashboardContext";
import PresentationCard from "./PresentationCard";
import { cn } from "@/lib/utils";

interface PresentationsGridProps {
  onOpenPresentation: (id: string) => void;
}

const tabs = [
  { id: "all", label: "All" },
  { id: "recent", label: "Recently Viewed" },
  { id: "created", label: "Created by You" },
  { id: "favorites", label: "Favorites" },
];

const PresentationsGrid = ({ onOpenPresentation }: PresentationsGridProps) => {
  const { presentations, viewMode, setViewMode } = useDashboard();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPresentations = useMemo(() => {
    let filtered = [...presentations];

    // Filter by tab
    switch (activeTab) {
      case "recent":
        filtered = filtered.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()).slice(0, 5);
        break;
      case "created":
        filtered = filtered.filter(p => p.createdBy === "demo@vora.ai");
        break;
      case "favorites":
        filtered = filtered.filter(p => p.isFavorite);
        break;
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(query));
    }

    return filtered;
  }, [presentations, activeTab, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">My Presentations</h1>
          <p className="text-muted-foreground">{presentations.length} presentations</p>
        </div>

        {/* Search & View Toggle */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search presentations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary w-64"
            />
          </div>

          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 transition-colors",
                viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2 transition-colors",
                viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors relative",
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>

      {/* Grid/List */}
      <AnimatePresence mode="popLayout">
        {filteredPresentations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground">No presentations found</p>
          </motion.div>
        ) : viewMode === "grid" ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredPresentations.map((presentation) => (
              <PresentationCard
                key={presentation.id}
                presentation={presentation}
                viewMode={viewMode}
                onOpen={onOpenPresentation}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div layout className="space-y-3">
            {filteredPresentations.map((presentation) => (
              <PresentationCard
                key={presentation.id}
                presentation={presentation}
                viewMode={viewMode}
                onOpen={onOpenPresentation}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PresentationsGrid;
