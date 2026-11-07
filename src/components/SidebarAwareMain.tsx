import { useSidebarState } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function SidebarAwareMain({ children }: { children: ReactNode }) {
  const { collapsed } = useSidebarState();
  return (
    <main className={cn(
      "flex-1 mt-14 md:mt-0 transition-all duration-300 min-w-0",
      collapsed ? "md:ml-16" : "md:ml-56"
    )}>
      {children}
    </main>
  );
}
