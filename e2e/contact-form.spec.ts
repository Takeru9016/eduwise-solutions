import { expect, test } from "@playwright/test";

test("contact form submits successfully and shows a confirmation dialog", async ({
  page,
}) => {
  // Mock the backend so this test doesn't depend on live Google Sheets
  // credentials or write test data into the production lead sheet.
  await page.route("**/api/contact-form", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, message: "ok" }),
    });
  });

  await page.goto("/contact");

  await page.getByPlaceholder("Enter First Name").fill("Test");
  await page.getByPlaceholder("Enter Last Name").fill("User");
  await page.getByPlaceholder("Enter your Email").fill("test.user@example.com");
  await page.getByPlaceholder("Enter Phone Number").fill("9876543210");

  // Subject is populated live from Sanity — select whatever the first
  // available option is rather than hardcoding course content.
  await page.getByRole("combobox").click();
  await page.getByRole("option").first().click();

  await page.getByRole("button", { name: /send message/i }).click();

  await expect(
    page.getByText("Message Sent Successfully!"),
  ).toBeVisible({ timeout: 10_000 });
});

test("contact form surfaces an error dialog when submission fails", async ({
  page,
}) => {
  await page.route("**/api/contact-form", async (route) => {
    await route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ error: "Failed to save form submission" }),
    });
  });

  await page.goto("/contact");

  await page.getByPlaceholder("Enter First Name").fill("Test");
  await page.getByPlaceholder("Enter Last Name").fill("User");
  await page.getByPlaceholder("Enter your Email").fill("test.user@example.com");
  await page.getByPlaceholder("Enter Phone Number").fill("9876543210");

  await page.getByRole("combobox").click();
  await page.getByRole("option").first().click();

  await page.getByRole("button", { name: /send message/i }).click();

  await expect(page.getByText("Error Sending Message")).toBeVisible({
    timeout: 10_000,
  });
});
