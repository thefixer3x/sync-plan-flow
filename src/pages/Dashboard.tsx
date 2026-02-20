import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  Brain, 
  Zap, 
  TrendingUp, 
  Clock, 
  Target, 
  Calendar,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  ArrowUp,
  Sparkles,
  User,
  Bell,
  Settings
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [metrics, setMetrics] = useState({
    tasksCompleted: 24,
    productivityScore: 94,
    focusTime: 6.2,
    aiInterventions: 8,
    efficiency: 87,
    streak: 12
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const quickStats = [
    {
      title: "Tasks Completed",
      value: metrics.tasksCompleted,
      change: "+8 from yesterday",
      trend: "up",
      icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      title: "Productivity Score",
      value: `${metrics.productivityScore}%`,
      change: "+15% this week",
      trend: "up",
      icon: TrendingUp,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      title: "Focus Time",
      value: `${metrics.focusTime}h`,
      change: "Deep work mode",
      trend: "neutral",
      icon: Brain,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      title: "AI Interventions",
      value: metrics.aiInterventions,
      change: "Optimizing workflow",
      trend: "up",
      icon: Zap,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20"
    }
  ];

  const aiRecommendations = [
    {
      priority: "high",
      message: "Take a 15-minute break to maintain peak performance",
      action: "Schedule Break",
      type: "wellness"
    },
    {
      priority: "medium", 
      message: "Review quarterly budget allocation before 3 PM meeting",
      action: "Open Budget",
      type: "work"
    },
    {
      priority: "low",
      message: "Schedule gym session for optimal energy tomorrow",
      action: "Add to Calendar",
      type: "fitness"
    }
  ];

  const todaySchedule = [
    { time: "9:00 AM", title: "Team Standup", duration: "30 min", status: "completed" },
    { time: "10:00 AM", title: "Deep Work Block", duration: "2 hrs", status: "current" },
    { time: "12:00 PM", title: "Lunch Break", duration: "1 hr", status: "upcoming" },
    { time: "1:30 PM", title: "Client Review", duration: "45 min", status: "upcoming" },
    { time: "3:00 PM", title: "Budget Review", duration: "1 hr", status: "upcoming" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-start"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Good morning, Founder! ✨
            </h1>
            <p className="text-muted-foreground mt-2">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} • {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Bell className="w-4 h-4" />
              3 notifications
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`border-l-4 ${stat.borderColor} hover:shadow-lg transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className={`text-xs mt-1 flex items-center gap-1 ${stat.color}`}>
                        {stat.trend === "up" && <ArrowUp className="w-3 h-3" />}
                        {stat.change}
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - AI Recommendations */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* AI Recommendations */}
            <Card className="border border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  Bella's Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiRecommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-4 bg-muted/30 rounded-lg border border-muted"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge 
                            variant={rec.priority === "high" ? "destructive" : rec.priority === "medium" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {rec.priority} priority
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {rec.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground">{rec.message}</p>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">
                        {rec.action}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Productivity Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-500" />
                  Productivity Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Daily Efficiency</span>
                    <span className="font-medium">{metrics.efficiency}%</span>
                  </div>
                  <Progress value={metrics.efficiency} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Weekly Streak</span>
                    <span className="font-medium">{metrics.streak} days</span>
                  </div>
                  <Progress value={(metrics.streak / 14) * 100} className="h-2" />
                </div>

                <div className="pt-2">
                  <p className="text-xs text-muted-foreground">
                    🔥 You're on fire! Your productivity has increased 23% this month.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Center Column - Today's Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {todaySchedule.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`p-3 rounded-lg border-l-4 ${
                      item.status === "completed" 
                        ? "border-green-500 bg-green-50 dark:bg-green-950/20" 
                        : item.status === "current"
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                        : "border-gray-300 bg-gray-50 dark:bg-gray-950/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          item.status === "completed" 
                            ? "bg-green-500" 
                            : item.status === "current"
                            ? "bg-blue-500 animate-pulse"
                            : "bg-gray-400"
                        }`} />
                        <div>
                          <p className="font-medium text-sm">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.time}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.duration}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-16 flex-col gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs">Add Task</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs">Schedule</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-1">
                  <Brain className="w-4 h-4" />
                  <span className="text-xs">Ask Bella</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-1">
                  <Activity className="w-4 h-4" />
                  <span className="text-xs">Analytics</span>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Current Focus */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            {/* Current Focus */}
            <Card className="border border-purple-200 dark:border-purple-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  Current Focus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Deep Work Block</h3>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">1h 23m left</p>
                  <p className="text-sm text-muted-foreground">Website Redesign Project</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Energy Level</span>
                    <span className="text-sm font-medium text-green-600">High ⚡</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Next Break</span>
                    <span className="text-sm font-medium">45 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Next Meeting</span>
                    <span className="text-sm font-medium">1:30 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-orange-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { action: "Completed 'Review design mockups'", time: "10 min ago", type: "task" },
                  { action: "Bella optimized your schedule", time: "25 min ago", type: "ai" },
                  { action: "Joined team standup meeting", time: "1 hour ago", type: "meeting" },
                  { action: "Started deep work session", time: "1.5 hours ago", type: "focus" }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === "task" ? "bg-green-500" :
                      activity.type === "ai" ? "bg-blue-500" :
                      activity.type === "meeting" ? "bg-purple-500" :
                      "bg-orange-500"
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;