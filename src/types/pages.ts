export interface SectionHeading {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
}

export interface PageSeo {
  description?: string;
  keywords?: string[];
  title?: string;
}

export interface IconLabel {
  icon?: string;
  label: string;
}

export interface FaqEntry {
  answer: string;
  question: string;
}

export interface HomePageContent {
  benefits?: {
    ctaLabel?: string;
    enabled?: boolean;
    heading?: string;
    items?: {
      description: string;
      icon?: string;
      imagePath?: string;
      tint?: string;
      title: string;
    }[];
    subheading?: string;
  };
  domains?: SectionHeading & { enabled?: boolean };
  faq?: SectionHeading & {
    enabled?: boolean;
    helpBody?: string;
    helpCta?: string;
    helpTitle?: string;
    items?: FaqEntry[];
  };
  hero?: {
    ctaLabel?: string;
    floatingCardBody?: string;
    floatingCardTitle?: string;
    headlineLines?: string[];
    learningPath?: { done?: boolean; label: string }[];
    skillTags?: { filled?: boolean; label: string }[];
    stickerLabel?: string;
    stickerValue?: string;
    stats?: { label: string; value: string }[];
    stripHeading?: string;
    subtext?: string;
    toolIcons?: IconLabel[];
  };
  howItWorks?: {
    enabled?: boolean;
    heading?: string;
    steps?: { description: string; icon?: string; title: string }[];
    subheading?: string;
  };
  press?: SectionHeading & { enabled?: boolean };
  programs?: { enabled?: boolean; heading?: string };
  seo?: PageSeo;
  testimonials?: SectionHeading & { enabled?: boolean };
}

export type CertLevel =
  | "Foundational"
  | "Associate"
  | "Professional"
  | "Specialty";

export interface SyllabusDomain {
  keyTopics: string;
  name: string;
  percent: number;
}

export interface SampleQuestion {
  answer: string;
  domain: string;
  explanation: string;
  multiSelect?: boolean;
  options: string[];
  question: string;
}

export interface AwsCertification {
  _id: string;
  badgeImagePath?: string;
  badgeImageUrl?: string;
  code: string;
  description: string;
  domains?: SyllabusDomain[];
  examFee?: string;
  level: CertLevel;
  order?: number;
  resources?: string[];
  sampleQA?: SampleQuestion[];
  studyTips?: string[];
  studyWeeks?: string;
  title: string;
}

export interface AwsPageContent {
  career?: SectionHeading & {
    enabled?: boolean;
    note?: string;
    rows?: {
      cert: string;
      indSalary: string;
      level: string;
      responsibilities: string;
      roles: string;
      usSalary: string;
    }[];
  };
  certGrid?: SectionHeading & { enabled?: boolean };
  conclusion?: {
    body?: string;
    enabled?: boolean;
    eyebrow?: string;
    headline?: string;
    highlight?: string;
    primaryCta?: string;
    secondaryCta?: string;
  };
  faq?: SectionHeading & {
    enabled?: boolean;
    items?: FaqEntry[];
  };
  hero?: {
    badgeText?: string;
    body?: string;
    ctaLabel?: string;
    headline?: string;
    highlight?: string;
    trustSignals?: string[];
  };
  schedule?: SectionHeading & {
    enabled?: boolean;
    steps?: IconLabel[];
  };
  seo?: PageSeo;
  stats?: { icon?: string; label: string; value: string }[];
  syllabus?: SectionHeading & { enabled?: boolean };
  tracks?: SectionHeading & {
    cards?: {
      intro?: string;
      items?: string[];
      letter?: string;
      listLabel?: string;
      tint?: string;
      title?: string;
    }[];
    enabled?: boolean;
  };
  voucher?: SectionHeading & {
    enabled?: boolean;
    pricingBody?: string;
    pricingBadge?: string;
    pricingCta?: string;
    pricingTitle?: string;
    steps?: { detail: string; icon?: string; label: string }[];
  };
}

export interface CertSyllabus {
  code: string;
  domains: SyllabusDomain[];
  level: string;
  resources: string[];
  sampleQA: SampleQuestion[];
  studyTips: string[];
  studyWeeks: string;
  title: string;
}
