import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { AppSidebar } from "./components/AppSidebar";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { OfflineBadge } from "./components/OfflineBadge";
import { InstallBanner } from "./components/InstallBanner";
import FloatingAIChat from "./components/FloatingAIChat";

// Eager pages (critical path)
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Lazy pages (non-critical)
const Integrations = lazy(() => import("./pages/Integrations"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Themes = lazy(() => import("./pages/Themes"));
const Personalities = lazy(() => import("./pages/Personalities"));
const Memory = lazy(() => import("./pages/Memory"));
const Social = lazy(() => import("./pages/Social"));

const queryClient = new QueryClient();

// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {/* ignore */});
  });
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <OfflineBadge />
          <InstallBanner />
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <main className="flex-1 md:ml-56 mt-14 md:mt-0 transition-all duration-300 min-w-0">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<ErrorBoundary><Index /></ErrorBoundary>} />
                  <Route path="/dashboard" element={<ErrorBoundary><Dashboard /></ErrorBoundary>} />
                  <Route path="/tasks" element={<ErrorBoundary><Tasks /></ErrorBoundary>} />
                  <Route path="/chat" element={<ErrorBoundary><Chat /></ErrorBoundary>} />
                  <Route path="/integrations" element={<ErrorBoundary><Integrations /></ErrorBoundary>} />
                  <Route path="/privacy" element={<ErrorBoundary><Privacy /></ErrorBoundary>} />
                  <Route path="/themes" element={<ErrorBoundary><Themes /></ErrorBoundary>} />
                  <Route path="/personalities" element={<ErrorBoundary><Personalities /></ErrorBoundary>} />
                  <Route path="/memory" element={<ErrorBoundary><Memory /></ErrorBoundary>} />
                  <Route path="/social" element={<ErrorBoundary><Social /></ErrorBoundary>} />
                  <Route path="/settings" element={<ErrorBoundary><Settings /></ErrorBoundary>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
          </div>
          <FloatingAIChat />
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
