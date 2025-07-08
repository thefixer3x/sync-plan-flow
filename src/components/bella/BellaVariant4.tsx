// Bella AI Assistant - Variant 4 (Secondary Choice)
// Ultra-modern, futuristic AI personal assistant interface
// Alternative design for comparison and testing

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Loader2,
  Brain,
  Zap,
  Activity,
  TrendingUp,
  Calendar,
  Clock,
  Target,
  BarChart3,
  Settings,
  User,
  MessageSquare,
  Send,
  Pause,
  Play,
  ChevronRight,
  Star,
  Award,
  Flame
} from "lucide-react";

const cn = (...inputs: any[]) => {
  return inputs.filter(Boolean).join(' ');
};

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  velocity: { x: number; y: number };
}

interface ProductivityMetric {
  label: string;
  value: number;
  change: number;
  icon: React.ReactNode;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface VoiceVisualizerProps {
  isActive: boolean;
  bars?: number;
}

function VoiceVisualizer({ isActive, bars = 24 }: VoiceVisualizerProps) {
  const [heights, setHeights] = useState<number[]>(Array(bars).fill(0));

  useEffect(() => {
    if (!isActive) {
      setHeights(Array(bars).fill(0));
      return;
    }

    const interval = setInterval(() => {
      setHeights(prev => prev.map(() => Math.random() * 100));
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, bars]);

  return (
    <div className="flex items-center justify-center gap-1 h-16">
      {heights.map((height, index) => (
        <motion.div
          key={index}
          className="w-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
          animate={{
            height: `${Math.max(4, height * 0.4)}px`,
            opacity: isActive ? 1 : 0.3
          }}
          transition={{
            duration: 0.1,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}

interface ProductivityRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
}

function ProductivityRing({ value, size = 120, strokeWidth = 8 }: ProductivityRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted/20"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{value}%</div>
          <div className="text-xs text-muted-foreground">Efficiency</div>
        </div>
      </div>
    </div>
  );
}

export function BellaAIAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [particles, setParticles] = useState<Particle[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [productivityScore, setProductivityScore] = useState(87);
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Review quarterly reports', completed: false, priority: 'high' },
    { id: '2', title: 'Team standup meeting', completed: true, priority: 'medium' },
    { id: '3', title: 'Update project documentation', completed: false, priority: 'low' },
  ]);

  const productivityMetrics: ProductivityMetric[] = [
    { label: 'Focus Time', value: 6.2, change: 12, icon: <Brain className="w-4 h-4" /> },
    { label: 'Tasks Done', value: 24, change: 8, icon: <Target className="w-4 h-4" /> },
    { label: 'Efficiency', value: 94, change: 15, icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'Energy', value: 78, change: -3, icon: <Flame className="w-4 h-4" /> },
  ];

  // Generate ambient particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.3 + 0.1,
          velocity: {
            x: (Math.random() - 0.5) * 0.5,
            y: (Math.random() - 0.5) * 0.5
          }
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener('resize', generateParticles);
    return () => window.removeEventListener('resize', generateParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.velocity.x + window.innerWidth) % window.innerWidth,
        y: (particle.y + particle.velocity.y + window.innerHeight) % window.innerHeight,
        opacity: Math.max(0.1, Math.min(0.4, particle.opacity + (Math.random() - 0.5) * 0.02))
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  // Update time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Demo voice interaction
  useEffect(() => {
    const demoSequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsListening(true);
      
      await new Promise(resolve => setTimeout(resolve, 2500));
      setIsListening(false);
      setIsProcessing(true);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsProcessing(false);
      setIsSpeaking(true);
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsSpeaking(false);
      
      setTimeout(demoSequence, 5000);
    };

    const timeout = setTimeout(demoSequence, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const handleVoiceToggle = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      console.log('Sending message:', inputValue);
      setInputValue('');
    }
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getVoiceStatus = () => {
    if (isListening) return { text: "Listening...", color: "text-blue-400" };
    if (isProcessing) return { text: "Processing...", color: "text-yellow-400" };
    if (isSpeaking) return { text: "Speaking...", color: "text-green-400" };
    return { text: "Ready to assist", color: "text-muted-foreground" };
  };

  const status = getVoiceStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              opacity: particle.opacity
            }}
            animate={{
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Background gradient orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Bella</h1>
              <p className="text-sm text-muted-foreground">AI Personal Assistant</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="text-right">
              <div className="text-sm font-medium">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-xs text-muted-foreground">
                {currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </motion.div>
        </header>

        {/* Main content */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6">
          {/* Left sidebar - Productivity metrics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-80 space-y-6"
          >
            {/* Productivity ring */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Today's Performance
              </h3>
              <div className="flex justify-center mb-4">
                <ProductivityRing value={productivityScore} />
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  You're having an exceptional day! 🚀
                </p>
              </div>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 gap-3">
              {productivityMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-blue-400">{metric.icon}</div>
                    <span className="text-xs text-muted-foreground">{metric.label}</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-lg font-bold">{metric.value}</span>
                    <span className={`text-xs ${metric.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick tasks */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Quick Tasks
              </h3>
              <div className="space-y-3">
                {tasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                    onClick={() => toggleTask(task.id)}
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      task.completed ? 'bg-green-500 border-green-500' : 'border-white/30'
                    }`}>
                      {task.completed && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className={`text-sm flex-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${
                      task.priority === 'high' ? 'bg-red-400' :
                      task.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                    }`} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Center - Voice interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 flex flex-col items-center justify-center space-y-8"
          >
            {/* Main voice button */}
            <div className="relative">
              <motion.button
                onClick={handleVoiceToggle}
                className={cn(
                  "relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-300",
                  "bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border-2",
                  isListening ? "border-blue-400 shadow-lg shadow-blue-400/25" :
                  isProcessing ? "border-yellow-400 shadow-lg shadow-yellow-400/25" :
                  isSpeaking ? "border-green-400 shadow-lg shadow-green-400/25" :
                  "border-white/20 hover:border-white/40"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: isListening 
                    ? ["0 0 0 0 rgba(59, 130, 246, 0.4)", "0 0 0 30px rgba(59, 130, 246, 0)"]
                    : undefined
                }}
                transition={{
                  duration: 1.5,
                  repeat: isListening ? Infinity : 0
                }}
              >
                <AnimatePresence mode="wait">
                  {isProcessing ? (
                    <motion.div
                      key="processing"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Loader2 className="w-16 h-16 text-yellow-400 animate-spin" />
                    </motion.div>
                  ) : isSpeaking ? (
                    <motion.div
                      key="speaking"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Volume2 className="w-16 h-16 text-green-400" />
                    </motion.div>
                  ) : isListening ? (
                    <motion.div
                      key="listening"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Mic className="w-16 h-16 text-blue-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Mic className="w-16 h-16 text-white/70" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Pulse rings */}
              <AnimatePresence>
                {isListening && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-blue-400/30"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-blue-400/20"
                      initial={{ scale: 1, opacity: 0.4 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.5
                      }}
                    />
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Voice visualizer */}
            <VoiceVisualizer isActive={isListening || isSpeaking} />

            {/* Status */}
            <motion.div
              className="text-center space-y-2"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{
                duration: 2,
                repeat: isListening || isProcessing || isSpeaking ? Infinity : 0
              }}
            >
              <p className={cn("text-xl font-medium transition-colors", status.color)}>
                {status.text}
              </p>
              <p className="text-sm text-muted-foreground">
                Voice commands • Natural conversation • Smart actions
              </p>
            </motion.div>

            {/* Text input */}
            <div className="w-full max-w-2xl">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Type a message or use voice..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder-white/50 outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      inputValue.trim()
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-white/10 text-white/50 cursor-not-allowed"
                    )}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right sidebar - AI insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:w-80 space-y-6"
          >
            {/* AI insights */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                AI Insights
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="text-sm text-blue-200">
                    Your productivity peaks between 10-11 AM. Consider scheduling important tasks during this time.
                  </p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <p className="text-sm text-purple-200">
                    You've completed 87% more tasks this week compared to last week. Great momentum!
                  </p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <p className="text-sm text-green-200">
                    Suggested break in 23 minutes to maintain optimal performance.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                {[
                  { icon: <Calendar className="w-4 h-4" />, label: "Schedule meeting", action: "schedule" },
                  { icon: <MessageSquare className="w-4 h-4" />, label: "Draft email", action: "email" },
                  { icon: <BarChart3 className="w-4 h-4" />, label: "Generate report", action: "report" },
                  { icon: <Clock className="w-4 h-4" />, label: "Set reminder", action: "reminder" },
                ].map((item, index) => (
                  <motion.button
                    key={item.action}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition-colors text-left"
                  >
                    <div className="text-blue-400">{item.icon}</div>
                    <span className="text-sm flex-1">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Achievement */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-xl rounded-2xl p-6 border border-yellow-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-200">Achievement Unlocked!</h4>
                  <p className="text-xs text-yellow-300/70">Productivity Streak</p>
                </div>
              </div>
              <p className="text-sm text-yellow-200/80">
                7 days of consistent high performance. You're on fire! 🔥
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function BellaDemo() {
  return <BellaAIAssistant />;
}
