import { useState } from "react";
import { useTaskStore } from "@/hooks/useTaskStore";
import { TaskBoard } from "@/components/TaskBoard";
import { TaskFilter } from "@/components/TaskFilter";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";
import { QuickTask } from "@/components/QuickTask";
import { Task } from "@/components/TaskCard";

const Tasks = () => {
  const { tasks, addTask, toggleComplete, deleteTask, stats } = useTaskStore();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    switch (activeFilter) {
      case "today":
        return task.dueDate === new Date().toISOString().split("T")[0];
      case "high":
        return task.priority === "high" && task.status !== "completed";
      case "work":
        return task.category === "Work";
      default:
        return true;
    }
  });

  const taskCounts = {
    all: tasks.length,
    today: stats.dueToday,
    high: stats.highPriority,
    work: tasks.filter((t) => t.category === "Work").length,
  };

  const handleQuickAdd = (title: string) => {
    addTask({
      title,
      priority: "medium",
      category: "Personal",
    });
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <QuickTask onAddTask={handleQuickAdd} />

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        <TaskFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          taskCounts={taskCounts}
        />
        <TaskBoard
          tasks={filteredTasks}
          onToggleComplete={toggleComplete}
          onAddTask={() => setCreateDialogOpen(true)}
        />
      </div>

      <CreateTaskDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreateTask={addTask}
      />
    </div>
  );
};

export default Tasks;
