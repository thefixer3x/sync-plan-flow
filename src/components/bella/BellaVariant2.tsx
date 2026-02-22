// Bella AI Assistant - Variant 2 (Primary Choice)
// Ultra-modern, futuristic AI personal assistant interface
// Voice-first design with command center aesthetics

"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Brain,
  Zap,
  Activity,
  TrendingUp,
  Settings,
  Command,
  Search,
  Calendar,
  Clock,
  BarChart3,
  Target,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  ArrowUp,
  Plus,
  FileText,
  Code,
  BookOpen,
  PenTool,
  BrainCircuit,
  User,
  MessageSquare,
  ChevronRight,
  Cpu,
  Database,
  Network,
  Shield,
  Rocket,
  Atom,
  Flame,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useVoice } from "@/hooks/useVoice";

// Voice Visualizer Component
const VoiceVisualizer = ({ isListening }: { isListening: boolean }) => {
  const [bars, setBars] = useState(Array(12).fill(0));

  useEffect(() => {
    if (!isListening) {
      setBars(Array(12).fill(0));
      return;
    }

    const interval = setInterval(() => {
      setBars(prev => prev.map(() => Math.random() * 100));
    }, 100);

    return () => clearInterval(interval);
  }, [isListening]);

  return (
    <div className="flex items-center justify-center gap-1 h-8">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full"
          animate={{ height: isListening ? `${Math.max(height, 10)}%` : "10%" }}
          transition={{ duration: 0.1 }}
        />
      ))}
    </div>
  );
};

// Productivity Metrics Component
const ProductivityMetrics = () => {
  const [metrics, setMetrics] = useState({
    tasksCompleted: 47,
    focusTime: 6.2,
    efficiency: 94,
    streak: 12
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        tasksCompleted: prev.tasksCompleted + Math.floor(Math.random() * 3),
        focusTime: prev.focusTime + (Math.random() * 0.1),
        efficiency: Math.min(100, prev.efficiency + (Math.random() * 2 - 1)),
        streak: prev.streak + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.div
        className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-4 rounded-xl border border-blue-500/20"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-blue-300">Tasks</span>
        </div>
        <div className="text-2xl font-bold text-white">{metrics.tasksCompleted}</div>
        <div className="text-xs text-blue-300">+{Math.floor(metrics.tasksCompleted * 0.1)} today</div>
      </motion.div>

      <motion.div
        className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 rounded-xl border border-purple-500/20"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-purple-300">Focus</span>
        </div>
        <div className="text-2xl font-bold text-white">{metrics.focusTime.toFixed(1)}h</div>
        <div className="text-xs text-purple-300">Deep work</div>
      </motion.div>

      <motion.div
        className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-4 rounded-xl border border-green-500/20"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-300">Efficiency</span>
        </div>
        <div className="text-2xl font-bold text-white">{metrics.efficiency.toFixed(0)}%</div>
        <div className="text-xs text-green-300">Above average</div>
      </motion.div>

      <motion.div
        className="bg-gradient-to-br from-orange-500/10 to-red-500/10 p-4 rounded-xl border border-orange-500/20"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-orange-400" />
          <span className="text-sm text-orange-300">Streak</span>
        </div>
        <div className="text-2xl font-bold text-white">{metrics.streak}</div>
        <div className="text-xs text-orange-300">days</div>
      </motion.div>
    </div>
  );
};

// AI Command Center Component
const AICommandCenter = () => {
  const [activeCommands, setActiveCommands] = useState([
    { id: 1, name: "Schedule optimization", status: "running", progress: 75 },
    { id: 2, name: "Email prioritization", status: "complete", progress: 100 },
    { id: 3, name: "Research synthesis", status: "queued", progress: 0 },
  ]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Cpu className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-semibold text-white">AI Command Center</h3>
      </div>
      
      {activeCommands.map((command) => (
        <motion.div
          key={command.id}
          className="bg-gray-800/50 p-3 rounded-lg border border-gray-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">{command.name}</span>
            <span className={cn(
              "text-xs px-2 py-1 rounded-full",
              command.status === "running" && "bg-blue-500/20 text-blue-300",
              command.status === "complete" && "bg-green-500/20 text-green-300",
              command.status === "queued" && "bg-yellow-500/20 text-yellow-300"
            )}>
              {command.status}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1">
            <motion.div
              className={cn(
                "h-1 rounded-full",
                command.status === "running" && "bg-blue-500",
                command.status === "complete" && "bg-green-500",
                command.status === "queued" && "bg-yellow-500"
              )}
              initial={{ width: 0 }}
              animate={{ width: `${command.progress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Neural Network Visualization
const NeuralNetworkViz = () => {
  const [nodes, setNodes] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 300,
      y: Math.random() * 200,
      active: Math.random() > 0.7,
      connections: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
        Math.floor(Math.random() * 15)
      ).filter(id => id !== i)
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        active: Math.random() > 0.6
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-48 bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700">
      <svg className="w-full h-full">
        {nodes.map(node => 
          node.connections.map(connId => {
            const targetNode = nodes[connId];
            if (!targetNode) return null;
            
            return (
              <motion.line
                key={`${node.id}-${connId}`}
                x1={node.x}
                y1={node.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke="rgba(59, 130, 246, 0.3)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: node.active && targetNode.active ? 1 : 0.3,
                  stroke: node.active && targetNode.active ? "rgba(59, 130, 246, 0.8)" : "rgba(59, 130, 246, 0.2)"
                }}
                transition={{ duration: 0.5 }}
              />
            );
          })
        )}
        
        {nodes.map(node => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r="4"
            fill={node.active ? "#3b82f6" : "#6b7280"}
            animate={{
              r: node.active ? 6 : 4,
              fill: node.active ? "#3b82f6" : "#6b7280"
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </svg>
      
      <div className="absolute top-3 left-3">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-blue-400" />
          <span className="text-xs text-blue-300">Neural Processing</span>
        </div>
      </div>
    </div>
  );
};

// Main Bella Interface Component
const BellaAIInterface = () => {
  const [currentMode, setCurrentMode] = useState<"voice" | "command" | "analytics">("voice");
  const [inputValue, setInputValue] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [suggestions] = useState([
    "Optimize my schedule for maximum productivity",
    "Analyze my work patterns and suggest improvements", 
    "Create a strategic plan for my next project",
    "Summarize today's key insights and learnings"
  ]);

  // Real voice integration
  const {
    isListening,
    isSpeaking,
    isProcessing,
    transcript,
    error: voiceError,
    startListening,
    stopListening,
    speak,
    toggle: toggleVoice,
    reset: resetVoice,
    updateConfig
  } = useVoice({
    // Configure with environment variables or fallback to browser APIs
    elevenLabsApiKey: process.env.ELEVENLABS_API_KEY,
    openaiApiKey: process.env.OPENAI_API_KEY,
    voice: 'Bella', // Perfect for our AI assistant!
    onTranscript: (text, isFinal) => {
      if (isFinal && text.trim()) {
        handleVoiceCommand(text);
      }
    },
    onError: (error) => {
      console.error('Voice error:', error);
    }
  });

  // Handle voice commands from speech recognition
  const handleVoiceCommand = async (command: string) => {
    try {
      // Add user message to conversation
      setConversation(prev => [...prev, { role: 'user', content: command }]);
      
      // Process the command with AI (placeholder for now)
      const response = await processAICommand(command);
      
      // Add AI response to conversation
      setConversation(prev => [...prev, { role: 'assistant', content: response }]);
      
      // Speak the response if voice is enabled
      if (voiceEnabled) {
        await speak(response);
      }
    } catch (error) {
      console.error('Failed to process voice command:', error);
    }
  };

  // Placeholder AI command processor (replace with actual AI integration)
  const processAICommand = async (command: string): Promise<string> => {
    // This would integrate with your AI service (OpenAI, Claude, etc.)
    const responses = {
      'schedule': "I've analyzed your calendar and found the optimal time blocks for deep work. I recommend scheduling your most important tasks between 10-11 AM when your productivity peaks.",
      'productivity': "Your productivity score is 94% today! You've completed 24 tasks and maintained excellent focus. I suggest taking a 15-minute break to sustain this momentum.",
      'tasks': "You have 3 high-priority tasks remaining: Review quarterly budget, Client presentation prep, and Team sync. I recommend tackling the budget review first while your energy is high.",
      'insights': "Today's key insight: You're 23% more productive when you batch similar tasks together. Consider grouping all your communication tasks for tomorrow afternoon."
    };
    
    const lowerCommand = command.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerCommand.includes(key)) {
        return response;
      }
    }
    
    return "I understand you said: '" + command + "'. I'm ready to help optimize your productivity. What would you like me to focus on?";
  };

  const handleVoiceToggle = async () => {
    try {
      await toggleVoice();
    } catch (error) {
      console.error('Voice toggle failed:', error);
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      await handleVoiceCommand(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/10 to-transparent" />
        
        {/* Floating Particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 animate-ping opacity-20" />
            </motion.div>
            
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Bella AI
              </h1>
              <p className="text-gray-400 text-sm">Your exponential productivity partner</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              className="p-2 rounded-lg bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="w-5 h-5 text-gray-300" />
            </motion.button>
            
            <motion.button
              className={cn(
                "p-2 rounded-lg border transition-colors",
                voiceEnabled 
                  ? "bg-blue-500/20 border-blue-500/50 text-blue-300" 
                  : "bg-gray-800/50 border-gray-700 text-gray-400"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setVoiceEnabled(!voiceEnabled)}
            >
              {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </motion.button>
          </div>
        </motion.div>

        {/* Mode Selector */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex bg-gray-800/50 rounded-xl p-1 border border-gray-700">
            {[
              { id: "voice", label: "Voice", icon: Mic },
              { id: "command", label: "Command", icon: Command },
              { id: "analytics", label: "Analytics", icon: BarChart3 }
            ].map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                  currentMode === id
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/50"
                    : "text-gray-400 hover:text-gray-300"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentMode(id as any)}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Voice Interface */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Voice Control Center */}
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
              <div className="text-center mb-6">
                <motion.div
                  className="relative mx-auto mb-4"
                  style={{ width: 120, height: 120 }}
                >
                  <motion.div
                    className={cn(
                      "absolute inset-0 rounded-full border-4 transition-colors",
                      isListening ? "border-blue-500" : "border-gray-600"
                    )}
                    animate={isListening ? { rotate: 360 } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <motion.button
                    className={cn(
                      "w-full h-full rounded-full flex items-center justify-center transition-all",
                      isListening 
                        ? "bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/25" 
                        : "bg-gray-700 hover:bg-gray-600"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleVoiceToggle}
                  >
                    {isProcessing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Brain className="w-8 h-8 text-white" />
                      </motion.div>
                    ) : isListening ? (
                      <MicOff className="w-8 h-8 text-white" />
                    ) : (
                      <Mic className="w-8 h-8 text-white" />
                    )}
                  </motion.button>
                  
                  {isListening && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-blue-400"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                <h2 className="text-xl font-semibold mb-2">
                  {isProcessing ? "Processing..." : 
                   isSpeaking ? "Speaking..." :
                   isListening ? "Listening..." : "Ready to assist"}
                </h2>
                <p className="text-gray-400 text-sm">
                  {isProcessing 
                    ? "Analyzing your request with advanced AI" 
                    : isSpeaking
                      ? "Bella is responding to your request"
                      : isListening 
                        ? "Speak naturally, I'm listening" 
                        : "Tap to start voice interaction or type below"
                  }
                </p>
              </div>

              {/* Voice Visualizer */}
              <div className="mb-6">
                <VoiceVisualizer isListening={isListening || isSpeaking} />
                
                {/* Live Transcript Display */}
                {transcript && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20"
                  >
                    <p className="text-sm text-blue-300">
                      {isProcessing ? "Processing..." : transcript}
                    </p>
                  </motion.div>
                )}
                
                {/* Voice Error Display */}
                {voiceError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20"
                  >
                    <p className="text-sm text-red-300">
                      Voice Error: {voiceError}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Text Input Alternative */}
              <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Or type your command here..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <motion.button
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      inputValue.trim()
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                    )}
                    whileHover={inputValue.trim() ? { scale: 1.05 } : {}}
                    whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* AI Command Center */}
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
              <AICommandCenter />
            </div>

            {/* Conversation History */}
            {conversation.length > 0 && (
              <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-semibold">Conversation</h3>
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {conversation.slice(-3).map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-lg ${
                        msg.role === 'user' 
                          ? 'bg-blue-500/10 border-l-4 border-blue-500' 
                          : 'bg-green-500/10 border-l-4 border-green-500'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {msg.role === 'user' ? (
                          <User className="w-4 h-4 text-blue-400" />
                        ) : (
                          <Brain className="w-4 h-4 text-green-400" />
                        )}
                        <span className="text-xs font-medium text-gray-300">
                          {msg.role === 'user' ? 'You' : 'Bella'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-200">{msg.content}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Neural Network Visualization */}
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
              <NeuralNetworkViz />
            </div>
          </motion.div>

          {/* Right Column - Analytics & Suggestions */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Productivity Metrics */}
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-semibold">Productivity Pulse</h3>
              </div>
              <ProductivityMetrics />
            </div>

            {/* Quick Suggestions */}
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold">Smart Suggestions</h3>
              </div>
              
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    className="w-full text-left p-3 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {suggestion}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold">System Status</h3>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: "Neural Processing", status: "Optimal", color: "green" },
                  { name: "Voice Recognition", status: "Active", color: "blue" },
                  { name: "Data Synthesis", status: "Running", color: "yellow" },
                  { name: "Security Shield", status: "Protected", color: "green" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{item.name}</span>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      item.color === "green" && "bg-green-500/20 text-green-300",
                      item.color === "blue" && "bg-blue-500/20 text-blue-300",
                      item.color === "yellow" && "bg-yellow-500/20 text-yellow-300"
                    )}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              className="bg-gray-800 rounded-2xl p-6 border border-gray-700 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">Bella Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Voice Responses</span>
                  <button
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors relative",
                      voiceEnabled ? "bg-blue-500" : "bg-gray-600"
                    )}
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                  >
                    <div className={cn(
                      "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform",
                      voiceEnabled ? "translate-x-6" : "translate-x-0.5"
                    )} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Auto-suggestions</span>
                  <button className="w-12 h-6 rounded-full bg-blue-500 relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 translate-x-6" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Analytics Tracking</span>
                  <button className="w-12 h-6 rounded-full bg-blue-500 relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 translate-x-6" />
                  </button>
                </div>
              </div>
              
              <button
                className="w-full mt-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                onClick={() => setShowSettings(false)}
              >
                Save Settings
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BellaAIInterface;
