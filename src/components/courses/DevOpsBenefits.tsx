"use client";

import Image from "next/image";

export default function DevOpsBenefits() {
  const logos: { src: string; alt: string }[] = [
    { src: "/partners/accenture.svg", alt: "Accenture" },
    { src: "/partners/amazon.svg", alt: "Amazon" },
    { src: "/partners/capgemini.svg", alt: "Capgemini" },
    { src: "/partners/hcl.svg", alt: "HCL" },
    { src: "/partners/ibm.svg", alt: "IBM" },
    { src: "/partners/infosys.svg", alt: "Infosys" },
    { src: "/partners/samsung.svg", alt: "Samsung" },
    { src: "/partners/tcs.png", alt: "TCS" },
    { src: "/partners/tech_mahindra.svg", alt: "Tech Mahindra" },
    { src: "/partners/wipro.svg", alt: "Wipro" },
  ];

  return (
    <section className="py-16 bg-light-97">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-vietnam font-bold text-grey-15">
            Our Hiring Partners for DevOps roles
          </h2>
          <p className="text-grey-35 mt-4 leading-relaxed">
            This EduWise DevOps Training will help you become job-ready and
            build a strong foundation for high-demand roles. EduWise&apos;s
            in-house DevOps training empowers you to start a high-paying career
            as a DevOps Engineer.
          </p>
        </div>

        {/* Partner Logos - Infinite Scroll */}
        <div className="bg-white rounded-2xl shadow-lg border border-light-90 p-6 md:p-8 overflow-hidden">
          <div className="relative">
            {/* Scrolling container */}
            <div className="flex animate-scroll">
              {/* First set of logos */}
              <div className="flex flex-shrink-0 gap-6">
                {logos.map((logo, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex items-center justify-center px-6 py-4 rounded-xl border border-light-90 hover:border-primary-90 transition-all duration-300 bg-primary-99/40 hover:shadow-md min-w-[180px]"
                    title={logo.alt}
                  >
                    <Image
                      src={logo.src}
                      alt={`${logo.alt} logo`}
                      width={120}
                      height={60}
                      className="max-h-12 h-auto w-auto opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="flex flex-shrink-0 gap-6 ml-6">
                {logos.map((logo, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex items-center justify-center px-6 py-4 rounded-xl border border-light-90 hover:border-primary-90 transition-all duration-300 bg-primary-99/40 hover:shadow-md min-w-[180px]"
                    title={logo.alt}
                  >
                    <Image
                      src={logo.src}
                      alt={`${logo.alt} logo`}
                      width={120}
                      height={60}
                      className="max-h-12 h-auto w-auto opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
