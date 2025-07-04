import { useState } from "react";
import { MessageSquare, Mic, Send, X, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
interface Message {
  id: number;
  type: "ai" | "user";
  content: string;
  timestamp: Date;
}
const FloatingAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([{
    id: 1,
    type: "ai",
    content: "Hi! I'm your AI assistant. How can I help you today?",
    timestamp: new Date()
  }]);
  const {
    toast
  } = useToast();
  const handleSendMessage = () => {
    if (!message.trim()) return;
    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        type: "ai",
        content: getAIResponse(message),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };
  const getAIResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes("connect") || lowerMessage.includes("integration")) {
      return "I can help you connect your apps! Visit the Connectivity page to integrate with Google Calendar, Notion, Slack, and more.";
    } else if (lowerMessage.includes("task") || lowerMessage.includes("todo")) {
      return "I'll create that task for you! Would you like me to set a due date or priority level?";
    } else if (lowerMessage.includes("schedule") || lowerMessage.includes("meeting")) {
      return "Let me check your calendar and find the best time for that meeting. I'll also send invites to the participants.";
    } else if (lowerMessage.includes("reminder")) {
      return "Reminder set! I'll notify you at the specified time and send a gentle nudge 15 minutes before.";
    } else {
      return "I understand! Let me process that request and take care of it for you. Is there anything specific you'd like me to prioritize?";
    }
  };
  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Start voice recognition
      if ('webkitSpeechRecognition' in window) {
        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        recognition.onstart = () => {
          toast({
            title: "Listening...",
            description: "Speak now, I'm listening!"
          });
        };
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setMessage(transcript);
          setIsListening(false);
        };
        recognition.onerror = () => {
          setIsListening(false);
          toast({
            title: "Voice Error",
            description: "Could not recognize speech. Please try again.",
            variant: "destructive"
          });
        };
        recognition.start();
      } else {
        toast({
          title: "Not Supported",
          description: "Voice recognition is not supported in this browser.",
          variant: "destructive"
        });
        setIsListening(false);
      }
    }
  };
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && <Button onClick={() => setIsOpen(true)} size="icon" className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all animate-pulse text-yellow-200 bg-zinc-700 hover:bg-zinc-600">
            <MessageSquare className="w-8 h-8" />
          </Button>}
      </div>

      {/* Chat Window */}
      {isOpen && <Card className="fixed bottom-6 right-6 w-96 h-[500px] z-50 shadow-2xl border-2 border-primary/20 animate-scale-in">
          <CardHeader className="bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                AI Assistant
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-primary-foreground/20">
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex flex-col h-full p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${msg.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>)}
            </div>

            {/* Input Area */}
            <div className="border-t p-4 space-y-3">
              <div className="flex gap-2">
                <Input value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your message or use voice..." onKeyPress={e => e.key === "Enter" && handleSendMessage()} className="flex-1" />
                <Button onClick={handleVoiceToggle} variant={isListening ? "destructive" : "secondary"} size="icon" className="shrink-0">
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button onClick={handleSendMessage} size="icon" className="shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setMessage("Create a task for project review")}>
                  Create Task
                </Button>
                <Button variant="outline" size="sm" onClick={() => setMessage("Schedule a meeting tomorrow")}>
                  Schedule Meeting
                </Button>
                <Button variant="outline" size="sm" onClick={() => setMessage("Show my connections")}>
                  My Apps
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>}
    </>;
};
export default FloatingAIChat;