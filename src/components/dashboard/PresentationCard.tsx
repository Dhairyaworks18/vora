import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoreVertical,
  Star,
  FolderOpen,
  Copy,
  Pencil,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { Presentation, useDashboard } from "@/contexts/DashboardContext";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface PresentationCardProps {
  presentation: Presentation;
  viewMode: "grid" | "list";
  onOpen: (id: string) => void;
}

const PresentationCard = ({ presentation, viewMode, onOpen }: PresentationCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(presentation.title);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const { deletePresentation, duplicatePresentation, renamePresentation, toggleFavorite } = useDashboard();
  const { toast } = useToast();

  const handleDuplicate = () => {
    const dup = duplicatePresentation(presentation.id);
    if (dup) {
      toast({ title: "Duplicated", description: `Created "${dup.title}"` });
    }
    setShowMenu(false);
  };

  const handleRename = () => {
    if (newTitle.trim() && newTitle !== presentation.title) {
      renamePresentation(presentation.id, newTitle.trim());
      toast({ title: "Renamed", description: `Presentation renamed to "${newTitle.trim()}"` });
    }
    setIsRenaming(false);
    setShowMenu(false);
  };

  const handleDelete = () => {
    deletePresentation(presentation.id);
    toast({ title: "Deleted", description: "Presentation moved to trash." });
    setShowDeleteConfirm(false);
    setShowMenu(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const modeColors = {
    quick: "bg-vora-coral/20 text-vora-coral",
    studio: "bg-primary/20 text-primary",
    competition: "bg-accent/20 text-accent-foreground",
  };

  if (viewMode === "list") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="group flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:shadow-md transition-all cursor-pointer"
        onClick={() => !isRenaming && onOpen(presentation.id)}
      >
        {/* Thumbnail */}
        <div
          className="w-20 h-14 rounded-lg flex-shrink-0"
          style={{ background: presentation.thumbnail }}
        />

        {/* Info */}
        <div className="flex-1 min-w-0">
          {isRenaming ? (
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="flex-1 px-2 py-1 bg-muted border border-border rounded text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleRename()}
              />
              <button onClick={handleRename} className="p-1 hover:bg-muted rounded">
                <Check className="w-4 h-4 text-primary" />
              </button>
              <button onClick={() => setIsRenaming(false)} className="p-1 hover:bg-muted rounded">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          ) : (
            <h3 className="font-medium text-foreground truncate">{presentation.title}</h3>
          )}
          <p className="text-sm text-muted-foreground">
            {presentation.slideCount} slides · Updated {formatDate(presentation.updatedAt)}
          </p>
        </div>

        {/* Mode Badge */}
        <span className={cn("px-2 py-1 rounded-full text-xs font-medium capitalize", modeColors[presentation.mode])}>
          {presentation.mode}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => toggleFavorite(presentation.id)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Star className={cn("w-4 h-4", presentation.isFavorite ? "fill-accent text-accent" : "text-muted-foreground")} />
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </button>

            <AnimatePresence>
              {showMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-full right-0 mt-1 w-40 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    <button
                      onClick={() => { onOpen(presentation.id); setShowMenu(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors"
                    >
                      <FolderOpen className="w-4 h-4" /> Open
                    </button>
                    <button
                      onClick={handleDuplicate}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors"
                    >
                      <Copy className="w-4 h-4" /> Duplicate
                    </button>
                    <button
                      onClick={() => { setIsRenaming(true); setShowMenu(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors"
                    >
                      <Pencil className="w-4 h-4" /> Rename
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-muted transition-colors"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer"
      onClick={() => !isRenaming && onOpen(presentation.id)}
    >
      {/* Thumbnail */}
      <div
        className="aspect-video w-full"
        style={{ background: presentation.thumbnail }}
      >
        {/* Mode Badge */}
        <span className={cn("absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium capitalize backdrop-blur-sm", modeColors[presentation.mode])}>
          {presentation.mode}
        </span>

        {/* Favorite */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(presentation.id); }}
          className="absolute top-3 right-3 p-1.5 rounded-lg bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors"
        >
          <Star className={cn("w-4 h-4", presentation.isFavorite ? "fill-accent text-accent" : "text-foreground")} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        {isRenaming ? (
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="flex-1 px-2 py-1 bg-muted border border-border rounded text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleRename()}
            />
            <button onClick={handleRename} className="p-1 hover:bg-muted rounded">
              <Check className="w-4 h-4 text-primary" />
            </button>
            <button onClick={() => setIsRenaming(false)} className="p-1 hover:bg-muted rounded">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        ) : (
          <h3 className="font-medium text-foreground truncate">{presentation.title}</h3>
        )}
        <p className="text-sm text-muted-foreground mt-1">
          {presentation.slideCount} slides · {formatDate(presentation.updatedAt)}
        </p>
      </div>

      {/* Menu Button */}
      <div className="absolute bottom-3 right-3" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1.5 rounded-lg bg-background/80 opacity-0 group-hover:opacity-100 hover:bg-muted transition-all"
        >
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </button>

        <AnimatePresence>
          {showMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute bottom-full right-0 mb-1 w-40 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
              >
                <button
                  onClick={() => { onOpen(presentation.id); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors"
                >
                  <FolderOpen className="w-4 h-4" /> Open
                </button>
                <button
                  onClick={handleDuplicate}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors"
                >
                  <Copy className="w-4 h-4" /> Duplicate
                </button>
                <button
                  onClick={() => { setIsRenaming(true); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors"
                >
                  <Pencil className="w-4 h-4" /> Rename
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-muted transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(false); }}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-card border border-border rounded-xl p-6 max-w-sm mx-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-foreground">Delete Presentation?</h3>
              <p className="text-muted-foreground mt-2">
                Are you sure you want to delete "{presentation.title}"? This action cannot be undone.
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PresentationCard;
