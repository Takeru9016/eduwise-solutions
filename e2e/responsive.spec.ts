import { expect, test } from "@playwright/test";

const ROUTES = [
  "/",
  "/about",
  "/contact",
  "/courses",
  "/courses/devops",
  "/pricing",
  "/quiz",
  "/resources",
  "/certifications/aws",
  "/blogs",
  "/faq",
  "/testimonials",
  "/refund",
];

for (const route of ROUTES) {
  test(`no horizontal scroll on ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "load" });
    const { docWidth, viewWidth } = await page.evaluate(() => ({
      docWidth: document.documentElement.scrollWidth,
      viewWidth: window.innerWidth,
    }));
    expect(docWidth).toBeLessThanOrEqual(viewWidth);
  });
}
