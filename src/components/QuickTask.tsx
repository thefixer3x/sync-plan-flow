/**
 * QuickTask with NLP parser + keyboard shortcut (N to focus).
 */
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { parseTask, type ParsedTask } from "@/lib/nlpParser";
import { Badge } from "@/components/ui/badge";

interface QuickTaskProps {
  onAddTask: (parsed: ParsedTask) => void;
  className?: string;
}

export function QuickTask({ onAddTask, className }: QuickTaskProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const parsed = value.trim() ? parseTask(value) : null;

  // Keyboard shortcut: N focuses the quick-add input
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.metaKey || e.ctrlKey) return;
      if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || !parsed) return;
    onAddTask(parsed);
    setValue("");
  };

  return (
    <div className={cn("space-y-3", className)}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Quick add… "Pay rent tomorrow high #finance"  •  Press N'
            className="pl-10 pr-12 h-12 text-sm rounded-xl border-muted focus:border-primary transition-colors"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setValue("");
                inputRef.current?.blur();
              }
            }}
          />
          {value && (
            <Button
              type="submit"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-lg"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </form>

      {/* Live parse preview */}
      {parsed && value.trim() && (
        <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground px-1">
          <span className="font-medium text-foreground truncate max-w-[200px]">
            "{parsed.title}"
          </span>
          <Badge variant="outline" className="capitalize text-xs py-0">
            {parsed.priority}
          </Badge>
          {parsed.dueDate && (
            <Badge variant="outline" className="text-xs py-0">
              {new Date(parsed.dueDate + "T00:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" })}
            </Badge>
          )}
          {parsed.dueTime && (
            <Badge variant="outline" className="text-xs py-0">
              {parsed.dueTime}
            </Badge>
          )}
          <Badge variant="secondary" className="text-xs py-0">
            {parsed.category}
          </Badge>
          {parsed.tags.map((tag) => (
            <span key={tag} className="text-primary">#{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}
