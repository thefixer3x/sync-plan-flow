import { useState } from "react";
import { TaskBoard } from "@/components/TaskBoard";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";
import { Task } from "@/components/TaskCard";
import { useToast } from "@/hooks/use-toast";

// Sample tasks to demonstrate the interface
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design new user dashboard",
    description: "Create wireframes and mockups for the improved user dashboard with better navigation and analytics",
    priority: "high",
    status: "in-progress",
    dueDate: "2025-01-10",
    category: "Design",
    assignee: "Sarah Chen",
    estimatedTime: 8
  },
  {
    id: "2", 
    title: "Implement authentication system",
    description: "Set up secure login/logout with JWT tokens and password reset functionality",
    priority: "high",
    status: "todo",
    dueDate: "2025-01-15",
    category: "Development",
    assignee: "Mike Johnson", 
    estimatedTime: 12
  },
  {
    id: "3",
    title: "Write API documentation",
    description: "Document all REST endpoints with examples and response schemas",
    priority: "medium",
    status: "todo",
    dueDate: "2025-01-20",
    category: "Documentation",
    estimatedTime: 6
  },
  {
    id: "4",
    title: "Set up deployment pipeline",
    description: "Configure CI/CD with automated testing and deployment to staging",
    priority: "medium", 
    status: "completed",
    dueDate: "2025-01-05",
    category: "DevOps",
    assignee: "Alex Kim",
    estimatedTime: 4,
    completedAt: "2025-01-04T14:30:00Z"
  },
  {
    id: "5",
    title: "Conduct user research interviews",
    description: "Schedule and conduct 5 user interviews to validate new feature concepts",
    priority: "low",
    status: "todo", 
    dueDate: "2025-01-25",
    category: "Research",
    assignee: "Emma Rodriguez",
    estimatedTime: 10
  },
  {
    id: "6",
    title: "Optimize database queries",
    description: "Review and optimize slow database queries identified in performance monitoring",
    priority: "medium",
    status: "in-progress",
    category: "Development", 
    estimatedTime: 4
  }
];

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
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

  const handleCreateTask = (newTaskData: Omit<Task, "id" | "status" | "completedAt">) => {
    const newTask: Task = {
      ...newTaskData,
      id: Date.now().toString(),
      status: "todo"
    };
    
    setTasks(prev => [newTask, ...prev]);
    
    toast({
      title: "Task created successfully! ✨",
      description: `"${newTask.title}" has been added to your task list.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <TaskBoard
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onAddTask={() => setIsCreateDialogOpen(true)}
        />
      </div>
      
      <CreateTaskDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateTask={handleCreateTask}
      />
    </div>
  );
};

export default Index;
