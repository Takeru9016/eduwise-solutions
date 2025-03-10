import {
  Award,
  GraduationCap,
  BarChart3,
  Rocket,
  Target,
  Sparkles,
} from "lucide-react";

import CTASection from "./CTASection";

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
            ? "bg-white hover:shadow-lg transform hover:-translate-y-1 group"
            : "bg-light-97 hover:border-primary-90"
        }
        rounded-xl p-8 shadow-sm transition-all duration-300 border border-light-90
      `}
    >
      <div className="relative w-14 h-14 bg-primary-99 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-95 transition-colors">
        <Icon className="w-7 h-7 text-primary-75" />
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary-90 rounded-full" />
      </div>
      <h3 className="text-xl font-vietnam font-semibold text-grey-15 mb-4">
        {title}
      </h3>
      <p className="text-grey-35 leading-relaxed">{description}</p>
    </div>
  );
};
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
    <h2 className="text-3xl md:text-4xl font-vietnam font-bold text-grey-15 mb-4">
      {title}
    </h2>
    <p
      className={`text-grey-35 text-lg ${centered ? "max-w-2xl mx-auto" : ""}`}
    >
      {subtitle}
    </p>
  </div>
);

export default function AboutUs() {
  // Data for "Who We Are" section
  const featureItems = [
    {
      icon: Award,
      title: "Your Trusted Education Partner",
      description:
        "We act as a bridge between learners and reputed institutions, ensuring access to high-quality courses across diverse domains.",
    },
    {
      icon: GraduationCap,
      title: "Expert Collaborators",
      description:
        "We collaborate with industry-leading companies and universities to offer courses in fields like Data Science, Web Development, Online MBA, and more.",
    },
    {
      icon: BarChart3,
      title: "Passionate Counsellors",
      description:
        "Our experts bring years of experience and industry knowledge to help you set right career path.",
    },
  ];

  // Data for "Mission & Vision" section
  const missionVisionItems = [
    {
      icon: Rocket,
      title: "Our Mission",
      description:
        "To create a seamless platform where learners can access high-quality courses from leading institutions and companies, transforming aspirations into achievements.",
    },
    {
      icon: Target,
      title: "Our Vision",
      description:
        "To empower learners with the right education and abilities to excel and start their professional journey while enabling partner companies to reach and educate a broader audience effectively.",
    },
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-24 bg-gradient-to-b from-primary-99 to-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-95 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-97 rounded-full opacity-20 blur-3xl" />
        </div>
        <div className="container relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white text-primary-75 px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles size={16} className="text-primary-75" />
                Welcome to Eduwise
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-vietnam font-bold text-grey-15">
                About Eduwise
              </h1>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-sm border border-light-90">
              <p className="text-grey-35 text-lg leading-relaxed">
                At Eduwise Solutions, we believe that every graduate deserves
                strong start to their career. Whether you are a final-year
                student preparing for the job market or a recent graduate
                looking for your first job, we are here to bridge the gap
                between your potential and your dream job.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-light-97">
        <div className="container">
          <SectionHeader
            title="Who We Are"
            subtitle="We're a team of dedicated professionals committed to transforming education"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureItems.map((item, index) => (
              <FeatureCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Our Mission & Vision"
              subtitle="Empowering learners and shaping futures"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {missionVisionItems.map((item, index) => (
                <FeatureCard
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  variant="mission"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
