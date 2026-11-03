import { useEffect, useMemo, useState } from "react";
import { Loader2, ListChecks, Clock, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useTaskStore } from "@/hooks/useTaskStore";
import { callFunction } from "@/lib/edgeFunctions";
import { issueFromTask, isGithubTask, subtasksToTasks, type GeneratedSubtask } from "@/lib/issueBreakdown";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTaskId?: string;
}

const priorityVariant = { high: "destructive", medium: "default", low: "secondary" } as const;

export function IssueBreakdownDialog({ open, onOpenChange, initialTaskId }: Props) {
  const { tasks, addTask } = useTaskStore();
  const { toast } = useToast();
  const issues = useMemo(() => tasks.filter(isGithubTask), [tasks]);
  const [taskId, setTaskId] = useState<string | undefined>(initialTaskId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState("");
  const [subtasks, setSubtasks] = useState<GeneratedSubtask[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (open) setTaskId(initialTaskId ?? issues[0]?.id);
  }, [open, initialTaskId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setSubtasks([]); setSummary(""); setError(null); setSelected(new Set());
  }, [taskId]);

  const parent = issues.find((t) => t.id === taskId);

  const generate = async () => {
    if (!parent) return;
    setLoading(true); setError(null);
    try {
      const res = await callFunction<{ summary: string; subtasks: GeneratedSubtask[] }>("issue-subtasks", {
        issue: issueFromTask(parent),
      });
      setSummary(res.summary);
      setSubtasks(res.subtasks);
      setSelected(new Set(res.subtasks.map((_, i) => i)));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const addToBoard = async () => {
    if (!parent) return;
    const chosen = subtasks.filter((_, i) => selected.has(i));
    for (const t of subtasksToTasks(parent, chosen)) await addTask(t);
    toast({ title: `${chosen.length} subtask${chosen.length === 1 ? "" : "s"} added`, description: `Linked to “${parent.title}”.` });
    onOpenChange(false);
  };

  const toggle = (i: number) =>
    setSelected((prev) => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Wand2 className="h-4 w-4 text-primary" /> Break down an issue</DialogTitle>
          <DialogDescription>Pick a synced GitHub issue and get clear, prioritized steps you can add to your board.</DialogDescription>
        </DialogHeader>

        {issues.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">Sync GitHub first — your assigned issues will show up here.</p>
        ) : (
          <div className="space-y-4 overflow-y-auto min-h-0">
            <div className="flex gap-2">
              <Select value={taskId} onValueChange={setTaskId}>
                <SelectTrigger className="flex-1"><SelectValue placeholder="Choose an issue" /></SelectTrigger>
                <SelectContent>
                  {issues.map((t) => <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button onClick={generate} disabled={!parent || loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ListChecks className="h-4 w-4" />}
                {subtasks.length ? "Redo" : "Generate"}
              </Button>
            </div>

            {loading && <p className="text-sm text-muted-foreground">Reading the issue and planning the steps…</p>}
            {error && <p className="text-sm text-destructive">{error}</p>}

            {subtasks.length > 0 && (
              <div className="space-y-3">
                {summary && <p className="text-sm font-medium">{summary}</p>}
                <ul className="space-y-2">
                  {subtasks.map((s, i) => (
                    <li key={i}>
                      <label className="flex gap-3 rounded-lg border p-3 cursor-pointer hover:border-primary/40 transition-colors">
                        <Checkbox checked={selected.has(i)} onCheckedChange={() => toggle(i)} className="mt-0.5" />
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold">{s.title}</span>
                            <Badge variant={priorityVariant[s.priority]} className="text-[10px] capitalize">{s.priority}</Badge>
                            <span className="text-xs text-muted-foreground inline-flex items-center gap-1"><Clock className="h-3 w-3" />{s.estimateMinutes}m</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{s.detail}</p>
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Close</Button>
          <Button onClick={addToBoard} disabled={selected.size === 0 || !subtasks.length}>
            Add {selected.size || ""} to board
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
