import Image from "next/image";
import Link from "next/link";

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
    <section className="bg-light-99">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="font-vietnam font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
              <span className="text-primary-75">Confused</span> About
              What&apos;s Next?
            </h1>
            <p className="text-grey-35 text-base sm:text-lg md:text-xl mb-6">
              Whether you&apos;re interested in IT Jobs, MBA programs or
              professional courses that get you job-ready, we&apos;re here to
              support you every step of the way!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/courses">
                <Button
                  variant="default"
                  className="bg-primary-75 hover:bg-primary-70 text-white w-full sm:w-auto"
                  size="lg"
                >
                  Explore Courses
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-primary-75 text-primary-75 hover:bg-primary-99 w-full sm:w-auto"
                  size="lg"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative w-full h-[400px] md:h-[500px]">
            <Image
              src="/hero.png"
              alt="hero"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>

        <div className="mt-12 pb-10">
          <h3 className="text-black text-center mb-8 text-sm md:text-lg font-bold">
            Trusted by leading companies
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {partners.map((logo, index) => (
              <div key={index} className="flex justify-center">
                <Image
                  src={logo}
                  alt="Partner logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto grayscale opacity-75 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
