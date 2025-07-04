import { useState } from "react";
import { Palette, Sparkles, Zap, RefreshCw, Download, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const ThemeCustomizer = () => {
  const [currentTheme, setCurrentTheme] = useState("cosmic");
  const [isApplying, setIsApplying] = useState(false);
  const { toast } = useToast();

  const themes = [
    {
      id: "cosmic",
      name: "Cosmic Vibes",
      description: "Electric purple meets space blue - for the dreamers",
      colors: ["#a855f7", "#3b82f6", "#fbbf24"],
      gradient: "bg-gradient-cosmic",
      emoji: "🌌"
    },
    {
      id: "sunset",
      name: "Sunset Fire",
      description: "Orange sunset meets hot pink - pure energy",
      colors: ["#fb923c", "#ec4899", "#fbbf24"],
      gradient: "bg-gradient-sunset",
      emoji: "🌅"
    },
    {
      id: "neon",
      name: "Neon Dreams",
      description: "Hot pink and cyan - retro futuristic vibes",
      colors: ["#ec4899", "#06b6d4", "#10b981"],
      gradient: "bg-gradient-neon",
      emoji: "💖"
    },
    {
      id: "retro",
      name: "Retro Pop",
      description: "80s nostalgia with modern twist",
      colors: ["#f472b6", "#fbbf24", "#84cc16"],
      gradient: "bg-gradient-retro",
      emoji: "🕺"
    },
    {
      id: "mint",
      name: "Fresh Mint",
      description: "Cool mint green with sky blue - refreshing",
      colors: ["#34d399", "#0ea5e9", "#84cc16"],
      gradient: "bg-gradient-mint",
      emoji: "🌿"
    },
    {
      id: "rainbow",
      name: "Pride Rainbow",
      description: "Full spectrum energy - celebrate everything",
      colors: ["#ec4899", "#3b82f6", "#10b981"],
      gradient: "bg-gradient-rainbow",
      emoji: "🏳️‍🌈"
    }
  ];

  const applyTheme = (themeId: string) => {
    setIsApplying(true);
    setCurrentTheme(themeId);
    
    // Apply theme class to body
    document.body.className = document.body.className.replace(/theme-\\w+/g, '');
    document.body.classList.add(`theme-${themeId}`);
    
    setTimeout(() => {
      setIsApplying(false);
      toast({
        title: "Theme Applied! ✨",
        description: `${themes.find(t => t.id === themeId)?.name} is now active across your dashboard`,
      });
    }, 500);
  };

  const saveCustomTheme = () => {
    toast({
      title: "Custom Theme Saved! 🎨",
      description: "Your personalized colors are ready to use",
    });
  };

  return (
    <div className="space-y-8 p-6">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Theme Your Vibe
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Different colors for different moods. Switch themes per page or go wild with your own palette!
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            No Boring Allowed
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            Per-Page Themes
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <Card 
            key={theme.id}
            className={`cursor-pointer transition-all hover-scale ${
              currentTheme === theme.id ? 'ring-2 ring-primary shadow-glow' : 'hover:shadow-lg'
            }`}
            onClick={() => applyTheme(theme.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{theme.emoji}</span>
                  {theme.name}
                </CardTitle>
                {currentTheme === theme.id && (
                  <Badge>Active</Badge>
                )}
              </div>
              <CardDescription>{theme.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`h-20 rounded-lg ${theme.gradient} animate-gradient relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold drop-shadow-lg">Preview</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                {theme.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              
              <Button 
                className="w-full" 
                variant={currentTheme === theme.id ? "default" : "outline"}
                disabled={isApplying}
              >
                {isApplying && currentTheme === theme.id ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Applying...
                  </>
                ) : currentTheme === theme.id ? (
                  "Currently Active ✨"
                ) : (
                  "Apply Theme"
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Custom Theme Builder Placeholder */}
      <Card className="design-placeholder">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-6 h-6" />
            Custom Theme Builder - Coming Soon!
          </CardTitle>
          <CardDescription>
            Create your own color combinations and save unlimited custom themes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-muted-foreground">
            🎨 Color picker for primary, secondary, accent colors<br/>
            🌈 Gradient builder with live preview<br/>
            💾 Save and share custom themes<br/>
            🎯 Per-page theme assignments<br/>
            ✨ Export themes as CSS variables
          </div>
          
          <div className="flex gap-4 justify-center pt-4">
            <Button variant="outline" className="hover-glow">
              <Download className="w-4 h-4 mr-2" />
              Import Theme
            </Button>
            <Button variant="outline" className="hover-glow">
              <Save className="w-4 h-4 mr-2" />
              Export Current
            </Button>
            <Button className="hover-glow">
              <Sparkles className="w-4 h-4 mr-2" />
              Build Custom Theme
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Per-Page Theme Assignment Placeholder */}
      <Card className="design-placeholder">
        <CardHeader>
          <CardTitle>Per-Page Theme Assignment</CardTitle>
          <CardDescription>
            Set different themes for different sections of your app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <strong>Dashboard:</strong> Cosmic Vibes 🌌<br/>
              <strong>Chat:</strong> Neon Dreams 💖<br/>
              <strong>Connectivity:</strong> Fresh Mint 🌿
            </div>
            <div>
              <strong>Analytics:</strong> Sunset Fire 🌅<br/>
              <strong>Settings:</strong> Retro Pop 🕺<br/>
              <strong>Home:</strong> Pride Rainbow 🏳️‍🌈
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeCustomizer;