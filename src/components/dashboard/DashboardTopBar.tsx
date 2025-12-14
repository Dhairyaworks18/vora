import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Upload,
  Bell,
  User,
  LogOut,
  Sparkles,
  Zap,
  Trophy,
  FileText,
  File,
  ChevronDown,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/contexts/DashboardContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface DashboardTopBarProps {
  onCreateNew: (mode: string) => void;
}

const createModes = [
  { id: "quick", label: "Quick Mode", icon: Zap, description: "AI generates slides instantly" },
  { id: "studio", label: "Studio Mode", icon: Sparkles, description: "Advanced editing controls" },
  { id: "competition", label: "Competition Mode", icon: Trophy, description: "Hackathon-ready decks" },
  { id: "import", label: "Import Outline", icon: FileText, description: "Start from your notes" },
  { id: "blank", label: "Blank Deck", icon: File, description: "Start from scratch" },
];

const DashboardTopBar = ({ onCreateNew }: DashboardTopBarProps) => {
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  
  const { credits, notifications, markNotificationRead, addPresentation } = useDashboard();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleImport = () => {
    // Simulate file import
    setImportSuccess(true);
    const newPres = addPresentation({
      title: "Imported Presentation",
      thumbnail: "linear-gradient(135deg, hsl(185 75% 50%) 0%, hsl(220 70% 45%) 100%)",
      createdBy: "demo@vora.ai",
      isFavorite: false,
      mode: "studio",
      slideCount: 10,
    });
    toast({
      title: "Import Successful",
      description: `Created "${newPres.title}" from imported file.`,
    });
    setTimeout(() => setImportSuccess(false), 2000);
  };

  const handleNewPresentation = () => {
    const newPres = addPresentation({
      title: "Untitled Presentation",
      thumbnail: "linear-gradient(135deg, hsl(270 50% 35%) 0%, hsl(225 85% 55%) 100%)",
      createdBy: "demo@vora.ai",
      isFavorite: false,
      mode: "quick",
      slideCount: 1,
    });
    toast({
      title: "Presentation Created",
      description: `"${newPres.title}" is ready to edit.`,
    });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6">
      {/* Left Actions */}
      <div className="flex items-center gap-3">
        {/* Create New Dropdown */}
        <div className="relative">
          <Button
            variant="hero"
            className="gap-2"
            onClick={() => setShowCreateMenu(!showCreateMenu)}
          >
            <Plus className="w-4 h-4" />
            Create New (AI)
            <ChevronDown className={`w-4 h-4 transition-transform ${showCreateMenu ? "rotate-180" : ""}`} />
          </Button>
          
          <AnimatePresence>
            {showCreateMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowCreateMenu(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-72 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
                >
                  {createModes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => {
                        setShowCreateMenu(false);
                        onCreateNew(mode.id);
                      }}
                      className="w-full flex items-start gap-3 p-3 hover:bg-muted transition-colors text-left"
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <mode.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{mode.label}</p>
                        <p className="text-xs text-muted-foreground">{mode.description}</p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* New Presentation Quick Button */}
        <Button variant="outline" className="gap-2" onClick={handleNewPresentation}>
          <File className="w-4 h-4" />
          New Presentation
        </Button>

        {/* Import Button */}
        <Button
          variant="ghost"
          className="gap-2"
          onClick={handleImport}
        >
          <Upload className="w-4 h-4" />
          {importSuccess ? "Imported!" : "Import"}
        </Button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Credits */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
          <CreditCard className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{credits} credits</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Bell className="w-5 h-5 text-foreground" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-border">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-center text-muted-foreground text-sm">No notifications</p>
                    ) : (
                      notifications.map((notif) => (
                        <button
                          key={notif.id}
                          onClick={() => markNotificationRead(notif.id)}
                          className={`w-full p-3 text-left hover:bg-muted transition-colors ${!notif.read ? "bg-primary/5" : ""}`}
                        >
                          <p className="font-medium text-foreground text-sm">{notif.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
                        </button>
                      ))
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showUserMenu ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-border">
                    <p className="font-medium text-foreground text-sm">Demo User</p>
                    <p className="text-xs text-muted-foreground">demo@vora.ai</p>
                  </div>
                  <button
                    disabled
                    className="w-full flex items-center gap-2 p-3 text-muted-foreground text-sm cursor-not-allowed"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 p-3 text-destructive hover:bg-muted transition-colors text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default DashboardTopBar;
