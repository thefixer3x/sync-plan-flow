import { useState } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";

export function InstallBanner() {
  const { installPrompt, triggerInstall } = useAppContext();
  const [dismissed, setDismissed] = useState(false);

  if (!installPrompt || dismissed) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm">
      <div className="rounded-2xl border border-primary/20 bg-card/95 backdrop-blur shadow-xl p-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Download className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">Install TaskFlow</p>
          <p className="text-xs text-muted-foreground">
            Works offline, always one tap away
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button size="sm" onClick={triggerInstall} className="text-xs h-8">
            Install
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={() => setDismissed(true)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
