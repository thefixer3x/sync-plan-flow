import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Orchestration from "./pages/Orchestration";
import Analytics from "./pages/Analytics";
import Integrations from "./pages/Integrations";
import Connectivity from "./pages/Connectivity";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import FloatingAIChat from "./components/FloatingAIChat";
import BellaVariant2 from "./components/bella/BellaVariant2";
import BellaVariant4 from "./components/bella/BellaVariant4";
import BellaDemo from "./pages/BellaDemo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/orchestration" element={<Orchestration />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/connectivity" element={<Connectivity />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/bella" element={<BellaDemo />} />
          <Route path="/bella-v2" element={<BellaVariant2 />} />
          <Route path="/bella-v4" element={<BellaVariant4 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingAIChat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
