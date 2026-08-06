import type { CourseCategoryId } from "@/data/courses";

export interface QuizOption {
  label: string;
  scores: Partial<Record<CourseCategoryId, number>>;
  value: string;
}

export interface QuizQuestion {
  id: string;
  options: QuizOption[];
  title: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "interest",
    options: [
      {
        label: "Building apps, websites, and software products",
        scores: { development: 2 },
        value: "development",
      },
      {
        label: "Making sense of data, patterns, and AI",
        scores: { "ai-data": 2 },
        value: "ai-data",
      },
      {
        label: "Keeping systems running, automated, and secure",
        scores: { "cloud-devops-security": 2 },
        value: "cloud-devops-security",
      },
      {
        label: "Designing products, systems, and user experience",
        scores: { engineering: 2 },
        value: "engineering",
      },
      {
        label: "Solving business problems with strategy and numbers",
        scores: { business: 2 },
        value: "business",
      },
      {
        label: "Not sure yet — I just want a solid, job-ready skill",
        scores: { career: 2 },
        value: "career",
      },
    ],
    title: "What excites you most about tech?",
  },
  {
    id: "style",
    options: [
      {
        label: "I like writing code and building things end-to-end",
        scores: { development: 1 },
        value: "development",
      },
      {
        label: "I like numbers, predictions, and finding patterns",
        scores: { "ai-data": 1 },
        value: "ai-data",
      },
      {
        label: "I like infrastructure, automation, and problem-solving",
        scores: { "cloud-devops-security": 1 },
        value: "cloud-devops-security",
      },
      {
        label: "I like sketching, planning, and how things are built",
        scores: { engineering: 1 },
        value: "engineering",
      },
      {
        label: "I like strategy, finance, and working with people",
        scores: { business: 1 },
        value: "business",
      },
      {
        label: "I want practical, fast, job-ready skills above all",
        scores: { career: 1 },
        value: "career",
      },
    ],
    title: "Which of these sounds most like you?",
  },
  {
    id: "experience",
    options: [
      { label: "Student or complete beginner", scores: {}, value: "beginner" },
      {
        label: "Some experience, want to specialize",
        scores: {},
        value: "some-experience",
      },
      {
        label: "Experienced, switching careers entirely",
        scores: {},
        value: "career-switch",
      },
      {
        label: "Working professional, upskilling in my field",
        scores: {},
        value: "upskilling",
      },
    ],
    title: "What's your current experience level?",
  },
  {
    id: "timeline",
    options: [
      {
        label: "ASAP — I need a job as soon as possible",
        scores: { career: 1 },
        value: "urgent",
      },
      { label: "Within the next 3–6 months", scores: {}, value: "soon" },
      {
        label: "Just exploring my options for now",
        scores: {},
        value: "exploring",
      },
    ],
    title: "How soon do you want to start working?",
  },
];

export type QuizAnswers = Record<string, string>;

export function computeRecommendedCategory(
  answers: QuizAnswers
): CourseCategoryId {
  const totals: Partial<Record<CourseCategoryId, number>> = {};

  for (const question of QUIZ_QUESTIONS) {
    const answerValue = answers[question.id];
    const option = question.options.find((o) => o.value === answerValue);
    if (!option) {
      continue;
    }
    for (const [category, score] of Object.entries(option.scores)) {
      const key = category as CourseCategoryId;
      totals[key] = (totals[key] ?? 0) + (score ?? 0);
    }
  }

  let bestCategory: CourseCategoryId = "career";
  let bestScore = -1;
  for (const [category, score] of Object.entries(totals)) {
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category as CourseCategoryId;
    }
  }

  return bestCategory;
}

export function wantsJobGuaranteeProgram(answers: QuizAnswers): boolean {
  const isNewToField =
    answers.experience === "beginner" || answers.experience === "career-switch";
  const isUrgent = answers.timeline === "urgent";
  return isNewToField && isUrgent;
}
