import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickTaskProps {
  onAddTask: (title: string) => void;
  className?: string;
}

export function QuickTask({ onAddTask, className }: QuickTaskProps) {
  const [task, setTask] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      onAddTask(task.trim());
      setTask("");
      setIsExpanded(false);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground/90 mb-2">
          Quick Add
        </h2>
        <p className="text-sm text-muted-foreground">
          What would you like to get done today?
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Input
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
              if (!isExpanded && e.target.value) {
                setIsExpanded(true);
              }
            }}
            placeholder="Type your task here..."
            className="pr-12 text-base h-12 rounded-xl border-2 border-muted focus:border-primary transition-colors"
          />
          {task && (
            <Button
              type="submit"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-lg"
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {isExpanded && !task && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsExpanded(false)}
            className="w-full text-muted-foreground"
          >
            Cancel
          </Button>
        )}
      </form>
    </div>
  );
}