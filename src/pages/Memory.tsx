import { useState } from "react";
import { Brain, Clock, Tag, Star, Trash2, Search, RefreshCw, MessageSquare, Target, TrendingUp, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface MemoryEntry {
  id: string;
  type: "preference" | "context" | "habit" | "goal";
  content: string;
  source: string;
  timestamp: string;
  confidence: number;
  pinned?: boolean;
}

const INITIAL_MEMORIES: MemoryEntry[] = [
  { id: "1", type: "preference", content: "Prefers morning deep work sessions before 10 AM", source: "Observed from task patterns", timestamp: "2 days ago", confidence: 92, pinned: true },
  { id: "2", type: "habit", content: "Takes a break after 90 minutes of focused work", source: "Chat conversation", timestamp: "3 days ago", confidence: 85 },
  { id: "3", type: "goal", content: "Q1 goal: Launch product MVP by March 31", source: "User stated in chat", timestamp: "1 week ago", confidence: 100, pinned: true },
  { id: "4", type: "context", content: "Works remotely, timezone GMT+0", source: "Inferred from activity patterns", timestamp: "5 days ago", confidence: 78 },
  { id: "5", type: "preference", content: "Prefers bullet-point summaries over long paragraphs", source: "User feedback", timestamp: "4 days ago", confidence: 90 },
  { id: "6", type: "habit", content: "Checks tasks first thing in the morning", source: "Login pattern analysis", timestamp: "6 days ago", confidence: 88 },
  { id: "7", type: "goal", content: "Wants to reduce task backlog by 50% this month", source: "User stated in chat", timestamp: "2 days ago", confidence: 100 },
  { id: "8", type: "context", content: "High-priority tasks are usually work-related", source: "Task history analysis", timestamp: "1 week ago", confidence: 82 },
  { id: "9", type: "preference", content: "Prefers short meetings — blocks time for deep work", source: "Calendar patterns", timestamp: "3 days ago", confidence: 75 },
  { id: "10", type: "habit", content: "More productive on Tuesday and Wednesday", source: "Completion rate analysis", timestamp: "2 weeks ago", confidence: 91 },
];

const MEMORY_STATS = [
  { label: "Total memories", value: "47", icon: Brain, color: "text-primary" },
  { label: "Learned this week", value: "12", icon: TrendingUp, color: "text-green-500" },
  { label: "Pinned facts", value: "5", icon: Star, color: "text-yellow-500" },
  { label: "Avg confidence", value: "86%", icon: Zap, color: "text-secondary" },
];

const TYPE_CONFIG = {
  preference: { label: "Preference", color: "bg-primary/10 text-primary border-primary/20" },
  context: { label: "Context", color: "bg-secondary/10 text-secondary border-secondary/20" },
  habit: { label: "Habit", color: "bg-green-500/10 text-green-600 border-green-500/20" },
  goal: { label: "Goal", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
};

const CONVERSATION_HISTORY = [
  { id: "c1", preview: "Discussed Q1 product launch timeline and milestones", date: "Today", turns: 8 },
  { id: "c2", preview: "Task prioritization and energy level scheduling", date: "Yesterday", turns: 5 },
  { id: "c3", preview: "Review of weekly productivity and backlog reduction plan", date: "3 days ago", turns: 12 },
  { id: "c4", preview: "Set up bill reminders and payment tracking", date: "5 days ago", turns: 4 },
  { id: "c5", preview: "Onboarding: preferences, goals, and working style", date: "1 week ago", turns: 18 },
];

const Memory = () => {
  const [memories, setMemories] = useState<MemoryEntry[]>(INITIAL_MEMORIES);
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState<string>("all");
  const { toast } = useToast();

  const filtered = memories.filter((m) => {
    const matchesSearch = m.content.toLowerCase().includes(search.toLowerCase()) || m.source.toLowerCase().includes(search.toLowerCase());
    const matchesType = activeType === "all" || m.type === activeType;
    return matchesSearch && matchesType;
  });

  const pinned = filtered.filter((m) => m.pinned);
  const unpinned = filtered.filter((m) => !m.pinned);

  const togglePin = (id: string) => {
    setMemories((prev) => prev.map((m) => m.id === id ? { ...m, pinned: !m.pinned } : m));
  };

  const deleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
    toast({ title: "Memory removed", description: "The AI will no longer use this context." });
  };

  const clearAll = () => {
    setMemories([]);
    toast({ title: "Memory cleared", description: "All learned context has been removed." });
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Memory Visualizer</h1>
          <p className="text-sm text-muted-foreground">
            Everything your AI has learned about you. Review, pin, or clear context.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10" onClick={clearAll}>
          <Trash2 className="h-3.5 w-3.5" />
          Clear All Memory
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {MEMORY_STATS.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-4 flex items-center gap-3">
              <Icon className={`h-5 w-5 shrink-0 ${color}`} />
              <div>
                <p className="text-xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="memories">
        <TabsList>
          <TabsTrigger value="memories">Learned Context</TabsTrigger>
          <TabsTrigger value="history">Conversation History</TabsTrigger>
        </TabsList>

        {/* ─── Memories tab ─── */}
        <TabsContent value="memories" className="mt-5 space-y-5">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search memories…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["all", "preference", "context", "habit", "goal"].map((t) => (
                <Button
                  key={t}
                  size="sm"
                  variant={activeType === t ? "default" : "outline"}
                  onClick={() => setActiveType(t)}
                  className="text-xs capitalize"
                >
                  {t === "all" ? "All" : TYPE_CONFIG[t as keyof typeof TYPE_CONFIG]?.label ?? t}
                </Button>
              ))}
            </div>
          </div>

          {/* Pinned */}
          {pinned.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <Star className="h-3.5 w-3.5 text-yellow-500" /> Pinned
              </h3>
              {pinned.map((m) => <MemoryCard key={m.id} memory={m} onPin={togglePin} onDelete={deleteMemory} />)}
            </div>
          )}

          {/* Rest */}
          <div className="space-y-3">
            {pinned.length > 0 && unpinned.length > 0 && (
              <h3 className="text-sm font-semibold text-muted-foreground">All Memories</h3>
            )}
            {unpinned.map((m) => <MemoryCard key={m.id} memory={m} onPin={togglePin} onDelete={deleteMemory} />)}
            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Brain className="h-8 w-8 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No memories match your filter</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* ─── Conversation history tab ─── */}
        <TabsContent value="history" className="mt-5 space-y-4">
          <p className="text-xs text-muted-foreground">
            Past conversations inform your AI's context. Delete any you don't want remembered.
          </p>
          {CONVERSATION_HISTORY.map((c) => (
            <Card key={c.id} className="hover:border-primary/20 transition-colors">
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{c.preview}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{c.date}</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{c.turns} exchanges</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="ghost" size="sm" className="text-xs">View</Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive text-xs">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Privacy note */}
          <Card className="border-dashed">
            <CardContent className="p-4 text-center space-y-2">
              <RefreshCw className="h-5 w-5 text-muted-foreground mx-auto" />
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                All conversation data is stored locally on your device. Nothing is sent to external servers without your explicit permission.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

function MemoryCard({
  memory,
  onPin,
  onDelete,
}: {
  memory: MemoryEntry;
  onPin: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const config = TYPE_CONFIG[memory.type];
  return (
    <Card className="hover:border-primary/20 transition-colors">
      <CardContent className="p-4 flex items-start gap-3">
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className={`text-xs ${config.color}`}>
              <Tag className="h-2.5 w-2.5 mr-1" />
              {config.label}
            </Badge>
            {memory.pinned && <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />}
          </div>
          <p className="text-sm font-medium">{memory.content}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs text-muted-foreground">{memory.source}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{memory.timestamp}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${memory.confidence}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{memory.confidence}% confidence</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onPin(memory.id)}>
            <Star className={`h-3.5 w-3.5 ${memory.pinned ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}`} />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/60 hover:text-destructive" onClick={() => onDelete(memory.id)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Memory;
