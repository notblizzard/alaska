import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3001");
  await expect(page).toHaveTitle(/Alaska/);
});
