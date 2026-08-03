import {
  Building2,
  Compass,
  Focus,
  GraduationCap,
  HeartHandshake,
  LayoutGrid,
  type LucideIcon,
  Sparkles,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

// Types for better type safety
interface Benefit {
  category?: string;
  description: string;
  icon: LucideIcon;
  title: string;
}

// Reusable components
const SectionBadge = ({
  icon: Icon,
  text,
}: {
  icon: LucideIcon;
  text: string;
}) => (
  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-99 px-4 py-2 font-medium text-primary-75 text-sm">
    <Icon className="text-primary-75" size={16} />
    {text}
  </div>
);

const BenefitCard = ({ benefit }: { benefit: Benefit }) => {
  const { icon: Icon, title, description } = benefit;

  return (
    <Card className="group transform border-none bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-6 md:p-8">
        <div className="space-y-6">
          {/* Icon Container */}
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-99 transition-colors duration-300 group-hover:bg-primary-95">
              <Icon className="text-primary-75" size={24} strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-1 left-2 h-1 w-8 rounded-full bg-primary-90 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="font-semibold font-vietnam text-grey-20 text-lg">
              {title}
            </h3>
            <p className="text-grey-35 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main component
export default function BenefitSection() {
  // Organized benefits by category for future flexibility
  const benefits: Benefit[] = [
    {
      category: "convenience",
      description:
        "Find everything you need for your educational journey in one place",
      icon: Compass,
      title: "One-Stop Solution",
    },
    {
      category: "quality",
      description:
        "Hand-picked courses from top institutions and industry leaders",
      icon: GraduationCap,
      title: "Curated Premier Courses",
    },
    {
      category: "convenience",
      description:
        "Clear guidance to help you make the right educational decisions",
      icon: LayoutGrid,
      title: "Simplify Learning Choices",
    },
    {
      category: "quality",
      description:
        "Collaborate with recognized educational institutions and companies",
      icon: Building2,
      title: "Trusted Partners",
    },
    {
      category: "support",
      description:
        "Comprehensive assistance from enrollment to course completion",
      icon: HeartHandshake,
      title: "End-to-End Support",
    },
    {
      category: "career",
      description: "Programs designed to enhance your professional growth",
      icon: Focus,
      title: "Career-Focused Approach",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-light-97 to-white py-16 md:py-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-primary-95 opacity-20 blur-3xl" />
        <div className="absolute right-20 bottom-20 h-96 w-96 rounded-full bg-primary-97 opacity-20 blur-3xl" />
      </div>

      <div className="container relative mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <SectionBadge icon={Sparkles} text="Why Students Choose Us" />
          <h2 className="font-bold font-vietnam text-3xl text-grey-15 md:text-4xl lg:text-5xl">
            Benefits That Set Us Apart
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <BenefitCard benefit={benefit} key={benefit.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
