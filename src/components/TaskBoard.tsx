import { useState } from "react";
import { TaskCard } from "./TaskCard";
import type { Task } from "@/store/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskBoardProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void;
  onDeleteTask?: (taskId: string) => void;
  onAddTask: () => void;
  className?: string;
}

type ViewMode = "kanban" | "list";

const COLUMNS = [
  { id: "todo" as const, title: "To Do", color: "bg-muted/30" },
  { id: "in-progress" as const, title: "In Progress", color: "bg-primary/5" },
  { id: "completed" as const, title: "Completed", color: "bg-success/5" },
];

export function TaskBoard({ tasks, onToggleComplete, onAddTask, className }: TaskBoardProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("kanban");

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const header = (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 className="text-lg font-semibold">
          {viewMode === "list" ? "All Tasks" : "Task Board"}
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          {total} tasks · {completed} completed · {pct}% done
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* View toggle */}
        <div className="flex items-center rounded-lg border bg-background p-0.5 gap-0.5">
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="h-7 w-7 p-0"
          >
            <List className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={viewMode === "kanban" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("kanban")}
            className="h-7 w-7 p-0"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
          </Button>
        </div>

        <Button onClick={onAddTask} size="sm" className="gap-1.5 h-8">
          <Plus className="h-3.5 w-3.5" />
          Add Task
        </Button>
      </div>
    </div>
  );

  const progressBar = (
    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-primary transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );

  if (viewMode === "list") {
    return (
      <div className={cn("space-y-4", className)}>
        {header}
        {progressBar}
        <div className="space-y-2">
          {tasks.length === 0 ? (
            <EmptyState onAddTask={onAddTask} />
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggleComplete={onToggleComplete} />
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {header}
      {progressBar}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          return (
            <Card key={col.id} className={cn("min-h-[320px]", col.color)}>
              <CardHeader className="pb-2 pt-4 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{col.title}</CardTitle>
                  <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {colTasks.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="px-3 pb-3 space-y-2">
                {colTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    compact
                  />
                ))}
                {colTasks.length === 0 && (
                  <p className="text-center py-8 text-xs text-muted-foreground">Empty</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function EmptyState({ onAddTask }: { onAddTask: () => void }) {
  return (
    <div className="text-center py-16 space-y-3">
      <p className="text-muted-foreground text-sm">No tasks yet</p>
      <Button variant="outline" size="sm" onClick={onAddTask} className="gap-1.5">
        <Plus className="h-3.5 w-3.5" />
        Add your first task
      </Button>
    </div>
  );
}
