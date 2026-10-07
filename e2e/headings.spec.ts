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
  "/press",
  "/privacy",
  "/terms",
  "/refund",
];

for (const route of ROUTES) {
  test(`heading outline is valid on ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "load" });
    const levels = await page.evaluate(() =>
      [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) =>
        Number(h.tagName[1])
      )
    );

    expect(levels[0]).toBe(1);
    expect(levels.filter((level) => level === 1)).toHaveLength(1);

    const skipped = levels.some(
      (level, i) => i > 0 && level > levels[i - 1] + 1
    );
    expect(skipped).toBe(false);
  });
}
