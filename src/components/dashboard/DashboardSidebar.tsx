import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Presentation,
  Trophy,
  Layout,
  Palette,
  Image,
  Download,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useDashboard } from "@/contexts/DashboardContext";
import { cn } from "@/lib/utils";
import { useState } from "react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "presentations", label: "Presentations", icon: Presentation },
  { id: "competition", label: "Competition Mode", icon: Trophy },
  { id: "templates", label: "Templates", icon: Layout },
  { id: "brand-kits", label: "Brand Kits", icon: Palette },
  { id: "ai-images", label: "AI Images", icon: Image },
  { id: "exports", label: "Exports", icon: Download },
];

const bottomItems = [
  { id: "settings", label: "Settings & Members", icon: Settings },
  { id: "support", label: "Support", icon: HelpCircle },
];

const DashboardSidebar = () => {
  const { activeSection, setActiveSection } = useDashboard();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0 z-40"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-display text-xl font-bold tracking-wider bg-gradient-to-r from-vora-coral via-[#F5B5A8] to-[#4A7DC7] bg-clip-text text-transparent"
          >
            VORA
          </motion.span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
              activeSection === item.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium truncate"
              >
                {item.label}
              </motion.span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom Menu */}
      <div className="py-4 px-3 space-y-1 border-t border-sidebar-border">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
              activeSection === item.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium truncate"
              >
                {item.label}
              </motion.span>
            )}
          </button>
        ))}
      </div>
    </motion.aside>
  );
};

export default DashboardSidebar;
