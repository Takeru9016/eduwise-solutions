// TypeScript types matching the Sanity course schema

export interface CourseStat {
  icon: string;
  value: string;
  label: string;
}

export interface CourseFeature {
  icon: string;
  title: string;
  description: string;
}

export interface CourseHighlight {
  category: string;
  icon: string;
  color: string;
  points: string[];
}

export interface CourseSubModule {
  title: string;
  subtopics: string[];
  handsOn: string[];
}

export interface CourseModule {
  title: string;
  description: string;
  duration?: string;
  submodules: CourseSubModule[];
}

export interface PRTStep {
  title: string;
  description: string;
}

export interface ISAStep {
  title: string;
  description: string;
}

export interface CareerTrackItem {
  title: string;
  description: string;
  topics: string[];
}

export interface CareerPath {
  title: string;
  salary?: string;
  icon?: string;
}

export interface TargetAudience {
  title: string;
  icon?: string;
}

export interface CourseTool {
  name: string;
  logoUrl?: string;
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface BatchInfo {
  label: string;
  status: string;
  enrolledCount: string;
}

/**
 * Full course data as returned by Sanity (COURSE_BY_SLUG_QUERY).
 */
export interface CourseContent {
  _id: string;
  title: string;
  slug: { current: string };
  subtitle: string;
  description: string;
  category: string;
  heroImageUrl: string;
  accentColor: string;
  emoji: string;
  duration: string;
  featured: boolean;

  // Required sections
  stats: CourseStat[];
  features: CourseFeature[];
  highlights: CourseHighlight[];
  modules: CourseModule[];

  // Pricing (required)
  price: number;
  originalPrice: number;
  emiOption?: string;
  whatsIncluded: string[];

  // Curriculum journey (sections 2-5)
  isJobGuaranteeProgram?: boolean;
  prtSteps?: PRTStep[];
  isaSteps?: ISAStep[];
  careerTrack?: CareerTrackItem[];
  hiringPartners?: CourseTool[];
  careerServiceFee?: number;

  // Optional sections
  careerPaths?: CareerPath[];
  targetAudience?: TargetAudience[];
  tools?: CourseTool[];
  faq?: CourseFAQ[];
  batchInfo?: BatchInfo;
  industryGrowth?: string;

  // SEO
  seoTitle?: string;
  seoDescription?: string;
}

/**
 * Lightweight course listing as returned by COURSES_LIST_QUERY.
 */
export interface CourseListItem {
  _id: string;
  title: string;
  slug: { current: string };
  subtitle: string;
  category: string;
  heroImageUrl: string;
  emoji: string;
  duration: string;
  price: number;
  originalPrice: number;
  featured: boolean;
}
