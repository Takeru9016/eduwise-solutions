import Link from "next/link";
import { ArrowRight, Sparkles, GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-99 via-primary-97 to-light-97" />

      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary-95 rounded-full opacity-20 blur-2xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary-90 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-primary-99 text-primary-70 px-4 py-1.5 rounded-full text-sm font-medium">
                <Sparkles size={16} className="text-primary-70" />
                Transform Your Future
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-vietnam font-bold mb-6">
              <span className="text-grey-15 block mb-2">
                Take the First Step Toward
              </span>
              <span className="text-primary-70">Your Dream Career!</span>
            </h2>

            <div className="space-y-4 mb-8 text-grey-35">
              <p className="text-lg">
                Join our Online Masters Program today and experience a unique
                blend of learning and earning opportunities.
              </p>

              {/* Feature highlights */}
              <div className="flex flex-col sm:flex-row gap-6 mt-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <GraduationCap className="w-5 h-5 text-primary-75" />
                  </div>
                  <div>
                    <h3 className="font-medium text-grey-20 mb-1">
                      Expert-Led Programs
                    </h3>
                    <p className="text-sm">
                      Learn from industry leaders and experts
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Sparkles className="w-5 h-5 text-primary-75" />
                  </div>
                  <div>
                    <h3 className="font-medium text-grey-20 mb-1">
                      Flexible Learning
                    </h3>
                    <p className="text-sm">Study at your own pace, anywhere</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-primary-75 hover:bg-primary-70 text-white px-8 py-6 rounded-lg flex items-center gap-2 text-lg transition-all duration-200 hover:translate-y-[-2px]"
              >
                <Link href="/contact">
                  Get Started Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right side decorative element */}
          <div className="relative w-full lg:w-[420px] h-[320px] bg-gradient-to-br from-primary-95 to-primary-99 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 bg-primary-90 rounded-full opacity-50 blur-xl" />
            </div>
            <div className="absolute inset-0 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-75/10 to-transparent" />
            </div>
            <div className="relative p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-6">
                <GraduationCap className="w-8 h-8 text-primary-75" />
              </div>
              <h3 className="text-2xl font-vietnam font-bold text-grey-15 mb-4">
                Start Learning Today
              </h3>
              <p className="text-grey-35">
                Join thousands of students already learning with Eduwise
                Solutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
