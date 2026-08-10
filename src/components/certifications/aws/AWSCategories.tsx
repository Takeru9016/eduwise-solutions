const FOUNDATIONAL_FOR = [
  "Students",
  "Fresh Graduates",
  "Non-Technical Professionals",
  "Business Analysts",
  "Project Managers",
  "Career Changers",
];

const ASSOCIATE_FOCUS = [
  "Cloud Architecture",
  "Application Development",
  "Cloud Operations",
  "Data Engineering",
  "Artificial Intelligence & Machine Learning",
];

export default function AWSCategories() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-bold text-grey-15 text-sm">
            Find Your Level
          </div>
          <h2 className="mb-4 font-black font-vietnam text-3xl text-grey-15 lg:text-5xl">
            Which Certification Track Fits You?
          </h2>
          <p className="mx-auto max-w-2xl text-grey-35 text-lg">
            Most learners start at Foundational or Associate level. Explore
            Professional &amp; Specialty tracks in the certification grid above
            once you&apos;re ready to go deeper.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border-2 border-grey-15 bg-primary-99 p-8 shadow-[4px_4px_0_0_var(--color-grey-15)]">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-grey-15 bg-white font-black text-grey-15 text-lg">
                F
              </span>
              <h3 className="font-black font-vietnam text-grey-15 text-xl">
                Foundational Certifications
              </h3>
            </div>
            <p className="mb-5 text-grey-35 text-sm leading-relaxed">
              Designed for beginners who want to develop a strong understanding
              of cloud computing concepts and AWS services. The AWS Certified
              Cloud Practitioner and AI Practitioner provide an excellent
              starting point.
            </p>
            <p className="mb-3 font-bold text-grey-15 text-sm uppercase tracking-wide">
              Suitable for:
            </p>
            <ul className="space-y-2">
              {FOUNDATIONAL_FOR.map((item) => (
                <li
                  className="flex items-center gap-2 text-grey-35 text-sm"
                  key={item}
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-grey-15" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border-2 border-grey-15 bg-gold-90 p-8 shadow-[4px_4px_0_0_var(--color-grey-15)]">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-grey-15 bg-white font-black text-grey-15 text-lg">
                A
              </span>
              <h3 className="font-black font-vietnam text-grey-15 text-xl">
                Associate Certifications
              </h3>
            </div>
            <p className="mb-5 text-grey-35 text-sm leading-relaxed">
              Focus on practical implementation skills and real-world cloud
              scenarios. Help professionals demonstrate their ability to work
              with AWS services in production environments and solve real
              business challenges.
            </p>
            <p className="mb-3 font-bold text-grey-15 text-sm uppercase tracking-wide">
              Expertise in:
            </p>
            <ul className="space-y-2">
              {ASSOCIATE_FOCUS.map((item) => (
                <li
                  className="flex items-center gap-2 text-grey-35 text-sm"
                  key={item}
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-grey-15" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
