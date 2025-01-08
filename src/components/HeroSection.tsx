import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function Hero() {
  const partners = [
    "/images/partners/netflix.svg",
    "/images/partners/google.svg",
    "/images/partners/microsoft.svg",
    "/images/partners/ibm.svg",
    "/images/partners/tesla.svg",
    "/images/partners/amazon.svg",
  ];

  return (
    <section className="bg-light-99 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-[1200px] mx-auto text-left">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="font-vietnam font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
                <span className="text-primary-75">Confused</span> About
                What&apos;s Next?
              </h1>
              <p className="text-grey-35 text-base sm:text-lg md:text-xl max-w-2xl mb-6 md:mb-8 font-vietnam">
                Whether you&apos;re interested in IT Jobs, MBA programs or
                professional courses that get you job-ready, we&apos;re here to
                support you every step of the way!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
                <Button
                  variant="default"
                  className="bg-primary-75 hover:bg-primary-70 text-white w-full sm:w-auto"
                  size="lg"
                >
                  Explore Courses
                </Button>
                <Button
                  variant="outline"
                  className="border-primary-75 text-primary-75 hover:bg-primary-99 w-full sm:w-auto"
                  size="lg"
                >
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="relative w-full md:w-1/2 h-96 md:h-[500px] lg:h-[600px] mb-8 md:mb-12">
              <Image src="/hero.png" alt="hero" width={1000} height={1000} />
            </div>
          </div>
          Partner Logos
          <div className="mt-12 md:mt-16 lg:mt-20">
            <p className="text-grey-40 mb-6 text-sm md:text-base">
              Trusted by leading companies
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 items-center opacity-50">
              {partners.map((logo, index) => (
                <div key={index} className="flex justify-center">
                  <Image
                    src={logo}
                    alt="Partner logo"
                    width={120}
                    height={40}
                    className="h-8 md:h-10 w-auto grayscale opacity-75 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
