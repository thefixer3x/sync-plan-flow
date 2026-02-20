import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Clock,
  Flag,
  MoreHorizontal,
  Calendar,
  ChevronDown,
  ChevronUp,
  RepeatIcon,
  Lock,
  Plus,
  Check,
} from "lucide-react";
import type { Task } from "@/store/db";
import { useTaskStore } from "@/hooks/useTaskStore";

export type { Task };

interface TaskCardProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onEdit?: (task: Task) => void;
  compact?: boolean;
  className?: string;
}

const priorityBorder = {
  high: "border-l-destructive bg-destructive/5",
  medium: "border-l-warning bg-warning/5",
  low: "border-l-success bg-success/5",
};

const priorityText = {
  high: "text-destructive",
  medium: "text-warning",
  low: "text-success",
};

export function TaskCard({
  task,
  onToggleComplete,
  onEdit,
  compact = false,
  className,
}: TaskCardProps) {
  const isCompleted = task.status === "completed";
  const isBlocked = (task.blockedByTaskIds?.length ?? 0) > 0;
  const [subOpen, setSubOpen] = useState(false);
  const [newSub, setNewSub] = useState("");
  const { toggleSubTask, addSubTask } = useTaskStore();

  const subTasks = task.subTasks ?? [];
  const doneCount = subTasks.filter((s) => s.done).length;

  const handleAddSub = async () => {
    if (!newSub.trim()) return;
    await addSubTask(task.id, newSub.trim());
    setNewSub("");
  };

  return (
    <Card
      className={cn(
        "group relative border-l-4 transition-all duration-150 hover:shadow-md hover:-translate-y-px",
        priorityBorder[task.priority],
        isCompleted && "opacity-55",
        compact ? "p-3" : "p-4",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={isCompleted}
          onCheckedChange={() => onToggleComplete(task.id)}
          className="mt-0.5 data-[state=checked]:bg-success data-[state=checked]:border-success"
          disabled={isBlocked && !isCompleted}
        />

        <div className="flex-1 min-w-0 space-y-1.5">
          {/* Title row */}
          <div className="flex items-start justify-between gap-2">
            <h3
              className={cn(
                "font-medium leading-snug",
                compact ? "text-sm" : "text-base",
                isCompleted && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 shrink-0"
              onClick={() => onEdit?.(task)}
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>

          {/* Description */}
          {task.description && !compact && (
            <p
              className={cn(
                "text-sm text-muted-foreground leading-relaxed",
                isCompleted && "line-through"
              )}
            >
              {task.description}
            </p>
          )}

          {/* Subtask progress bar */}
          {subTasks.length > 0 && (
            <button
              type="button"
              onClick={() => setSubOpen((o) => !o)}
              className="w-full text-left"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${(doneCount / subTasks.length) * 100}%` }}
                  />
                </div>
                <span>
                  {doneCount}/{subTasks.length}
                </span>
                {subOpen ? (
                  <ChevronUp className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3" />
                )}
              </div>
            </button>
          )}

          {/* Subtask list */}
          {subOpen && (
            <div className="space-y-1 pl-1 pt-1">
              {subTasks.map((st) => (
                <div key={st.id} className="flex items-center gap-2">
                  <Checkbox
                    checked={st.done}
                    onCheckedChange={() => toggleSubTask(task.id, st.id)}
                    className="h-3.5 w-3.5 data-[state=checked]:bg-success data-[state=checked]:border-success"
                  />
                  <span
                    className={cn(
                      "text-xs",
                      st.done && "line-through text-muted-foreground"
                    )}
                  >
                    {st.title}
                  </span>
                </div>
              ))}
              {/* Add sub-task inline */}
              <div className="flex items-center gap-1.5 mt-1">
                <input
                  value={newSub}
                  onChange={(e) => setNewSub(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddSub()}
                  placeholder="Add sub-task…"
                  className="flex-1 text-xs bg-transparent border-b border-muted focus:border-primary outline-none py-0.5"
                />
                <button
                  type="button"
                  onClick={handleAddSub}
                  className="text-primary"
                >
                  <Check className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}

          {/* Meta row */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs px-2 py-0.5">
              {task.category}
            </Badge>

            <div className={cn("flex items-center gap-1 text-xs", priorityText[task.priority])}>
              <Flag className="h-3 w-3" />
              <span className="capitalize">{task.priority}</span>
            </div>

            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>
                  {new Date(task.dueDate + "T00:00:00").toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}

            {task.estimatedTime && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{task.estimatedTime}h</span>
              </div>
            )}

            {task.recurrence && task.recurrence !== "none" && (
              <div className="flex items-center gap-1 text-xs text-secondary">
                <RepeatIcon className="h-3 w-3" />
                <span className="capitalize">{task.recurrence}</span>
              </div>
            )}

            {isBlocked && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                <span>Blocked</span>
              </div>
            )}

            {/* Tags */}
            {task.tags?.map((tag) => (
              <span key={tag} className="text-xs text-primary/70">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
