/**
 * Global App Context – reduce motion, offline status, install prompt.
 * Wraps the whole app to provide these signals everywhere.
 */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { getSetting, setSetting } from "@/store/db";

interface AppContextValue {
  reduceMotion: boolean;
  setReduceMotion: (v: boolean) => void;
  isOffline: boolean;
  installPrompt: BeforeInstallPromptEvent | null;
  triggerInstall: () => Promise<void>;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const AppContext = createContext<AppContextValue>({
  reduceMotion: false,
  setReduceMotion: () => {},
  isOffline: false,
  installPrompt: null,
  triggerInstall: async () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [reduceMotion, setReduceMotionState] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  // Load reduce-motion preference from DB
  useEffect(() => {
    getSetting<boolean>("reduceMotion", false).then((v) => {
      setReduceMotionState(v);
      applyReduceMotion(v);
    });
  }, []);

  // System prefers-reduced-motion override
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduceMotionState(true);
      applyReduceMotion(true);
    }
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setReduceMotionState(true);
        applyReduceMotion(true);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const setReduceMotion = useCallback((v: boolean) => {
    setReduceMotionState(v);
    applyReduceMotion(v);
    setSetting("reduceMotion", v).catch(console.error);
  }, []);

  // Offline detection
  useEffect(() => {
    const onOnline = () => setIsOffline(false);
    const onOffline = () => setIsOffline(true);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  // PWA install prompt
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const triggerInstall = useCallback(async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") setInstallPrompt(null);
  }, [installPrompt]);

  return (
    <AppContext.Provider
      value={{ reduceMotion, setReduceMotion, isOffline, installPrompt, triggerInstall }}
    >
      {children}
    </AppContext.Provider>
  );
}

function applyReduceMotion(enabled: boolean) {
  if (enabled) {
    document.documentElement.classList.add("reduce-motion");
  } else {
    document.documentElement.classList.remove("reduce-motion");
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
