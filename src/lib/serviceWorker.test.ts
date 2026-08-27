import {
  VERSIONED_SW_URL,
  registerVersionedServiceWorker,
  unregisterAllServiceWorkers,
} from "@/lib/serviceWorker";

describe("serviceWorker hardening", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("uses a versioned service worker URL", () => {
    expect(VERSIONED_SW_URL).toContain("/sw.js?v=");
    expect(VERSIONED_SW_URL).toContain("test-build-id");
  });

  it("registers the versioned service worker with root scope", async () => {
    const register = vi.fn().mockResolvedValue({});

    Object.defineProperty(navigator, "serviceWorker", {
      configurable: true,
      value: {
        register,
        getRegistrations: vi.fn().mockResolvedValue([]),
      },
    });

    await registerVersionedServiceWorker();

    expect(register).toHaveBeenCalledTimes(1);
    expect(register).toHaveBeenCalledWith("/sw.js?v=test-build-id", { scope: "/" });
  });

  it("unregisters every existing service worker registration", async () => {
    const unregisterA = vi.fn().mockResolvedValue(true);
    const unregisterB = vi.fn().mockResolvedValue(true);
    const getRegistrations = vi.fn().mockResolvedValue([
      { unregister: unregisterA },
      { unregister: unregisterB },
    ]);

    Object.defineProperty(navigator, "serviceWorker", {
      configurable: true,
      value: {
        register: vi.fn(),
        getRegistrations,
      },
    });

    await unregisterAllServiceWorkers();

    expect(getRegistrations).toHaveBeenCalledTimes(1);
    expect(unregisterA).toHaveBeenCalledTimes(1);
    expect(unregisterB).toHaveBeenCalledTimes(1);
  });
});
