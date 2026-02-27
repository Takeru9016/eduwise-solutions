import type { LucideIcon } from "lucide-react";
import {
  Code,
  BrainCircuit,
  Cloud,
  Cog,
  Briefcase,
  Target,
  Clock,
  CheckCircle,
  Users,
  Building,
  Award,
  Infinity,
  BookCheck,
} from "lucide-react";

// Types

export type CourseCategoryId =
  | "development"
  | "ai-data"
  | "cloud-devops-security"
  | "engineering"
  | "business"
  | "career";

export interface CourseStat {
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  slug: string;
  category: CourseCategoryId;
  emoji: string;
  accentColor: string;
  image: string;
  icon: LucideIcon;
  stats: CourseStat[];
  featured: boolean;
}

export interface CategoryMeta {
  id: CourseCategoryId;
  label: string;
  icon: LucideIcon;
  emoji: string;
}

// Categories

export const CATEGORIES: CategoryMeta[] = [
  { id: "development", label: "Development", icon: Code, emoji: "💻" },
  { id: "ai-data", label: "AI & Data", icon: BrainCircuit, emoji: "🤖" },
  {
    id: "cloud-devops-security",
    label: "Cloud, DevOps & Security",
    icon: Cloud,
    emoji: "☁️",
  },
  {
    id: "engineering",
    label: "Engineering & Design",
    icon: Cog,
    emoji: "⚙️",
  },
  {
    id: "business",
    label: "Business & Finance",
    icon: Briefcase,
    emoji: "🏢",
  },
  { id: "career", label: "Career", icon: Target, emoji: "🎯" },
];

// Shared stats helper

const defaultStats = (duration: string): CourseStat[] => [
  { label: "Duration", value: duration, icon: Clock },
  { label: "Live Session", value: "100%", icon: CheckCircle },
  { label: "Doubt Clearing", value: "1:1", icon: Users },
  { label: "Companies", value: "250+", icon: Building },
  { label: "Placement", value: "100%", icon: Award },
];

// All Courses

export const COURSES: Course[] = [
  // Development
  {
    id: "web-dev",
    title: "Web Development",
    subtitle: "Build modern web experiences",
    description:
      "Learn HTML, CSS, JavaScript, and modern frameworks to create stunning, responsive websites and web applications.",
    slug: "/courses/web-development",
    category: "development",
    emoji: "🌐",
    accentColor: "from-sky-500 to-blue-600",
    image: "/courses/web-development.png",
    icon: BookCheck,
    stats: defaultStats("3 Months"),
    featured: false,
  },
  {
    id: "full-stack",
    title: "Full Stack Development",
    subtitle: "Build dynamic web apps",
    description:
      "Master front-end and back-end development using React, Node.js, databases, and modern deployment workflows.",
    slug: "/courses/full-stack",
    category: "development",
    emoji: "🧩",
    accentColor: "from-orange-500 to-amber-500",
    image: "/courses/full-stack.png",
    icon: BookCheck,
    stats: defaultStats("3 Months"),
    featured: true,
  },
  {
    id: "java",
    title: "Java Programming",
    subtitle: "Master enterprise development",
    description:
      "Learn Core Java, OOPs, Collections, and Exception Handling to build robust enterprise applications.",
    slug: "/courses/java",
    category: "development",
    emoji: "☕",
    accentColor: "from-red-500 to-orange-500",
    image: "/courses/java.png",
    icon: BookCheck,
    stats: defaultStats("2 Months"),
    featured: false,
  },
  {
    id: "python",
    title: "Python Programming",
    subtitle: "Code smarter, build faster",
    description:
      "Learn Python from fundamentals to advanced topics including data structures, file handling, and NumPy for data analysis.",
    slug: "/courses/python",
    category: "development",
    emoji: "🐍",
    accentColor: "from-yellow-500 to-green-500",
    image: "/courses/python.png",
    icon: BookCheck,
    stats: defaultStats("2 Months"),
    featured: false,
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    subtitle: "Design delightful experiences",
    description:
      "Master user interface and experience design principles, prototyping, wireframing, and industry-standard design tools.",
    slug: "/courses/ui-ux",
    category: "development",
    emoji: "🎨",
    accentColor: "from-pink-500 to-violet-500",
    image: "/courses/ui-ux.png",
    icon: BookCheck,
    stats: defaultStats("2 Months"),
    featured: false,
  },

  // AI & Data
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    subtitle: "Master the future of tech",
    description:
      "Dive into AI and machine learning with hands-on projects — from neural networks to deep learning and real-world applications.",
    slug: "/courses/ai-ml",
    category: "ai-data",
    emoji: "🤖",
    accentColor: "from-violet-500 to-purple-600",
    image: "/courses/artificial-intelligence.png",
    icon: BookCheck,
    stats: defaultStats("3 Months"),
    featured: true,
  },
  {
    id: "data-science",
    title: "Data Science",
    subtitle: "Turn data into insights",
    description:
      "Explore data analysis, visualization, and predictive modeling using Python, Pandas, NumPy, and industry-standard tools.",
    slug: "/courses/data-science",
    category: "ai-data",
    emoji: "📊",
    accentColor: "from-emerald-500 to-teal-600",
    image: "/courses/data-science.png",
    icon: BookCheck,
    stats: defaultStats("3 Months"),
    featured: true,
  },
  {
    id: "ml-python",
    title: "ML with Python",
    subtitle: "Hands-on machine learning",
    description:
      "Focused, practical machine learning course using Python — covering ML algorithms, model building, and deployment.",
    slug: "/courses/ml-python",
    category: "ai-data",
    emoji: "🧠",
    accentColor: "from-indigo-500 to-blue-600",
    image: "/courses/ml-python.png",
    icon: BookCheck,
    stats: defaultStats("2.5 Months"),
    featured: false,
  },

  // Cloud, DevOps & Security
  {
    id: "devops",
    title: "DevOps with Cloud & AI",
    subtitle: "Automate, ship, and scale",
    description:
      "Learn DevOps with Jenkins, Docker, Kubernetes, Terraform, Ansible, AWS, Prometheus & Grafana.",
    slug: "/courses/devops",
    category: "cloud-devops-security",
    emoji: "🚀",
    accentColor: "from-blue-500 to-cyan-500",
    image: "/courses/devops.png",
    icon: BookCheck,
    stats: defaultStats("3.5 Months"),
    featured: true,
  },
  {
    id: "azure-cloud",
    title: "Azure Cloud Computing",
    subtitle: "Scale with the cloud",
    description:
      "Master cloud fundamentals, Azure services, networking, compute, and storage to build scalable cloud solutions.",
    slug: "/courses/azure-cloud",
    category: "cloud-devops-security",
    emoji: "☁️",
    accentColor: "from-blue-600 to-indigo-600",
    image: "/courses/azure-cloud.png",
    icon: BookCheck,
    stats: defaultStats("2.5 Months"),
    featured: false,
  },
  {
    id: "iot",
    title: "Internet of Things (IoT)",
    subtitle: "Connect the physical world",
    description:
      "Learn IoT architecture, Arduino, NodeMCU, sensors, communication protocols, and Node-RED for real-world projects.",
    slug: "/courses/iot",
    category: "cloud-devops-security",
    emoji: "📡",
    accentColor: "from-teal-500 to-emerald-500",
    image: "/courses/iot.png",
    icon: BookCheck,
    stats: defaultStats("2 Months"),
    featured: false,
  },
  {
    id: "cyber-sec",
    title: "Cyber Security",
    subtitle: "Defend against digital threats",
    description:
      "Learn ethical hacking, network defense, Linux/Windows security, and web application security to become a cybersecurity expert.",
    slug: "/courses/cyber-sec",
    category: "cloud-devops-security",
    emoji: "🛡️",
    accentColor: "from-red-500 to-rose-600",
    image: "/courses/cyber-security.png",
    icon: BookCheck,
    stats: defaultStats("3 Months"),
    featured: true,
  },

  // Engineering & Design
  {
    id: "autocad",
    title: "AutoCAD",
    subtitle: "Design with precision",
    description:
      "Master 2D and 3D design using AutoCAD — from drafting fundamentals to professional-grade engineering drawings.",
    slug: "/courses/autocad",
    category: "engineering",
    emoji: "📐",
    accentColor: "from-amber-500 to-orange-600",
    image: "/courses/autocad.png",
    icon: BookCheck,
    stats: defaultStats("2 Months"),
    featured: false,
  },
  {
    id: "embedded-systems",
    title: "Embedded Systems",
    subtitle: "Program the hardware",
    description:
      "Learn microcontrollers (8051/ARM), Embedded C, RTOS fundamentals, and IoT integration for embedded applications.",
    slug: "/courses/embedded-systems",
    category: "engineering",
    emoji: "🔌",
    accentColor: "from-slate-500 to-zinc-600",
    image: "/courses/embedded-systems.png",
    icon: BookCheck,
    stats: defaultStats("2.5 Months"),
    featured: false,
  },
  {
    id: "hev",
    title: "Hybrid & Electric Vehicles",
    subtitle: "Drive the green revolution",
    description:
      "Understand EV batteries, vehicle modelling, battery management systems, motors, and the future of sustainable mobility.",
    slug: "/courses/hev",
    category: "engineering",
    emoji: "🔋",
    accentColor: "from-green-500 to-lime-500",
    image: "/courses/hev.png",
    icon: BookCheck,
    stats: defaultStats("2 Months"),
    featured: false,
  },
  {
    id: "nanotechnology",
    title: "Nanotechnology",
    subtitle: "Explore the nanoscale world",
    description:
      "Dive into nanomaterials, fabrication techniques, characterization methods, and cutting-edge nanotechnology applications.",
    slug: "/courses/nanotechnology",
    category: "engineering",
    emoji: "🔬",
    accentColor: "from-cyan-500 to-blue-500",
    image: "/courses/nanotechnology.png",
    icon: BookCheck,
    stats: defaultStats("2 Months"),
    featured: false,
  },

  // Business & Finance
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    subtitle: "Grow brands online",
    description:
      "Master SEO, social media marketing, content marketing, analytics, and paid advertising to drive digital growth.",
    slug: "/courses/digital-marketing",
    category: "business",
    emoji: "📱",
    accentColor: "from-fuchsia-500 to-pink-500",
    image: "/courses/digital-marketing.png",
    icon: BookCheck,
    stats: defaultStats("2 Months"),
    featured: false,
  },
  {
    id: "finance",
    title: "Financial Management",
    subtitle: "Master the money game",
    description:
      "Learn financial statements, ratio analysis, cash flow management, valuation techniques, and strategic financial planning.",
    slug: "/courses/finance",
    category: "business",
    emoji: "💰",
    accentColor: "from-emerald-500 to-green-600",
    image: "/courses/finance.png",
    icon: BookCheck,
    stats: defaultStats("2 Months"),
    featured: false,
  },
  {
    id: "hr",
    title: "Human Resources",
    subtitle: "Lead people, lead growth",
    description:
      "Cover strategic HRM, job evaluation, recruitment, selection processes, and organizational development.",
    slug: "/courses/hr",
    category: "business",
    emoji: "👥",
    accentColor: "from-blue-500 to-violet-500",
    image: "/courses/hr.png",
    icon: BookCheck,
    stats: defaultStats("2 Months"),
    featured: false,
  },
  {
    id: "stock-market",
    title: "Stock Market",
    subtitle: "Invest with confidence",
    description:
      "Learn stock analysis, trading strategies, technical and fundamental analysis, portfolio management, and risk assessment.",
    slug: "/courses/stock-market",
    category: "business",
    emoji: "📈",
    accentColor: "from-green-500 to-emerald-500",
    image: "/courses/stock-market.png",
    icon: BookCheck,
    stats: defaultStats("1.5 Months"),
    featured: false,
  },
  {
    id: "psychology",
    title: "Psychology",
    subtitle: "Understand the human mind",
    description:
      "Explore cognitive psychology, behavioral science, mental health fundamentals, and applied psychological research methods.",
    slug: "/courses/psychology",
    category: "business",
    emoji: "🧠",
    accentColor: "from-purple-500 to-indigo-500",
    image: "/courses/psychology.png",
    icon: BookCheck,
    stats: defaultStats("2 Months"),
    featured: false,
  },

  // Career
  {
    id: "placement-accelerator",
    title: "Placement Accelerator",
    subtitle: "100% Job Guarantee",
    description:
      "Get a 100% job guarantee with our comprehensive programme! Learn resume building, LinkedIn optimization, business communication, and more.",
    slug: "/courses/professional",
    category: "career",
    emoji: "🎯",
    accentColor: "from-pink-500 to-fuchsia-600",
    image: "/courses/professional.png",
    icon: BookCheck,
    stats: [
      { label: "Duration", value: "15 Days", icon: Clock },
      { label: "Live Session", value: "100%", icon: CheckCircle },
      { label: "Doubt Clearing", value: "1:1", icon: Users },
      { label: "Access", value: "Lifetime", icon: Infinity },
      { label: "Companies", value: "250+", icon: Building },
      { label: "Placement", value: "100%", icon: Award },
    ],
    featured: true,
  },
];

// Helpers

export function getCoursesByCategory(categoryId: CourseCategoryId): Course[] {
  return COURSES.filter((c) => c.category === categoryId);
}

export function getFeaturedCourses(): Course[] {
  return COURSES.filter((c) => c.featured);
}

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function getCategoriesWithCourses(): (CategoryMeta & {
  courses: Course[];
})[] {
  return CATEGORIES.map((cat) => ({
    ...cat,
    courses: getCoursesByCategory(cat.id),
  }));
}

/** Filter tabs for the courses page */
export const COURSE_FILTER_TABS = [
  { label: "All Programs", value: "all" },
  ...CATEGORIES.map((cat) => ({ label: cat.label, value: cat.id })),
];
