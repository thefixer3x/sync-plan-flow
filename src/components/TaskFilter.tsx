import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Filter, Calendar, Flag, Folder } from "lucide-react";

interface TaskFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  taskCounts: {
    all: number;
    today: number;
    high: number;
    work: number;
  };
  className?: string;
}

const filters = [
  { id: "all", label: "All Tasks", icon: Filter, color: "text-foreground" },
  { id: "today", label: "Due Today", icon: Calendar, color: "text-accent" },
  { id: "high", label: "High Priority", icon: Flag, color: "text-destructive" },
  { id: "work", label: "Work", icon: Folder, color: "text-warning" },
];

export function TaskFilter({ activeFilter, onFilterChange, taskCounts, className }: TaskFilterProps) {
  return (
    <Card className={cn("modern-card", className)}>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-3 text-foreground/90">Filters</h3>
        
        <div className="space-y-1">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const count = taskCounts[filter.id as keyof typeof taskCounts] || 0;
            const isActive = activeFilter === filter.id;
            
            return (
              <Button
                key={filter.id}
                variant={isActive ? "secondary" : "ghost"}
                onClick={() => onFilterChange(filter.id)}
                className={cn(
                  "w-full justify-between h-auto py-3 px-3 transition-all duration-fast",
                  isActive && "bg-primary/10 border-primary/20 border"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("h-4 w-4", filter.color)} />
                  <span className="text-sm font-medium">{filter.label}</span>
                </div>
                
                <Badge 
                  variant={isActive ? "default" : "secondary"} 
                  className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {count}
                </Badge>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}