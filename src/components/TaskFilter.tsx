import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Filter, Calendar, Flag, Folder, Lock } from "lucide-react";

interface TaskFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  taskCounts: {
    all: number;
    today: number;
    high: number;
    work: number;
    blocked: number;
  };
  className?: string;
}

const filters = [
  { id: "all", label: "All Tasks", icon: Filter },
  { id: "today", label: "Due Today", icon: Calendar },
  { id: "high", label: "High Priority", icon: Flag },
  { id: "work", label: "Work", icon: Folder },
  { id: "blocked", label: "Blocked", icon: Lock },
];

export function TaskFilter({ activeFilter, onFilterChange, taskCounts, className }: TaskFilterProps) {
  return (
    <Card className={cn(className)}>
      <CardContent className="p-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-1">
          Filters
        </p>
        <div className="space-y-0.5">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const count = taskCounts[filter.id as keyof typeof taskCounts] ?? 0;
            const isActive = activeFilter === filter.id;
            return (
              <Button
                key={filter.id}
                variant="ghost"
                onClick={() => onFilterChange(filter.id)}
                className={cn(
                  "w-full justify-between h-9 px-3 text-sm font-normal rounded-lg transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-3.5 w-3.5" />
                  <span>{filter.label}</span>
                </div>
                <Badge
                  variant={isActive ? "default" : "secondary"}
                  className="h-5 min-w-[20px] rounded-full px-1.5 text-xs"
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
