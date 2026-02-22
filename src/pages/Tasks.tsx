import { useState, useEffect, useCallback } from "react";
import { useTaskStore } from "@/hooks/useTaskStore";
import { TaskBoard } from "@/components/TaskBoard";
import { TaskFilter } from "@/components/TaskFilter";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";
import { QuickTask } from "@/components/QuickTask";
import { parseTask } from "@/lib/nlpParser";
import type { Task } from "@/store/db";

const Tasks = () => {
  const { tasks, addTask, toggleComplete, deleteTask, stats } = useTaskStore();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  // Keyboard shortcut: N → new task dialog (handled in QuickTask),
  // Cmd/Ctrl+K → open create dialog
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCreateDialogOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const today = new Date().toISOString().split("T")[0];
    switch (activeFilter) {
      case "today":
        return task.dueDate === today;
      case "high":
        return task.priority === "high" && task.status !== "completed";
      case "work":
        return task.category === "Work";
      case "blocked":
        return (task.blockedByTaskIds?.length ?? 0) > 0;
      default:
        return true;
    }
  });

  const taskCounts = {
    all: tasks.length,
    today: stats.dueToday,
    high: stats.highPriority,
    work: tasks.filter((t) => t.category === "Work").length,
    blocked: tasks.filter((t) => (t.blockedByTaskIds?.length ?? 0) > 0).length,
  };

  const handleQuickAdd = useCallback(
    (parsed: ReturnType<typeof parseTask>) => {
      addTask({
        title: parsed.title,
        priority: parsed.priority,
        category: parsed.category,
        dueDate: parsed.dueDate,
        dueTime: parsed.dueTime,
        tags: parsed.tags,
      });
    },
    [addTask]
  );

  const handleCreateTask = useCallback(
    (taskData: Omit<Task, "id" | "status" | "completedAt">) => {
      addTask(taskData);
    },
    [addTask]
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-5">
      <QuickTask onAddTask={handleQuickAdd} />

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5">
        <TaskFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          taskCounts={taskCounts}
        />
        <TaskBoard
          tasks={filteredTasks}
          onToggleComplete={toggleComplete}
          onDeleteTask={deleteTask}
          onAddTask={() => setCreateDialogOpen(true)}
        />
      </div>

      <CreateTaskDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreateTask={handleCreateTask}
      />
    </div>
  );
};

export default Tasks;
