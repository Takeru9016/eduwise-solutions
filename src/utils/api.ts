interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  mobile: string;
  subject: string;
}

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

      // Parse error response
      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Server returned ${response.status}:`, errorData);
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      console.log("Form submitted successfully");
      return response;
    } catch (error) {
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
