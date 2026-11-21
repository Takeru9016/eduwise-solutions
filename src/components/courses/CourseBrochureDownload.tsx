"use client";

import { Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HoneypotField } from "@/components/ui/honeypot-field";
import { Input } from "@/components/ui/input";
import { TurnstileWidget } from "@/components/ui/turnstile-widget";
import { useFormToken } from "@/hooks/useFormToken";
import { BROCHURE_CONTACT_CONSENT } from "@/lib/brochure-consent";
import { HONEYPOT_FIELD_NAME } from "@/lib/security/honeypot";
import { getLeadUtm } from "@/lib/utm";

const DOWNLOAD_ERROR = "Could not save your details. Please try again.";

function focusDownloadLink(link: HTMLAnchorElement | null) {
  link?.focus();
}

export default function CourseBrochureDownload({
  courseSlug,
}: {
  courseSlug: string;
}) {
  const id = useId();
  const formToken = useFormToken();
  const [open, setOpen] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileAttempt, setTurnstileAttempt] = useState(0);

  function handleOpenChange(nextOpen: boolean) {
    if (isSubmitting) {
      return;
    }
    setOpen(nextOpen);
    if (!nextOpen) {
      setError("");
      setTurnstileToken("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const form = new FormData(event.currentTarget);
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/course-brochure", {
        body: JSON.stringify({
          [HONEYPOT_FIELD_NAME]: form.get(HONEYPOT_FIELD_NAME),
          consent: form.has("consent"),
          email: form.get("email"),
          formToken,
          mobile: `+91${form.get("mobile")}`,
          name: form.get("name"),
          slug: courseSlug,
          turnstileToken,
          utm: getLeadUtm(),
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const result = await response.json();
      if (
        !(
          response.ok &&
          typeof result.downloadUrl === "string" &&
          result.downloadUrl
        )
      ) {
        setError(
          typeof result.error === "string" ? result.error : DOWNLOAD_ERROR
        );
        return;
      }
      setDownloadUrl(result.downloadUrl);
    } catch {
      setError(DOWNLOAD_ERROR);
    } finally {
      setIsSubmitting(false);
      setTurnstileToken("");
      setTurnstileAttempt((attempt) => attempt + 1);
    }
  }

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger asChild>
        <button
          className="inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-white px-6 py-3 font-bold text-grey-15 text-sm"
          type="button"
        >
          <Download aria-hidden="true" className="h-4 w-4" />
          Download Brochure (PDF)
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-3xl border-2 border-grey-15 bg-white text-grey-15 sm:rounded-3xl">
        <DialogHeader className="text-left">
          <DialogTitle className="pr-6 font-bold font-vietnam text-xl">
            {downloadUrl
              ? "Your brochure is ready"
              : "Download the course brochure"}
          </DialogTitle>
          <DialogDescription>
            {downloadUrl
              ? "Your details have been saved. Use the link below to download the PDF."
              : "Enter your details to access the PDF."}
          </DialogDescription>
        </DialogHeader>
        {downloadUrl ? (
          <Button asChild className="w-full gap-2 rounded-full">
            <a
              download
              href={downloadUrl}
              ref={focusDownloadLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Download aria-hidden="true" className="h-4 w-4" />
              Download PDF
            </a>
          </Button>
        ) : (
          <form onSubmit={handleSubmit}>
            <fieldset className="min-w-0 space-y-4" disabled={isSubmitting}>
              <HoneypotField />
              <div className="space-y-1.5">
                <label className="font-semibold text-sm" htmlFor={`${id}-name`}>
                  Full name
                </label>
                <Input
                  autoComplete="name"
                  id={`${id}-name`}
                  maxLength={100}
                  minLength={2}
                  name="name"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label
                  className="font-semibold text-sm"
                  htmlFor={`${id}-mobile`}
                >
                  Mobile number
                </label>
                <div className="flex">
                  <span
                    aria-hidden="true"
                    className="flex items-center rounded-l-md border border-input border-r-0 bg-light-97 px-3 text-sm"
                  >
                    +91
                  </span>
                  <Input
                    aria-describedby={`${id}-mobile-hint`}
                    autoComplete="tel-national"
                    className="rounded-l-none"
                    id={`${id}-mobile`}
                    inputMode="tel"
                    maxLength={10}
                    name="mobile"
                    pattern="[6-9][0-9]{9}"
                    required
                    type="tel"
                  />
                </div>
                <p className="text-grey-40 text-xs" id={`${id}-mobile-hint`}>
                  Enter a 10-digit Indian mobile number.
                </p>
              </div>
              <div className="space-y-1.5">
                <label
                  className="font-semibold text-sm"
                  htmlFor={`${id}-email`}
                >
                  Email address
                </label>
                <Input
                  autoComplete="email"
                  id={`${id}-email`}
                  maxLength={254}
                  name="email"
                  required
                  type="email"
                />
              </div>
              <label className="flex cursor-pointer items-start gap-3 text-grey-40 text-sm">
                <input
                  className="mt-0.5 size-4 shrink-0 accent-primary-75"
                  name="consent"
                  required
                  type="checkbox"
                />
                <span>{BROCHURE_CONTACT_CONSENT}</span>
              </label>
              <Link
                className="inline-block text-grey-40 text-xs underline"
                href="/privacy"
                rel="noopener noreferrer"
                target="_blank"
              >
                Privacy policy
              </Link>
              <TurnstileWidget
                key={turnstileAttempt}
                onVerify={setTurnstileToken}
              />
              {error ? (
                <p className="text-red-700 text-sm" role="alert">
                  {error}
                </p>
              ) : null}
              <Button className="w-full gap-2 rounded-full" type="submit">
                {isSubmitting ? (
                  <Loader2
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin"
                  />
                ) : null}
                {isSubmitting ? "Saving your details…" : "Get the brochure"}
              </Button>
            </fieldset>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
