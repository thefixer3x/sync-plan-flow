import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Clock, Flag, MoreHorizontal, Calendar } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "in-progress" | "completed";
  dueDate?: string;
  category: string;
  assignee?: string;
  estimatedTime?: number;
  completedAt?: string;
}

interface TaskCardProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onEdit?: (task: Task) => void;
  compact?: boolean;
  className?: string;
}

const priorityStyles = {
  high: "border-l-destructive bg-destructive-soft",
  medium: "border-l-warning bg-warning-soft",
  low: "border-l-success bg-success-soft",
};

const priorityIcons = {
  high: "text-destructive",
  medium: "text-warning",
  low: "text-success",
};

export function TaskCard({ task, onToggleComplete, onEdit, compact = false, className }: TaskCardProps) {
  const isCompleted = task.status === "completed";
  
  return (
    <Card className={cn(
      "group relative border-l-4 transition-all duration-smooth hover:shadow-md hover:-translate-y-0.5",
      priorityStyles[task.priority],
      isCompleted && "opacity-60",
      compact ? "p-3" : "p-4",
      className
    )}>
      <div className="flex items-start gap-3">
        <Checkbox
          checked={isCompleted}
          onCheckedChange={() => onToggleComplete(task.id)}
          className="mt-0.5 data-[state=checked]:bg-success data-[state=checked]:border-success"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={cn(
              "font-medium leading-snug",
              compact ? "text-sm" : "text-base",
              isCompleted && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
              onClick={() => onEdit?.(task)}
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
          
          {task.description && !compact && (
            <p className={cn(
              "text-sm text-muted-foreground mt-1 leading-relaxed",
              isCompleted && "line-through"
            )}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <Badge variant="secondary" className="text-xs px-2 py-0.5">
              {task.category}
            </Badge>
            
            <div className={cn("flex items-center gap-1 text-xs", priorityIcons[task.priority])}>
              <Flag className="h-3 w-3" />
              <span className="capitalize">{task.priority}</span>
            </div>
            
            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
            
            {task.estimatedTime && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{task.estimatedTime}h</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}