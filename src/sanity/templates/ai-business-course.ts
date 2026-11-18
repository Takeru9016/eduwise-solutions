import type { Template } from "sanity";

const ASSET_PATH = "/courses/ai-business";

const foundation = [
  [
    "Introduction to Artificial Intelligence",
    "What AI is and how it is changing businesses, jobs, and daily life.",
  ],
  [
    "Understanding the AI Ecosystem",
    "Generative AI, assistants, image, video and voice tools, and AI agents.",
  ],
  [
    "Exploring Popular AI Tools",
    "Compare ChatGPT, Claude, Gemini, and Perplexity on everyday business tasks.",
  ],
  [
    "Mastering GPT",
    "Work with custom instructions, projects, files, and voice for everyday tasks.",
  ],
  [
    "Prompt Engineering Fundamentals",
    "Give AI a clear task and assess whether the result is accurate and useful.",
  ],
  [
    "Advanced Prompting Techniques",
    "Use roles, context, constraints, examples, and reusable prompt templates.",
  ],
  [
    "AI for Research and Decision-Making",
    "Research markets, competitors, and industries, then compare evidence before making a decision.",
  ],
  [
    "AI for Documents and Productivity",
    "Draft reports, presentations, proposals, spreadsheets, and SOPs.",
  ],
  [
    "AI for Personal Productivity",
    "Summarise meetings, plan tasks, write emails, and organise knowledge.",
  ],
  [
    "Identifying AI Opportunities in Business",
    "Find repetitive work where AI can save time and identify where human review is needed.",
  ],
] as const;

const implementation = [
  [
    "Building an AI-Powered Business Strategy",
    "Validate a business idea, plan a business model, define personas, and map AI opportunities.",
  ],
  [
    "AI for Market and Competitor Intelligence",
    "Research competitors and markets, run a SWOT analysis, and identify growth opportunities.",
  ],
  [
    "AI for Marketing Strategy",
    "Research audiences, define positioning, and develop a marketing plan.",
  ],
  [
    "AI for Content Creation",
    "Draft social posts, captions, blogs, newsletters, and content calendars.",
  ],
  [
    "AI for Graphic Design and Branding",
    "Use Canva AI for brand identity, posters, ads, and campaign creatives.",
  ],
  [
    "AI for Video and Social Media",
    "Create Reel scripts, short videos, voiceovers, and subtitles.",
  ],
  [
    "AI for Marketing Campaigns",
    "Draft ad copy and landing page content, and analyse campaign performance.",
  ],
  [
    "AI for Lead Generation",
    "Define ideal customer profiles and research potential leads.",
  ],
  [
    "AI for Sales Communication",
    "Draft personalised emails, WhatsApp messages, proposals, and follow-ups.",
  ],
  [
    "AI for Sales Management",
    "Qualify leads, plan follow-ups, handle objections, and support CRM work.",
  ],
  [
    "AI for Sales Strategy and Conversion",
    "Develop pitches and sales scripts and use customer insights to improve conversion.",
  ],
  [
    "AI for Daily Business Operations",
    "Create SOPs, plan tasks, document workflows, and improve processes.",
  ],
  [
    "AI for Customer Support",
    "Build FAQs, response templates, complaint-handling guidelines, and support assistants.",
  ],
  [
    "AI for HR and Team Management",
    "Draft job descriptions, interview questions, and onboarding documents.",
  ],
  [
    "AI for Financial Management",
    "Categorise expenses, plan budgets, and prepare financial documents and invoices.",
  ],
  [
    "AI for Business Data Analysis",
    "Interpret spreadsheets, analyse sales data, and identify business trends.",
  ],
  [
    "AI for Business Reporting",
    "Prepare revenue and expense reports, dashboards, and management summaries.",
  ],
  [
    "Building Websites Using AI",
    "Plan website structure and content and use AI website builders.",
  ],
  [
    "Creating Landing Pages and Business Portfolios",
    "Build landing and service pages, portfolios, and lead capture forms.",
  ],
  [
    "Building an End-to-End AI-Powered Business",
    "Connect marketing, sales, customer support, operations, and reporting into one business model.",
  ],
] as const;

const automation = [
  [
    "Introduction to Claude Code",
    "Explore what Claude Code does and when it is useful for a small business.",
  ],
  [
    "Setting Up Claude Code",
    "Set up the tool, learn terminal basics, and work with project folders.",
  ],
  [
    "Building with AI Assistance",
    "Give instructions, generate code, read files, and improve an existing project.",
  ],
  [
    "Building Your First Business Website",
    "Create a simple business website or landing page with Claude Code.",
  ],
  [
    "Introduction to Business Automation and n8n",
    "Plan workflows using triggers, actions, and nodes.",
  ],
  [
    "Building Your First n8n Workflow",
    "Connect Google Forms, Sheets, and Gmail to collect and acknowledge enquiries.",
  ],
  [
    "Connecting AI with n8n",
    "Connect an AI model, process workflow inputs, and draft responses for review.",
  ],
  [
    "AI-Powered Lead Management",
    "Classify leads by intent and recommend a follow-up action.",
  ],
  [
    "AI Content and Customer Support Automation",
    "Build workflows that route content for approval and escalate sensitive questions to a person.",
  ],
  [
    "APIs, Webhooks, and Integrations",
    "Learn JSON basics and how applications exchange data and trigger workflows.",
  ],
  [
    "AI Agents for Business",
    "Connect tools to an agent, write instructions, and understand where it needs human oversight.",
  ],
  [
    "Advanced Claude Code Projects",
    "Build and improve small business applications with AI assistance.",
  ],
  [
    "Connecting Claude Code with Business Workflows",
    "Connect an application to workflows that solve everyday business tasks.",
  ],
  [
    "Final Capstone Development",
    "Build and test an end-to-end AI-powered business automation system.",
  ],
  [
    "Deployment, Testing, and Project Presentation",
    "Test workflows, handle errors, deploy the project, and present the working system.",
  ],
] as const;

const projects = [
  [
    "Personal AI Productivity Kit",
    "Create a prompt library for writing, planning, research, and summaries.",
  ],
  [
    "AI-Powered Research Report",
    "Compare competitors and present structured market insights.",
  ],
  [
    "Business Document Pack",
    "Create a proposal, presentation, SOP, and business report.",
  ],
  [
    "Business Launch Blueprint",
    "Define a business idea, customer persona, value proposition, and launch plan.",
  ],
  [
    "Complete Marketing Campaign",
    "Prepare brand messaging, a 30-day content calendar, creatives, short-video scripts, and ad copy.",
  ],
  [
    "AI-Assisted Sales System",
    "Build a lead research sheet, sales pitch, objection responses, and follow-up templates.",
  ],
  [
    "Business Operations and Customer Support Kit",
    "Create SOPs, FAQs, complaint-handling templates, and onboarding documents.",
  ],
  [
    "Finance and Business Insights Report",
    "Analyse sample revenue and expense data and summarise monthly performance.",
  ],
  [
    "Business Website and Landing Page",
    "Create a site or landing page with services, contact details, and a lead enquiry form.",
  ],
  [
    "Website Built with Claude Code",
    "Build and refine a responsive small-business website.",
  ],
  [
    "Automated Enquiry Collection",
    "Save form responses to Sheets, acknowledge the enquiry, and notify the business owner.",
  ],
  [
    "AI Lead Qualification Workflow",
    "Classify incoming leads and recommend the next step.",
  ],
  [
    "AI Email Assistant with Human Review",
    "Draft contextual replies and send them to a person for approval.",
  ],
  [
    "AI Content Creation and Approval Workflow",
    "Collect content drafts in a sheet and route them for editorial review.",
  ],
  [
    "AI Customer Support Assistant",
    "Answer from approved FAQs and escalate ambiguous or sensitive requests.",
  ],
  [
    "Automated Business Reporting",
    "Schedule summaries of enquiries, lead status, or sales activity.",
  ],
] as const;

function phase({
  classes,
  description,
  firstClass,
  firstProject,
  projectCount,
  title,
}: {
  classes: readonly (readonly [string, string])[];
  description: string;
  firstClass: number;
  firstProject: number;
  projectCount: number;
  title: string;
}) {
  return {
    _key: `phase-${firstClass}`,
    _type: "object",
    description,
    projects: projects
      .slice(firstProject - 1, firstProject - 1 + projectCount)
      .map(([projectTitle, detail], index) => ({
        _key: `project-${firstProject + index}`,
        _type: "object",
        description: detail,
        title: projectTitle,
      })),
    submodules: classes.map(([classTitle, detail], index) => ({
      _key: `class-${firstClass + index}`,
      _type: "object",
      subtopics: [detail],
      title: `Class ${String(firstClass + index).padStart(2, "0")} · ${classTitle}`,
    })),
    title,
  };
}

export const aiBusinessCourse = {
  accentColor: "from-emerald-500 to-teal-500",
  brochureUrl: `${ASSET_PATH}/brochure.pdf`,
  capstone: {
    _type: "object",
    description:
      "Build, test, deploy, and demonstrate one system for a small business. You’ll connect your website to workflows for enquiries, lead management, support, and reporting.",
    outcomes: [
      "Build a business website with a working enquiry form.",
      "Capture enquiries and qualify leads with AI.",
      "Prepare follow-ups for human review.",
      "Route content approvals and sensitive support questions to people.",
      "Produce scheduled reports from connected data.",
      "Test error handling and present the deployed system.",
    ],
    title: "Your AI-Powered Business Operating System",
  },
  category: "ai-data",
  certificate: {
    _type: "object",
    description:
      "Receive a course completion certificate from Eduwise Solutions when you complete the program.",
    enabled: true,
    issuer: "Eduwise Solutions",
    issuerPrefix: "Issued by",
    sectionTitle: "Course Completion Certificate",
  },
  counsellingLabel: "Request a Free Counselling Call",
  counsellingWhatsAppUrl: "https://wa.me/919148774540",
  description:
    "Use AI to do everyday business work, then build automations with Claude Code and n8n. Across 45 live classes, you’ll complete 16 guided projects and connect them in one capstone. No programming background is required.",
  duration: "45 live classes",
  emoji: "🤖",
  enrolmentMode: "counselling",
  faq: [
    [
      "Do I need coding knowledge?",
      "No. You’ll start with AI tools and business tasks. The final phase introduces terminal basics and AI-assisted development.",
    ],
    [
      "Can I join from a non-technical role?",
      "Yes. The course is designed for business owners and people in marketing, sales, HR, finance, operations, and other roles.",
    ],
    [
      "What do I need to join?",
      "You’ll need a laptop and internet access. Paid tools are not required to start, and project details may vary with tool or integration access.",
    ],
    [
      "Are classes live or recorded?",
      "Classes are taught live by mentors. Session recordings are provided.",
    ],
    [
      "Will I get help with the projects?",
      "Yes. Mentors guide you as you work through the projects and final capstone.",
    ],
    [
      "Will I receive a certificate?",
      "Eduwise Solutions issues a course completion certificate when you complete the program.",
    ],
    [
      "How do I join a batch?",
      "Request a free counselling call. The team will help you check the upcoming schedule and explain enrolment.",
    ],
  ].map(([question, answer], index) => ({
    _key: `faq-${index + 1}`,
    _type: "object",
    answer,
    category: "training",
    question,
  })),
  featured: false,
  features: [
    {
      _key: "live",
      _type: "object",
      description:
        "Practise workflow tasks in live mentor-led sessions, with recordings for review.",
      icon: "Play",
      title: "Live learning",
    },
    {
      _key: "business",
      _type: "object",
      description:
        "Use AI to research markets, run campaigns, handle leads, and prepare reports.",
      icon: "Briefcase",
      title: "Business applications",
    },
    {
      _key: "projects",
      _type: "object",
      description:
        "Build a portfolio with 16 guided projects and one connected capstone.",
      icon: "Code",
      title: "Hands-on projects",
    },
    {
      _key: "review",
      _type: "object",
      description:
        "Use approval steps for emails and content, and route sensitive questions to a person.",
      icon: "UserCheck",
      title: "Human oversight",
    },
  ],
  heroImagePath: "/courses/artificial-intelligence.png",
  highlights: [
    {
      _key: "workflow",
      _type: "object",
      category: "Apply AI across your business",
      color: "from-emerald-500 to-teal-500",
      icon: "Briefcase",
      points: [
        "Research markets and competitors.",
        "Plan campaigns, qualify leads, and draft follow-ups.",
        "Support operations, finance, HR, and customer service.",
      ],
    },
    {
      _key: "portfolio",
      _type: "object",
      category: "Build and demonstrate your work",
      color: "from-emerald-500 to-teal-500",
      icon: "Code",
      points: [
        "Build a website and connect it to n8n.",
        "Test automation steps and add human review.",
        "Deploy a capstone you can demonstrate.",
      ],
    },
  ],
  isJobGuaranteeProgram: false,
  mentors: {
    _type: "object",
    enabled: true,
    profiles: [
      {
        _key: "vishal-chettri",
        _type: "object",
        experience: "8+ years of experience",
        imagePath: `${ASSET_PATH}/vishal-chettri.webp`,
        name: "Vishal Chettri",
        role: "Co-Founder, Eduwise Solutions",
      },
      {
        _key: "saurav-singh",
        _type: "object",
        experience: "7+ years of experience",
        imagePath: `${ASSET_PATH}/saurav-singh.webp`,
        name: "Saurav Singh",
        role: "Gen AI Expert",
      },
    ],
    sectionDescription:
      "Your mentors guide you through live classes, business exercises, and the final capstone.",
    sectionTitle: "Meet Your Mentors",
  },
  modules: [
    phase({
      classes: foundation,
      description:
        "Learn the tools, build reusable prompts, and apply AI to everyday work.",
      firstClass: 1,
      firstProject: 1,
      projectCount: 3,
      title: "Phase 1 · Foundation (Classes 1–10)",
    }),
    phase({
      classes: implementation,
      description:
        "Apply AI across strategy, marketing, sales, support, HR, operations, and finance.",
      firstClass: 11,
      firstProject: 4,
      projectCount: 6,
      title: "Phase 2 · Business Implementation (Classes 11–30)",
    }),
    phase({
      classes: automation,
      description:
        "Build with Claude Code, automate with n8n, and deploy a working capstone.",
      firstClass: 31,
      firstProject: 10,
      projectCount: 7,
      title: "Phase 3 · Claude Code and Automation (Classes 31–45)",
    }),
  ],
  overview: [
    {
      _key: "progression",
      _type: "object",
      body: "Start with a practical business task, see how AI can help, and try it yourself. As you progress, connect repeatable tasks into workflows you can test and deploy.",
      icon: "Lightbulb",
      tabLabel: "How You Learn",
      title: "Understand, Implement, Automate",
    },
    {
      _key: "audience",
      _type: "object",
      body: "For founders, working professionals, students, and freelancers who want to use AI in their work. A laptop and internet connection are enough to get started.",
      icon: "Users",
      tabLabel: "Who It’s For",
      title: "Open to Beginners and Non-Technical Roles",
    },
  ],
  seoDescription:
    "Learn practical AI for business in 45 live classes. Build 16 guided projects and a capstone with Claude Code and n8n. Request a free counselling call.",
  seoKeywords: [
    "AI for business",
    "business automation course",
    "n8n course",
    "Claude Code training",
    "AI course for beginners",
  ],
  seoTitle: "AI for Business & Automation Course | Eduwise Solutions",
  slug: { _type: "slug", current: "ai-for-business-and-automation" },
  stats: [
    {
      _key: "phases",
      _type: "object",
      icon: "BookOpen",
      label: "Learning Phases",
      value: "3",
    },
    {
      _key: "projects",
      _type: "object",
      icon: "Code",
      label: "Guided Projects",
      value: "16",
    },
    {
      _key: "capstone",
      _type: "object",
      icon: "Target",
      label: "Final Capstone",
      value: "1",
    },
  ],
  subtitle: "Learn AI. Implement AI. Automate Your Business.",
  targetAudience: [
    {
      _key: "founders",
      _type: "object",
      icon: "Briefcase",
      title: "Business owners and founders",
    },
    {
      _key: "professionals",
      _type: "object",
      icon: "Users",
      title: "Working professionals",
    },
    {
      _key: "students",
      _type: "object",
      icon: "GraduationCap",
      title: "Students and freshers",
    },
    {
      _key: "freelancers",
      _type: "object",
      icon: "Laptop",
      title: "Freelancers and beginners",
    },
  ],
  title: "AI for Business & Automation",
  tools: [
    ["ChatGPT", "Draft, analyse, and create reusable prompts for daily work."],
    ["Claude", "Write and analyse longer material."],
    ["Gemini", "Research and work with business documents."],
    ["Perplexity", "Find sources and research markets."],
    ["Canva AI", "Build branded visuals and campaign assets."],
    ["Claude Code", "Build and refine websites and small business apps."],
    ["n8n", "Connect triggers, applications, and human approval steps."],
    [
      "Google Forms, Sheets, and Gmail",
      "Capture enquiries, organise data, and send follow-ups.",
    ],
  ].map(([name, description], index) => ({
    _key: `tool-${index + 1}`,
    _type: "object",
    description,
    name,
  })),
  whatsIncluded: [
    "45 live mentor-led classes and session recordings",
    "16 guided projects with mentor support",
    "Final automation capstone",
    "Eduwise Solutions course completion certificate",
  ],
};

export const aiBusinessCourseTemplate: Template = {
  id: "ai-business-and-automation-course",
  schemaType: "course",
  title: aiBusinessCourse.title,
  value: aiBusinessCourse,
};
