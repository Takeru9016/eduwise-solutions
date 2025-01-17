import {
  Compass,
  GraduationCap,
  LayoutGrid,
  DollarSign,
  Building2,
  HeartHandshake,
  Percent,
  Focus,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Compass,
    title: "One-Stop Solution",
  },
  {
    icon: GraduationCap,
    title: "Curate Premier Courses",
  },
  {
    icon: LayoutGrid,
    title: "Simplify Learning Choices",
  },
  {
    icon: DollarSign,
    title: "Earn While You Learn",
  },
  {
    icon: Building2,
    title: "Trusted Partners",
  },
  {
    icon: HeartHandshake,
    title: "End-to-End Support",
  },
  {
    icon: Focus,
    title: "Career-Focused Approach",
  },
  {
    icon: Percent,
    title: "Special Discounts",
  },
];

export default function Benefits() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-light-97">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-vietnam font-bold text-grey-15 text-center mb-8 md:mb-12">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit) => (
            <Card
              key={benefit.title}
              className="border-none bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardContent className="p-6 md:p-8">
                <div className="text-center space-y-4">
                  <div className="relative flex justify-center">
                    <benefit.icon
                      size={36}
                      className="text-primary-75"
                      strokeWidth={1.5}
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary-95 rounded-full" />
                  </div>
                  <h3 className="text-lg md:text-xl font-vietnam font-semibold text-grey-20">
                    {benefit.title}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
