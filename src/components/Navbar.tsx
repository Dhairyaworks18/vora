import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Features", href: "#features", isPage: false },
  { name: "Solutions", href: "#what-makes-vora-different", isPage: false },
  { name: "Competition Mode", href: "#competition", isPage: false },
  { name: "Pricing", href: "/pricing", isPage: true },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string, isPage: boolean) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (isPage) {
      navigate(href);
      // Force scroll to top for page routes
      setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 0);
      return;
    }
    
    // If we're not on the homepage, navigate there first
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation then scroll
      setTimeout(() => {
        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
          const navbarHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
      return;
    }
    
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, [navigate, location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Stylized VORA Text */}
          <a 
            href="/" 
            className="group"
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname !== "/") {
                navigate("/");
                setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 0);
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <span className="font-display text-2xl font-bold tracking-wider bg-gradient-to-r from-vora-coral via-[#F5B5A8] to-[#4A7DC7] bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
              VORA
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.isPage)}
                className="text-muted-foreground hover:text-foreground font-medium transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
            <Button variant="hero" size="default">
              Get Started Free
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-foreground font-medium py-2"
                  onClick={(e) => handleNavClick(e, link.href, link.isPage)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="ghost">Log In</Button>
                <Button variant="hero">Get Started Free</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
