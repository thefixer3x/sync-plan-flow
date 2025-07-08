import { Link } from "react-router-dom";
import { Brain, Sparkles, ArrowRight } from "lucide-react";

const BellaDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Bella AI
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-8">
            Your Voice-First Personal AI Executive Assistant
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose between two ultra-modern interface variants designed for exponential productivity growth. 
            Both feature voice-first interaction, neural network visualization, and advanced AI capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Variant 2 - Primary Choice */}
          <Link to="/bella-v2" className="group">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-8 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group-hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Variant 2</h2>
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                  Primary Choice
                </span>
              </div>
              
              <p className="text-gray-300 mb-6">
                Command center aesthetics with neural network visualization, productivity metrics, 
                and AI command center. Features voice visualizer and comprehensive system status.
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-blue-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Voice Visualizer with Real-time Audio Bars
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Neural Network Processing Visualization
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  AI Command Center with Task Monitoring
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Productivity Pulse Dashboard
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-blue-300 font-medium">Experience Variant 2</span>
                <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Variant 4 - Secondary Choice */}
          <Link to="/bella-v4" className="group">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group-hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Variant 4</h2>
                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                  Alternative
                </span>
              </div>
              
              <p className="text-gray-300 mb-6">
                Ambient particle system with productivity ring, achievement tracking, 
                and AI insights. Features automatic demo sequence and task management.
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-purple-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Ambient Floating Particle Animation
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Circular Productivity Ring Visualization
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Achievement System with Streak Tracking
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  AI Insights and Quick Actions
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-purple-300 font-medium">Experience Variant 4</span>
                <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Both variants are built with the same core functionality but offer different visual aesthetics and user experiences.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Main App
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BellaDemo;