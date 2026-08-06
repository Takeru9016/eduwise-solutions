"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    <main className="min-h-screen bg-linear-to-b from-primary-99 to-white">
      <section className="container mx-auto max-w-2xl px-4 py-16 sm:py-20">
        {step === "questions" && (
          <div>
            <div className="mb-8 text-center">
              <Badge className="mb-4" variant="secondary">
                <Sparkles className="mr-1 h-3 w-3" />
                Course Matcher
              </Badge>
              <h1 className="mb-3 font-bold font-vietnam text-3xl text-grey-15 sm:text-4xl">
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
              <Progress value={progress} />
            </div>

            <div className="rounded-2xl border border-light-90 bg-white p-6 shadow-lg sm:p-8">
              <h2 className="mb-6 font-bold font-vietnam text-grey-15 text-xl">
                {question.title}
              </h2>

              <RadioGroup
                key={question.id}
                onValueChange={handleAnswer}
                value={answers[question.id]}
              >
                <div className="space-y-3">
                  {question.options.map((option) => (
                    <label
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-grey-80 p-4 transition-all hover:border-primary-75 hover:bg-primary-99"
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
                  ))}
                </div>
              </RadioGroup>

              {questionIndex > 0 && (
                <button
                  className="mt-6 flex items-center gap-1 font-semibold text-grey-40 text-sm hover:text-primary-75"
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
          <div className="rounded-2xl border border-light-90 bg-white p-6 shadow-lg sm:p-8">
            <div className="mb-6 text-center">
              <Sparkles className="mx-auto mb-3 h-8 w-8 text-primary-75" />
              <h2 className="mb-2 font-bold font-vietnam text-2xl text-grey-15">
                Almost there!
              </h2>
              <p className="text-grey-40 text-sm">
                Tell us where to send your personalized course recommendation.
              </p>
            </div>

            <form
              className="space-y-4"
              noValidate
              onSubmit={handleSubmit(onSubmitLead)}
            >
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

              {submitStatus === "error" && (
                <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-600 text-sm">
                  <XCircle className="h-4 w-4 shrink-0" />
                  {errorMsg}
                </div>
              )}

              <Button
                className="w-full"
                disabled={submitStatus === "loading"}
                size="lg"
                type="submit"
              >
                {submitStatus === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting your results...
                  </>
                ) : (
                  "Show My Recommendation"
                )}
              </Button>

              <p className="text-center text-[10px] text-grey-50">
                🔒 Your information is 100% secure and will never be shared.
              </p>
            </form>
          </div>
        )}

        {step === "results" && (
          <div>
            <div className="mb-8 text-center">
              <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-emerald-500" />
              <h1 className="mb-2 font-bold font-vietnam text-3xl text-grey-15">
                We recommend{" "}
                <span className="text-primary-75">
                  {categoryMeta?.label ?? "your path"}
                </span>
              </h1>
              <p className="text-grey-40">
                Based on your answers, here's what fits you best.
              </p>
            </div>

            {recommendedCourses.length > 0 ? (
              <div className="space-y-4">
                {recommendedCourses.map((course) => (
                  <div
                    className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-light-90 bg-white p-6 shadow-lg sm:flex-row sm:items-center"
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
                          <p className="mt-1 font-semibold text-primary-75 text-sm">
                            ₹{course.price.toLocaleString("en-IN")}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button asChild>
                      <Link href={`/courses/${course.slug.current}`}>
                        View Program
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-light-90 bg-white p-8 text-center shadow-lg">
                <p className="text-grey-40">
                  We couldn't find a perfect match yet — explore all our
                  programs instead.
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild variant="outline">
                <Link href="/courses">Browse All Courses</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Talk to a Counselor</Link>
              </Button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
