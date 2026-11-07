import { expect, test } from "@playwright/test";

const ROUTES_TO_HOP = ["/tasks", "/dashboard", "/themes", "/settings", "/memory"];
const DISPATCHER_ERROR_PATTERN =
  /Cannot read properties of null \(reading 'useState'\)|Invalid hook call|dispatcher/i;

test.describe("Phase 1 stability gate", () => {
  test("10 refreshes + route hops do not produce dispatcher crashes", async ({ page }) => {
    const observedErrors: string[] = [];

    page.on("pageerror", (error) => {
      observedErrors.push(error.message);
    });

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        observedErrors.push(msg.text());
      }
    });

    await page.goto("/tasks");
    await expect(page.getByPlaceholder(/Quick add/i)).toBeVisible();

    for (let index = 0; index < 10; index += 1) {
      await page.reload();
      await expect(page.getByPlaceholder(/Quick add/i)).toBeVisible();
    }

    for (const route of ROUTES_TO_HOP) {
      await page.goto(route);
      await expect(page.locator("#root")).toBeVisible();
    }

    await page.reload();
    await expect(page.locator("#root")).toBeVisible();

    const dispatcherErrors = observedErrors.filter((entry) =>
      DISPATCHER_ERROR_PATTERN.test(entry)
    );

    expect(dispatcherErrors).toEqual([]);
  });

  test("offline toggle + reset cache flow remains stable", async ({ page }) => {
    await page.goto("/settings");

    const offlineSwitch = page.getByTestId("offline-mode-switch");
    const resetButton = page.getByTestId("reset-offline-cache");

    await expect(offlineSwitch).toBeVisible();
    await expect(resetButton).toBeVisible();

    const initialState = (await offlineSwitch.getAttribute("data-state")) ?? "unchecked";
    const toggledState = initialState === "checked" ? "unchecked" : "checked";

    await offlineSwitch.click();
    await expect(offlineSwitch).toHaveAttribute("data-state", toggledState);

    await offlineSwitch.click();
    await expect(offlineSwitch).toHaveAttribute("data-state", initialState);

    await resetButton.click();
    await page.waitForTimeout(1000);
    await expect(page.locator("#root")).toBeVisible();
  });

  test("service worker controller changes prompt refresh toast", async ({ page }) => {
    await page.goto("/dashboard");

    await page.evaluate(() => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.dispatchEvent(new Event("controllerchange"));
      }
    });

    await expect(page.getByText("New version available")).toBeVisible();
    await expect(page.getByRole("button", { name: "Refresh" })).toBeVisible();
  });
});
