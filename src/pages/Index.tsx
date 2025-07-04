import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Circle, MessageSquare, Clock, Zap, CheckCircle, Layout, FileText, Folder, Star, TrendingUp, Calendar, Bell, Shield, Lock, Users, Settings, Sparkles, Smartphone, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import ThemeCustomizer from "../components/ThemeCustomizer";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: "chat",
      title: "Conversational AI Interface",
      subtitle: "Your Personal Productivity Assistant",
      content: (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-scale-in">
              Natural Language Interface
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your intelligent companion for seamless productivity conversations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-background via-muted/30 to-primary/5 p-8 rounded-2xl border border-primary/20 shadow-lg hover-scale">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                Live Chat Interface
              </h3>
              
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                <div className="flex justify-start animate-slide-in-left">
                  <div className="bg-muted/80 backdrop-blur p-4 rounded-xl max-w-sm shadow-sm">
                    <p className="text-sm">Good morning! I noticed you have 3 urgent tasks and a payment due tomorrow. Should I prioritize these?</p>
                    <span className="text-xs text-muted-foreground mt-1 block">AI Assistant - Just now</span>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 rounded-xl max-w-sm shadow-sm">
                    <p className="text-sm">Yes, please show me the payment details first</p>
                    <span className="text-xs text-primary-foreground/70 mt-1 block">You - Just now</span>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground p-4 rounded-xl max-w-sm shadow-sm">
                    <p className="text-sm">Your electricity bill (£127) is due tomorrow. I can set up auto-pay or remind you at 6 PM today?</p>
                    <span className="text-xs text-secondary-foreground/70 mt-1 block">AI Assistant - Just now</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground p-4 rounded-xl max-w-sm shadow-sm">
                    <p className="text-sm">Set up the reminder for 6 PM, and also remind me about my gym session</p>
                    <span className="text-xs text-accent-foreground/70 mt-1 block">You - Just now</span>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-muted/80 backdrop-blur p-4 rounded-xl max-w-sm shadow-sm border border-green-200">
                    <p className="text-sm">✅ Done! Reminder set for 6 PM today. I also see you have gym blocked for 7:30 PM - perfect timing after dinner!</p>
                    <span className="text-xs text-muted-foreground mt-1 block">AI Assistant - Just now</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 bg-muted/20 rounded-lg p-4">
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    placeholder="Type or speak your message..."
                    className="flex-1 bg-background/80 backdrop-blur border border-border/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/50"
                  />
                  <button className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-lg hover-scale transition-all">
                    Send
                  </button>
                  <button className="bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground px-4 py-3 rounded-lg hover-scale transition-all">
                    🎤
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl border border-primary/30 shadow-lg animate-fade-in hover-scale">
                <h4 className="font-semibold mb-4 text-primary flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Events
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-primary/10 transition-all cursor-pointer border border-primary/10">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <span className="font-medium">Payment Processed</span>
                        <p className="text-xs text-muted-foreground mt-1">Netflix subscription renewed</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded">2h ago</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-primary/10 transition-all cursor-pointer border border-primary/10">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div>
                        <span className="font-medium">Task Completed</span>
                        <p className="text-xs text-muted-foreground mt-1">Client presentation finished</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded">4h ago</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-primary/10 transition-all cursor-pointer border border-primary/10">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div>
                        <span className="font-medium">Reminder Set</span>
                        <p className="text-xs text-muted-foreground mt-1">Doctor appointment tomorrow</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded">6h ago</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent p-6 rounded-2xl border border-secondary/30 shadow-lg animate-fade-in hover-scale">
                <h4 className="font-semibold mb-4 text-secondary flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  AI Capabilities
                </h4>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/10">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Context-aware conversations</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/10">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Multi-modal input (text, voice, images)</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/10">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Proactive suggestions and reminders</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/10">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Memory across conversations</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/10">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Real-time data integration</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/10">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>24/7 intelligent assistance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "dashboard",
      title: "Customizable Dashboard",
      subtitle: "Your Personal Command Center",
      content: (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent animate-scale-in">
              Intelligent Widget Ecosystem
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Widgets that adapt to your lifestyle - if you don't have data, they don't appear. Your dashboard evolves with you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Lifestyle IP3 Column */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl border border-primary/30 shadow-lg hover-scale">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3 text-primary">
                  <Layout className="w-6 h-6" />
                  Lifestyle IP3 Matrix
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
                    <h4 className="font-semibold mb-3 text-red-700 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Immediate (Today)
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                        <span>💡 Pay electricity bill</span>
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Due</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                        <span>📞 Client call at 3 PM</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Meeting</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                        <span>🛒 Grocery shopping</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Personal</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
                    <h4 className="font-semibold mb-3 text-yellow-700 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Important (This Week)
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                        <span>📄 Project proposal draft</span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Work</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                        <span>🏥 Doctor appointment</span>
                        <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">Health</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                        <span>🚗 Car service booking</span>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Maintenance</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
                    <h4 className="font-semibold mb-3 text-green-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Planned (This Month)
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                        <span>✈️ Holiday planning</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Travel</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                        <span>💰 Investment review</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Finance</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                        <span>🏠 Home renovation</span>
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">Project</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Context & Quick Wins Column */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent p-6 rounded-2xl border border-secondary/30 shadow-lg hover-scale">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3 text-secondary">
                  <Zap className="w-6 h-6" />
                  Smart Context & Quick Wins
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                    <h4 className="font-semibold mb-3 text-blue-700 flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Context-Aware Mode
                    </h4>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-sm text-blue-600">🏠 Working from home today</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Showing focused work tasks, hiding commute reminders, suggesting home productivity optimizations
                      </p>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
                    <h4 className="font-semibold mb-3 text-green-700 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Quick Wins (≤5 minutes)
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between p-2 bg-white rounded-lg cursor-pointer hover:bg-green-100">
                        <span>📧 Reply to Sarah's email</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">2 min</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white rounded-lg cursor-pointer hover:bg-green-100">
                        <span>📱 Update LinkedIn status</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">1 min</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white rounded-lg cursor-pointer hover:bg-green-100">
                        <span>☕ Order coffee beans</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">3 min</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl">
                    <h4 className="font-semibold mb-3 text-purple-700 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Energy & Focus
                    </h4>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Current Energy</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">High ⚡</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Prioritizing creative tasks and complex problem-solving
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Development & Artifacts */}
            <div className="space-y-6 lg:col-span-2 xl:col-span-1">
              <div className="bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-6 rounded-2xl border border-accent/30 shadow-lg hover-scale">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3 text-accent">
                  <FileText className="w-6 h-6" />
                  Development & Memory Bank
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl">
                    <h4 className="font-semibold mb-3 text-orange-700 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Learning Progress
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">JavaScript Mastery</span>
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">65%</span>
                        </div>
                        <div className="w-full bg-orange-100 rounded-full h-2">
                          <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">UI/UX Design</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">40%</span>
                        </div>
                        <div className="w-full bg-blue-100 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-pink-50 border border-pink-200 p-4 rounded-xl">
                    <h4 className="font-semibold mb-3 text-pink-700 flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Lifestyle Reminders
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span>💧 Drink water (every 2 hours)</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>🚶 Stand & stretch (every hour)</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        <span>📊 Review daily goals (6 PM)</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl">
                    <h4 className="font-semibold mb-3 text-indigo-700 flex items-center gap-2">
                      <Folder className="w-4 h-4" />
                      Artifacts Storage
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white p-2 rounded-lg text-center cursor-pointer hover:bg-indigo-100 transition-all">
                        <div className="text-lg mb-1">📄</div>
                        <span>Documents</span>
                        <div className="text-xs text-muted-foreground">24 items</div>
                      </div>
                      <div className="bg-white p-2 rounded-lg text-center cursor-pointer hover:bg-indigo-100 transition-all">
                        <div className="text-lg mb-1">🖼️</div>
                        <span>Images</span>
                        <div className="text-xs text-muted-foreground">156 items</div>
                      </div>
                      <div className="bg-white p-2 rounded-lg text-center cursor-pointer hover:bg-indigo-100 transition-all">
                        <div className="text-lg mb-1">🎵</div>
                        <span>Audio</span>
                        <div className="text-xs text-muted-foreground">8 items</div>
                      </div>
                      <div className="bg-white p-2 rounded-lg text-center cursor-pointer hover:bg-indigo-100 transition-all">
                        <div className="text-lg mb-1">🎬</div>
                        <span>Videos</span>
                        <div className="text-xs text-muted-foreground">12 items</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 p-2 bg-white rounded-lg">
                      <p className="text-xs text-indigo-600 font-medium">🔥 Habit Streaks</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">Meditation: 7 days</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Reading: 12 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customization Panel */}
          <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl border border-primary/20">
            <h3 className="text-2xl font-semibold mb-4 text-center">Complete Customization Control</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Layout className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Widget Library</h4>
                <p className="text-sm text-muted-foreground">Choose from 50+ widgets. Add, remove, resize, and position as needed.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-8 h-8 text-secondary" />
                </div>
                <h4 className="font-semibold mb-2">Smart Automation</h4>
                <p className="text-sm text-muted-foreground">Widgets automatically appear based on your data and behavior patterns.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-semibold mb-2">Context Profiles</h4>
                <p className="text-sm text-muted-foreground">Work mode, personal mode, travel mode - your dashboard adapts instantly.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "privacy",
      title: "Data Privacy & Ownership", 
      subtitle: "Your Data Stays Yours - Period",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Zero Monitoring Philosophy</h2>
            <p className="text-lg text-muted-foreground">
              Nobody monitors your data. Everything is stored locally on your devices. You control every bit of information.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border border-border p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Circle className="w-6 h-6 text-green-500" />
                  Local Storage First
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• All data stored on your laptop/device</li>
                  <li>• Encrypted local database</li>
                  <li>• No cloud dependency for core functions</li>
                  <li>• Your device, your rules</li>
                </ul>
              </div>
              
              <div className="border border-border p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Circle className="w-6 h-6 text-blue-500" />
                  Selective Sharing
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• You choose what to share</li>
                  <li>• Permission-based connections</li>
                  <li>• Granular privacy controls</li>
                  <li>• Easy disconnect anytime</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="border border-border p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Circle className="w-6 h-6 text-purple-500" />
                  Data Minimalism
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Only collect what's necessary</li>
                  <li>• Automatic data expiry options</li>
                  <li>• No behavioral profiling</li>
                  <li>• Transparent data usage</li>
                </ul>
              </div>
              
              <div className="border border-border p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Circle className="w-6 h-6 text-red-500" />
                  Security First
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• End-to-end encryption</li>
                  <li>• Zero-knowledge architecture</li>
                  <li>• Regular security audits</li>
                  <li>• Open source core components</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 border border-primary rounded-lg bg-primary/5">
            <h3 className="text-xl font-semibold mb-4 text-center">Your Digital Rights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <h4 className="font-medium mb-2">Own Your Data</h4>
                <p className="text-sm text-muted-foreground">Complete ownership and control</p>
              </div>
              <div className="text-center">
                <h4 className="font-medium mb-2">Export Anytime</h4>
                <p className="text-sm text-muted-foreground">Full data portability</p>
              </div>
              <div className="text-center">
                <h4 className="font-medium mb-2">Delete Anytime</h4>
                <p className="text-sm text-muted-foreground">Right to be forgotten</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "notifications",
      title: "Smart Notifications & Social Integration",
      subtitle: "Connect Everything, Stay Informed",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Universal Integration Hub</h2>
            <p className="text-lg text-muted-foreground">
              Plug into anything in your social life or work environment. Everything can connect, everything can be automated.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Social Integration</h3>
              <div className="space-y-4">
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Circle className="w-4 h-4 text-blue-500" />
                    Social Media Management
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• Auto-schedule posts across platforms</li>
                    <li>• Track engagement and mentions</li>
                    <li>• Content calendar optimization</li>
                    <li>• Brand monitoring and alerts</li>
                  </ul>
                </div>
                
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Circle className="w-4 h-4 text-green-500" />
                    Personal Networks
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• LinkedIn networking automation</li>
                    <li>• Birthday and anniversary reminders</li>
                    <li>• Follow-up scheduling</li>
                    <li>• Contact relationship mapping</li>
                  </ul>
                </div>
                
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Circle className="w-4 h-4 text-purple-500" />
                    Community Engagement
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• Discord/Slack activity tracking</li>
                    <li>• Forum and community monitoring</li>
                    <li>• Event planning and coordination</li>
                    <li>• Group project management</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Smart Notifications</h3>
              <div className="space-y-4">
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Context-Aware Alerts</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Notifications that understand your availability and priorities
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Important: Client email received</span>
                      <span className="text-green-500">Now</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Reminder: Team meeting in 15 min</span>
                      <span className="text-yellow-500">Snooze</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Low priority: Newsletter digest</span>
                      <span className="text-muted-foreground">Later</span>
                    </div>
                  </div>
                </div>
                
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Multi-Channel Delivery</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Push notifications (mobile/desktop)</li>
                    <li>• Email digests (daily/weekly)</li>
                    <li>• SMS for urgent items</li>
                    <li>• Voice assistant integration</li>
                    <li>• Smartwatch notifications</li>
                  </ul>
                </div>
                
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Social Login Integration</h4>
                  <p className="text-sm text-muted-foreground">
                    One-click access across all your platforms and services. Secure, seamless, and synchronized.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "tasks",
      title: "Intelligent Task & Financial Management",
      subtitle: "Complete Life Orchestration",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Work Hard, Play Hard Philosophy</h2>
            <p className="text-lg text-muted-foreground">
              Balance productivity with personal fulfillment. Manage tasks, finances, and life experiences in perfect harmony.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Task Management</h3>
              <div className="space-y-4">
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Agent-Assisted Tasks</h4>
                  <ul className="text-sm space-y-1">
                    <li>• AI agents handle routine tasks</li>
                    <li>• Automated email responses</li>
                    <li>• Data entry and processing</li>
                    <li>• Research and information gathering</li>
                    <li>• Schedule optimization</li>
                  </ul>
                </div>
                
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Personal Tasks</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Manual task tracking and completion</li>
                    <li>• Personal project management</li>
                    <li>• Goal setting and achievement</li>
                    <li>• Habit formation and tracking</li>
                    <li>• Creative and strategic work</li>
                  </ul>
                </div>
                
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Third-Party Tasks</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Collaborative project management</li>
                    <li>• Team coordination and delegation</li>
                    <li>• External vendor management</li>
                    <li>• Client work and deliverables</li>
                    <li>• Partnership activities</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Financial Intelligence</h3>
              <div className="space-y-4">
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Smart Financial Advice</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Personalized savings recommendations</li>
                    <li>• Credit building strategies</li>
                    <li>• Investment opportunity analysis</li>
                    <li>• Debt optimization plans</li>
                    <li>• Emergency fund planning</li>
                  </ul>
                </div>
                
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Payment Timeline Management</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Electricity Bill</span>
                      <span className="text-red-500">Due Tomorrow</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Credit Card Payment</span>
                      <span className="text-yellow-500">Due in 3 days</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Mortgage Payment</span>
                      <span className="text-green-500">Paid</span>
                    </div>
                  </div>
                </div>
                
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Life Balance Planning</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Trip and holiday planning</li>
                    <li>• Social event organization</li>
                    <li>• Work-life balance optimization</li>
                    <li>• Leisure activity scheduling</li>
                    <li>• Experience budgeting</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 border border-primary rounded-lg bg-primary/5">
            <h3 className="text-xl font-semibold mb-4 text-center">Productivity Philosophy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <h4 className="font-medium mb-2">Work Smart</h4>
                <p className="text-sm text-muted-foreground">
                  Optimize efficiency with AI assistance, automation, and intelligent prioritization
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-medium mb-2">Live Well</h4>
                <p className="text-sm text-muted-foreground">
                  Plan memorable experiences, maintain relationships, and enjoy life's adventures
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "security",
      title: "Enterprise Security & Compliance",
      subtitle: "Fort Knox for Your Digital Life",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Maximum Security, Maximum Control</h2>
            <p className="text-lg text-muted-foreground">
              Padlocks everywhere. Licenses everywhere. No monitoring, no storage, complete data ownership.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border border-border p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Circle className="w-6 h-6 text-red-500" />
                  Security Certifications
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border border-border rounded">
                    <div className="text-sm font-medium">SOC 2 Type II</div>
                    <div className="text-xs text-muted-foreground">Certified</div>
                  </div>
                  <div className="text-center p-3 border border-border rounded">
                    <div className="text-sm font-medium">ISO 27001</div>
                    <div className="text-xs text-muted-foreground">Certified</div>
                  </div>
                  <div className="text-center p-3 border border-border rounded">
                    <div className="text-sm font-medium">GDPR</div>
                    <div className="text-xs text-muted-foreground">Compliant</div>
                  </div>
                  <div className="text-center p-3 border border-border rounded">
                    <div className="text-sm font-medium">HIPAA</div>
                    <div className="text-xs text-muted-foreground">Ready</div>
                  </div>
                </div>
              </div>
              
              <div className="border border-border p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Circle className="w-6 h-6 text-blue-500" />
                  Data Ownership Rights
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• 100% data ownership guarantee</li>
                  <li>• Local storage with encryption</li>
                  <li>• Zero corporate surveillance</li>
                  <li>• Transparent data processing</li>
                  <li>• Right to digital forgetting</li>
                  <li>• Portable data standards</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="border border-border p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Circle className="w-6 h-6 text-green-500" />
                  Digital Asset Management
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  All your documents and digital assets are available to you instantly. Need a file? Copy it. Paste it. Keep it wherever you want.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 border border-border rounded">
                    <span className="text-sm">Contract_2024.pdf</span>
                    <button className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Copy</button>
                  </div>
                  <div className="flex items-center justify-between p-2 border border-border rounded">
                    <span className="text-sm">Meeting_Notes.docx</span>
                    <button className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Copy</button>
                  </div>
                  <div className="flex items-center justify-between p-2 border border-border rounded">
                    <span className="text-sm">Financial_Report.xlsx</span>
                    <button className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Copy</button>
                  </div>
                </div>
              </div>
              
              <div className="border border-border p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Circle className="w-6 h-6 text-purple-500" />
                  Zero-Trust Architecture
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Multi-factor authentication</li>
                  <li>• Role-based access control</li>
                  <li>• Continuous security monitoring</li>
                  <li>• Encrypted data transmission</li>
                  <li>• Regular security audits</li>
                  <li>• Incident response protocols</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl mb-2">🔒</div>
              <h4 className="font-semibold mb-1">No Monitoring</h4>
              <p className="text-xs text-muted-foreground">Your activity stays private</p>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl mb-2">📋</div>
              <h4 className="font-semibold mb-1">Full Compliance</h4>
              <p className="text-xs text-muted-foreground">Industry standard certifications</p>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl mb-2">💾</div>
              <h4 className="font-semibold mb-1">Your Storage</h4>
              <p className="text-xs text-muted-foreground">Data lives on your devices</p>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl mb-2">🛡️</div>
              <h4 className="font-semibold mb-1">Military Grade</h4>
              <p className="text-xs text-muted-foreground">Enterprise security standards</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "orchestration",
      title: "The Orchestration Layer",
      subtitle: "Our Core IP: The Intelligence That Never Sleeps",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">The Brain Behind Your Productivity</h2>
            <p className="text-lg text-muted-foreground">
              This is our secret sauce - the middleware that makes everything else possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Real-Time Monitoring</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Calendar Events:</strong> Detects conflicts, energy levels, meeting patterns
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Email Patterns:</strong> Urgent detection, task extraction, sentiment analysis
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Financial Signals:</strong> Payment deadlines, budget alerts, cash flow
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Health & Energy:</strong> Workout patterns, sleep quality, stress levels
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Intelligent Triggers</h3>
              <div className="space-y-3">
                <div className="border border-border p-3 rounded">
                  <p className="text-sm font-medium">Context-Aware Actions</p>
                  <p className="text-xs text-muted-foreground">Triggers AI only when necessary, with full context</p>
                </div>
                <div className="border border-border p-3 rounded">
                  <p className="text-sm font-medium">Pattern Recognition</p>
                  <p className="text-xs text-muted-foreground">Learns from your behavior to predict needs</p>
                </div>
                <div className="border border-border p-3 rounded">
                  <p className="text-sm font-medium">Multi-Source Fusion</p>
                  <p className="text-xs text-muted-foreground">Combines data from all tools for smart decisions</p>
                </div>
                <div className="border border-border p-3 rounded">
                  <p className="text-sm font-medium">Proactive Intervention</p>
                  <p className="text-xs text-muted-foreground">Acts before problems become critical</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "interoperability",
      title: "Universal Interoperability",
      subtitle: "Connect Everything, Change Nothing",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Productivity Hub</h2>
            <p className="text-lg text-muted-foreground">
              One interface to rule them all. Keep using your favorite tools while we orchestrate everything behind the scenes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Calendar & Scheduling</h3>
              <ul className="space-y-2 text-sm">
                <li>• Google Calendar sync</li>
                <li>• Outlook integration</li>
                <li>• Smart scheduling suggestions</li>
                <li>• Conflict resolution</li>
                <li>• Energy-based scheduling</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Task & Project Management</h3>
              <ul className="space-y-2 text-sm">
                <li>• Notion workspace sync</li>
                <li>• Trello board integration</li>
                <li>• ClickUp project tracking</li>
                <li>• Asana workflow automation</li>
                <li>• GitHub issue management</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Communication</h3>
              <ul className="space-y-2 text-sm">
                <li>• Slack message parsing</li>
                <li>• Teams integration</li>
                <li>• Email automation</li>
                <li>• WhatsApp notifications</li>
                <li>• Discord activity tracking</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-6 border border-border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Smart Data Normalization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Unified Task Model</h4>
                <p className="text-sm text-muted-foreground">All tasks from different platforms mapped to one schema</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Cross-Platform Analytics</h4>
                <p className="text-sm text-muted-foreground">Holistic view of productivity across all tools</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Bi-Directional Sync</h4>
                <p className="text-sm text-muted-foreground">Changes reflect everywhere in real-time</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Conflict Resolution</h4>
                <p className="text-sm text-muted-foreground">Smart handling of duplicate or conflicting data</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "conversational",
      title: "Conversational AI Hub",
      subtitle: "Natural Language Productivity Planning",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Your AI Productivity Coach</h2>
            <p className="text-lg text-muted-foreground">
              Complex decisions made simple through natural conversation. Your AI understands context, priorities, and constraints.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Conversation Scenarios</h3>
              <div className="space-y-3">
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Financial Planning</h4>
                  <p className="text-sm text-muted-foreground">
                    "I need a new laptop but only have £1000. Should I get a loan or reduce spending?"
                  </p>
                </div>
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Time Management</h4>
                  <p className="text-sm text-muted-foreground">
                    "I have three deadlines next week. How should I prioritize and schedule them?"
                  </p>
                </div>
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Energy Optimization</h4>
                  <p className="text-sm text-muted-foreground">
                    "I feel burned out. Can you reorganize my week for better work-life balance?"
                  </p>
                </div>
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Career Decisions</h4>
                  <p className="text-sm text-muted-foreground">
                    "Should I take this job offer? Help me analyze the pros and cons."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">AI Capabilities</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Multi-modal conversation (text, voice, images)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Context memory across sessions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Real-time data integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Proactive suggestions and interventions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Complex reasoning and analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Personalized recommendations</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 border border-border rounded-lg">
                <h4 className="font-medium mb-2">Conversation History</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Budget planning discussion (2 hours ago)</li>
                  <li>• Project deadline analysis (Yesterday)</li>
                  <li>• Health routine optimization (2 days ago)</li>
                  <li>• Travel planning session (1 week ago)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "features",
      title: "Core Features & Capabilities",
      subtitle: "Everything You Need for Peak Productivity",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Smart Task Management</h3>
              <ul className="space-y-2 text-sm">
                <li>• NLP task creation from emails/messages</li>
                <li>• AI-powered priority suggestions</li>
                <li>• Smart due date recommendations</li>
                <li>• Workload balancing algorithms</li>
                <li>• Dependency tracking</li>
                <li>• Time estimation learning</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Intelligent Automation</h3>
              <ul className="space-y-2 text-sm">
                <li>• Calendar optimization</li>
                <li>• Payment reminder system</li>
                <li>• Email parsing and categorization</li>
                <li>• Health & fitness tracking</li>
                <li>• Travel planning assistance</li>
                <li>• Expense categorization</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Productivity Analytics</h3>
              <ul className="space-y-2 text-sm">
                <li>• Time tracking across platforms</li>
                <li>• Energy level monitoring</li>
                <li>• Focus pattern analysis</li>
                <li>• Goal achievement tracking</li>
                <li>• Productivity trend insights</li>
                <li>• Performance optimization tips</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Optimization</h3>
              <ul className="space-y-2 text-sm">
                <li>• Circadian rhythm scheduling</li>
                <li>• Energy-based task allocation</li>
                <li>• Stress level monitoring</li>
                <li>• Burnout prevention</li>
                <li>• Work-life balance scoring</li>
                <li>• Habit formation support</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Team Collaboration</h3>
              <ul className="space-y-2 text-sm">
                <li>• Shared workspace intelligence</li>
                <li>• Team productivity insights</li>
                <li>• Collaborative decision making</li>
                <li>• Resource allocation optimization</li>
                <li>• Meeting efficiency analysis</li>
                <li>• Communication pattern insights</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Security & Compliance</h3>
              <ul className="space-y-2 text-sm">
                <li>• End-to-end encryption</li>
                <li>• GDPR compliance</li>
                <li>• SOC 2 Type II certification</li>
                <li>• Role-based access control</li>
                <li>• Audit trail logging</li>
                <li>• Data residency options</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "architecture",
      title: "Technical Architecture",
      subtitle: "Built for Scale, Security, and Performance",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Enterprise-Grade Infrastructure</h2>
            <p className="text-lg text-muted-foreground">
              Scalable, secure, and intelligent architecture designed for global deployment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Core Architecture</h3>
              <div className="space-y-3">
                <div className="border border-border p-3 rounded">
                  <h4 className="font-medium mb-1">Orchestration Engine</h4>
                  <p className="text-sm text-muted-foreground">Real-time event processing and intelligent trigger system</p>
                </div>
                <div className="border border-border p-3 rounded">
                  <h4 className="font-medium mb-1">AI Model Layer</h4>
                  <p className="text-sm text-muted-foreground">Multi-model AI system with specialized reasoning capabilities</p>
                </div>
                <div className="border border-border p-3 rounded">
                  <h4 className="font-medium mb-1">Integration Hub</h4>
                  <p className="text-sm text-muted-foreground">Universal API gateway with intelligent data normalization</p>
                </div>
                <div className="border border-border p-3 rounded">
                  <h4 className="font-medium mb-1">Data Pipeline</h4>
                  <p className="text-sm text-muted-foreground">Stream processing for real-time insights and actions</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Infrastructure & Security</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="border border-border p-3 rounded">
                  <h4 className="font-medium mb-1">Cloud-Native</h4>
                  <p className="text-sm text-muted-foreground">Multi-cloud deployment with auto-scaling capabilities</p>
                </div>
                <div className="border border-border p-3 rounded">
                  <h4 className="font-medium mb-1">Zero-Trust Security</h4>
                  <p className="text-sm text-muted-foreground">End-to-end encryption with role-based access control</p>
                </div>
                <div className="border border-border p-3 rounded">
                  <h4 className="font-medium mb-1">Edge Processing</h4>
                  <p className="text-sm text-muted-foreground">Distributed intelligence for reduced latency</p>
                </div>
                <div className="border border-border p-3 rounded">
                  <h4 className="font-medium mb-1">High Availability</h4>
                  <p className="text-sm text-muted-foreground">99.99% uptime with intelligent failover systems</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border border-border rounded-lg">
              <h4 className="font-semibold mb-2">Response Time</h4>
              <p className="text-2xl font-bold text-primary">&lt; 200ms</p>
              <p className="text-sm text-muted-foreground">Average API response time</p>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <h4 className="font-semibold mb-2">Uptime</h4>
              <p className="text-2xl font-bold text-primary">99.99%</p>
              <p className="text-sm text-muted-foreground">Service availability guarantee</p>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <h4 className="font-semibold mb-2">Data Processing</h4>
              <p className="text-2xl font-bold text-primary">10M+</p>
              <p className="text-sm text-muted-foreground">Events processed per day</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "business",
      title: "Business Model & Pricing",
      subtitle: "Flexible Solutions for Every Scale",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Monetization Strategy</h2>
            <p className="text-lg text-muted-foreground">
              Multiple revenue streams designed for sustainable growth and customer value.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="border border-border p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Personal</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">£29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 text-sm mb-6">
                <li>• Core orchestration features</li>
                <li>• 5 tool integrations</li>
                <li>• Basic AI conversations</li>
                <li>• Personal analytics</li>
                <li>• Mobile app access</li>
                <li>• Email support</li>
              </ul>
              <div className="text-sm text-muted-foreground">
                Perfect for individuals and freelancers
              </div>
            </div>
            
            <div className="border border-primary p-6 rounded-lg relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-4">Professional</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">£79</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 text-sm mb-6">
                <li>• All Personal features</li>
                <li>• Unlimited integrations</li>
                <li>• Advanced AI capabilities</li>
                <li>• Team collaboration</li>
                <li>• Custom workflows</li>
                <li>• Priority support</li>
                <li>• API access</li>
              </ul>
              <div className="text-sm text-muted-foreground">
                Ideal for small teams and businesses
              </div>
            </div>
            
            <div className="border border-border p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">Custom</span>
              </div>
              <ul className="space-y-2 text-sm mb-6">
                <li>• All Professional features</li>
                <li>• White-label solutions</li>
                <li>• Custom integrations</li>
                <li>• Dedicated support</li>
                <li>• On-premise deployment</li>
                <li>• SLA guarantees</li>
                <li>• Training & consulting</li>
              </ul>
              <div className="text-sm text-muted-foreground">
                Scalable solutions for large organizations
              </div>
            </div>
          </div>
          
          <div className="mt-8 space-y-6">
            <h3 className="text-xl font-semibold">Revenue Streams</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Subscription Revenue</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Monthly/annual subscriptions</li>
                  <li>• Usage-based pricing for enterprise</li>
                  <li>• Add-on feature packages</li>
                  <li>• Premium integration tiers</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Service Revenue</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Implementation services</li>
                  <li>• Custom integration development</li>
                  <li>• Training and consulting</li>
                  <li>• White-label licensing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "roadmap",
      title: "Implementation Roadmap",
      subtitle: "Strategic Development Plan",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Phase-by-Phase Development</h2>
            <p className="text-lg text-muted-foreground">
              Strategic roadmap for building and scaling the AI Productivity Companion platform.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="border border-border p-6 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold">🚩</div>
                <h3 className="text-xl font-semibold">Feature Flag - Coming Soon</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Core Features</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Basic orchestration engine</li>
                    <li>• 3-5 key integrations (Google, Slack, Notion)</li>
                    <li>• Simple conversational interface</li>
                    <li>• Personal dashboard</li>
                    <li>• Basic task management</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Success Metrics</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• 100 beta users</li>
                    <li>• 80% daily active usage</li>
                    <li>• 5+ automated actions per user/day</li>
                    <li>• 90% uptime</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border border-border p-6 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                <h3 className="text-xl font-semibold">Growth Phase (Months 4-8)</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Enhanced Features</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Advanced AI reasoning</li>
                    <li>• 15+ platform integrations</li>
                    <li>• Team collaboration features</li>
                    <li>• Advanced analytics</li>
                    <li>• Mobile applications</li>
                    <li>• API marketplace</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Business Goals</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• 1,000 paying customers</li>
                    <li>• £50K MRR</li>
                    <li>• 95% customer satisfaction</li>
                    <li>• Series A funding</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border border-border p-6 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                <h3 className="text-xl font-semibold">Scale Phase (Months 9-18)</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Enterprise Features</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• White-label solutions</li>
                    <li>• Enterprise security & compliance</li>
                    <li>• Custom AI model training</li>
                    <li>• Advanced workflow automation</li>
                    <li>• Multi-tenant architecture</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Market Expansion</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• 10,000+ users</li>
                    <li>• £500K MRR</li>
                    <li>• International markets</li>
                    <li>• Strategic partnerships</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "themes",
      title: "Theme Your Vibe",
      subtitle: "No Boring Allowed - Gen Z Customization",
      content: (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-neon-pink via-electric-blue to-neon-green bg-clip-text text-transparent animate-scale-in">
              One App Keeps You in Sync with the World
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto mt-6">
              Update here → It's updated everywhere. MCP, APIs, anything connected stays persistent. 
              Your personalized AI agent making sure you're the better version of yourself.
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <Badge variant="secondary" className="text-lg px-6 py-3 bg-gradient-neon text-white border-0">
                <Sparkles className="w-5 h-5 mr-2" />
                Built for Gen Z
              </Badge>
              <Badge variant="outline" className="text-lg px-6 py-3 hover-neon">
                <Zap className="w-5 h-5 mr-2" />
                Zero Technical Stress
              </Badge>
            </div>
          </div>

          <ThemeCustomizer />

          {/* Design Elements Placeholder Section */}
          <div className="mt-16 space-y-8">
            <h3 className="text-3xl font-bold text-center">Future Design Elements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="design-placeholder hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-6 h-6" />
                    Mobile-First Widgets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    TikTok-style vertical scrolling through your tasks and notifications. 
                    Swipe gestures for quick actions.
                  </p>
                </CardContent>
              </Card>

              <Card className="design-placeholder hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-6 h-6" />
                    AI Chat Personalities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Choose your AI's vibe: Bestie mode, Boss mode, Therapist mode, 
                    or create custom personalities that match your energy.
                  </p>
                </CardContent>
              </Card>

              <Card className="design-placeholder hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    Social Productivity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Share achievements, compete with friends, and celebrate wins together. 
                    Make productivity social and fun.
                  </p>
                </CardContent>
              </Card>

              <Card className="design-placeholder hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-6 h-6" />
                    Mood-Based Scheduling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    AI learns your energy patterns and mood cycles to suggest 
                    optimal times for different types of work.
                  </p>
                </CardContent>
              </Card>

              <Card className="design-placeholder hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-6 h-6" />
                    Memory Visualizer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    See your digital life as beautiful, interactive mind maps. 
                    Connections between ideas, people, and projects come alive.
                  </p>
                </CardContent>
              </Card>

              <Card className="design-placeholder hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-6 h-6" />
                    Achievement System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Level up your life with streaks, badges, and celebrations. 
                    Turn boring tasks into exciting challenges.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen bg-background">
      {/* Slide Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              {currentSlide + 1} / {slides.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main Slide Content */}
      <div className="pt-16 pb-8">
        <div className="container mx-auto px-4">
          {/* Slide Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {currentSlideData.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              {currentSlideData.subtitle}
            </p>
          </div>

          {/* Slide Content */}
          <div className="max-w-7xl mx-auto">
            {currentSlideData.content}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-4 bg-background/80 backdrop-blur-sm border border-border rounded-full px-6 py-3">
          <button
            onClick={prevSlide}
            className="p-2 hover:bg-muted rounded-full transition-colors"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="text-sm font-medium">
            {currentSlideData.title}
          </span>
          
          <button
            onClick={nextSlide}
            className="p-2 hover:bg-muted rounded-full transition-colors"
            disabled={currentSlide === slides.length - 1}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Side Navigation */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="space-y-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`block w-3 h-8 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-primary scale-110' 
                  : 'bg-muted hover:bg-muted-foreground/20'
              }`}
              title={slide.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;