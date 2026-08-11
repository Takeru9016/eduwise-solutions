/* eslint-disable @next/next/no-img-element */
import { ArrowRight, BookOpen } from "lucide-react";
import { CATEGORY_STYLES, CERTIFICATIONS, type CertCategory } from "./aws-data";

const CARD_TINTS = [
  "bg-primary-99",
  "bg-gold-90",
  "bg-white",
  "bg-primary-90",
  "bg-light-95",
  "bg-primary-95",
] as const;

function CategoryBadge({ cat }: { cat: CertCategory }) {
  return (
    <span className="inline-flex items-center rounded-full border-2 border-grey-15 bg-white px-3 py-1 font-bold text-grey-15 text-xs uppercase tracking-wider">
      {cat}
    </span>
  );
}

function CertCard({
  cert,
  tint,
}: {
  cert: (typeof CERTIFICATIONS)[number];
  tint: string;
}) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-grey-15 shadow-[4px_4px_0_0_var(--color-grey-15)] transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-grey-15)] ${tint}`}
    >
      <div className="flex h-40 items-center justify-center border-grey-15/10 border-b bg-white/60 p-6">
        <img
          alt={`${cert.title} badge`}
          className="h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          src={cert.img}
        />
      </div>

      <div className="flex grow flex-col gap-3 p-5">
        <CategoryBadge cat={cert.cat} />

        <div>
          <h3 className="font-bold font-vietnam text-base text-grey-15 leading-snug">
            {cert.title}
          </h3>
          <p className="mt-0.5 font-mono text-grey-40 text-xs">{cert.code}</p>
        </div>

        <p className="grow text-grey-35 text-sm leading-relaxed">{cert.desc}</p>

        <div className="mt-auto flex flex-col gap-2">
          <a
            aria-label={`View syllabus for ${cert.title}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-grey-15 bg-white px-4 py-2.5 font-bold text-grey-15 text-sm transition-colors hover:bg-primary-90"
            href="#syllabus"
          >
            <BookOpen className="h-4 w-4" />
            View Syllabus
          </a>
          <a
            aria-label={`Enquire about ${cert.title}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 px-4 py-2.5 font-bold text-grey-15 text-sm transition-colors hover:bg-primary-90"
            href="#enquiry-form-section"
          >
            Enquire Now
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
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

  let tintIndex = 0;

  return (
    <section className="bg-light-97 py-16 sm:py-20" id="certifications">
      <div className="container">
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-bold text-grey-15 text-sm">
            All Certification Tracks
          </div>
          <h2 className="mb-4 font-black font-vietnam text-3xl text-grey-15 lg:text-5xl">
            Available AWS Certifications
          </h2>
          <p className="mx-auto max-w-2xl text-grey-35 text-lg">
            AWS offers certifications for learners and professionals at
            different stages of their cloud journey. Choose the track that
            aligns with your career goals.
          </p>
        </div>

        {categories.map((cat) => {
          const certs = CERTIFICATIONS.filter((c) => c.cat === cat);
          if (!certs.length) {
            return null;
          }
          const s = CATEGORY_STYLES[cat];
          return (
            <div className="mb-14" key={cat}>
              <div className="mb-6 flex items-center gap-3">
                <span
                  className={`rounded-full border-2 border-grey-15 px-3 py-1 font-bold text-xs uppercase tracking-wider ${s.bg} text-grey-15`}
                >
                  {cat}
                </span>
                <div className="h-px flex-1 bg-grey-15/10" />
                <span className="text-grey-40 text-sm">
                  {certs.length} cert{certs.length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {certs.map((cert) => {
                  const tint = CARD_TINTS[tintIndex % CARD_TINTS.length];
                  tintIndex++;
                  return <CertCard cert={cert} key={cert.code} tint={tint} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
