interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
}

export async function submitWithRetry(
  data: FormData,
  retries = 3
): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // Increased timeout to 10s

      const response = await fetch("/api/contact-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
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
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, i))
      );
    }
  }

  // TypeScript requires this, but it should never be reached
  throw new Error("Unexpected end of submitWithRetry");
}
