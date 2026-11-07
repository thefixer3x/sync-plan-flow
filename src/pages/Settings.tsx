import { useState, useEffect, useCallback } from "react";
import { Settings as SettingsIcon, Bell, Palette, Moon, Sun, Monitor, Zap, Accessibility, Wifi, WifiOff, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/AppContext";
import { getSetting, setSetting } from "@/store/db";
import {
  canUseCacheStorage,
  canUseServiceWorker,
  registerVersionedServiceWorker,
  unregisterAllServiceWorkers,
} from "@/lib/serviceWorker";

const Settings = () => {
  const [theme, setTheme] = useState("system");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    desktop: true,
  });
  const [offlineMode, setOfflineMode] = useState(false);
  const { reduceMotion, setReduceMotion } = useAppContext();
  const { toast } = useToast();

  useEffect(() => {
    getSetting<boolean>("offlineMode", false).then(setOfflineMode);
  }, []);

  const handleOfflineToggle = useCallback(async (enabled: boolean) => {
    setOfflineMode(enabled);
    await setSetting("offlineMode", enabled);
    if (canUseServiceWorker()) {
      if (enabled) {
        await registerVersionedServiceWorker();
        toast({ title: "Offline mode enabled", description: "App will cache for offline use." });
      } else {
        await unregisterAllServiceWorkers();
        toast({ title: "Offline mode disabled", description: "Service worker unregistered." });
      }
    }
  }, [toast]);

  const handleResetCache = useCallback(async () => {
    try {
      if (canUseServiceWorker()) {
        await unregisterAllServiceWorkers();
      }
      if (canUseCacheStorage()) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
      toast({ title: "Cache cleared", description: "Reloading…" });
      setTimeout(() => window.location.reload(), 500);
    } catch {
      toast({ title: "Error", description: "Could not clear cache.", variant: "destructive" });
    }
  }, [toast]);

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated.",
    });
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm">Configure your experience</p>
      </div>

      {/* AI Behavior */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="h-4 w-4" />
            AI Behavior
          </CardTitle>
          <CardDescription>Control how your AI assistant interacts with you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Communication Style</label>
            <Select defaultValue="professional">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="direct">Direct</SelectItem>
                <SelectItem value="encouraging">Encouraging</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Interruption Level</label>
            <Select defaultValue="moderate">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="minimal">Minimal — urgent only</SelectItem>
                <SelectItem value="moderate">Moderate — important items</SelectItem>
                <SelectItem value="high">High — all suggestions</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Theme</label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="light"><div className="flex items-center gap-2"><Sun className="h-3.5 w-3.5" /> Light</div></SelectItem>
                <SelectItem value="dark"><div className="flex items-center gap-2"><Moon className="h-3.5 w-3.5" /> Dark</div></SelectItem>
                <SelectItem value="system"><div className="flex items-center gap-2"><Monitor className="h-3.5 w-3.5" /> System</div></SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Reduce animations</p>
              <p className="text-xs text-muted-foreground">Minimize motion for accessibility</p>
            </div>
            <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} />
          </div>
        </CardContent>
      </Card>

      {/* Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Accessibility className="h-4 w-4" />
            Accessibility
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Reduce Motion</p>
              <p className="text-xs text-muted-foreground">Disables all animations &amp; transitions globally</p>
            </div>
            <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: "email", label: "Email notifications", desc: "Task reminders and updates" },
            { key: "push", label: "Push notifications", desc: "Instant alerts on your device" },
            { key: "desktop", label: "Desktop notifications", desc: "Browser notifications" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch
                checked={notifications[item.key as keyof typeof notifications]}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, [item.key]: checked }))
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Offline / PWA */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            {offlineMode ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
            Offline &amp; PWA
          </CardTitle>
          <CardDescription>Control service worker and offline caching</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Offline Mode</p>
              <p className="text-xs text-muted-foreground">Enable service worker for offline use</p>
            </div>
            <Switch
              checked={offlineMode}
              onCheckedChange={handleOfflineToggle}
              data-testid="offline-mode-switch"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleResetCache}
            data-testid="reset-offline-cache"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Reset Offline Cache
          </Button>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">Save Settings</Button>
    </div>
  );
};

export default Settings;
