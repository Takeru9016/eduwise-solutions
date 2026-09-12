interface FormData {
  email: string;
  firstName: string;
  formToken?: string;
  lastName: string;
  message: string;
  mobile: string;
  subject: string;
  turnstileToken?: string;
  [key: string]: boolean | string | undefined;
}

class NonRetryableError extends Error {}

export async function submitWithRetry(
  data: FormData,
  retries = 3,
  endpoint = "/api/contact-form"
): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10_000); // Increased timeout to 10s

      const response = await fetch(endpoint, {
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        console.log("Form submitted successfully");
        return response;
      }

      const errorData = await response.json();
      console.error(`Server returned ${response.status}:`, errorData);
      const message = errorData.error || `Server error: ${response.status}`;

      // 4xx responses (validation failure, honeypot/anti-spam rejection,
      // rate limit) are permanent for this exact request - retrying just
      // triples the noise and burns rate-limit budget for no benefit.
      // Only network failures and 5xx are worth retrying.
      if (response.status < 500) {
        throw new NonRetryableError(message);
      }
      throw new Error(message);
    } catch (error) {
      if (error instanceof NonRetryableError) {
        throw error;
      }

      console.error(`Attempt ${i + 1} failed:`, error);

      // On final retry, throw the error
      if (i === retries - 1) {
        throw error instanceof Error
          ? error
          : new Error("Failed to submit form after multiple attempts");
      }

      // Wait longer between each retry
      await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** i));
    }
  }

  // TypeScript requires this, but it should never be reached
  throw new Error("Unexpected end of submitWithRetry");
}
