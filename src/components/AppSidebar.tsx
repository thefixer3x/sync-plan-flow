import { 
  Home, MessageSquare, LayoutDashboard, CheckSquare, 
  Plug, Shield, Palette, Settings, Menu, Bot, Brain, Users
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/tasks", label: "Tasks", icon: CheckSquare },
  { path: "/chat", label: "AI Chat", icon: MessageSquare },
  { path: "/social", label: "Social", icon: Users },
  { path: "/personalities", label: "AI Personalities", icon: Bot },
  { path: "/memory", label: "Memory", icon: Brain },
  { path: "/integrations", label: "Integrations", icon: Plug },
  { path: "/themes", label: "Themes", icon: Palette },
  { path: "/privacy", label: "Privacy", icon: Shield },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-background/95 backdrop-blur flex items-center px-4 gap-3">
        <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
        <span className="font-semibold text-sm">AI Productivity</span>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-black/50" 
          onClick={() => setMobileOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-40 h-screen border-r border-border bg-card transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-56",
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Logo */}
        <div className={cn(
          "h-14 flex items-center border-b border-border px-4 gap-3 shrink-0",
          collapsed && "justify-center"
        )}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-bold text-sm">AI</span>
          </div>
          {!collapsed && (
            <span className="font-semibold text-sm truncate">AI Productivity</span>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  collapsed && "justify-center px-2"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle - desktop only */}
        <div className="hidden md:flex border-t border-border p-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full justify-center"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </aside>
    </>
  );
}
