import {
  Compass,
  GraduationCap,
  LayoutGrid,
  DollarSign,
  Building2,
  HeartHandshake,
  Percent,
  Focus,
  Sparkles,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Compass,
    title: "One-Stop Solution",
    description:
      "Find everything you need for your educational journey in one place",
  },
  {
    icon: GraduationCap,
    title: "Curated Premier Courses",
    description:
      "Hand-picked courses from top institutions and industry leaders",
  },
  {
    icon: LayoutGrid,
    title: "Simplify Learning Choices",
    description:
      "Clear guidance to help you make the right educational decisions",
  },
  {
    icon: DollarSign,
    title: "Earn While You Learn",
    description: "Flexible programs that let you balance work and education",
  },
  {
    icon: Building2,
    title: "Trusted Partners",
    description:
      "Collaborate with recognized educational institutions and companies",
  },
  {
    icon: HeartHandshake,
    title: "End-to-End Support",
    description:
      "Comprehensive assistance from enrollment to course completion",
  },
  {
    icon: Focus,
    title: "Career-Focused Approach",
    description: "Programs designed to enhance your professional growth",
  },
  {
    icon: Percent,
    title: "Special Discounts",
    description:
      "Exclusive offers and affordable payment plans for our students",
  },
];

export default function Benefits() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-light-97 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-95 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-97 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="container mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles size={16} className="text-primary-75" />
            Why Students Choose Us
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-vietnam font-bold text-grey-15">
            Benefits That Set Us Apart
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit) => (
            <Card
              key={benefit.title}
              className="group border-none bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardContent className="p-6 md:p-8">
                <div className="space-y-6">
                  {/* Icon Container */}
                  <div className="relative">
                    <div className="w-12 h-12 flex items-center justify-center bg-primary-99 rounded-xl group-hover:bg-primary-95 transition-colors duration-300">
                      <benefit.icon
                        size={24}
                        className="text-primary-75"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="absolute -bottom-1 left-2 w-8 h-1 bg-primary-90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-vietnam font-semibold text-grey-20">
                      {benefit.title}
                    </h3>
                    <p className="text-grey-35 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
