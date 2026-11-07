import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Maximize2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ConciergeChat, ConciergeMark } from "@/components/concierge/ConciergeChat";

const HIDDEN_ON = ["/chat", "/auth"];

const FloatingAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Flow, your concierge"
          className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-card border-2 border-primary/30 shadow-lg hover:shadow-xl hover:border-primary/60 transition-all flex items-center justify-center"
        >
          <ConciergeMark className="h-11 w-11" />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-x-3 bottom-3 top-16 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[400px] sm:h-[600px] sm:max-h-[calc(100vh-3rem)] z-50 flex flex-col rounded-xl border bg-card shadow-2xl overflow-hidden animate-scale-in">
          <div className="flex items-center justify-between gap-2 border-b px-3 py-2">
            <div className="flex items-center gap-2">
              <ConciergeMark className="h-8 w-8" />
              <div className="leading-tight">
                <p className="text-sm font-semibold">Flow</p>
                <p className="text-[11px] text-muted-foreground">Your productivity concierge</p>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="icon-sm" asChild aria-label="Open full chat">
                <Link to="/chat" onClick={() => setIsOpen(false)}><Maximize2 className="h-4 w-4" /></Link>
              </Button>
              <Button variant="ghost" size="icon-sm" onClick={() => setIsOpen(false)} aria-label="Close">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <ConciergeChat compact />
        </div>
      )}
    </>
  );
};

export default FloatingAIChat;
