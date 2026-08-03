// TypeScript types matching the Sanity course schema

export interface CourseStat {
  icon: string;
  label: string;
  value: string;
}

export interface CourseFeature {
  description: string;
  icon: string;
  title: string;
}

export interface CourseHighlight {
  category: string;
  color: string;
  icon: string;
  points: string[];
}

export interface CourseSubModule {
  handsOn: string[];
  subtopics: string[];
  title: string;
}

export interface CourseModule {
  description: string;
  duration?: string;
  submodules: CourseSubModule[];
  title: string;
}

export interface PRTStep {
  description: string;
  title: string;
}

export interface ISAStep {
  description: string;
  title: string;
}

export interface CareerTrackItem {
  description: string;
  title: string;
  topics: string[];
}

export interface CareerPath {
  icon?: string;
  salary?: string;
  title: string;
}

export interface TargetAudience {
  icon?: string;
  title: string;
}

export interface CourseTool {
  logoUrl?: string;
  name: string;
}

export interface CourseFAQ {
  answer: string;
  question: string;
}

export interface BatchInfo {
  enrolledCount: string;
  label: string;
  status: string;
}

/**
 * Full course data as returned by Sanity (COURSE_BY_SLUG_QUERY).
 */
export interface CourseContent {
  _id: string;
  accentColor: string;
  batchInfo?: BatchInfo;

  // Optional sections
  careerPaths?: CareerPath[];
  careerServiceFee?: number;
  careerTrack?: CareerTrackItem[];
  category: string;
  description: string;
  duration: string;
  emiOption?: string;
  emoji: string;
  faq?: CourseFAQ[];
  featured: boolean;
  features: CourseFeature[];
  heroImageUrl: string;
  highlights: CourseHighlight[];
  hiringPartners?: CourseTool[];
  industryGrowth?: string;
  isaSteps?: ISAStep[];

  // Curriculum journey (sections 2-5)
  isJobGuaranteeProgram?: boolean;
  modules: CourseModule[];
  originalPrice: number;

  // Pricing (required)
  price: number;
  prtSteps?: PRTStep[];
  seoDescription?: string;

  // SEO
  seoTitle?: string;
  slug: { current: string };

  // Required sections
  stats: CourseStat[];
  subtitle: string;
  targetAudience?: TargetAudience[];
  title: string;
  tools?: CourseTool[];
  whatsIncluded: string[];
}

/**
 * Lightweight course listing as returned by COURSES_LIST_QUERY.
 */
export interface CourseListItem {
  _id: string;
  category: string;
  duration: string;
  emoji: string;
  featured: boolean;
  heroImageUrl: string;
  originalPrice: number;
  price: number;
  slug: { current: string };
  subtitle: string;
  title: string;
}
