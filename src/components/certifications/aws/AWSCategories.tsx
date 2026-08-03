import { Brain, Briefcase, GraduationCap, Network } from "lucide-react";

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

const WHY_MATTERS = [
  {
    body: "AWS Certifications are respected by organizations, recruiters, and hiring managers worldwide — proof of cloud competency.",
    icon: Network,
    title: "Industry Recognition",
  },
  {
    body: "Exams evaluate practical cloud knowledge: AWS services, security, networking, architecture, and operational procedures.",
    icon: GraduationCap,
    title: "Skill Validation",
  },
  {
    body: "Certifications help professionals qualify for specialized cloud roles and gain visibility in competitive hiring processes.",
    icon: Briefcase,
    title: "Career Advancement",
  },
  {
    body: "Cloud technologies evolve rapidly. AWS Certifications keep professionals aligned with current industry trends.",
    icon: Brain,
    title: "Future-Ready Skills",
  },
];

export default function AWSCategories() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* ── Why Certifications Matter ── */}
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block font-semibold text-emerald-600 text-sm uppercase tracking-widest">
            Value Proposition
          </span>
          <h2 className="mb-4 font-extrabold text-3xl text-gray-900 sm:text-4xl">
            Why AWS Certifications Matter
          </h2>
          <p className="mx-auto max-w-2xl text-gray-500">
            AWS Certifications focus on real-world cloud skills and practical
            implementation scenarios, not just theoretical knowledge.
          </p>
        </div>

        <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_MATTERS.map(({ icon: Icon, title, body }) => (
            <div
              className="group rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-all duration-300 hover:border-emerald-200 hover:bg-emerald-50"
              key={title}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 transition-colors group-hover:bg-emerald-200">
                <Icon aria-hidden="true" className="h-6 w-6 text-emerald-700" />
              </div>
              <h3 className="mb-2 font-bold text-gray-900">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* ── Category Explainer ── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Foundational */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-extrabold text-lg text-white">
                F
              </span>
              <h3 className="font-extrabold text-gray-900 text-xl">
                Foundational Certifications
              </h3>
            </div>
            <p className="mb-5 text-gray-700 text-sm leading-relaxed">
              Designed for beginners who want to develop a strong understanding
              of cloud computing concepts and AWS services. The AWS Certified
              Cloud Practitioner and AI Practitioner provide an excellent
              starting point.
            </p>
            <p className="mb-3 font-semibold text-blue-700 text-sm uppercase tracking-wide">
              Suitable for:
            </p>
            <ul className="space-y-2">
              {FOUNDATIONAL_FOR.map((item) => (
                <li
                  className="flex items-center gap-2 text-gray-700 text-sm"
                  key={item}
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Associate */}
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 font-extrabold text-lg text-white">
                A
              </span>
              <h3 className="font-extrabold text-gray-900 text-xl">
                Associate Certifications
              </h3>
            </div>
            <p className="mb-5 text-gray-700 text-sm leading-relaxed">
              Focus on practical implementation skills and real-world cloud
              scenarios. Help professionals demonstrate their ability to work
              with AWS services in production environments and solve real
              business challenges.
            </p>
            <p className="mb-3 font-semibold text-emerald-700 text-sm uppercase tracking-wide">
              Expertise in:
            </p>
            <ul className="space-y-2">
              {ASSOCIATE_FOCUS.map((item) => (
                <li
                  className="flex items-center gap-2 text-gray-700 text-sm"
                  key={item}
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
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
