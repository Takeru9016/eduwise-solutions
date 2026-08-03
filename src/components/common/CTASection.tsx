import {
  ArrowRight,
  BookOpen,
  Clock,
  type LucideIcon,
  Target,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

// Types
interface FeatureItem {
  description: string;
  icon: LucideIcon;
  title: string;
}

interface CTAButton {
  href: string;
  icon?: LucideIcon;
  text: string;
  variant: "primary" | "secondary";
}

// Reusable components
const FeatureCard = ({ icon: Icon, title, description }: FeatureItem) => (
  <div className="flex items-start gap-3 rounded-lg bg-primary-99/50 p-4">
    <Icon className="mt-1 h-6 w-6 text-primary-70" />
    <div>
      <h3 className="mb-1 font-semibold text-grey-20">{title}</h3>
      <p className="text-grey-45 text-sm">{description}</p>
    </div>
  </div>
);

const CTAButton = ({ text, href, variant, icon: Icon }: CTAButton) => {
  const isPrimary = variant === "primary";

  return (
    <Button
      asChild
      className={`
        ${
          isPrimary
            ? "group bg-primary-70 text-white hover:bg-primary-75"
            : "border-primary-70 text-primary-70 hover:bg-primary-95/50"
        } rounded-lg px-8 py-3 transition-all duration-300`}
      variant={isPrimary ? "default" : "outline"}
    >
      <Link className={isPrimary ? "flex items-center gap-2" : ""} href={href}>
        {text}
        {Icon && (
          <Icon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        )}
      </Link>
    </Button>
  );
};

export default function CTASection() {
  const features: FeatureItem[] = [
    {
      description: "Industry-aligned learning paths",
      icon: BookOpen,
      title: "Expert Curriculum",
    },
    {
      description: "Learn on your schedule",
      icon: Clock,
      title: "Flexible Learning",
    },
  ];

  const ctaButtons: CTAButton[] = [
    {
      href: "/contact",
      icon: ArrowRight,
      text: "Start Your Journey",
      variant: "primary",
    },
    {
      href: "/courses",
      text: "Explore Programs",
      variant: "secondary",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-99 to-white py-24">
      {/* Subtle Background Decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-primary-95 opacity-10 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-primary-90 opacity-10 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content Section */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-95 px-4 py-2 text-primary-70">
              <Target className="text-primary-70" size={16} />
              <span className="font-medium text-sm">Career Transformation</span>
            </div>

            <h2 className="font-bold text-4xl text-grey-15 leading-tight lg:text-5xl">
              Accelerate Your
              <span className="block text-primary-70">
                Professional Journey
              </span>
            </h2>

            <p className="max-w-xl text-grey-45 text-lg">
              Unlock a world of opportunities with our cutting-edge Online
              Professional Programs. Designed for ambitious professionals who
              want to stay ahead in a rapidly evolving job market.
            </p>

            {/* Key Features */}
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <FeatureCard
                  description={feature.description}
                  icon={feature.icon}
                  key={feature.title}
                  title={feature.title}
                />
              ))}
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              {ctaButtons.map((button) => (
                <CTAButton
                  href={button.href}
                  icon={button.icon}
                  key={button.text}
                  text={button.text}
                  variant={button.variant}
                />
              ))}
            </div>
          </div>

          {/* Decorative Image/Section */}
          <div className="relative hidden lg:block">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-95 to-primary-99 p-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-75/10 to-transparent opacity-50 blur-2xl" />

              <div className="relative z-10 text-center">
                <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
                  <Target className="h-10 w-10 text-primary-70" />
                </div>

                <h3 className="mb-4 font-bold text-3xl text-grey-15">
                  Transform Your Potential
                </h3>

                <p className="mx-auto max-w-md text-grey-45">
                  Join a community of 10,000+ professionals advancing their
                  careers through innovative online learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
