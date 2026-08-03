import {
  Award,
  BookOpen,
  CalendarCheck,
  CheckCircle,
  Globe,
  Key,
  MousePointerClick,
  PhoneCall,
  ShoppingCart,
  Ticket,
  UserCheck,
} from "lucide-react";

// ─── Certification Data ────────────────────────────────────────────────────────

export type CertCategory =
  | "Foundational"
  | "Associate"
  | "Professional"
  | "Specialty";

export interface Certification {
  cat: CertCategory;
  code: string;
  desc: string;
  img: string;
  title: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    cat: "Foundational",
    code: "CLF-C02",
    desc: "Validates foundational knowledge of AWS Cloud concepts, security fundamentals, billing models, and pricing.",
    img: "https://www.trainotracksolutions.com/images/vouchers/5e15f684-926c-4aec-b477-ae5f81c9a358.webp",
    title: "AWS Certified Cloud Practitioner",
  },
  {
    cat: "Foundational",
    code: "AIF-C01",
    desc: "Demonstrates an understanding of Artificial Intelligence, Generative AI concepts, responsible AI practices, and AWS AI services.",
    img: "https://www.trainotracksolutions.com/images/vouchers/d6cfc0c0-3548-4193-87d1-c6200039f605.webp",
    title: "AWS Certified AI Practitioner",
  },
  {
    cat: "Associate",
    code: "MLA-C01",
    desc: "Demonstrates the ability to build, deploy, optimize, and manage machine learning solutions using AWS Machine Learning services.",
    img: "https://www.trainotracksolutions.com/images/vouchers/1f7b9c49-1caa-4410-91b8-30adad287347.webp",
    title: "AWS Certified Machine Learning Engineer – Associate",
  },
  {
    cat: "Associate",
    code: "SAA-C03",
    desc: "Validates the ability to design secure, scalable, highly available, and cost-efficient cloud architectures.",
    img: "https://www.trainotracksolutions.com/images/vouchers/b4fd2efa-7c04-4a0b-a7bc-d2fcdecc239c.webp",
    title: "AWS Certified Solutions Architect – Associate",
  },
  {
    cat: "Associate",
    code: "DVA-C02",
    desc: "Focuses on developing, deploying, debugging, and maintaining applications on AWS.",
    img: "https://www.trainotracksolutions.com/images/vouchers/5bbc5fa9-06c8-466b-81d1-b6fdd32ea81c.webp",
    title: "AWS Certified Developer – Associate",
  },
  {
    cat: "Associate",
    code: "SOA-C02",
    desc: "Demonstrates expertise in deploying, managing, monitoring, and operating workloads on AWS cloud environments.",
    img: "https://www.trainotracksolutions.com/images/vouchers/6a031247-a268-4d78-9436-ecf8af33a62c.webp",
    title: "AWS Certified SysOps Administrator – Associate",
  },
  {
    cat: "Associate",
    code: "DEA-C01",
    desc: "Validates skills related to data ingestion, transformation, storage, analytics, and data pipeline management.",
    img: "https://www.trainotracksolutions.com/images/vouchers/2c653101-6924-4a17-a33b-4b2fd910eb14.webp",
    title: "AWS Certified Data Engineer – Associate",
  },
  {
    cat: "Professional",
    code: "DOP-C02",
    desc: "Validates technical expertise in provisioning, operating, and managing distributed application systems on the AWS platform.",
    img: "https://www.trainotracksolutions.com/images/vouchers/d961b2f5-e42e-4ab2-82c1-cd6af14be300.webp",
    title: "AWS Certified DevOps Engineer – Professional",
  },
  {
    cat: "Professional",
    code: "SAP-C02",
    desc: "Validates advanced technical skills and experience in designing distributed applications and systems on the AWS platform.",
    img: "https://www.trainotracksolutions.com/images/vouchers/280b4f29-a927-4029-95b0-dc2687917137.webp",
    title: "AWS Certified Solutions Architect – Professional",
  },
  {
    cat: "Specialty",
    code: "MLS-C01",
    desc: "Validates expertise in building, training, tuning, and deploying machine learning (ML) models on AWS.",
    img: "https://www.trainotracksolutions.com/images/vouchers/5fbea390-2a74-417e-a4c0-48e752e8305e.webp",
    title: "AWS Certified Machine Learning – Specialty",
  },
  {
    cat: "Specialty",
    code: "ANS-C01",
    desc: "Validates expertise in designing and maintaining network architecture for the breadth of AWS services.",
    img: "https://www.trainotracksolutions.com/images/vouchers/61e1cad7-6f02-4efd-a19f-ff52a049f884.webp",
    title: "AWS Certified Advanced Networking – Specialty",
  },
  {
    cat: "Specialty",
    code: "SCS-C02",
    desc: "Validates expertise in securing data and workloads in the AWS Cloud.",
    img: "https://www.trainotracksolutions.com/images/vouchers/b7e84ae1-7579-41a6-ac41-32751a14a918.webp",
    title: "AWS Certified Security – Specialty",
  },
];

// Category color tokens (tailwind classes) for badge styling
export const CATEGORY_STYLES: Record<
  CertCategory,
  { bg: string; text: string; border: string }
> = {
  Associate: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
  },
  Foundational: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
  },
  Professional: {
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-700",
  },
  Specialty: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
  },
};

// ─── Career Table Data ─────────────────────────────────────────────────────────

export interface CareerRow {
  cert: string;
  indSalary: string;
  level: string;
  responsibilities: string;
  roles: string;
  usSalary: string;
}

export const CAREER_TABLE: CareerRow[] = [
  {
    cert: "Cloud Practitioner (CLF-C02)",
    indSalary: "₹4–8 LPA",
    level: "Beginner (0–2 yrs)",
    responsibilities:
      "Understanding cloud concepts, assisting with cloud operations, basic cloud administration",
    roles: "Cloud Support Associate, Cloud Analyst, Technical Support Engineer",
    usSalary: "$60K–$90K",
  },
  {
    cert: "AI Practitioner (AIF-C01)",
    indSalary: "₹5–10 LPA",
    level: "Beginner (0–2 yrs)",
    responsibilities:
      "Understanding AI concepts, Generative AI fundamentals, supporting AI-driven cloud initiatives",
    roles: "AI Associate, AI Support Specialist, AI Analyst",
    usSalary: "$70K–$100K",
  },
  {
    cert: "Solutions Architect (SAA-C03)",
    indSalary: "₹10–25 LPA",
    level: "Intermediate (2–5 yrs)",
    responsibilities:
      "Designing scalable architectures, implementing security best practices, optimizing cloud infrastructure",
    roles: "Cloud Architect, Solutions Architect, Cloud Consultant",
    usSalary: "$120K–$170K",
  },
  {
    cert: "Developer (DVA-C02)",
    indSalary: "₹8–20 LPA",
    level: "Intermediate (1–4 yrs)",
    responsibilities:
      "Developing, deploying, debugging, and maintaining AWS-based applications",
    roles: "Cloud Developer, Software Engineer, Application Developer",
    usSalary: "$100K–$150K",
  },
  {
    cert: "SysOps Admin (SOA-C02)",
    indSalary: "₹8–18 LPA",
    level: "Intermediate (2–5 yrs)",
    responsibilities:
      "Managing AWS environments, monitoring resources, troubleshooting infrastructure issues",
    roles: "Cloud Administrator, Systems Engineer, Operations Engineer",
    usSalary: "$90K–$140K",
  },
  {
    cert: "Data Engineer (DEA-C01)",
    indSalary: "₹10–25 LPA",
    level: "Intermediate (2–6 yrs)",
    responsibilities:
      "Building data pipelines, managing cloud data platforms, implementing analytics solutions",
    roles: "Data Engineer, Analytics Engineer, Data Platform Specialist",
    usSalary: "$110K–$160K",
  },
  {
    cert: "ML Engineer (MLA-C01)",
    indSalary: "₹12–35 LPA",
    level: "Intermediate–Advanced (2–6 yrs)",
    responsibilities:
      "Building, deploying, optimizing, and monitoring machine learning solutions",
    roles: "Machine Learning Engineer, AI Engineer, ML Specialist",
    usSalary: "$120K–$180K",
  },
];

// ─── Voucher Steps ─────────────────────────────────────────────────────────────

export const VOUCHER_STEPS = [
  {
    detail:
      "Begin by identifying the certification that aligns with your career goals and current skill level.",
    icon: ShoppingCart,
    label: "Choose Certification",
  },
  {
    detail:
      "Reach out to our team to learn about available AWS Certification Exam Voucher opportunities.",
    icon: PhoneCall,
    label: "Connect with Eduwise",
  },
  {
    detail:
      "Invest time in learning AWS concepts — Core Services, Security, Networking — and build practical experience.",
    icon: BookOpen,
    label: "Prepare for the Exam",
  },
  {
    detail:
      "Follow guidance from Eduwise Solutions regarding certification voucher opportunities and exam registration support.",
    icon: Ticket,
    label: "Receive Voucher Guidance",
  },
  {
    detail:
      "Proceed with scheduling your AWS Certification exam and apply the voucher during the registration process.",
    icon: CalendarCheck,
    label: "Schedule Your Exam",
  },
];

// ─── Schedule Steps ────────────────────────────────────────────────────────────

export const SCHEDULE_STEPS = [
  { icon: UserCheck, label: "Sign In to AWS Account" },
  { icon: MousePointerClick, label: "Select Certification Exam" },
  { icon: Globe, label: "Choose Testing Method" },
  { icon: CalendarCheck, label: "Select Date & Time" },
  { icon: Key, label: "Apply Voucher Code" },
  { icon: CheckCircle, label: "Confirm Registration" },
  { icon: Award, label: "Receive Confirmation" },
];

// ─── FAQ Data ──────────────────────────────────────────────────────────────────

export interface FaqItem {
  a: string;
  q: string;
}

export const FAQS: FaqItem[] = [
  {
    a: "An AWS Certification Exam Voucher is a certification benefit that can be used during the AWS Certification exam registration process. It helps learners move forward in their certification journey and earn industry-recognized AWS credentials.",
    q: "What is an AWS Certification Exam Voucher?",
  },
  {
    a: "AWS Certifications are suitable for Students, Fresh Graduates, Software Developers, DevOps Engineers, Cloud Engineers, System Administrators, Data Engineers, AI and Machine Learning Professionals, and Career Switchers.",
    q: "Who should pursue AWS Certifications?",
  },
  {
    a: "AWS Certified Cloud Practitioner (CLF-C02) is generally considered an excellent starting point for beginners who want to understand cloud computing fundamentals and AWS services.",
    q: "Which AWS Certification is best for beginners?",
  },
  {
    a: "Foundational certifications focus on cloud fundamentals and introductory AWS concepts, while Associate certifications validate practical implementation skills in cloud architecture, development, operations, data engineering, and machine learning.",
    q: "What is the difference between Foundational and Associate Certifications?",
  },
  {
    a: "AWS Certifications can strengthen professional profiles, validate cloud skills, and improve visibility among recruiters seeking cloud computing professionals.",
    q: "Do AWS Certifications help in getting cloud jobs?",
  },
  {
    a: "Preparation time varies depending on experience level, certification type, learning approach, and hands-on practice. Consistent study and practical experience are key factors in certification readiness.",
    q: "How long does it take to prepare for an AWS Certification?",
  },
  {
    a: "Yes. Depending on availability and exam policies, candidates may choose online proctored exams or authorized testing centers.",
    q: "Can I take AWS Certification exams online?",
  },
  {
    a: "Absolutely. AWS Certification exams are designed to evaluate practical understanding of cloud concepts and AWS services. Hands-on experience significantly improves exam preparation and real-world problem-solving skills.",
    q: "Is hands-on experience important for AWS Certification exams?",
  },
  {
    a: "Yes. AWS Certifications are respected and recognized worldwide by employers, recruiters, technology organizations, and cloud-focused teams.",
    q: "Are AWS Certifications recognized globally?",
  },
  {
    a: "AWS Certifications validate cloud expertise, strengthen professional credibility, support career advancement, and help professionals stay aligned with current industry demands.",
    q: "Why are AWS Certifications valuable for career growth?",
  },
  {
    a: "Eduwise Solutions provides industry-oriented training, hands-on learning opportunities, certification-focused guidance, expert mentorship, and practical cloud projects designed to help learners build real-world AWS skills.",
    q: "How can Eduwise Solutions help with AWS Certification preparation?",
  },
  {
    a: "AWS Certifications demonstrate your commitment to learning, validate your technical capabilities, and help position you for opportunities in Cloud Computing, DevOps, Data Engineering, Artificial Intelligence, and Cloud Architecture.",
    q: "Why should I consider earning an AWS Certification?",
  },
];
