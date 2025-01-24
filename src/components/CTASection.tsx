import Link from "next/link";
import { ArrowRight, BookOpen, Target, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-primary-99 to-white overflow-hidden">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary-95 text-primary-70 px-4 py-2 rounded-full">
              <Target size={16} className="text-primary-70" />
              <span className="text-sm font-medium">Career Transformation</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-grey-15 leading-tight">
              Accelerate Your
              <span className="text-primary-70 block">
                Professional Journey
              </span>
            </h2>

            <p className="text-lg text-grey-45 max-w-xl">
              Unlock a world of opportunities with our cutting-edge Online
              Masters Program. Designed for ambitious professionals who want to
              stay ahead in a rapidly evolving job market.
            </p>

            {/* Key Features */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: BookOpen,
                  title: "Expert Curriculum",
                  description: "Industry-aligned learning paths",
                },
                {
                  icon: Clock,
                  title: "Flexible Learning",
                  description: "Learn on your schedule",
                },
              ].map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 bg-primary-99/50 p-4 rounded-lg"
                >
                  <Icon className="w-6 h-6 text-primary-70 mt-1" />
                  <div>
                    <h3 className="font-semibold text-grey-20 mb-1">{title}</h3>
                    <p className="text-sm text-grey-45">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-primary-70 hover:bg-primary-75 text-white px-8 py-3 rounded-lg group transition-all duration-300"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-primary-70 text-primary-70 hover:bg-primary-95/50 px-8 py-3 rounded-lg"
              >
                <Link href="/courses">Explore Programs</Link>
              </Button>
            </div>
          </div>

          {/* Decorative Image/Section */}
          <div className="hidden lg:block relative">
            <div className="bg-gradient-to-br from-primary-95 to-primary-99 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-75/10 to-transparent opacity-50 blur-2xl" />

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6 mx-auto">
                  <Target className="w-10 h-10 text-primary-70" />
                </div>

                <h3 className="text-3xl font-bold text-grey-15 mb-4">
                  Transform Your Potential
                </h3>

                <p className="text-grey-45 max-w-md mx-auto">
                  Join a community of 10,000+ professionals advancing their
                  careers through innovative online learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-95 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary-90 rounded-full opacity-10 blur-3xl" />
      </div>
    </section>
  );
}
