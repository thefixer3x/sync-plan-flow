import { useEffect, useMemo, useState } from "react";
import { Lock, Play, Square, Timer, Unlock } from "lucide-react";
import { useTaskStore } from "@/hooks/useTaskStore";
import { usePhase2Store } from "@/hooks/usePhase2Store";
import { buildDailyDigest, generateTodayPlan } from "@/lib/phase2/engine";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const PRESETS = [
  { label: "25 / 5", workMinutes: 25, breakMinutes: 5 },
  { label: "50 / 10", workMinutes: 50, breakMinutes: 10 },
];

function formatClock(seconds: number) {
  const safe = Math.max(0, seconds);
  const minutes = Math.floor(safe / 60)
    .toString()
    .padStart(2, "0");
  const remaining = Math.floor(safe % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${remaining}`;
}

const Focus = () => {
  const { tasks } = useTaskStore();
  const {
    focusSessions,
    actionLogs,
    memoryPreferences,
    addFocusSession,
    completeFocusSession,
    markOnboardingGeneratedPlan,
    markOnboardingStartedTimer,
  } = usePhase2Store(tasks);

  const [budgetHours, setBudgetHours] = useState(2);
  const [lockedTaskIds, setLockedTaskIds] = useState<string[]>([]);
  const [planGenerated, setPlanGenerated] = useState(false);
  const [preset, setPreset] = useState(PRESETS[0]);
  const [customWork, setCustomWork] = useState(25);
  const [customBreak, setCustomBreak] = useState(5);
  const [useCustom, setUseCustom] = useState(false);

  const [isRunning, setIsRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<"focus" | "break">("focus");
  const [secondsLeft, setSecondsLeft] = useState(PRESETS[0].workMinutes * 60);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const activeWorkMinutes = useCustom ? customWork : preset.workMinutes;
  const activeBreakMinutes = useCustom ? customBreak : preset.breakMinutes;

  const plan = useMemo(() => {
    if (!planGenerated) return [];
    return generateTodayPlan(tasks, budgetHours, lockedTaskIds, memoryPreferences);
  }, [tasks, budgetHours, lockedTaskIds, memoryPreferences, planGenerated]);

  const digest = useMemo(
    () => buildDailyDigest(tasks, plan, focusSessions, actionLogs),
    [tasks, plan, focusSessions, actionLogs]
  );

  useEffect(() => {
    if (!isRunning) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning || secondsLeft > 0) return;

    if (timerMode === "focus") {
      setTimerMode("break");
      setSecondsLeft(activeBreakMinutes * 60);
      return;
    }

    setIsRunning(false);
    setTimerMode("focus");
    setSecondsLeft(activeWorkMinutes * 60);

    if (activeSessionId) {
      completeFocusSession(activeSessionId, "completed").catch(console.error);
      setActiveSessionId(null);
    }
  }, [
    isRunning,
    secondsLeft,
    timerMode,
    activeBreakMinutes,
    activeWorkMinutes,
    activeSessionId,
    completeFocusSession,
  ]);

  const toggleLock = (taskId: string) => {
    setLockedTaskIds((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const handleGeneratePlan = () => {
    setPlanGenerated(true);
    markOnboardingGeneratedPlan().catch(console.error);
  };

  const handleStartTimer = async () => {
    if (!isRunning) {
      const id = crypto.randomUUID();
      setActiveSessionId(id);
      await addFocusSession({
        id,
        startedAt: new Date().toISOString(),
        workMinutes: activeWorkMinutes,
        breakMinutes: activeBreakMinutes,
        status: "running",
        taskIds: plan.map((item) => item.task.id),
      });
      await markOnboardingStartedTimer();
    }
    setIsRunning(true);
  };

  const handleStopTimer = async () => {
    setIsRunning(false);
    setTimerMode("focus");
    setSecondsLeft(activeWorkMinutes * 60);
    if (activeSessionId) {
      await completeFocusSession(activeSessionId, "cancelled");
      setActiveSessionId(null);
    }
  };

  useEffect(() => {
    setSecondsLeft(activeWorkMinutes * 60);
    setTimerMode("focus");
  }, [activeWorkMinutes]);

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Timer className="h-6 w-6 text-primary" />
          Focus Mode
        </h1>
        <p className="text-sm text-muted-foreground">
          Build today’s plan, lock priorities, and run focused sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Today Plan Builder</CardTitle>
            <CardDescription>
              Rules include due-today + high-priority + quick wins, with blocked tasks excluded.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Time Budget</span>
                <span className="font-medium">{budgetHours}h</span>
              </div>
              <Slider
                min={1}
                max={6}
                step={1}
                value={[budgetHours]}
                onValueChange={([value]) => setBudgetHours(value)}
              />
            </div>

            <Button onClick={handleGeneratePlan} className="w-full">
              Generate Today Plan
            </Button>

            <div className="space-y-2">
              {plan.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Generate a plan to start prioritizing work blocks.
                </p>
              )}
              {plan.map((item) => (
                <div key={item.task.id} className="p-3 rounded-lg border space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{item.task.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.estimatedMinutes} min · {item.reasons.join(" · ")}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => toggleLock(item.task.id)}
                      title={lockedTaskIds.includes(item.task.id) ? "Unlock task" : "Lock task"}
                    >
                      {lockedTaskIds.includes(item.task.id) ? (
                        <Lock className="h-4 w-4 text-primary" />
                      ) : (
                        <Unlock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{item.task.priority}</Badge>
                    <Badge variant="outline">{item.task.category}</Badge>
                    {lockedTaskIds.includes(item.task.id) && <Badge>Locked</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Focus Timer</CardTitle>
            <CardDescription>
              Pomodoro presets plus custom timer. Sessions are saved locally.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((entry) => (
                <Button
                  key={entry.label}
                  size="sm"
                  variant={!useCustom && preset.label === entry.label ? "default" : "outline"}
                  onClick={() => {
                    setUseCustom(false);
                    setPreset(entry);
                  }}
                >
                  {entry.label}
                </Button>
              ))}
              <Button
                size="sm"
                variant={useCustom ? "default" : "outline"}
                onClick={() => setUseCustom(true)}
              >
                Custom
              </Button>
            </div>

            {useCustom && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Work (min)</p>
                  <Input
                    type="number"
                    min={5}
                    max={180}
                    value={customWork}
                    onChange={(event) => setCustomWork(Number(event.target.value) || 25)}
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Break (min)</p>
                  <Input
                    type="number"
                    min={1}
                    max={60}
                    value={customBreak}
                    onChange={(event) => setCustomBreak(Number(event.target.value) || 5)}
                  />
                </div>
              </div>
            )}

            <div className="text-center rounded-lg border p-4">
              <p className="text-xs uppercase text-muted-foreground tracking-wide">
                {timerMode === "focus" ? "Focus block" : "Break"}
              </p>
              <p className="text-4xl font-bold mt-2">{formatClock(secondsLeft)}</p>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 gap-2" onClick={handleStartTimer} disabled={isRunning}>
                <Play className="h-4 w-4" />
                Start
              </Button>
              <Button
                className="flex-1 gap-2"
                variant="outline"
                onClick={() => handleStopTimer().catch(console.error)}
              >
                <Square className="h-4 w-4" />
                Stop
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Daily Digest</CardTitle>
            <CardDescription>
              Local summary of changes, due items, recommendations, and timeline.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <DigestSection title="What changed today" items={digest.changedToday} />
            <DigestSection title="What’s due" items={digest.whatsDue} />
            <DigestSection title="Recommended focus" items={digest.recommendedFocus} />
            <DigestSection title="Pending bills timeline" items={digest.pendingBillsTimeline} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Session History</CardTitle>
            <CardDescription>Stored locally on this device.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[340px] overflow-y-auto">
            {focusSessions.length === 0 && (
              <p className="text-sm text-muted-foreground">No sessions yet. Start a timer to begin.</p>
            )}
            {focusSessions.map((session) => (
              <div key={session.id} className="border rounded-md p-2 text-sm">
                <p className="font-medium">
                  {session.workMinutes}/{session.breakMinutes} min · {session.status}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(session.startedAt).toLocaleString()}
                </p>
                {session.endedAt && (
                  <p className="text-xs text-muted-foreground">
                    Ended: {new Date(session.endedAt).toLocaleTimeString()}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function DigestSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{title}</p>
      <ul className="mt-1 space-y-1">
        {items.map((item) => (
          <li key={`${title}-${item}`} className="text-sm">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Focus;
