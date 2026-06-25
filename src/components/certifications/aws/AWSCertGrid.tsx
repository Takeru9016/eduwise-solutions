/* eslint-disable @next/next/no-img-element */
import { CERTIFICATIONS, CATEGORY_STYLES, type CertCategory } from "./aws-data";

function CategoryBadge({ cat }: { cat: CertCategory }) {
  const s = CATEGORY_STYLES[cat];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${s.bg} ${s.text} ${s.border}`}
    >
      {cat}
    </span>
  );
}

function CertCard({ cert }: { cert: (typeof CERTIFICATIONS)[number] }) {
  return (
    <article className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300">
      {/* Badge image area */}
      <div className="relative bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center h-44 p-6 border-b border-gray-100 group-hover:from-emerald-50 group-hover:to-teal-50 transition-colors duration-300">
        <img
          src={cert.img}
          alt={`${cert.title} badge`}
          className="h-28 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5 gap-3">
        <CategoryBadge cat={cert.cat} />

        <div>
          <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-emerald-700 transition-colors duration-200">
            {cert.title}
          </h3>
          <p className="text-xs font-mono text-gray-400 mt-0.5">{cert.code}</p>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed flex-grow">
          {cert.desc}
        </p>

        <a
          href="#enquiry-form-section"
          className="mt-auto inline-flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-semibold py-3 px-4 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          aria-label={`Enquire about ${cert.title}`}
        >
          Enquire Now
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </article>
  );
}

export default function AWSCertGrid() {
  const categories: CertCategory[] = [
    "Foundational",
    "Associate",
    "Professional",
    "Specialty",
  ];

  return (
    <section id="certifications" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-3">
            All Certification Tracks
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Available AWS Certifications
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
            AWS offers certifications for learners and professionals at
            different stages of their cloud journey. Choose the track that
            aligns with your career goals.
          </p>
        </div>

        {/* Render by category */}
        {categories.map((cat) => {
          const certs = CERTIFICATIONS.filter((c) => c.cat === cat);
          if (!certs.length) return null;
          const s = CATEGORY_STYLES[cat];
          return (
            <div key={cat} className="mb-14">
              {/* Category label */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${s.bg} ${s.text} ${s.border}`}
                >
                  {cat}
                </span>
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-sm text-gray-400">
                  {certs.length} cert{certs.length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {certs.map((cert) => (
                  <CertCard key={cert.code} cert={cert} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
