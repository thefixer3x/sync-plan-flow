import { Link, useLocation } from "react-router-dom";
import { Brain, Sparkles } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home", icon: null },
    { path: "/dashboard", label: "Dashboard", icon: null },
    { path: "/bella", label: "Bella AI", icon: Brain, highlight: true },
    { path: "/chat", label: "AI Chat", icon: null },
    { path: "/connectivity", label: "Connectivity", icon: null },
    { path: "/orchestration", label: "Orchestration", icon: null },
    { path: "/analytics", label: "Analytics", icon: null },
    { path: "/integrations", label: "Integrations", icon: null },
    { path: "/settings", label: "Settings", icon: null },
  ];

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              VortexCore Ecosystem
            </div>
          </div>
          
          <div className="flex space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                              (item.path === "/bella" && location.pathname.startsWith("/bella"));
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-all hover:text-primary relative ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground"
                  } ${
                    item.highlight
                      ? "px-3 py-1 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-400/40"
                      : ""
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {item.label}
                  {isActive && !item.highlight && (
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                  )}
                  {item.highlight && isActive && (
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 -z-10" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;