"use client";

import {
  BookOpen,
  Check,
  ChevronDown,
  Clock,
  Layers,
  Lightbulb,
  ListChecks,
} from "lucide-react";
import { useMemo, useState } from "react";
import { CATEGORY_STYLES, type CertCategory } from "./aws-data";
import {
  CERT_SYLLABUS,
  type CertSyllabus,
  type SampleQuestion,
} from "./aws-syllabus-data";

const OPTION_LETTERS = ["A", "B", "C", "D"];
const TIMELINE_DOMAIN_MAX_WEEKS = 12;
const TIMELINE_TICKS = [0, 4, 8, 12];

type SectionId = "overview" | "syllabus" | "qa" | "tips" | "timeline";
type PanelSectionId = Exclude<SectionId, "timeline">;

const SECTIONS: { id: SectionId; label: string; icon: typeof Layers }[] = [
  { icon: Layers, id: "overview", label: "Overview" },
  { icon: ListChecks, id: "syllabus", label: "Syllabus" },
  { icon: BookOpen, id: "qa", label: "Sample Q&A" },
  { icon: Lightbulb, id: "tips", label: "Tips & Resources" },
  { icon: Clock, id: "timeline", label: "Timeline" },
];

function parseWeekRange(weeks: string): [number, number] {
  const [lo, hi] = weeks.split(/[–-]/).map((n) => Number.parseInt(n, 10));
  return [lo, Number.isNaN(hi) ? lo : hi];
}

function CertTab({
  cert,
  active,
  onSelect,
}: {
  cert: CertSyllabus;
  active: boolean;
  onSelect: () => void;
}) {
  const s = CATEGORY_STYLES[cert.level as CertCategory];
  return (
    <button
      aria-selected={active}
      className={`flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border-2 px-4 py-2.5 font-bold text-sm transition-[color,background-color,border-color,box-shadow] duration-200 focus:outline-hidden focus:ring-2 focus:ring-primary-75 lg:w-full lg:shrink lg:justify-start ${
        active
          ? "border-grey-15 bg-primary-75 text-grey-15"
          : `${s.bg} border-grey-15/15 text-grey-35 hover:border-grey-15`
      }`}
      onClick={onSelect}
      role="tab"
      type="button"
    >
      <span className="font-mono">{cert.code}</span>
      <span className="hidden truncate font-normal opacity-80 lg:inline">
        {cert.title}
      </span>
    </button>
  );
}

function SectionTab({
  section,
  active,
  onSelect,
}: {
  section: (typeof SECTIONS)[number];
  active: boolean;
  onSelect: () => void;
}) {
  const Icon = section.icon;
  return (
    <button
      aria-selected={active}
      className={`flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border-2 px-4 py-2.5 font-bold text-sm transition-[color,background-color,border-color,box-shadow] duration-200 focus:outline-hidden focus:ring-2 focus:ring-primary-75 ${
        active
          ? "border-grey-15 bg-grey-15 text-white"
          : "border-grey-15/15 bg-white text-grey-35 hover:border-grey-15"
      }`}
      onClick={onSelect}
      role="tab"
      type="button"
    >
      <Icon aria-hidden="true" className="h-4 w-4" />
      {section.label}
    </button>
  );
}

function OverviewChips({ cert }: { cert: CertSyllabus }) {
  const s = CATEGORY_STYLES[cert.level as CertCategory];
  return (
    <div className="flex flex-wrap gap-2.5">
      <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-grey-15/15 bg-white px-3 py-1.5 font-bold text-grey-35 text-xs">
        <span className="font-mono">{cert.code}</span>
      </span>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border-2 border-grey-15 px-3 py-1.5 font-bold text-xs uppercase tracking-wide ${s.bg} text-grey-15`}
      >
        {cert.level}
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-grey-15/15 bg-white px-3 py-1.5 font-bold text-grey-35 text-xs">
        <Layers aria-hidden="true" className="h-3.5 w-3.5 text-primary-75" />
        {cert.domains.length} Domains
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-grey-15/15 bg-white px-3 py-1.5 font-bold text-grey-35 text-xs">
        <Clock aria-hidden="true" className="h-3.5 w-3.5 text-primary-75" />
        {cert.studyWeeks} weeks study
      </span>
    </div>
  );
}

function SyllabusTable({ cert }: { cert: CertSyllabus }) {
  return (
    <div className="overflow-x-auto rounded-2xl border-2 border-grey-15/15">
      <table className="w-full min-w-140 text-sm">
        <thead>
          <tr className="bg-light-95 text-left text-grey-40 text-xs uppercase tracking-wide">
            <th className="px-4 py-3 font-bold">Domain</th>
            <th className="w-24 px-4 py-3 font-bold">% Weight</th>
            <th className="px-4 py-3 font-bold">Key Topics</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-grey-15/10">
          {cert.domains.map((d) => (
            <tr
              className="align-top transition-colors hover:bg-primary-99"
              key={d.name}
            >
              <td className="px-4 py-4 font-bold text-grey-15">{d.name}</td>
              <td className="px-4 py-4">
                <span className="inline-flex min-w-12 items-center justify-center rounded-lg border-2 border-grey-15 bg-primary-90 px-2 py-1 font-bold text-grey-15 text-xs">
                  {d.percent}%
                </span>
              </td>
              <td className="px-4 py-4 text-grey-35 leading-relaxed">
                {d.keyTopics}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function QuestionCard({ q, index }: { q: SampleQuestion; index: number }) {
  const [revealed, setRevealed] = useState(false);
  const correctOptions = q.answer.split(";").map((s) => s.trim());

  return (
    <div className="rounded-2xl border-2 border-grey-15/15 bg-white p-5 sm:p-6">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90 font-bold text-grey-15 text-xs">
          {index + 1}
        </span>
        <div>
          <span className="font-bold text-primary-75 text-xs uppercase tracking-wide">
            {q.domain}
            {q.multiSelect ? " · Choose all that apply" : ""}
          </span>
          <p className="mt-1 font-bold text-grey-15 leading-snug">
            {q.question}
          </p>
        </div>
      </div>

      <ul className="mb-4 space-y-2">
        {q.options.map((opt, i) => {
          const isCorrect = revealed && correctOptions.includes(opt);
          return (
            <li
              className={`flex items-start gap-3 rounded-xl border-2 px-3.5 py-2.5 text-sm leading-relaxed transition-colors ${
                isCorrect
                  ? "border-grey-15 bg-primary-90 text-grey-15"
                  : "border-grey-15/10 bg-light-97 text-grey-35"
              }`}
              key={opt}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-bold text-xs ${
                  isCorrect
                    ? "border-2 border-grey-15 bg-grey-15 text-white"
                    : "border-2 border-grey-15/15 bg-white text-grey-40"
                }`}
              >
                {isCorrect ? (
                  <Check aria-hidden="true" className="h-3.5 w-3.5" />
                ) : (
                  OPTION_LETTERS[i]
                )}
              </span>
              <span>{opt}</span>
            </li>
          );
        })}
      </ul>

      <button
        aria-expanded={revealed}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-grey-15 bg-grey-15 px-4 py-2 font-bold text-sm text-white transition-colors hover:bg-grey-20 focus:outline-hidden focus:ring-2 focus:ring-primary-75"
        onClick={() => setRevealed((prev) => !prev)}
        type="button"
      >
        {revealed ? "Hide Answer" : "Show Answer"}
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 transition-transform duration-200 ${revealed ? "rotate-180" : ""}`}
        />
      </button>

      {revealed && (
        <div className="mt-4 border-grey-15/10 border-t pt-4">
          <p className="mb-1.5 font-bold text-grey-15 text-sm">
            Answer: <span className="font-semibold">{q.answer}</span>
          </p>
          <p className="text-grey-35 text-sm leading-relaxed">
            {q.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

function CertTimelineChart({
  certs,
  selectedCode,
  onSelect,
}: {
  certs: CertSyllabus[];
  selectedCode: string;
  onSelect: (code: string) => void;
}) {
  const rows = useMemo(
    () =>
      certs
        .map((cert) => {
          const [lo, hi] = parseWeekRange(cert.studyWeeks);
          return { cert, hi, lo };
        })
        .sort((a, b) => a.lo - b.lo || a.hi - b.hi),
    [certs]
  );

  const selectedCert = certs.find((c) => c.code === selectedCode);

  return (
    <div className="rounded-2xl border-2 border-grey-15/15 bg-white p-5 sm:p-6">
      <h4 className="mb-1 font-bold text-grey-15 text-sm uppercase tracking-wide">
        Study Time Across All Certifications
      </h4>
      <p className="mb-5 text-grey-40 text-xs">
        Sorted shortest to longest.{" "}
        <span className="inline-flex items-center gap-1.5 font-bold text-primary-75">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-primary-75"
          />
          {selectedCert?.code} highlighted
        </span>
      </p>

      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-17 left-24"
        >
          {TIMELINE_TICKS.map((t) => (
            <div
              className="absolute inset-y-0 w-px bg-grey-15/10"
              key={t}
              style={{ left: `${(t / TIMELINE_DOMAIN_MAX_WEEKS) * 100}%` }}
            />
          ))}
        </div>

        <div className="relative space-y-1">
          {rows.map(({ cert, lo, hi }) => {
            const isSelected = cert.code === selectedCode;
            const startPct = (lo / TIMELINE_DOMAIN_MAX_WEEKS) * 100;
            const widthPct = Math.max(
              ((hi - lo) / TIMELINE_DOMAIN_MAX_WEEKS) * 100,
              3
            );
            return (
              <button
                aria-current={isSelected}
                className={`grid w-full grid-cols-[84px_1fr_56px] items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors focus:outline-hidden focus:ring-2 focus:ring-primary-75 ${
                  isSelected ? "bg-primary-99" : "hover:bg-light-97"
                }`}
                key={cert.code}
                onClick={() => onSelect(cert.code)}
                title={`${cert.title} (${cert.code}): ${cert.studyWeeks} weeks`}
                type="button"
              >
                <span
                  className={`truncate font-bold font-mono text-xs ${
                    isSelected ? "text-primary-75" : "text-grey-40"
                  }`}
                >
                  {cert.code}
                </span>
                <span className="relative h-2.5 rounded-full bg-light-95">
                  <span
                    className={`absolute inset-y-0 rounded-full transition-colors ${
                      isSelected ? "bg-primary-75" : "bg-grey-60"
                    }`}
                    style={{ left: `${startPct}%`, width: `${widthPct}%` }}
                  />
                </span>
                <span
                  className={`font-bold text-xs tabular-nums ${
                    isSelected ? "text-primary-75" : "text-grey-40"
                  }`}
                >
                  {cert.studyWeeks}w
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-2 grid grid-cols-[84px_1fr_56px] gap-3 px-2">
        <span />
        <div className="relative h-4">
          {TIMELINE_TICKS.map((t) => (
            <span
              className="absolute -translate-x-1/2 font-medium text-[10px] text-grey-40 first:translate-x-0 last:-translate-x-full"
              key={t}
              style={{ left: `${(t / TIMELINE_DOMAIN_MAX_WEEKS) * 100}%` }}
            >
              {t}w
            </span>
          ))}
        </div>
        <span />
      </div>
    </div>
  );
}

function TipsAndResources({ cert }: { cert: CertSyllabus }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border-2 border-grey-15 bg-gold-90 p-5 sm:p-6">
        <h4 className="mb-4 font-bold text-grey-15 text-sm uppercase tracking-wide">
          Study Tips & Pitfalls
        </h4>
        <ul className="space-y-3">
          {cert.studyTips.map((tip) => (
            <li
              className="flex items-start gap-2.5 text-grey-35 text-sm leading-relaxed"
              key={tip}
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-grey-15" />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border-2 border-grey-15/15 bg-white p-5 sm:p-6">
        <h4 className="mb-4 font-bold text-grey-15 text-sm uppercase tracking-wide">
          Study Resources
        </h4>
        <ul className="space-y-2.5">
          {cert.resources.map((r) => (
            <li
              className="flex items-start gap-2.5 rounded-xl px-3 py-2 text-grey-35 text-sm leading-relaxed transition-colors hover:bg-primary-99"
              key={r}
            >
              <BookOpen
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-primary-75"
              />
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SectionPanel({
  cert,
  section,
}: {
  cert: CertSyllabus;
  section: PanelSectionId;
}) {
  switch (section) {
    case "overview":
      return <OverviewChips cert={cert} />;
    case "syllabus":
      return <SyllabusTable cert={cert} />;
    case "qa":
      return (
        <div className="space-y-4">
          {cert.sampleQA.map((q, i) => (
            <QuestionCard index={i} key={i} q={q} />
          ))}
        </div>
      );
    case "tips":
      return <TipsAndResources cert={cert} />;
  }
}

export default function AWSCertSyllabus() {
  const [selectedCode, setSelectedCode] = useState(CERT_SYLLABUS[0].code);
  const [selectedSection, setSelectedSection] = useState<SectionId>("overview");
  const selectedCert =
    CERT_SYLLABUS.find((c) => c.code === selectedCode) ?? CERT_SYLLABUS[0];

  return (
    <section className="bg-white py-16 sm:py-20" id="syllabus">
      <div className="container">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-bold text-grey-15 text-sm">
            Exam Preparation
          </div>
          <h2 className="mb-4 font-black font-vietnam text-3xl text-grey-15 lg:text-5xl">
            Syllabus & Sample Q&amp;A
          </h2>
          <p className="mx-auto max-w-2xl text-grey-35 text-lg">
            Explore official exam blueprints, sample questions, study tips, and
            timelines for every AWS certification we support.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div
              aria-label="Select AWS certification"
              className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-3 lg:mx-0 lg:max-h-[calc(100vh-8rem)] lg:flex-col lg:gap-1.5 lg:overflow-visible lg:overflow-y-auto lg:px-0 lg:pb-0"
              role="tablist"
            >
              {CERT_SYLLABUS.map((cert) => (
                <CertTab
                  active={cert.code === selectedCode}
                  cert={cert}
                  key={cert.code}
                  onSelect={() => setSelectedCode(cert.code)}
                />
              ))}
            </div>
          </aside>

          <div className="min-w-0 rounded-3xl border-2 border-grey-15 bg-light-97 p-5 sm:p-8">
            <div className="mb-6">
              <h3 className="font-black font-vietnam text-grey-15 text-xl sm:text-2xl">
                {selectedCert.title}
              </h3>
              <p className="mt-1 font-mono text-grey-40 text-sm">
                {selectedCert.code}
              </p>
            </div>

            <div
              aria-label="Select syllabus section"
              className="scrollbar-hide -mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
              role="tablist"
            >
              {SECTIONS.map((section) => (
                <SectionTab
                  active={section.id === selectedSection}
                  key={section.id}
                  onSelect={() => setSelectedSection(section.id)}
                  section={section}
                />
              ))}
            </div>

            <div role="tabpanel">
              {selectedSection === "timeline" ? (
                <CertTimelineChart
                  certs={CERT_SYLLABUS}
                  onSelect={setSelectedCode}
                  selectedCode={selectedCert.code}
                />
              ) : (
                <SectionPanel cert={selectedCert} section={selectedSection} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
