import { useState } from "react";
import { TaskCard, Task } from "./TaskCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter, LayoutGrid, List, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskBoardProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void;
  onAddTask: () => void;
  className?: string;
}

type ViewMode = "kanban" | "list" | "calendar";

const statusColumns = [
  { id: "todo", title: "To Do", color: "bg-muted/50" },
  { id: "in-progress", title: "In Progress", color: "bg-primary/10" },
  { id: "completed", title: "Completed", color: "bg-success/10" },
] as const;

export function TaskBoard({ tasks, onToggleComplete, onAddTask, className }: TaskBoardProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("kanban");
  
  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter(task => task.status === status);
  };

  const getTotalTasks = () => tasks.length;
  const getCompletedTasks = () => tasks.filter(task => task.status === "completed").length;
  const getProgressPercentage = () => {
    const total = getTotalTasks();
    const completed = getCompletedTasks();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const renderHeader = (title: string) => (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{getTotalTasks()} total tasks</span>
          <span>•</span>
          <span>{getCompletedTasks()} completed</span>
          <span>•</span>
          <span>{getProgressPercentage()}% done</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-lg border bg-background p-1">
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="h-8 px-3"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "kanban" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("kanban")}
            className="h-8 px-3"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "calendar" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("calendar")}
            className="h-8 px-3"
          >
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
        
        <Button variant="hero" onClick={onAddTask} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>
    </div>
  );

  const renderProgressBar = () => (
    <div className="bg-muted rounded-full h-2 overflow-hidden">
      <div 
        className="h-full bg-gradient-primary transition-all duration-500"
        style={{ width: `${getProgressPercentage()}%` }}
      />
    </div>
  );

  if (viewMode === "list") {
    return (
      <div className={cn("space-y-6", className)}>
        {renderHeader("My Tasks")}
        {renderProgressBar()}
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              className="animate-slide-in"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {renderHeader("Task Board")}
      {renderProgressBar()}

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statusColumns.map((column) => {
          const columnTasks = getTasksByStatus(column.id as Task["status"]);
          
          return (
            <Card key={column.id} className={cn("min-h-[400px]", column.color)}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {column.title}
                  </CardTitle>
                  <Badge variant="secondary" className="h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs">
                    {columnTasks.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    className="animate-slide-in"
                  />
                ))}
                {columnTasks.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No tasks yet
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}