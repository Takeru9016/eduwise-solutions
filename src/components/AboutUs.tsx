import {
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  Building,
  CheckCircle2,
  GraduationCap,
  Rocket,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

// Reusable card component for features and mission/vision
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  variant = "default",
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  variant?: string;
}) => {
  const isDefault = variant === "default";

  return (
    <div
      className={`
        ${
          isDefault
            ? "group transform bg-white hover:-translate-y-1 hover:shadow-lg"
            : "bg-light-97 hover:border-primary-90"
        }rounded-xl border border-light-90 p-8 shadow-xs transition-all duration-300`}
    >
      <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-99 transition-colors group-hover:bg-primary-95">
        <Icon className="h-7 w-7 text-primary-75" />
        <div className="absolute -bottom-2 left-1/2 h-1 w-12 -translate-x-1/2 transform rounded-full bg-primary-90" />
      </div>
      <h3 className="mb-4 font-semibold font-vietnam text-grey-15 text-xl">
        {title}
      </h3>
      <p className="text-grey-35 leading-relaxed">{description}</p>
    </div>
  );
};

// Process step component
const ProcessStep = ({
  icon: Icon,
  title,
  description,
  number,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  number: number;
}) => (
  <div className="flex items-start gap-6">
    <div className="relative">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-95">
        <Icon className="h-7 w-7 text-primary-75" />
      </div>
      <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary-90 font-bold text-sm text-white">
        {number}
      </div>
    </div>
    <div>
      <h3 className="mb-2 font-semibold font-vietnam text-grey-15 text-xl">
        {title}
      </h3>
      <p className="text-grey-35 leading-relaxed">{description}</p>
    </div>
  </div>
);

// Benefit card component
const BenefitCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="rounded-xl border border-light-90 bg-white p-6 transition-all hover:shadow-md">
    <div className="flex items-start gap-4">
      <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-primary-75" />
      <div>
        <h4 className="mb-2 font-semibold font-vietnam text-grey-15 text-lg">
          {title}
        </h4>
        <p className="text-grey-35">{description}</p>
      </div>
    </div>
  </div>
);

// Section header component
const SectionHeader = ({
  title,
  subtitle,
  centered = true,
}: {
  title: string;
  subtitle: string;
  centered?: boolean;
}) => (
  <div className={`${centered ? "text-center" : ""} mb-16`}>
    <h2 className="mb-4 font-bold font-vietnam text-3xl text-grey-15 md:text-4xl">
      {title}
    </h2>
    <p
      className={`text-grey-35 text-lg ${centered ? "mx-auto max-w-2xl" : ""}`}
    >
      {subtitle}
    </p>
  </div>
);

export default function AboutUs() {
  // Data for "Who We Are" section
  const featureItems = [
    {
      description:
        "At Eduwise Solutions, we are passionate about empowering students and early-career professionals to take confident steps toward successful careers. More than an education platform, we are a career success partner—committed to guiding individuals from learning to meaningful, long-term professional outcomes.",
      icon: Award,
      title: "Your Trusted Education Partner",
    },
    {
      description:
        "At Eduwise Solutions, our programs are delivered in collaboration with industry-leading organizations and reputed universities. These partnerships ensure learners gain access to credible, industry-aligned courses across domains, including Data Science, Web Development, Cloud Computing, and beyond.",
      icon: GraduationCap,
      title: "Expert Collaborators",
    },
    {
      description:
        "Our dedicated counsellors leverage extensive industry knowledge and professional experience to provide tailored guidance—helping you define, refine, and achieve your long-term career goals",
      icon: Users,
      title: "Passionate Counsellors",
    },
    {
      description:
        "With 8+ years of experience, we’ve trained over 2,000 learners and helped them build skills that matter in the real world.",
      icon: BarChart3,
      title: "Industry Experts with Real Impact",
    },
    {
      description:
        "We’ve partnered with 150+ companies — from MNCs to startups — to connect job-ready candidates directly with hiring teams.",
      icon: Briefcase,
      title: "150+ Hiring Collaborations",
    },
    {
      description:
        "Backed by years of industry insights, our team not only trains you, but also guides your career path toward long-term success.",
      icon: CheckCircle2,
      title: "Personal Mentorship for Career Success",
    },
  ];

  // Data for "Mission & Vision" section
  const missionVisionItems = [
    {
      description:
        "To empower individuals with essential skills and real-world knowledge, helping them secure meaningful employment and build thriving careers—regardless of their academic background.",
      icon: Rocket,
      title: "Our Mission",
    },
    {
      description:
        "To become a trusted career-launch platform that transforms the lives of graduates by making job readiness accessible, practical, and result-driven—one job at a time.",
      icon: Target,
      title: "Our Vision",
    },
  ];

  // Data for "Our Process" section
  const processSteps = [
    {
      description:
        "We train candidates in resume building, LinkedIn optimization, business communication, interview techniques, Excel, call pitching, and more.",
      icon: BookOpen,
      number: 1,
      title: "Skill Development",
    },
    {
      description:
        "We partner with leading MNCs to place candidates in high-demand entry-level roles.",
      icon: Building,
      number: 2,
      title: "Job Placements",
    },
    {
      description:
        "We provide personalized counseling to help students choose the right job path and maximize their career opportunities.",
      icon: Users,
      number: 3,
      title: "Career Guidance",
    },
  ];

  // Data for "Why Choose Eduwise Solutions" section
  const benefits = [
    {
      description: "We have real jobs waiting for skilled candidates.",
      title: "Guaranteed Job Opportunities",
    },
    {
      description: "Practical learning that helps you crack interviews.",
      title: "Industry-Driven Training",
    },
    {
      description: "Direct access to recruiters from top companies.",
      title: "MNC Partnerships",
    },
    {
      description: "High-quality training at competitive prices.",
      title: "Affordable & Effective",
    },
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-primary-99 to-white py-20 md:py-24">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-primary-95 opacity-20 blur-3xl" />
          <div className="absolute right-20 bottom-20 h-96 w-96 rounded-full bg-primary-97 opacity-20 blur-3xl" />
        </div>
        <div className="container relative">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-medium text-primary-75 text-sm">
                <Sparkles className="text-primary-75" size={16} />
                Welcome to Eduwise
              </div>
              <h1 className="font-bold font-vietnam text-4xl text-grey-15 md:text-5xl lg:text-6xl">
                About Eduwise
              </h1>
            </div>
            <div className="rounded-xl border border-light-90 bg-white/50 p-6 shadow-xs backdrop-blur-xs md:p-8">
              <p className="text-grey-35 text-lg leading-relaxed">
                At Eduwise Solutions, our mission is to empower graduates with
                the skills, confidence, and direction needed to succeed in
                todays competitive job market. Whether you are a final-year
                student preparing for placements or a recent graduate taking
                your first step into the professional world, we bridge the gap
                between academic learning and real-world excellence—guiding you
                at every stage and turning ambition into achievement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="bg-light-97 py-20">
        <div className="container">
          <SectionHeader
            subtitle="At Eduwise Solutions, we are passionate about empowering students and early-career professionals to take confident steps toward successful careers. More than an education platform, we are a career success partner—committed to guiding individuals from learning to meaningful, long-term professional outcomes."
            title="Who We Are"
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {featureItems.map((item, index) => (
              <FeatureCard
                description={item.description}
                icon={item.icon}
                key={index}
                title={item.title}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-light-97 py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              subtitle="Empowering learners and shaping futures"
              title="Our Mission & Vision"
            />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {missionVisionItems.map((item, index) => (
                <FeatureCard
                  description={item.description}
                  icon={item.icon}
                  key={index}
                  title={item.title}
                  variant="mission"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20">
        <div className="container">
          <SectionHeader
            subtitle="Connecting talent with opportunity through skill development"
            title="What We Do"
          />

          <div className="mx-auto max-w-4xl rounded-xl border border-light-90 bg-white/50 p-8 shadow-xs backdrop-blur-xs">
            <div className="flex items-start gap-6">
              <Briefcase className="h-12 w-12 shrink-0 text-primary-75" />
              <div>
                <p className="text-grey-35 text-lg leading-relaxed">
                  We offer a 15-day intensive program that builds essential job
                  skills, enhances personal branding, and connects learners with
                  top industry partners to ensure 100% job placement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="bg-light-97 py-20">
        <div className="container">
          <SectionHeader
            subtitle="A structured approach to prepare you for success"
            title="Our Process"
          />

          <div className="mx-auto max-w-4xl space-y-12">
            {processSteps.map((step, index) => (
              <ProcessStep
                description={step.description}
                icon={step.icon}
                key={index}
                number={step.number}
                title={step.title}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Eduwise Solutions Section */}
      <section className="py-20">
        <div className="container">
          <SectionHeader
            subtitle="Your success is our priority"
            title="Why Choose Eduwise Solutions?"
          />

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <BenefitCard
                description={benefit.description}
                key={index}
                title={benefit.title}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="font-medium text-grey-35 text-lg">
              At Eduwise Solutions, your success is our priority. Let us help
              you unlock your potential and confidently land your first job!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
