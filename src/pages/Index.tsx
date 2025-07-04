import { useState } from "react";
import { Task } from "@/components/TaskCard";
import { TaskCard } from "@/components/TaskCard";
import { QuickTask } from "@/components/QuickTask";
import { StatsCard } from "@/components/StatsCard";
import { TaskFilter } from "@/components/TaskFilter";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Clock, TrendingUp, Target } from "lucide-react";

// Sample modern tasks
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Review quarterly performance metrics",
    description: "Analyze Q4 data and prepare insights for team meeting",
    priority: "high",
    status: "in-progress",
    dueDate: "2025-01-08",
    category: "Work",
    assignee: "You",
    estimatedTime: 3
  },
  {
    id: "2", 
    title: "Update portfolio website",
    description: "Add new projects and refresh design elements",
    priority: "medium",
    status: "todo",
    dueDate: "2025-01-10",
    category: "Personal",
    estimatedTime: 5
  },
  {
    id: "3",
    title: "Call dentist for appointment",
    priority: "low",
    status: "todo",
    dueDate: "2025-01-07",
    category: "Health",
    estimatedTime: 0.5
  },
  {
    id: "4",
    title: "Finish React course module 8",
    description: "Complete exercises on custom hooks and context",
    priority: "medium", 
    status: "completed",
    dueDate: "2025-01-05",
    category: "Learning",
    estimatedTime: 2,
    completedAt: "2025-01-05T16:30:00Z"
  },
  {
    id: "5",
    title: "Plan weekend trip",
    description: "Book hotel and create itinerary for Barcelona",
    priority: "low",
    status: "todo", 
    dueDate: "2025-01-15",
    category: "Personal",
    estimatedTime: 2
  }
];

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeFilter, setActiveFilter] = useState("all");
  const { toast } = useToast();

  const handleToggleComplete = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newStatus: Task["status"] = task.status === "completed" ? "todo" : "completed";
        const updatedTask: Task = {
          ...task,
          status: newStatus,
          completedAt: newStatus === "completed" ? new Date().toISOString() : undefined
        };
        
        toast({
          title: newStatus === "completed" ? "Task completed! 🎉" : "Task reopened",
          description: `"${task.title}" has been ${newStatus === "completed" ? "completed" : "reopened"}.`,
        });
        
        return updatedTask;
      }
      return task;
    }));
  };

  const handleQuickAdd = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      priority: "medium",
      status: "todo",
      category: "Personal"
    };
    
    setTasks(prev => [newTask, ...prev]);
    
    toast({
      title: "Task added! ✨",
      description: `"${title}" has been added to your list.`,
    });
  };

  const getFilteredTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (activeFilter) {
      case "today":
        return tasks.filter(task => task.dueDate === today);
      case "high":
        return tasks.filter(task => task.priority === "high");
      case "work":
        return tasks.filter(task => task.category === "Work");
      default:
        return tasks.filter(task => task.status !== "completed");
    }
  };

  const getStats = () => {
    const completed = tasks.filter(t => t.status === "completed").length;
    const total = tasks.length;
    const pending = tasks.filter(t => t.status !== "completed").length;
    const highPriority = tasks.filter(t => t.priority === "high" && t.status !== "completed").length;
    
    return { completed, total, pending, highPriority };
  };

  const getTaskCounts = () => {
    const today = new Date().toISOString().split('T')[0];
    return {
      all: tasks.filter(t => t.status !== "completed").length,
      today: tasks.filter(t => t.dueDate === today).length,
      high: tasks.filter(t => t.priority === "high" && t.status !== "completed").length,
      work: tasks.filter(t => t.category === "Work" && t.status !== "completed").length,
    };
  };

  const stats = getStats();
  const filteredTasks = getFilteredTasks();
  const taskCounts = getTaskCounts();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
            Good morning! 👋
          </h1>
          <p className="text-muted-foreground">
            You have {stats.pending} pending tasks today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Tasks"
            value={stats.total}
            icon={Target}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Completed"
            value={stats.completed}
            icon={CheckCircle2}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="In Progress"
            value={stats.pending}
            icon={Clock}
          />
          <StatsCard
            title="High Priority"
            value={stats.highPriority}
            subtitle="needs attention"
            icon={TrendingUp}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <QuickTask onAddTask={handleQuickAdd} />
            <TaskFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              taskCounts={taskCounts}
            />
          </div>

          {/* Tasks List */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <h2 className="text-xl font-semibold capitalize">
                {activeFilter === "all" ? "Active Tasks" : activeFilter.replace("_", " ")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {filteredTasks.length} tasks
              </p>
            </div>
            
            <div className="space-y-3">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, index) => (
                  <div key={task.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <TaskCard
                      task={task}
                      onToggleComplete={handleToggleComplete}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-lg font-medium mb-2">All caught up!</h3>
                  <p className="text-sm">No tasks match your current filter.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;