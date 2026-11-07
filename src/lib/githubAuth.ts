/**
 * GitHub sign-in runs through Supabase Auth on the lanonasis project. The
 * GitHub OAuth app (client id Ov23liE0fPdgwmxAtAnA) uses the Supabase callback
 * https://lanonasis.supabase.co/auth/v1/callback; its secret lives in the
 * Supabase dashboard (Auth → Providers → GitHub), never in code.
 *
 * After sign-in, the GitHub access token is handed straight to the server
 * (github-connection function), which stores it encrypted. The browser keeps
 * no copy.
 */
import { supabase } from "@/integrations/supabase/client";
import { callFunction } from "@/lib/edgeFunctions";

export const GITHUB_SCOPES = "read:user repo";
export const GITHUB_CONNECTED_EVENT = "github-connected";
const LEGACY_TOKEN_KEY = "github_provider_token";

// Was this page opened as the landing page of an OAuth redirect?
const cameFromOAuth =
  typeof window !== "undefined" &&
  /provider_token|access_token|[?&]code=/.test(window.location.hash + window.location.search);

/** Opens GitHub sign-in in a popup (GitHub can't load inside the preview frame). */
export async function startGithubOAuth(returnPath = "/integrations") {
  const popup = window.open("", "github-oauth", "width=600,height=720");
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const opts = {
      provider: "github" as const,
      options: {
        scopes: GITHUB_SCOPES,
        redirectTo: `${window.location.origin}${returnPath}`,
        skipBrowserRedirect: true,
      },
    };
    const { data, error } = session
      ? await supabase.auth.linkIdentity(opts)
      : await supabase.auth.signInWithOAuth(opts);
    if (error || !data?.url) throw error ?? new Error("No authorization URL returned");
    if (popup) popup.location.href = data.url;
    else window.location.href = data.url;
  } catch (e) {
    popup?.close();
    throw e;
  }
}

async function saveToken(providerToken: string) {
  return callFunction<{ connected: boolean; user?: { login: string } }>("github-connection", {
    action: "save",
    providerToken,
  });
}

/**
 * Mount once at the app root. Hands a fresh GitHub token to the server right
 * after the OAuth redirect, migrates any token an older version left in this
 * browser, and lets the opener window pick up the new session.
 */
export function installGithubTokenCapture(onConnected: (login?: string) => void, onError: (msg: string) => void) {
  let handled = false;

  const capture = async (providerToken?: string | null, access?: string, refresh?: string) => {
    if (handled || !providerToken) return;
    handled = true;
    try {
      const res = await saveToken(providerToken);
      if (window.opener && window.opener !== window) {
        window.opener.postMessage(
          { type: GITHUB_CONNECTED_EVENT, login: res.user?.login, session: access && refresh ? { access_token: access, refresh_token: refresh } : null },
          window.location.origin,
        );
        window.close();
        return;
      }
      onConnected(res.user?.login);
    } catch (e) {
      onError((e as Error).message);
    }
  };

  const migrateLegacy = async () => {
    const legacy = localStorage.getItem(LEGACY_TOKEN_KEY);
    if (!legacy) return;
    const { data } = await supabase.auth.getSession();
    if (!data.session) return; // keep it until the user signs in, then move it
    try {
      await saveToken(legacy);
    } catch {
      // token no longer valid — drop it anyway
    }
    localStorage.removeItem(LEGACY_TOKEN_KEY);
  };

  if (cameFromOAuth) {
    supabase.auth.getSession().then(({ data }) =>
      capture(data.session?.provider_token, data.session?.access_token, data.session?.refresh_token),
    );
  }
  const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
    if (cameFromOAuth && (event === "SIGNED_IN" || event === "USER_UPDATED")) {
      void capture(s?.provider_token, s?.access_token, s?.refresh_token);
    }
    if (event === "SIGNED_IN" || event === "INITIAL_SESSION") void migrateLegacy();
  });

  const onMsg = async (e: MessageEvent) => {
    if (e.origin !== window.location.origin || e.data?.type !== GITHUB_CONNECTED_EVENT) return;
    const s = e.data.session as { access_token: string; refresh_token: string } | null;
    if (s) await supabase.auth.setSession(s);
    onConnected(e.data.login);
    window.dispatchEvent(new CustomEvent(GITHUB_CONNECTED_EVENT));
  };
  window.addEventListener("message", onMsg);

  return () => {
    sub.subscription.unsubscribe();
    window.removeEventListener("message", onMsg);
  };
}
