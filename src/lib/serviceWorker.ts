const BUILD_ID =
  typeof __APP_BUILD_ID__ === "string" && __APP_BUILD_ID__.trim().length > 0
    ? __APP_BUILD_ID__
    : "dev";

export const VERSIONED_SW_URL = `/sw.js?v=${encodeURIComponent(BUILD_ID)}`;

export const canUseServiceWorker = () =>
  typeof navigator !== "undefined" &&
  "serviceWorker" in navigator &&
  typeof navigator.serviceWorker !== "undefined";

export const canUseCacheStorage = () =>
  typeof window !== "undefined" && "caches" in window;

export async function registerVersionedServiceWorker() {
  if (!canUseServiceWorker()) return null;
  return navigator.serviceWorker.register(VERSIONED_SW_URL, { scope: "/" });
}

export async function unregisterAllServiceWorkers() {
  if (!canUseServiceWorker()) return;

  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((registration) => registration.unregister()));
}
