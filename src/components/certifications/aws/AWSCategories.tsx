import { GraduationCap, Briefcase, Network, Brain } from "lucide-react";

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
    icon: Network,
    title: "Industry Recognition",
    body: "AWS Certifications are respected by organizations, recruiters, and hiring managers worldwide — proof of cloud competency.",
  },
  {
    icon: GraduationCap,
    title: "Skill Validation",
    body: "Exams evaluate practical cloud knowledge: AWS services, security, networking, architecture, and operational procedures.",
  },
  {
    icon: Briefcase,
    title: "Career Advancement",
    body: "Certifications help professionals qualify for specialized cloud roles and gain visibility in competitive hiring processes.",
  },
  {
    icon: Brain,
    title: "Future-Ready Skills",
    body: "Cloud technologies evolve rapidly. AWS Certifications keep professionals aligned with current industry trends.",
  },
];

export default function AWSCategories() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* ── Why Certifications Matter ── */}
        <div className="text-center mb-14">
          <span className="inline-block text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Value Proposition
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Why AWS Certifications Matter
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            AWS Certifications focus on real-world cloud skills and practical
            implementation scenarios, not just theoretical knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {WHY_MATTERS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-emerald-100 group-hover:bg-emerald-200 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <Icon className="w-6 h-6 text-emerald-700" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* ── Category Explainer ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Foundational */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-extrabold text-lg">
                F
              </span>
              <h3 className="text-xl font-extrabold text-gray-900">
                Foundational Certifications
              </h3>
            </div>
            <p className="text-gray-700 mb-5 text-sm leading-relaxed">
              Designed for beginners who want to develop a strong understanding
              of cloud computing concepts and AWS services. The AWS Certified
              Cloud Practitioner and AI Practitioner provide an excellent
              starting point.
            </p>
            <p className="text-sm font-semibold text-blue-700 mb-3 uppercase tracking-wide">
              Suitable for:
            </p>
            <ul className="space-y-2">
              {FOUNDATIONAL_FOR.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Associate */}
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-extrabold text-lg">
                A
              </span>
              <h3 className="text-xl font-extrabold text-gray-900">
                Associate Certifications
              </h3>
            </div>
            <p className="text-gray-700 mb-5 text-sm leading-relaxed">
              Focus on practical implementation skills and real-world cloud
              scenarios. Help professionals demonstrate their ability to work
              with AWS services in production environments and solve real
              business challenges.
            </p>
            <p className="text-sm font-semibold text-emerald-700 mb-3 uppercase tracking-wide">
              Expertise in:
            </p>
            <ul className="space-y-2">
              {ASSOCIATE_FOCUS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
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
