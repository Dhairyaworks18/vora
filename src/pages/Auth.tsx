import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Demo credentials for prototype
const DEMO_EMAIL = "demo@vora.ai";
const DEMO_PASSWORD = "vora@123";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in (demo session stored in localStorage)
  useEffect(() => {
    const demoSession = localStorage.getItem("vora_demo_session");
    if (demoSession === "active") {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Also check real auth state
  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email.trim()) {
      newErrors.email = "Please enter your email";
    }
    
    if (!password.trim()) {
      newErrors.password = "Please enter your password";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Demo login handler - can be replaced with real auth later
  const handleDemoLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate a brief loading state for UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      // Store demo session
      localStorage.setItem("vora_demo_session", "active");
      localStorage.setItem("vora_demo_user", JSON.stringify({
        email: DEMO_EMAIL,
        name: "Demo User",
        role: "prototype_user"
      }));
      
      toast({
        title: "Welcome to Vora!",
        description: "You have successfully logged in to the demo.",
      });
      
      navigate("/dashboard");
    } else {
      toast({
        title: "Invalid credentials",
        description: "Please check your login ID and password.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-vora-coral/5 via-transparent to-primary/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-vora-coral/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      {/* Back Button */}
      <Button
        variant="ghost"
        className="absolute top-6 left-6 gap-2"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-6"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="font-display text-4xl font-bold tracking-wider bg-gradient-to-r from-vora-coral via-[#F5B5A8] to-[#4A7DC7] bg-clip-text text-transparent">
            VORA
          </span>
          <p className="text-muted-foreground mt-2">
            Demo Access
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-foreground">Welcome to Vora</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your credentials to access the prototype
            </p>
          </div>

          <form onSubmit={handleDemoLogin} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Login ID</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="demo@vora.ai"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className="pl-10"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full mt-6"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Access Prototype"}
            </Button>
          </form>

          {/* Demo Hint */}
          <div className="mt-6 p-3 bg-muted/30 rounded-lg border border-border/30">
            <p className="text-xs text-muted-foreground text-center">
              <span className="font-medium text-foreground">Demo Credentials:</span>
              <br />
              demo@vora.ai / vora@123
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
