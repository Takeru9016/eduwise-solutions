/* eslint-disable @next/next/no-img-element */
import { CATEGORY_STYLES, CERTIFICATIONS, type CertCategory } from "./aws-data";

function CategoryBadge({ cat }: { cat: CertCategory }) {
  const s = CATEGORY_STYLES[cat];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-bold text-xs uppercase tracking-wider ${s.bg} ${s.text} ${s.border}`}
    >
      {cat}
    </span>
  );
}

function CertCard({ cert }: { cert: (typeof CERTIFICATIONS)[number] }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">
      {/* Badge image area */}
      <div className="relative flex h-44 items-center justify-center border-gray-100 border-b bg-linear-to-br from-slate-50 to-gray-100 p-6 transition-colors duration-300 group-hover:from-emerald-50 group-hover:to-teal-50">
        <img
          alt={`${cert.title} badge`}
          className="h-28 w-auto object-contain drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          src={cert.img}
        />
      </div>

      {/* Content */}
      <div className="flex grow flex-col gap-3 p-5">
        <CategoryBadge cat={cert.cat} />

        <div>
          <h3 className="font-bold text-base text-gray-900 leading-snug transition-colors duration-200 group-hover:text-emerald-700">
            {cert.title}
          </h3>
          <p className="mt-0.5 font-mono text-gray-400 text-xs">{cert.code}</p>
        </div>

        <p className="grow text-gray-600 text-sm leading-relaxed">
          {cert.desc}
        </p>

        <a
          aria-label={`Enquire about ${cert.title}`}
          className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-sm text-white transition-colors duration-200 hover:bg-emerald-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:bg-emerald-800"
          href="#enquiry-form-section"
        >
          Enquire Now
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M17 8l4 4m0 0l-4 4m4-4H3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
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
    <section className="bg-gray-50 py-20" id="certifications">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block font-semibold text-emerald-600 text-sm uppercase tracking-widest">
            All Certification Tracks
          </span>
          <h2 className="mb-4 font-extrabold text-3xl text-gray-900 sm:text-4xl">
            Available AWS Certifications
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-500 leading-relaxed">
            AWS offers certifications for learners and professionals at
            different stages of their cloud journey. Choose the track that
            aligns with your career goals.
          </p>
        </div>

        {/* Render by category */}
        {categories.map((cat) => {
          const certs = CERTIFICATIONS.filter((c) => c.cat === cat);
          if (!certs.length) {
            return null;
          }
          const s = CATEGORY_STYLES[cat];
          return (
            <div className="mb-14" key={cat}>
              {/* Category label */}
              <div className="mb-6 flex items-center gap-3">
                <span
                  className={`rounded-full border px-3 py-1 font-bold text-xs uppercase tracking-wider ${s.bg} ${s.text} ${s.border}`}
                >
                  {cat}
                </span>
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-gray-400 text-sm">
                  {certs.length} cert{certs.length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {certs.map((cert) => (
                  <CertCard cert={cert} key={cert.code} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
