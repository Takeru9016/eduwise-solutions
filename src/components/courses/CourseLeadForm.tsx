"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  Shield,
  User,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  consent: z.boolean().refine((v) => v === true, {
    message: "You must agree to be contacted",
  }),
  course: z.string().optional(),
  email: z.string().email("Enter a valid email address"),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  name: z.string().min(2, "Enter at least 2 characters"),
});

type FormValues = z.infer<typeof schema>;

interface CourseLeadFormProps {
  courseTitle?: string;
}

const TRUST_BADGES = [
  { icon: Users, label: "8,000+ Enrolled" },
  { icon: Shield, label: "100% Safe" },
  { icon: Zap, label: "Free Counselling" },
];

declare global {
  interface Window {
    lintrk?: (action: string, params: { conversion_id: number }) => void;
    oaiq?: (...args: unknown[]) => void;
  }
}

export default function CourseLeadForm({ courseTitle }: CourseLeadFormProps) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      consent: false,
      course: courseTitle ?? "",
      email: "",
      mobile: "",
      name: "",
    },
    resolver: zodResolver(schema),
  });

  const consentChecked = watch("consent");

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/linkedin-lead", {
        body: JSON.stringify({
          consent: data.consent,
          course: data.course || courseTitle || "Not specified",
          email: data.email,
          mobile: `+91${data.mobile}`,
          name: data.name,
          pagePath: window.location.pathname,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Submission failed");
      }

      const result = await res.json();

      setStatus("success");

      if (result.event_id) {
        window.oaiq?.(
          "measure",
          "lead_created",
          { type: "customer_action" },
          { event_id: result.event_id }
        );
      }

      window.lintrk?.("track", { conversion_id: 26_490_044 });
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="flex min-h-105 flex-col items-center justify-center gap-4 rounded-3xl border-2 border-grey-15 bg-white p-8 text-center shadow-[4px_4px_0_0_var(--color-grey-15)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90">
          <CheckCircle2 className="h-9 w-9 text-grey-15" />
        </div>
        <h3 className="font-bold font-vietnam text-2xl text-grey-15">
          You&apos;re all set!
        </h3>
        <p className="max-w-xs text-grey-40 leading-relaxed">
          Our counselor will reach out to you within 24 hours. Check your
          WhatsApp &amp; email for updates.
        </p>
        <button
          className="mt-2 font-bold text-primary-75 text-sm hover:underline"
          onClick={() => setStatus("idle")}
          type="button"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-grey-15 bg-white shadow-[6px_6px_0_0_var(--color-grey-15)]">
      <div className="bg-grey-15 px-7 py-6">
        <p className="mb-1 font-bold text-primary-90 text-xs uppercase tracking-widest">
          Free Counselling Session
        </p>
        <h3 className="font-bold font-vietnam text-2xl text-white leading-snug">
          Get A Free Career Counselling Session
        </h3>
      </div>

      <div className="grid grid-cols-3 divide-x-2 divide-grey-15/10 border-grey-15/10 border-b bg-primary-99">
        {TRUST_BADGES.map(({ icon: Icon, label }) => (
          <div
            className="flex flex-col items-center gap-1.5 px-2 py-4 text-center"
            key={label}
          >
            <Icon className="h-5 w-5 text-primary-75" />
            <span className="font-bold text-grey-35 text-xs leading-tight sm:text-sm">
              {label}
            </span>
          </div>
        ))}
      </div>

      <form
        className="space-y-5 px-7 py-7"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="relative">
            <User className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-grey-40" />
            <input
              {...register("name")}
              className={`h-14 w-full rounded-xl border-2 bg-light-97 pr-4 pl-12 text-base text-grey-15 transition-colors placeholder:text-grey-40 focus:outline-hidden ${
                errors.name
                  ? "border-red-400"
                  : "border-grey-15/20 focus:border-primary-75"
              }`}
              placeholder="Enter your full name"
              type="text"
            />
          </div>
          {errors.name && (
            <p className="mt-1.5 flex items-center gap-1 text-red-500 text-xs">
              <XCircle className="h-3 w-3" />
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-grey-40" />
            <input
              {...register("email")}
              className={`h-14 w-full rounded-xl border-2 bg-light-97 pr-4 pl-12 text-base text-grey-15 transition-colors placeholder:text-grey-40 focus:outline-hidden ${
                errors.email
                  ? "border-red-400"
                  : "border-grey-15/20 focus:border-primary-75"
              }`}
              placeholder="Enter your email"
              type="email"
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 flex items-center gap-1 text-red-500 text-xs">
              <XCircle className="h-3 w-3" />
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <div className="relative flex">
            <span className="inline-flex h-14 shrink-0 select-none items-center rounded-l-xl border-2 border-grey-15/20 border-r-0 bg-light-95 px-4 font-bold text-base text-grey-35">
              +91
            </span>
            <div className="relative flex-1">
              <Phone className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-grey-40" />
              <input
                {...register("mobile")}
                className={`h-14 w-full rounded-r-xl border-2 bg-light-97 pr-4 pl-12 text-base text-grey-15 transition-colors placeholder:text-grey-40 focus:outline-hidden ${
                  errors.mobile
                    ? "border-red-400"
                    : "border-grey-15/20 focus:border-primary-75"
                }`}
                maxLength={10}
                placeholder="Enter your mobile number"
                type="tel"
              />
            </div>
          </div>
          {errors.mobile && (
            <p className="mt-1.5 flex items-center gap-1 text-red-500 text-xs">
              <XCircle className="h-3 w-3" />
              {errors.mobile.message}
            </p>
          )}
        </div>

        <div>
          <label className="group flex cursor-pointer items-start gap-3">
            <div className="relative mt-0.5 shrink-0">
              <input
                {...register("consent")}
                className="sr-only"
                type="checkbox"
              />
              <div
                className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
                  errors.consent
                    ? "border-red-400"
                    : consentChecked
                      ? "border-primary-75 bg-primary-75"
                      : "border-grey-15/30"
                } group-hover:border-primary-75`}
              >
                {consentChecked && (
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                )}
              </div>
            </div>
            <span className="text-grey-40 text-xs leading-relaxed">
              I authorize EduWise Solutions and its associates to contact me
              with updates &amp; notifications via email, SMS, WhatsApp, and
              voice call. <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.consent && (
            <p className="mt-1 ml-8 flex items-center gap-1 text-red-500 text-xs">
              <XCircle className="h-3 w-3" />
              {errors.consent.message}
            </p>
          )}
        </div>

        {status === "error" && (
          <div className="flex items-center gap-2 rounded-lg border-2 border-red-400 bg-red-50 px-3 py-2 text-red-600 text-sm">
            <XCircle className="h-4 w-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        <button
          className="flex h-14 w-full items-center justify-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 font-bold font-vietnam text-base text-grey-15 tracking-wide transition-[background-color,opacity] duration-200 hover:bg-primary-90 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={status === "loading"}
          type="submit"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Apply Now - It's Free"
          )}
        </button>

        <p className="text-center text-grey-40 text-xs">
          Your information is 100% secure and will never be shared.
        </p>
      </form>
    </div>
  );
}
