"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Phone,
  Mail,
  User,
  BookOpen,
  Shield,
  Zap,
  Users,
} from "lucide-react";

// ─── Validation Schema ────────────────────────────────────────────────────────
const schema = z.object({
  name: z.string().min(2, "Enter at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  course: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: "You must agree to be contacted",
  }),
});

type FormValues = z.infer<typeof schema>;

// ─── Props ────────────────────────────────────────────────────────────────────
interface CourseLeadFormProps {
  /** Pre-fill the course field with the current course title */
  courseTitle?: string;
  /** List of all course names for the dropdown */
  courseOptions?: string[];
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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      course: courseTitle ?? "",
      consent: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/linkedin-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          mobile: `+91${data.mobile}`,
          course: data.course || courseTitle || "Not specified",
          consent: data.consent,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Submission failed");
      }

      setStatus("success");
      // Fire LinkedIn conversion event
      window.lintrk?.('track', { conversion_id: 26490044 });
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  // ─── Success State ──────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl shadow-2xl border border-grey-90/30 p-8 flex flex-col items-center justify-center text-center gap-4 min-h-[420px]">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9 text-green-500" />
        </div>
        <h3 className="text-2xl font-vietnam font-bold text-grey-15">
          You&apos;re all set! 🎉
        </h3>
        <p className="text-grey-40 leading-relaxed max-w-xs">
          Our counselor will reach out to you within 24 hours. Check your
          WhatsApp &amp; email for updates.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-primary-75 font-semibold hover:underline"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  // ─── Form State ─────────────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-grey-90/30 overflow-hidden">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-primary-75 to-primary-90 px-6 py-4">
        <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-0.5">
          Free Counselling Session
        </p>
        <h3 className="text-white font-vietnam font-bold text-xl leading-snug">
          Get A Free Career Counselling Session
        </h3>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 divide-x divide-grey-90/40 border-b border-grey-90/40 bg-primary-99">
        {TRUST_BADGES.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1 px-2 py-3 text-center"
          >
            <Icon className="w-4 h-4 text-primary-75" />
            <span className="text-[10px] sm:text-xs font-semibold text-grey-35 leading-tight">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Form body */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-6 py-5 space-y-4"
        noValidate
      >
        {/* Full Name */}
        <div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-50" />
            <input
              {...register("name")}
              type="text"
              placeholder="Enter your full name"
              className={`w-full h-12 pl-10 pr-4 rounded-xl border text-grey-15 placeholder:text-grey-50 text-sm bg-light-97 focus:outline-none focus:ring-2 transition-all ${errors.name
                ? "border-red-400 focus:ring-red-200"
                : "border-grey-80 focus:border-primary-75 focus:ring-primary-90/30"
                }`}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <XCircle className="w-3 h-3" />
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-50" />
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className={`w-full h-12 pl-10 pr-4 rounded-xl border text-grey-15 placeholder:text-grey-50 text-sm bg-light-97 focus:outline-none focus:ring-2 transition-all ${errors.email
                ? "border-red-400 focus:ring-red-200"
                : "border-grey-80 focus:border-primary-75 focus:ring-primary-90/30"
                }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <XCircle className="w-3 h-3" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Mobile — with +91 prefix chip */}
        <div>
          <div className="relative flex">
            <span className="inline-flex items-center gap-1.5 h-12 px-3 rounded-l-xl border border-r-0 border-grey-80 bg-grey-95 text-grey-35 text-sm font-semibold select-none flex-shrink-0">
              🇮🇳 +91
            </span>
            <div className="relative flex-1">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-50" />
              <input
                {...register("mobile")}
                type="tel"
                maxLength={10}
                placeholder="Enter your mobile number"
                className={`w-full h-12 pl-10 pr-4 rounded-r-xl border text-grey-15 placeholder:text-grey-50 text-sm bg-light-97 focus:outline-none focus:ring-2 transition-all ${errors.mobile
                  ? "border-red-400 focus:ring-red-200"
                  : "border-grey-80 focus:border-primary-75 focus:ring-primary-90/30"
                  }`}
              />
            </div>
          </div>
          {errors.mobile && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <XCircle className="w-3 h-3" />
              {errors.mobile.message}
            </p>
          )}
        </div>

        {/* Course dropdown — only shown when multiple courses available */}
        {courseOptions.length > 1 && (
          <div>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-50 pointer-events-none" />
              <select
                {...register("course")}
                className={`w-full h-12 pl-10 pr-10 rounded-xl border text-grey-15 text-sm bg-light-97 focus:outline-none focus:ring-2 appearance-none transition-all cursor-pointer ${errors.course
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
                  className="w-4 h-4 text-grey-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Consent checkbox */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5 flex-shrink-0">
              <input
                {...register("consent")}
                type="checkbox"
                className="peer sr-only"
              />
              <div
                className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${errors.consent
                  ? "border-red-400"
                  : "border-grey-70 peer-checked:border-primary-75 peer-checked:bg-primary-75"
                  } group-hover:border-primary-75`}
              >
                <svg
                  className="w-3 h-3 text-white hidden peer-checked:block"
                  viewBox="0 0 12 10"
                  fill="none"
                >
                  <path
                    d="M1 5l3.5 3.5L11 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <span className="text-xs text-grey-40 leading-relaxed">
              I authorize EduWise Solutions and its associates to contact me
              with updates &amp; notifications via email, SMS, WhatsApp, and
              voice call.{" "}
              <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.consent && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1 ml-8">
              <XCircle className="w-3 h-3" />
              {errors.consent.message}
            </p>
          )}
        </div>

        {/* Server error */}
        {status === "error" && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
            <XCircle className="w-4 h-4 flex-shrink-0" />
            {errorMsg}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-primary-75 to-primary-90 text-white font-vietnam font-bold text-sm tracking-wide shadow-lg shadow-primary-75/25 hover:shadow-xl hover:shadow-primary-75/30 hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
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
