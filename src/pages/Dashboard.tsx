import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTaskStore } from "@/hooks/useTaskStore";
import { usePhase2Store } from "@/hooks/usePhase2Store";
import { generateTodayPlan } from "@/lib/phase2/engine";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckSquare,
  Circle,
  CircleCheck,
  Clock,
  Flag,
  TrendingUp,
  Calendar,
  Zap,
  ArrowRight,
  CreditCard,
} from "lucide-react";

const Dashboard = () => {
  const { tasks, stats, toggleComplete } = useTaskStore();
  const {
    suggestions,
    memoryPreferences,
    onboardingProgress,
    rebuildOrchestration,
    dismissOnboarding,
  } = usePhase2Store(tasks);

  const todayTasks = tasks.filter(
    (t) => t.dueDate === new Date().toISOString().split("T")[0] && t.status !== "completed"
  );
  const pendingSuggestions = suggestions.filter((entry) => entry.status === "pending");
  const focusPreview = useMemo(
    () => generateTodayPlan(tasks, 2, [], memoryPreferences).slice(0, 3),
    [tasks, memoryPreferences]
  );
  const userCreatedTaskCount = tasks.filter((task) => !task.id.startsWith("seed-")).length;
  const onboardingSteps = [
    {
      id: "create-tasks",
      title: "Create 3 tasks",
      done: userCreatedTaskCount >= 3,
      action: "/tasks",
      actionLabel: "Open Tasks",
      detail: `${Math.min(userCreatedTaskCount, 3)}/3`,
    },
    {
      id: "generate-plan",
      title: "Generate today plan",
      done: onboardingProgress.generatedPlan,
      action: "/focus",
      actionLabel: "Open Focus",
      detail: "Plan builder",
    },
    {
      id: "start-timer",
      title: "Start focus timer",
      done: onboardingProgress.startedTimer,
      action: "/focus",
      actionLabel: "Start Timer",
      detail: "Pomodoro",
    },
  ];
  const firstTwoMinutesDone = onboardingSteps.every((step) => step.done);
  const showOnboarding = !onboardingProgress.dismissed && !firstTwoMinutesDone;

  useEffect(() => {
    rebuildOrchestration().catch(console.error);
  }, [rebuildOrchestration]);

  const upcomingBills = [
    { name: "Electricity Bill", amount: "£127", due: "Tomorrow", urgent: true },
    { name: "Netflix", amount: "£15.99", due: "Mar 1", urgent: false },
    { name: "Gym Membership", amount: "£35", due: "Mar 5", urgent: false },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Your productivity at a glance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Tasks" value={stats.total} icon={CheckSquare} />
        <StatsCard title="Completed" value={stats.completed} icon={TrendingUp} trend={{ value: 12, isPositive: true }} />
        <StatsCard title="Due Today" value={stats.dueToday} icon={Calendar} />
        <StatsCard title="High Priority" value={stats.highPriority} icon={Flag} />
      </div>

      {showOnboarding && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle className="text-base">First 2 Minutes</CardTitle>
                <CardDescription className="text-xs">
                  Create momentum fast: add tasks, generate a plan, start a timer.
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissOnboarding().catch(console.error)}
              >
                Hide
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {onboardingSteps.map((step) => (
              <div key={step.id} className="flex items-center justify-between gap-3 rounded-md border p-2">
                <div className="flex items-center gap-2 min-w-0">
                  {step.done ? (
                    <CircleCheck className="h-4 w-4 text-primary shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                  <p className="text-sm truncate">{step.title}</p>
                  <Badge variant="outline" className="text-[10px] shrink-0">
                    {step.detail}
                  </Badge>
                </div>
                {!step.done && (
                  <Button asChild variant="outline" size="sm">
                    <Link to={step.action}>{step.actionLabel}</Link>
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Today's Tasks</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link to="/tasks" className="gap-1 text-xs">View All <ArrowRight className="h-3 w-3" /></Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No tasks due today 🎉</p>
            ) : (
              todayTasks.slice(0, 5).map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => toggleComplete(task.id)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${
                      task.priority === "high" ? "bg-destructive" :
                      task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                    }`} />
                    <span className="text-sm truncate">{task.title}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs shrink-0">{task.category}</Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Quick Wins */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Quick Wins
            </CardTitle>
            <CardDescription className="text-xs">Tasks you can finish in under 30 minutes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks
              .filter((t) => t.estimatedTime && t.estimatedTime <= 0.5 && t.status !== "completed")
              .slice(0, 4)
              .map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <span className="text-sm">{task.title}</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {task.estimatedTime}h
                  </div>
                </div>
              ))}
            {tasks.filter((t) => t.estimatedTime && t.estimatedTime <= 0.5 && t.status !== "completed").length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No quick wins available</p>
            )}
          </CardContent>
        </Card>

        {/* Payment Timeline */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              Upcoming Bills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingBills.map((bill, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="text-sm font-medium">{bill.name}</p>
                  <p className="text-xs text-muted-foreground">Due {bill.due}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{bill.amount}</p>
                  {bill.urgent && (
                    <Badge variant="destructive" className="text-xs">Urgent</Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="h-4 w-4 text-secondary" />
              AI Recommendations
            </CardTitle>
            <CardDescription className="text-xs">
              Live suggestions from your local orchestration loop.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {pendingSuggestions.slice(0, 4).map((suggestion) => (
              <div key={suggestion.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="text-primary text-xs mt-0.5">●</span>
                <div>
                  <span className="text-sm">{suggestion.title}</span>
                  <p className="text-xs text-muted-foreground">{suggestion.rationale}</p>
                </div>
              </div>
            ))}
            {pendingSuggestions.length === 0 && (
              <p className="text-sm text-muted-foreground">No pending suggestions right now.</p>
            )}
            <Button asChild variant="outline" size="sm" className="mt-2">
              <Link to="/activity">Open Activity Feed</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Next Focus Block */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Next Focus Block
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {focusPreview.map((item) => (
              <div key={item.task.id} className="p-2 rounded-md border">
                <p className="text-sm font-medium">{item.task.title}</p>
                <p className="text-xs text-muted-foreground">
                  {item.estimatedMinutes} min · {item.reasons.join(" · ")}
                </p>
              </div>
            ))}
            {focusPreview.length === 0 && (
              <p className="text-sm text-muted-foreground">No focus block yet. Generate one in Focus Mode.</p>
            )}
            <Button asChild variant="outline" size="sm">
              <Link to="/focus">Open Focus Mode</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
