"use client";

import Image from "next/image";

export default function DevOpsBenefits() {
  const logos: { src: string; alt: string }[] = [
    { src: "/partners/amazon.svg", alt: "Amazon" },
    { src: "/partners/ibm.svg", alt: "IBM" },
    { src: "/partners/hcl.svg", alt: "HCL" },
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
            DevOps Training Course Benefits
          </h2>
          <p className="text-grey-35 mt-4 leading-relaxed">
            This EduWise DevOps Training will help you become job-ready and
            build a strong foundation for high-demand roles. EduWise&apos;s in-house
            DevOps training empowers you to start a high-paying career as a
            DevOps Engineer.
          </p>
        </div>

        {/* Partner Logos */}
        <div className="bg-white rounded-2xl shadow-lg border border-light-90 p-6 md:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
            {logos.map((logo) => (
              <div
                key={logo.alt}
                className="flex items-center justify-center px-4 py-3 rounded-xl border border-light-90 hover:border-primary-90 transition-colors bg-primary-99/40"
                title={logo.alt}
              >
                <Image
                  src={logo.src}
                  alt={`${logo.alt} logo`}
                  width={120}
                  height={120}
                  className="max-h-10 h-auto w-auto opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
