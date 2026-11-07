import { WifiOff } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

export function OfflineBadge() {
  const { isOffline } = useAppContext();
  if (!isOffline) return null;
  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-2 rounded-full bg-destructive/90 px-4 py-1.5 text-destructive-foreground text-xs font-medium shadow-lg">
      <WifiOff className="h-3.5 w-3.5" />
      Offline — changes saved locally
    </div>
  );
}
