import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { GITHUB_CONNECTED_EVENT, installGithubTokenCapture } from "@/lib/githubAuth";

/** Mounted once: moves a freshly granted GitHub token to secure server storage. */
export function GithubTokenCapture() {
  const { toast } = useToast();
  useEffect(
    () =>
      installGithubTokenCapture(
        (login) => {
          toast({ title: "Connected to GitHub", description: login ? `Signed in as @${login}.` : undefined });
          window.dispatchEvent(new CustomEvent(GITHUB_CONNECTED_EVENT));
        },
        (msg) => toast({ title: "Couldn't finish connecting GitHub", description: msg, variant: "destructive" }),
      ),
    [toast],
  );
  return null;
}
