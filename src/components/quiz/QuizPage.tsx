"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Lock,
  Mail,
  Phone,
  Sparkles,
  User,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CATEGORIES, type CourseCategoryId } from "@/data/courses";
import {
  computeRecommendedCategory,
  QUIZ_QUESTIONS,
  type QuizAnswers,
  wantsJobGuaranteeProgram,
} from "@/lib/quiz";

export interface QuizCourse {
  _id: string;
  category: string;
  duration: string | null;
  emoji: string | null;
  isJobGuaranteeProgram: boolean | null;
  originalPrice: number | null;
  price: number | null;
  slug: { current: string };
  subtitle: string | null;
  title: string;
}

interface QuizPageProps {
  courses: QuizCourse[];
}

const leadSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  name: z.string().min(2, "Enter at least 2 characters"),
});

type LeadFormValues = z.infer<typeof leadSchema>;

type Step = "questions" | "lead" | "results";

const STEPS: { id: Step; label: string }[] = [
  { id: "questions", label: "Questions" },
  { id: "lead", label: "Info" },
  { id: "results", label: "Results" },
];

function StepIndicator({ step }: { step: Step }) {
  const activeIndex = STEPS.findIndex((s) => s.id === step);

  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      {STEPS.map((s, i) => (
        <div className="flex items-center gap-2" key={s.id}>
          <div
            className={`flex items-center gap-2 rounded-full border-2 px-3 py-1.5 font-bold text-xs transition-colors ${
              i <= activeIndex
                ? "border-grey-15 bg-primary-75 text-grey-15"
                : "border-grey-15/15 bg-white text-grey-40"
            }`}
          >
            {i < activeIndex ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              <span>{i + 1}</span>
            )}
            {s.label}
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`h-0.5 w-6 ${i < activeIndex ? "bg-grey-15" : "bg-grey-15/15"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function QuizPage({ courses }: QuizPageProps) {
  const [step, setStep] = useState<Step>("questions");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormValues>({
    defaultValues: { email: "", mobile: "", name: "" },
    resolver: zodResolver(leadSchema),
  });

  const question = QUIZ_QUESTIONS[questionIndex];
  const progress = ((questionIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  const recommendedCategory: CourseCategoryId = useMemo(
    () => computeRecommendedCategory(answers),
    [answers]
  );
  const preferJgp = useMemo(() => wantsJobGuaranteeProgram(answers), [answers]);

  const recommendedCourses = useMemo(() => {
    const matches = courses.filter((c) => c.category === recommendedCategory);
    const sorted = [...matches].sort((a, b) => {
      if (preferJgp) {
        const aJgp = a.isJobGuaranteeProgram ? 1 : 0;
        const bJgp = b.isJobGuaranteeProgram ? 1 : 0;
        if (aJgp !== bJgp) {
          return bJgp - aJgp;
        }
      }
      return 0;
    });
    return sorted.slice(0, 3);
  }, [courses, recommendedCategory, preferJgp]);

  const categoryMeta = CATEGORIES.find((c) => c.id === recommendedCategory);

  const handleAnswer = (value: string) => {
    const nextAnswers = { ...answers, [question.id]: value };
    setAnswers(nextAnswers);

    if (questionIndex < QUIZ_QUESTIONS.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setStep("lead");
    }
  };

  const handleBack = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const onSubmitLead = async (data: LeadFormValues) => {
    setSubmitStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/quiz-lead", {
        body: JSON.stringify({
          email: data.email,
          mobile: `+91${data.mobile}`,
          name: data.name,
          recommendedCategory: categoryMeta?.label ?? recommendedCategory,
          wantsJobGuarantee: preferJgp,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Submission failed");
      }

      setSubmitStatus("idle");
      setStep("results");
    } catch (err) {
      setSubmitStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <main className="min-h-screen bg-light-97">
      <section className="container mx-auto max-w-2xl px-4 py-16 sm:py-20">
        <StepIndicator step={step} />

        {step === "questions" && (
          <div>
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-bold text-grey-15 text-sm">
                <Sparkles className="h-4 w-4" />
                Course Matcher
              </div>
              <h1 className="mb-3 font-black font-vietnam text-3xl text-grey-15 sm:text-4xl">
                Find Your Perfect Program
              </h1>
              <p className="text-grey-40">
                Answer a few quick questions and we&apos;ll match you with the
                right course.
              </p>
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-grey-40 text-xs">
                <span>
                  Question {questionIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="overflow-hidden rounded-full border-2 border-grey-15 bg-white">
                <Progress className="h-3 bg-white" value={progress} />
              </div>
            </div>

            <div className="rounded-3xl border-2 border-grey-15 bg-white p-6 shadow-[6px_6px_0_0_var(--color-grey-15)] sm:p-8">
              <h2 className="mb-6 font-bold font-vietnam text-grey-15 text-xl">
                {question.title}
              </h2>

              <RadioGroup
                key={question.id}
                onValueChange={handleAnswer}
                value={answers[question.id]}
              >
                <div className="space-y-3">
                  {question.options.map((option) => {
                    const selected = answers[question.id] === option.value;
                    return (
                      <label
                        className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition-colors ${
                          selected
                            ? "border-grey-15 bg-primary-90"
                            : "border-grey-15/15 hover:border-grey-15"
                        }`}
                        htmlFor={`${question.id}-${option.value}`}
                        key={option.value}
                      >
                        <RadioGroupItem
                          id={`${question.id}-${option.value}`}
                          value={option.value}
                        />
                        <span className="text-grey-35 text-sm">
                          {option.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </RadioGroup>

              {questionIndex > 0 && (
                <button
                  className="mt-6 flex items-center gap-1 font-bold text-grey-40 text-sm hover:text-primary-75"
                  onClick={handleBack}
                  type="button"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              )}
            </div>
          </div>
        )}

        {step === "lead" && (
          <div className="overflow-hidden rounded-3xl border-2 border-grey-15 bg-white shadow-[6px_6px_0_0_var(--color-grey-15)]">
            <div className="bg-grey-15 px-7 py-6 text-center">
              <Sparkles className="mx-auto mb-3 h-8 w-8 text-primary-90" />
              <h2 className="mb-1 font-bold font-vietnam text-2xl text-white">
                Almost there!
              </h2>
              <p className="text-grey-70 text-sm">
                Tell us where to send your personalized course recommendation.
              </p>
            </div>

            <form
              className="space-y-4 p-6 sm:p-8"
              noValidate
              onSubmit={handleSubmit(onSubmitLead)}
            >
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

              <div>
                <div className="relative flex">
                  <span className="inline-flex h-12 shrink-0 select-none items-center rounded-l-xl border-2 border-grey-15/20 border-r-0 bg-light-95 px-3 font-bold text-grey-35 text-sm">
                    +91
                  </span>
                  <div className="relative flex-1">
                    <Phone className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-grey-40" />
                    <input
                      {...register("mobile")}
                      className={`h-12 w-full rounded-r-xl border-2 bg-light-97 pr-4 pl-11 text-grey-15 text-sm transition-colors placeholder:text-grey-40 focus:outline-hidden ${
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
                  <p className="mt-1 flex items-center gap-1 text-red-500 text-xs">
                    <XCircle className="h-3 w-3" />
                    {errors.mobile.message}
                  </p>
                )}
              </div>

              {submitStatus === "error" && (
                <div className="flex items-center gap-2 rounded-lg border-2 border-red-400 bg-red-50 px-3 py-2 text-red-600 text-sm">
                  <XCircle className="h-4 w-4 shrink-0" />
                  {errorMsg}
                </div>
              )}

              <button
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 font-bold text-grey-15 text-sm transition-colors hover:bg-primary-90 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={submitStatus === "loading"}
                type="submit"
              >
                {submitStatus === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Getting your results...
                  </>
                ) : (
                  "Show My Recommendation"
                )}
              </button>

              <p className="flex items-center justify-center gap-1.5 text-center text-grey-40 text-xs">
                <Lock className="h-3 w-3" />
                Your information is 100% secure and will never be shared.
              </p>
            </form>
          </div>
        )}

        {step === "results" && (
          <div>
            <div className="mb-6 overflow-hidden rounded-3xl border-2 border-grey-15 bg-grey-15 p-8 text-center text-white shadow-[6px_6px_0_0_var(--color-grey-15)]">
              <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-primary-90" />
              <h1 className="mb-2 font-black font-vietnam text-3xl">
                We recommend{" "}
                <span className="text-primary-90">
                  {categoryMeta?.label ?? "your path"}
                </span>
              </h1>
              <p className="text-grey-70">
                Based on your answers, here&apos;s what fits you best.
              </p>
            </div>

            {recommendedCourses.length > 0 ? (
              <div className="space-y-4">
                {recommendedCourses.map((course) => (
                  <div
                    className="flex flex-col items-start justify-between gap-4 rounded-2xl border-2 border-grey-15 bg-white p-6 shadow-[4px_4px_0_0_var(--color-grey-15)] sm:flex-row sm:items-center"
                    key={course._id}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{course.emoji}</span>
                      <div>
                        <h3 className="font-bold font-vietnam text-grey-15">
                          {course.title}
                        </h3>
                        {course.subtitle && (
                          <p className="text-grey-40 text-sm">
                            {course.subtitle}
                          </p>
                        )}
                        {typeof course.price === "number" && (
                          <p className="mt-1 font-bold text-primary-75 text-sm">
                            ₹{course.price.toLocaleString("en-IN")}
                          </p>
                        )}
                      </div>
                    </div>
                    <Link
                      className="inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 px-5 py-2.5 font-bold text-grey-15 text-sm transition-colors hover:bg-primary-90"
                      href={`/courses/${course.slug.current}`}
                    >
                      View Program
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border-2 border-grey-15 bg-white p-8 text-center shadow-[4px_4px_0_0_var(--color-grey-15)]">
                <p className="text-grey-40">
                  We couldn&apos;t find a perfect match yet - explore all our
                  programs instead.
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                className="inline-flex items-center justify-center rounded-full border-2 border-grey-15 bg-white px-6 py-3 font-bold text-grey-15 text-sm transition-colors hover:bg-primary-90"
                href="/courses"
              >
                Browse All Courses
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border-2 border-grey-15 bg-white px-6 py-3 font-bold text-grey-15 text-sm transition-colors hover:bg-primary-90"
                href="/contact"
              >
                Talk to a Counselor
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
