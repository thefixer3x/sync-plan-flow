import { useState, useCallback } from "react";
import { Palette, Sparkles, Check, RefreshCw, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const PRESET_THEMES = [
  {
    id: "cosmic",
    name: "Cosmic Vibes",
    emoji: "🌌",
    description: "Electric purple meets space blue",
    primary: "262 83% 58%",
    secondary: "196 75% 55%",
    accent: "45 93% 58%",
    gradient: "linear-gradient(135deg, hsl(262,83%,58%), hsl(196,75%,55%))",
  },
  {
    id: "sunset",
    name: "Sunset Fire",
    emoji: "🌅",
    description: "Orange sunset meets hot pink",
    primary: "25 95% 63%",
    secondary: "329 86% 70%",
    accent: "45 93% 58%",
    gradient: "linear-gradient(135deg, hsl(25,95%,63%), hsl(329,86%,70%))",
  },
  {
    id: "neon",
    name: "Neon Dreams",
    emoji: "💖",
    description: "Hot pink and cyan retro futurism",
    primary: "329 86% 70%",
    secondary: "196 75% 55%",
    accent: "142 76% 50%",
    gradient: "linear-gradient(135deg, hsl(329,86%,70%), hsl(196,75%,55%))",
  },
  {
    id: "mint",
    name: "Fresh Mint",
    emoji: "🌿",
    description: "Cool mint green with sky blue",
    primary: "152 68% 62%",
    secondary: "195 100% 65%",
    accent: "84 81% 55%",
    gradient: "linear-gradient(135deg, hsl(152,68%,62%), hsl(195,100%,65%))",
  },
  {
    id: "retro",
    name: "Retro Pop",
    emoji: "🕺",
    description: "80s nostalgia with a modern twist",
    primary: "322 80% 65%",
    secondary: "84 81% 55%",
    accent: "45 93% 58%",
    gradient: "linear-gradient(135deg, hsl(322,80%,65%), hsl(45,93%,58%))",
  },
  {
    id: "ocean",
    name: "Deep Ocean",
    emoji: "🌊",
    description: "Calming blues and teals",
    primary: "217 91% 60%",
    secondary: "186 80% 50%",
    accent: "45 93% 58%",
    gradient: "linear-gradient(135deg, hsl(217,91%,60%), hsl(186,80%,50%))",
  },
];

const CUSTOM_STORAGE_KEY = "ai-custom-theme";

function hslToHex(hslStr: string): string {
  const [h, s, l] = hslStr.split(" ").map((v) => parseFloat(v));
  const sl = s / 100;
  const ll = l / 100;
  const a = sl * Math.min(ll, 1 - ll);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = ll - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function applyThemeToDom(primary: string, secondary: string, accent: string) {
  const root = document.documentElement;
  root.style.setProperty("--primary", primary);
  root.style.setProperty("--secondary", secondary);
  root.style.setProperty("--accent", accent);
  root.style.setProperty("--ring", primary);
  root.style.setProperty("--sidebar-primary", primary);
  root.style.setProperty("--sidebar-ring", primary);
}

const Themes = () => {
  const [activePreset, setActivePreset] = useState("cosmic");
  const [applying, setApplying] = useState<string | null>(null);
  const { toast } = useToast();

  const stored = (() => {
    try { return JSON.parse(localStorage.getItem(CUSTOM_STORAGE_KEY) || "{}"); } catch { return {}; }
  })();

  const [customPrimary, setCustomPrimary] = useState<string>(stored.primary || "#a855f7");
  const [customSecondary, setCustomSecondary] = useState<string>(stored.secondary || "#06b6d4");
  const [customAccent, setCustomAccent] = useState<string>(stored.accent || "#fbbf24");
  const [radius, setRadius] = useState<number>(stored.radius ?? 12);

  const applyPreset = useCallback((theme: typeof PRESET_THEMES[0]) => {
    setApplying(theme.id);
    setActivePreset(theme.id);
    applyThemeToDom(theme.primary, theme.secondary, theme.accent);
    setTimeout(() => {
      setApplying(null);
      toast({ title: `${theme.emoji} ${theme.name} applied!`, description: "Your palette is live across the app." });
    }, 400);
  }, [toast]);

  const applyCustomTheme = useCallback(() => {
    const primary = hexToHsl(customPrimary);
    const secondary = hexToHsl(customSecondary);
    const accent = hexToHsl(customAccent);
    applyThemeToDom(primary, secondary, accent);
    document.documentElement.style.setProperty("--radius", `${radius / 16}rem`);
    localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify({ primary: customPrimary, secondary: customSecondary, accent: customAccent, radius }));
    toast({ title: "🎨 Custom theme saved!", description: "Your personalized palette is active and saved." });
  }, [customPrimary, customSecondary, customAccent, radius, toast]);

  const resetToDefault = useCallback(() => {
    applyPreset(PRESET_THEMES[0]);
    setActivePreset("cosmic");
  }, [applyPreset]);

  const primaryHsl = hexToHsl(customPrimary);
  const secondaryHsl = hexToHsl(customSecondary);
  const accentHsl = hexToHsl(customAccent);

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Themes</h1>
          <p className="text-sm text-muted-foreground">Choose a preset or build your own palette</p>
        </div>
        <Button variant="outline" size="sm" onClick={resetToDefault} className="gap-2">
          <RefreshCw className="h-3.5 w-3.5" />
          Reset Default
        </Button>
      </div>

      <Tabs defaultValue="presets">
        <TabsList className="w-full max-w-xs">
          <TabsTrigger value="presets" className="flex-1">Presets</TabsTrigger>
          <TabsTrigger value="custom" className="flex-1">Custom Builder</TabsTrigger>
        </TabsList>

        {/* ─── Preset Themes ─── */}
        <TabsContent value="presets" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRESET_THEMES.map((theme) => {
              const isActive = activePreset === theme.id;
              const isApplying = applying === theme.id;
              return (
                <Card
                  key={theme.id}
                  className={`cursor-pointer transition-all hover:border-primary/40 ${isActive ? "ring-2 ring-primary" : ""}`}
                  onClick={() => applyPreset(theme)}
                >
                  <div
                    className="h-24 rounded-t-lg relative overflow-hidden"
                    style={{ background: theme.gradient }}
                  >
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Badge className="bg-white/90 text-black font-semibold gap-1">
                          <Check className="h-3 w-3" /> Active
                        </Badge>
                      </div>
                    )}
                    <span className="absolute bottom-2 right-3 text-2xl">{theme.emoji}</span>
                  </div>
                  <CardHeader className="pb-2 pt-3">
                    <CardTitle className="text-sm">{theme.name}</CardTitle>
                    <CardDescription className="text-xs">{theme.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <Button
                      size="sm"
                      className="w-full text-xs"
                      variant={isActive ? "default" : "outline"}
                      disabled={isApplying}
                    >
                      {isApplying ? <><RefreshCw className="h-3 w-3 mr-1 animate-spin" /> Applying…</> : isActive ? "Applied ✨" : "Apply Theme"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* ─── Custom Builder ─── */}
        <TabsContent value="custom" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Palette className="h-4 w-4 text-primary" />
                    Color Palette
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {[
                    { label: "Primary", value: customPrimary, onChange: setCustomPrimary, desc: "Main brand color — buttons, active states" },
                    { label: "Secondary", value: customSecondary, onChange: setCustomSecondary, desc: "Supporting color — badges, accents" },
                    { label: "Accent", value: customAccent, onChange: setCustomAccent, desc: "Highlight color — warnings, CTAs" },
                  ].map(({ label, value, onChange, desc }) => (
                    <div key={label} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">{label}</Label>
                        <span className="text-xs text-muted-foreground font-mono">{value}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <input
                            type="color"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="w-10 h-10 rounded-lg cursor-pointer border border-border bg-transparent p-0.5"
                          />
                        </div>
                        <div className="flex-1 h-8 rounded-md border border-border" style={{ background: value }} />
                      </div>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  ))}

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Border Radius</Label>
                      <span className="text-xs text-muted-foreground font-mono">{radius}px</span>
                    </div>
                    <Slider
                      min={0}
                      max={24}
                      step={2}
                      value={[radius]}
                      onValueChange={([v]) => setRadius(v)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Sharp</span>
                      <span>Rounded</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={applyCustomTheme} className="w-full gap-2">
                <Sparkles className="h-4 w-4" />
                Apply Custom Theme
              </Button>
            </div>

            {/* Live Preview */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Live Preview</h3>
              <Card>
                <CardContent className="p-5 space-y-4">
                  {/* Mini dashboard preview */}
                  <div className="space-y-3">
                    <div
                      className="flex items-center gap-2 p-3 rounded-lg text-white text-sm font-medium"
                      style={{ background: customPrimary, borderRadius: `${radius}px` }}
                    >
                      <Sparkles className="h-4 w-4" />
                      Primary Button
                    </div>
                    <div
                      className="flex items-center gap-2 p-3 rounded-lg text-sm font-medium border-2"
                      style={{ borderColor: customPrimary, color: customPrimary, borderRadius: `${radius}px` }}
                    >
                      Outline Variant
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium text-white"
                      style={{ background: customPrimary }}
                    >
                      Primary Badge
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium text-white"
                      style={{ background: customSecondary }}
                    >
                      Secondary
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium text-black"
                      style={{ background: customAccent }}
                    >
                      Accent
                    </span>
                  </div>

                  <div className="space-y-2">
                    {["Task one — high priority", "Task two — medium priority", "Task three — complete"].map((t, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-2.5 rounded-md border text-sm"
                        style={{ borderRadius: `${radius / 2}px` }}
                      >
                        <div
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ background: i === 0 ? customPrimary : i === 1 ? customAccent : customSecondary }}
                        />
                        <span className={i === 2 ? "line-through text-muted-foreground" : ""}>{t}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="h-3 rounded-full overflow-hidden bg-muted"
                    style={{ borderRadius: `${radius}px` }}
                  >
                    <div
                      className="h-full"
                      style={{ width: "68%", background: `linear-gradient(90deg, ${customPrimary}, ${customSecondary})` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-right">68% tasks complete</p>
                </CardContent>
              </Card>

              {/* Light/Dark indicator */}
              <Card className="border-dashed">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="flex gap-2">
                    <Moon className="h-4 w-4 text-primary" />
                    <Sun className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Theme applies to dark mode (default). Light mode support coming soon.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Themes;
