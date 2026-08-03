"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookOpen,
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

// ─── Validation Schema ────────────────────────────────────────────────────────
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

// ─── Props ────────────────────────────────────────────────────────────────────
interface CourseLeadFormProps {
  /** List of all course names for the dropdown */
  courseOptions?: string[];
  /** Pre-fill the course field with the current course title */
  courseTitle?: string;
}

// ─── Trust badges shown above the form ───────────────────────────────────────
const TRUST_BADGES = [
  { icon: Users, label: "2,000+ Enrolled" },
  { icon: Shield, label: "100% Safe" },
  { icon: Zap, label: "Free Counselling" },
];

// Extend Window to include LinkedIn Insight lintrk function
declare global {
  interface Window {
    lintrk?: (action: string, params: { conversion_id: number }) => void;
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CourseLeadForm({
  courseTitle,
  courseOptions = [],
}: CourseLeadFormProps) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
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
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Submission failed");
      }

      setStatus("success");
      // Fire LinkedIn conversion event
      window.lintrk?.("track", { conversion_id: 26_490_044 });
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  // ─── Success State ──────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 rounded-2xl border border-grey-90/30 bg-white p-8 text-center shadow-2xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 className="h-9 w-9 text-green-500" />
        </div>
        <h3 className="font-bold font-vietnam text-2xl text-grey-15">
          You&apos;re all set! 🎉
        </h3>
        <p className="max-w-xs text-grey-40 leading-relaxed">
          Our counselor will reach out to you within 24 hours. Check your
          WhatsApp &amp; email for updates.
        </p>
        <button
          className="mt-2 font-semibold text-primary-75 text-sm hover:underline"
          onClick={() => setStatus("idle")}
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  // ─── Form State ─────────────────────────────────────────────────────────────
  return (
    <div className="overflow-hidden rounded-2xl border border-grey-90/30 bg-white shadow-2xl">
      {/* Header bar */}
      <div className="bg-linear-to-r from-primary-75 to-primary-90 px-6 py-4">
        <p className="mb-0.5 font-semibold text-white/80 text-xs uppercase tracking-widest">
          Free Counselling Session
        </p>
        <h3 className="font-bold font-vietnam text-white text-xl leading-snug">
          Get A Free Career Counselling Session
        </h3>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 divide-x divide-grey-90/40 border-grey-90/40 border-b bg-primary-99">
        {TRUST_BADGES.map(({ icon: Icon, label }) => (
          <div
            className="flex flex-col items-center gap-1 px-2 py-3 text-center"
            key={label}
          >
            <Icon className="h-4 w-4 text-primary-75" />
            <span className="font-semibold text-[10px] text-grey-35 leading-tight sm:text-xs">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Form body */}
      <form
        className="space-y-4 px-6 py-5"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Full Name */}
        <div>
          <div className="relative">
            <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-grey-50" />
            <input
              {...register("name")}
              className={`h-12 w-full rounded-xl border bg-light-97 pr-4 pl-10 text-grey-15 text-sm transition-all placeholder:text-grey-50 focus:outline-hidden focus:ring-2 ${
                errors.name
                  ? "border-red-400 focus:ring-red-200"
                  : "border-grey-80 focus:border-primary-75 focus:ring-primary-90/30"
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

        {/* Email */}
        <div>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-grey-50" />
            <input
              {...register("email")}
              className={`h-12 w-full rounded-xl border bg-light-97 pr-4 pl-10 text-grey-15 text-sm transition-all placeholder:text-grey-50 focus:outline-hidden focus:ring-2 ${
                errors.email
                  ? "border-red-400 focus:ring-red-200"
                  : "border-grey-80 focus:border-primary-75 focus:ring-primary-90/30"
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

        {/* Mobile — with +91 prefix chip */}
        <div>
          <div className="relative flex">
            <span className="inline-flex h-12 shrink-0 select-none items-center gap-1.5 rounded-l-xl border border-grey-80 border-r-0 bg-grey-95 px-3 font-semibold text-grey-35 text-sm">
              🇮🇳 +91
            </span>
            <div className="relative flex-1">
              <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-grey-50" />
              <input
                {...register("mobile")}
                className={`h-12 w-full rounded-r-xl border bg-light-97 pr-4 pl-10 text-grey-15 text-sm transition-all placeholder:text-grey-50 focus:outline-hidden focus:ring-2 ${
                  errors.mobile
                    ? "border-red-400 focus:ring-red-200"
                    : "border-grey-80 focus:border-primary-75 focus:ring-primary-90/30"
                }`}
                maxLength={10}
                placeholder="Enter your mobile number"
                type="tel"
              />
            </div>
          </div>
          {errors.mobile && (
            <p className="mt-1 flex items-center gap-1 text-red-500 text-xs">
              <XCircle className="h-3 w-3" />
              {errors.mobile.message}
            </p>
          )}
        </div>

        {/* Course dropdown — only shown when multiple courses available */}
        {courseOptions.length > 1 && (
          <div>
            <div className="relative">
              <BookOpen className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-grey-50" />
              <select
                {...register("course")}
                className={`h-12 w-full cursor-pointer appearance-none rounded-xl border bg-light-97 pr-10 pl-10 text-grey-15 text-sm transition-all focus:outline-hidden focus:ring-2 ${
                  errors.course
                    ? "border-red-400 focus:ring-red-200"
                    : "border-grey-80 focus:border-primary-75 focus:ring-primary-90/30"
                }`}
              >
                <option value="">Select a course*</option>
                {courseOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {/* Custom caret */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="h-4 w-4 text-grey-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Consent checkbox */}
        <div>
          <label className="group flex cursor-pointer items-start gap-3">
            <div className="relative mt-0.5 shrink-0">
              <input
                {...register("consent")}
                className="peer sr-only"
                type="checkbox"
              />
              <div
                className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-all ${
                  errors.consent
                    ? "border-red-400"
                    : "border-grey-70 peer-checked:border-primary-75 peer-checked:bg-primary-75"
                } group-hover:border-primary-75`}
              >
                <svg
                  className="hidden h-3 w-3 text-white peer-checked:block"
                  fill="none"
                  viewBox="0 0 12 10"
                >
                  <path
                    d="M1 5l3.5 3.5L11 1"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
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

        {/* Server error */}
        {status === "error" && (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-600 text-sm">
            <XCircle className="h-4 w-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        {/* Submit button */}
        <button
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary-75 to-primary-90 font-bold font-vietnam text-sm text-white tracking-wide shadow-lg shadow-primary-75/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-primary-75/30 hover:shadow-xl active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={status === "loading"}
          type="submit"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Apply Now — It's Free"
          )}
        </button>

        <p className="text-center text-[10px] text-grey-50">
          🔒 Your information is 100% secure and will never be shared.
        </p>
      </form>
    </div>
  );
}
