import type { LucideIcon } from "lucide-react";
import {
  Award,
  BookCheck,
  BrainCircuit,
  Briefcase,
  Building,
  CheckCircle,
  Clock,
  Cloud,
  Code,
  Cog,
  Infinity,
  Target,
  Users,
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
  icon: LucideIcon;
  label: string;
  value: string;
}

export interface Course {
  accentColor: string;
  category: CourseCategoryId;
  description: string;
  emoji: string;
  featured: boolean;
  icon: LucideIcon;
  id: string;
  image: string;
  slug: string;
  stats: CourseStat[];
  subtitle: string;
  title: string;
}

export interface CategoryMeta {
  emoji: string;
  icon: LucideIcon;
  id: CourseCategoryId;
  label: string;
}

// Categories

export const CATEGORIES: CategoryMeta[] = [
  { emoji: "💻", icon: Code, id: "development", label: "Development" },
  { emoji: "🤖", icon: BrainCircuit, id: "ai-data", label: "AI & Data" },
  {
    emoji: "☁️",
    icon: Cloud,
    id: "cloud-devops-security",
    label: "Cloud, DevOps & Security",
  },
  {
    emoji: "⚙️",
    icon: Cog,
    id: "engineering",
    label: "Engineering & Design",
  },
  {
    emoji: "🏢",
    icon: Briefcase,
    id: "business",
    label: "Business & Finance",
  },
  { emoji: "🎯", icon: Target, id: "career", label: "Career" },
];

// Shared stats helper

const defaultStats = (duration: string): CourseStat[] => [
  { icon: Clock, label: "Duration", value: duration },
  { icon: CheckCircle, label: "Live Session", value: "100%" },
  { icon: Users, label: "Doubt Clearing", value: "1:1" },
  { icon: Building, label: "Companies", value: "250+" },
  { icon: Award, label: "Placement", value: "100%" },
];

// All Courses

export const COURSES: Course[] = [
  // Development
  {
    accentColor: "from-sky-500 to-blue-600",
    category: "development",
    description:
      "Learn HTML, CSS, JavaScript, and modern frameworks to create stunning, responsive websites and web applications.",
    emoji: "🌐",
    featured: false,
    icon: BookCheck,
    id: "web-dev",
    image: "/courses/web-development.png",
    slug: "/courses/web-development",
    stats: defaultStats("3 Months"),
    subtitle: "Build modern web experiences",
    title: "Web Development",
  },
  {
    accentColor: "from-orange-500 to-amber-500",
    category: "development",
    description:
      "Master front-end and back-end development using React, Node.js, databases, and modern deployment workflows.",
    emoji: "🧩",
    featured: true,
    icon: BookCheck,
    id: "full-stack",
    image: "/courses/full-stack.png",
    slug: "/courses/full-stack-development",
    stats: defaultStats("3 Months"),
    subtitle: "Build dynamic web apps",
    title: "Full Stack Development",
  },
  {
    accentColor: "from-red-500 to-orange-500",
    category: "development",
    description:
      "Learn Core Java, OOPs, Collections, and Exception Handling to build robust enterprise applications.",
    emoji: "☕",
    featured: false,
    icon: BookCheck,
    id: "java",
    image: "/courses/java.png",
    slug: "/courses/java",
    stats: defaultStats("2 Months"),
    subtitle: "Master enterprise development",
    title: "Java Programming",
  },
  {
    accentColor: "from-yellow-500 to-green-500",
    category: "development",
    description:
      "Learn Python from fundamentals to advanced topics including data structures, file handling, and NumPy for data analysis.",
    emoji: "🐍",
    featured: false,
    icon: BookCheck,
    id: "python",
    image: "/courses/python.png",
    slug: "/courses/python",
    stats: defaultStats("2 Months"),
    subtitle: "Code smarter, build faster",
    title: "Python Programming",
  },
  {
    accentColor: "from-pink-500 to-violet-500",
    category: "development",
    description:
      "Master user interface and experience design principles, prototyping, wireframing, and industry-standard design tools.",
    emoji: "🎨",
    featured: false,
    icon: BookCheck,
    id: "ui-ux",
    image: "/courses/ui-ux.png",
    slug: "/courses/ui-ux",
    stats: defaultStats("2 Months"),
    subtitle: "Design delightful experiences",
    title: "UI/UX Design",
  },

  // AI & Data
  {
    accentColor: "from-violet-500 to-purple-600",
    category: "ai-data",
    description:
      "Dive into AI and machine learning with hands-on projects — from neural networks to deep learning and real-world applications.",
    emoji: "🤖",
    featured: true,
    icon: BookCheck,
    id: "ai-ml",
    image: "/courses/artificial-intelligence.png",
    slug: "/courses/ai-ml",
    stats: defaultStats("3 Months"),
    subtitle: "Master the future of tech",
    title: "AI & Machine Learning",
  },
  {
    accentColor: "from-emerald-500 to-teal-600",
    category: "ai-data",
    description:
      "Explore data analysis, visualization, and predictive modeling using Python, Pandas, NumPy, and industry-standard tools.",
    emoji: "📊",
    featured: true,
    icon: BookCheck,
    id: "data-science",
    image: "/courses/data-science.png",
    slug: "/courses/data-science",
    stats: defaultStats("3 Months"),
    subtitle: "Turn data into insights",
    title: "Data Science",
  },
  {
    accentColor: "from-indigo-500 to-blue-600",
    category: "ai-data",
    description:
      "Focused, practical machine learning course using Python — covering ML algorithms, model building, and deployment.",
    emoji: "🧠",
    featured: false,
    icon: BookCheck,
    id: "ml-python",
    image: "/courses/ml-python.png",
    slug: "/courses/ml-python",
    stats: defaultStats("2.5 Months"),
    subtitle: "Hands-on machine learning",
    title: "ML with Python",
  },

  // Cloud, DevOps & Security
  {
    accentColor: "from-blue-500 to-cyan-500",
    category: "cloud-devops-security",
    description:
      "Learn DevOps with Jenkins, Docker, Kubernetes, Terraform, Ansible, AWS, Prometheus & Grafana.",
    emoji: "🚀",
    featured: true,
    icon: BookCheck,
    id: "devops",
    image: "/courses/devops.png",
    slug: "/courses/devops",
    stats: defaultStats("3.5 Months"),
    subtitle: "Automate, ship, and scale",
    title: "DevOps with Cloud & AI",
  },
  {
    accentColor: "from-blue-600 to-indigo-600",
    category: "cloud-devops-security",
    description:
      "Master cloud fundamentals, Azure services, networking, compute, and storage to build scalable cloud solutions.",
    emoji: "☁️",
    featured: false,
    icon: BookCheck,
    id: "azure-cloud",
    image: "/courses/azure-cloud.png",
    slug: "/courses/azure-cloud",
    stats: defaultStats("2.5 Months"),
    subtitle: "Scale with the cloud",
    title: "Azure Cloud Computing",
  },
  {
    accentColor: "from-teal-500 to-emerald-500",
    category: "cloud-devops-security",
    description:
      "Learn IoT architecture, Arduino, NodeMCU, sensors, communication protocols, and Node-RED for real-world projects.",
    emoji: "📡",
    featured: false,
    icon: BookCheck,
    id: "iot",
    image: "/courses/iot.png",
    slug: "/courses/iot",
    stats: defaultStats("2 Months"),
    subtitle: "Connect the physical world",
    title: "Internet of Things (IoT)",
  },
  {
    accentColor: "from-red-500 to-rose-600",
    category: "cloud-devops-security",
    description:
      "Learn ethical hacking, network defense, Linux/Windows security, and web application security to become a cybersecurity expert.",
    emoji: "🛡️",
    featured: true,
    icon: BookCheck,
    id: "cyber-sec",
    image: "/courses/cyber-security.png",
    slug: "/courses/cyber-security",
    stats: defaultStats("3 Months"),
    subtitle: "Defend against digital threats",
    title: "Cyber Security",
  },

  // Engineering & Design
  {
    accentColor: "from-amber-500 to-orange-600",
    category: "engineering",
    description:
      "Master 2D and 3D design using AutoCAD — from drafting fundamentals to professional-grade engineering drawings.",
    emoji: "📐",
    featured: false,
    icon: BookCheck,
    id: "autocad",
    image: "/courses/autocad.png",
    slug: "/courses/autocad",
    stats: defaultStats("2 Months"),
    subtitle: "Design with precision",
    title: "AutoCAD",
  },
  {
    accentColor: "from-slate-500 to-zinc-600",
    category: "engineering",
    description:
      "Learn microcontrollers (8051/ARM), Embedded C, RTOS fundamentals, and IoT integration for embedded applications.",
    emoji: "🔌",
    featured: false,
    icon: BookCheck,
    id: "embedded-systems",
    image: "/courses/embedded-systems.png",
    slug: "/courses/embedded-systems",
    stats: defaultStats("2.5 Months"),
    subtitle: "Program the hardware",
    title: "Embedded Systems",
  },
  {
    accentColor: "from-green-500 to-lime-500",
    category: "engineering",
    description:
      "Understand EV batteries, vehicle modelling, battery management systems, motors, and the future of sustainable mobility.",
    emoji: "🔋",
    featured: false,
    icon: BookCheck,
    id: "hev",
    image: "/courses/hev.png",
    slug: "/courses/hev",
    stats: defaultStats("2 Months"),
    subtitle: "Drive the green revolution",
    title: "Hybrid & Electric Vehicles",
  },
  {
    accentColor: "from-cyan-500 to-blue-500",
    category: "engineering",
    description:
      "Dive into nanomaterials, fabrication techniques, characterization methods, and cutting-edge nanotechnology applications.",
    emoji: "🔬",
    featured: false,
    icon: BookCheck,
    id: "nanotechnology",
    image: "/courses/nanotechnology.png",
    slug: "/courses/nanotechnology",
    stats: defaultStats("2 Months"),
    subtitle: "Explore the nanoscale world",
    title: "Nanotechnology",
  },

  // Business & Finance
  {
    accentColor: "from-fuchsia-500 to-pink-500",
    category: "business",
    description:
      "Master SEO, social media marketing, content marketing, analytics, and paid advertising to drive digital growth.",
    emoji: "📱",
    featured: false,
    icon: BookCheck,
    id: "digital-marketing",
    image: "/courses/digital-marketing.png",
    slug: "/courses/digital-marketing",
    stats: defaultStats("2 Months"),
    subtitle: "Grow brands online",
    title: "Digital Marketing",
  },
  {
    accentColor: "from-emerald-500 to-green-600",
    category: "business",
    description:
      "Learn financial statements, ratio analysis, cash flow management, valuation techniques, and strategic financial planning.",
    emoji: "💰",
    featured: false,
    icon: BookCheck,
    id: "finance",
    image: "/courses/finance.png",
    slug: "/courses/finance",
    stats: defaultStats("2 Months"),
    subtitle: "Master the money game",
    title: "Financial Management",
  },
  {
    accentColor: "from-blue-500 to-violet-500",
    category: "business",
    description:
      "Cover strategic HRM, job evaluation, recruitment, selection processes, and organizational development.",
    emoji: "👥",
    featured: false,
    icon: BookCheck,
    id: "hr",
    image: "/courses/hr.png",
    slug: "/courses/hr",
    stats: defaultStats("2 Months"),
    subtitle: "Lead people, lead growth",
    title: "Human Resources",
  },
  {
    accentColor: "from-green-500 to-emerald-500",
    category: "business",
    description:
      "Learn stock analysis, trading strategies, technical and fundamental analysis, portfolio management, and risk assessment.",
    emoji: "📈",
    featured: false,
    icon: BookCheck,
    id: "stock-market",
    image: "/courses/stock-market.png",
    slug: "/courses/stock-market",
    stats: defaultStats("1.5 Months"),
    subtitle: "Invest with confidence",
    title: "Stock Market",
  },
  {
    accentColor: "from-purple-500 to-indigo-500",
    category: "business",
    description:
      "Explore cognitive psychology, behavioral science, mental health fundamentals, and applied psychological research methods.",
    emoji: "🧠",
    featured: false,
    icon: BookCheck,
    id: "psychology",
    image: "/courses/psychology.png",
    slug: "/courses/psychology",
    stats: defaultStats("2 Months"),
    subtitle: "Understand the human mind",
    title: "Psychology",
  },

  // Career
  {
    accentColor: "from-pink-500 to-fuchsia-600",
    category: "career",
    description:
      "Get a 100% job guarantee with our comprehensive programme! Learn resume building, LinkedIn optimization, business communication, and more.",
    emoji: "🎯",
    featured: true,
    icon: BookCheck,
    id: "placement-accelerator",
    image: "/courses/professional.png",
    slug: "/courses/placement-accelerator",
    stats: [
      { icon: Clock, label: "Duration", value: "15 Days" },
      { icon: CheckCircle, label: "Live Session", value: "100%" },
      { icon: Users, label: "Doubt Clearing", value: "1:1" },
      { icon: Infinity, label: "Access", value: "Lifetime" },
      { icon: Building, label: "Companies", value: "250+" },
      { icon: Award, label: "Placement", value: "100%" },
    ],
    subtitle: "100% Job Guarantee",
    title: "Placement Accelerator",
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
