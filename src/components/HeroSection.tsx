import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, Target } from "lucide-react";

import { Button } from "@/components/ui/button";

// Feature item component for better reusability
const FeatureItem = ({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
}) => (
  <div className="flex items-center gap-3">
    <div className="flex-shrink-0">
      <Icon className="w-5 h-5 text-primary-75" />
    </div>
    <span className="text-grey-35">{text}</span>
  </div>
);

// CTA button component for consistency
const CTAButton = ({
  href,
  variant,
  children,
}: {
  href: string;
  variant: string;
  children: React.ReactNode;
}) => (
  <Link href={href}>
    <Button
      variant={
        variant as
          | "link"
          | "default"
          | "destructive"
          | "outline"
          | "secondary"
          | "ghost"
      }
      className={`
        w-full sm:w-auto px-8 py-6 text-lg rounded-lg transition-all duration-200
        ${
          variant === "default"
            ? "bg-primary-75 hover:bg-primary-70 text-white flex items-center gap-2 hover:translate-y-[-2px]"
            : "border-2 border-primary-75 text-primary-75 hover:bg-primary-99"
        }
      `}
    >
      {children}
    </Button>
  </Link>
);

export default function HeroSection() {
  const features = [
    { icon: BookOpen, text: "Expert-Led Programs" },
    { icon: Target, text: "Job-Ready Skills" },
  ];

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-95 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-97 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-20 relative">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} className="text-primary-75" />
              Your Career Journey Starts Here
            </div>

            {/* Main Heading */}
            <h1 className="font-vietnam font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              <span className="text-primary-75 inline-block animate-fade-in">
                Confused
              </span>{" "}
              <span className="text-grey-15">About What&apos;s Next?</span>
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
              <span className="block mb-4">
                Looking to elevate your career with{" "}
                <span className="bg-primary-97 px-2 py-1 rounded-md text-gray-800 font-medium">
                  THE RIGHT JOB
                </span>{" "}
                and enhance your skills with the{" "}
                <span className="bg-primary-97 px-2 py-1 rounded-md text-gray-800 font-medium">
                  PERFECT PROGRAM
                </span>
              </span>

              <span className="block mt-6 text-gray-700">
                We&apos;re here to guide you every step of the way! 🚀
              </span>
            </p>

            {/* Feature Points */}
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              {features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  icon={feature.icon}
                  text={feature.text}
                />
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <CTAButton href="/courses" variant="default">
                Explore Courses
                <ArrowRight className="w-5 h-5" />
              </CTAButton>

              <CTAButton href="/contact" variant="outline">
                Contact Us
              </CTAButton>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-[400px] md:h-[600px]">
            <div className="absolute inset-0 transform rotate-2">
              <Image
                src="/home/hero.png"
                alt="Student learning online"
                fill
                priority
                style={{
                  objectFit: "contain",
                  borderRadius: "24px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Uncomment when PartnersLogo component is available */}
        {/* <div className="mt-16 md:mt-20">
          <PartnersLogo />
        </div> */}
      </div>
    </section>
  );
}
