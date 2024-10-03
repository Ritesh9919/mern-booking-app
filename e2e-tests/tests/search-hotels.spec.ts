import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("ritesh@gmail.com");
  await page.locator("[name=password]").fill("ritesh#12");
  await page.getByRole("button", { name: "Log In" }).click();
  await expect(page.getByText("SignIn Success!")).toBeVisible();
});

test("should show hotel search result", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where are you going?").fill("Mumbai");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Hotels found in Mumbai")).toBeVisible();
  await expect(page.getByText("Taj Mahal Palace")).toBeVisible();
});
