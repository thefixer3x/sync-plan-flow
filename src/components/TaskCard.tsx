import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Clock, Flag, Calendar, MoreHorizontal, User } from "lucide-react";

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
  className?: string;
}

const priorityColors = {
  high: "border-l-priority-high bg-priority-high/5",
  medium: "border-l-priority-medium bg-priority-medium/5", 
  low: "border-l-priority-low bg-priority-low/5",
};

const priorityIcons = {
  high: "text-priority-high",
  medium: "text-priority-medium",
  low: "text-priority-low",
};

export function TaskCard({ task, onToggleComplete, onEdit, className }: TaskCardProps) {
  const isCompleted = task.status === "completed";
  
  return (
    <Card className={cn(
      "group hover:shadow-medium transition-all duration-300 border-l-4 hover:-translate-y-0.5",
      priorityColors[task.priority],
      isCompleted && "opacity-75",
      className
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => onToggleComplete(task.id)}
            className="mt-1 data-[state=checked]:bg-success data-[state=checked]:border-success"
          />
          
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <h3 className={cn(
                "font-medium text-sm leading-relaxed",
                isCompleted && "line-through text-muted-foreground"
              )}>
                {task.title}
              </h3>
              <Button
                variant="ghost"
                size="xs"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onEdit?.(task)}
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </div>
            
            {task.description && (
              <p className={cn(
                "text-xs text-muted-foreground leading-relaxed",
                isCompleted && "line-through"
              )}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">
                {task.category}
              </Badge>
              
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Flag className={cn("h-3 w-3", priorityIcons[task.priority])} />
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
              
              {task.assignee && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  <span>{task.assignee}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}