"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  DownloadCloud,
  Loader2,
  Lock,
  Mail,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { HoneypotField } from "@/components/ui/honeypot-field";
import { TurnstileWidget } from "@/components/ui/turnstile-widget";
import { useFormToken } from "@/hooks/useFormToken";
import { HONEYPOT_FIELD_NAME } from "@/lib/security/honeypot";

const gateSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  name: z.string().min(2, "Enter at least 2 characters"),
});

type GateFormValues = z.infer<typeof gateSchema>;

interface ResourceGateFormProps {
  resourceSlug: string;
  resourceTitle: string;
}

export default function ResourceGateForm({
  resourceSlug,
  resourceTitle,
}: ResourceGateFormProps) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const formToken = useFormToken();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GateFormValues>({
    defaultValues: { email: "", name: "" },
    resolver: zodResolver(gateSchema),
  });

  const onSubmit = async (
    data: GateFormValues,
    event?: React.BaseSyntheticEvent
  ) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const formEl = event?.target as HTMLFormElement | undefined;
      const honeypotValue = formEl
        ? new FormData(formEl).get(HONEYPOT_FIELD_NAME)
        : "";

      const res = await fetch("/api/lead-magnet", {
        body: JSON.stringify({
          [HONEYPOT_FIELD_NAME]: String(honeypotValue ?? ""),
          email: data.email,
          formToken,
          name: data.name,
          slug: resourceSlug,
          turnstileToken,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Submission failed");
      }

      setDownloadUrl(json.downloadUrl);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border-2 border-grey-15 bg-white p-8 text-center shadow-[6px_6px_0_0_var(--color-grey-15)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90">
          <CheckCircle2 className="h-9 w-9 text-grey-15" />
        </div>
        <h3 className="font-bold font-vietnam text-2xl text-grey-15">
          You&apos;re all set!
        </h3>
        <p className="max-w-xs text-grey-40 leading-relaxed">
          We&apos;ve emailed your guide to you. You can also download it
          directly below.
        </p>
        <a
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 font-bold text-grey-15 transition-colors hover:bg-primary-90"
          download
          href={downloadUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <DownloadCloud className="h-4 w-4" />
          Download Now
        </a>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-grey-15 bg-white shadow-[6px_6px_0_0_var(--color-grey-15)]">
      <div className="bg-grey-15 px-7 py-6">
        <p className="mb-1 font-bold text-primary-90 text-xs uppercase tracking-widest">
          Free Download
        </p>
        <h3 className="font-bold font-vietnam text-2xl text-white leading-snug">
          Get &ldquo;{resourceTitle}&rdquo;
        </h3>
      </div>

      <form
        className="space-y-4 px-7 py-7"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <HoneypotField />
        <div>
          <div className="relative">
            <User className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-grey-40" />
            <input
              {...register("name")}
              className={`h-12 w-full rounded-xl border-2 bg-light-97 pr-4 pl-11 text-grey-15 text-sm transition-colors placeholder:text-grey-40 focus:outline-hidden ${
                errors.name
                  ? "border-red-400"
                  : "border-grey-15/20 focus:border-primary-75"
              }`}
              placeholder="Enter your full name"
              type="text"
            />
          </div>
          {errors.name && (
            <p className="mt-1 flex items-center gap-1 text-red-500 text-xs">
              <XCircle className="h-3 w-3" />
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-grey-40" />
            <input
              {...register("email")}
              className={`h-12 w-full rounded-xl border-2 bg-light-97 pr-4 pl-11 text-grey-15 text-sm transition-colors placeholder:text-grey-40 focus:outline-hidden ${
                errors.email
                  ? "border-red-400"
                  : "border-grey-15/20 focus:border-primary-75"
              }`}
              placeholder="Enter your email"
              type="email"
            />
          </div>
          {errors.email && (
            <p className="mt-1 flex items-center gap-1 text-red-500 text-xs">
              <XCircle className="h-3 w-3" />
              {errors.email.message}
            </p>
          )}
        </div>

        {status === "error" && (
          <div className="flex items-center gap-2 rounded-lg border-2 border-red-400 bg-red-50 px-3 py-2 text-red-600 text-sm">
            <XCircle className="h-4 w-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        <TurnstileWidget onVerify={setTurnstileToken} />

        <button
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 font-bold text-grey-15 text-sm transition-colors hover:bg-primary-90 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={status === "loading"}
          type="submit"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <DownloadCloud className="h-4 w-4" />
              Send Me the Guide
            </>
          )}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-center text-grey-40 text-xs">
          <Lock className="h-3 w-3" />
          Your information is 100% secure and will never be shared.
        </p>
      </form>
    </div>
  );
}
