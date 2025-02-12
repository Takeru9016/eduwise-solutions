import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
// import PartnersLogo from "./PartnersLogo";

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Decorative background elements */}
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
              Struggling to find the{" "}
              <span className="text-primary-75 font-semibold animate-bounce inline-block">
                RIGHT JOB
              </span>{" "}
              or the{" "}
              <span className="text-primary-75 font-semibold animate-bounce inline-block">
                PERFECT PROGRAM
              </span>{" "}
              to upskill yourself? 🤔
              <br />
              <span className="bg-gradient-to-r from-primary-50 to-primary-80 text-transparent bg-clip-text font-semibold">
                We&apos;re here to guide you every step of the way! 🚀
              </span>
            </p>

            {/* Feature Points */}
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-primary-75" />
                </div>
                <span className="text-grey-35">Expert-Led Programs</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Target className="w-5 h-5 text-primary-75" />
                </div>
                <span className="text-grey-35">Job-Ready Skills</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/courses">
                <Button
                  variant="default"
                  className="bg-primary-75 hover:bg-primary-70 text-white w-full sm:w-auto px-8 py-6 text-lg rounded-lg flex items-center gap-2 transition-all duration-200 hover:translate-y-[-2px]"
                >
                  Explore Courses
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-2 border-primary-75 text-primary-75 hover:bg-primary-99 w-full sm:w-auto px-8 py-6 text-lg rounded-lg transition-all duration-200"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full">
            <div className="relative w-full h-[400px] md:h-[600px]">
              {/* Main image */}
              <div className="absolute inset-0 transform rotate-2">
                <div className="relative w-full h-full">
                  <Image
                    src="/home/hero.png"
                    alt="Student learning online"
                    fill
                    style={{
                      objectFit: "contain",
                      borderRadius: "24px",
                    }}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        {/* <div className="mt-16 md:mt-20">
          <PartnersLogo />
        </div> */}
      </div>
    </section>
  );
}
