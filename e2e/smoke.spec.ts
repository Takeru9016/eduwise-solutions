import { expect, test } from "@playwright/test";

test("homepage loads with key sections", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBeLessThan(400);

  await expect(page.locator("nav").first()).toBeVisible();
  await expect(page.locator("footer")).toBeVisible();
});

const staticRoutes = [
  "/about",
  "/contact",
  "/courses",
  "/certifications/aws",
  "/blogs",
  "/testimonials",
  "/faq",
  "/privacy",
  "/refund",
  "/terms",
];

for (const route of staticRoutes) {
  test(`${route} responds with a non-error status`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBeLessThan(400);
  });
}

test("unknown route renders the not-found page", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist");
  expect(response?.status()).toBe(404);
});
