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
      className={`flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border px-4 py-2.5 font-semibold text-sm transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 lg:w-full lg:shrink lg:justify-start ${
        active
          ? "border-emerald-600 bg-emerald-600 text-white shadow-md"
          : `${s.bg} ${s.border} ${s.text} hover:border-emerald-200 hover:bg-white`
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
      className={`flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border px-4 py-2.5 font-semibold text-sm transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 ${
        active
          ? "border-gray-900 bg-gray-900 text-white shadow-md"
          : "border-gray-200 bg-white text-gray-600 hover:border-emerald-200 hover:text-emerald-700"
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
      <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 font-semibold text-gray-700 text-xs">
        <span className="font-mono">{cert.code}</span>
      </span>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-bold text-xs uppercase tracking-wide ${s.bg} ${s.text} ${s.border}`}
      >
        {cert.level}
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 font-semibold text-gray-700 text-xs">
        <Layers aria-hidden="true" className="h-3.5 w-3.5 text-emerald-600" />
        {cert.domains.length} Domains
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 font-semibold text-gray-700 text-xs">
        <Clock aria-hidden="true" className="h-3.5 w-3.5 text-emerald-600" />
        {cert.studyWeeks} weeks study
      </span>
    </div>
  );
}

function SyllabusTable({ cert }: { cert: CertSyllabus }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wide">
            <th className="px-4 py-3 font-semibold">Domain</th>
            <th className="w-24 px-4 py-3 font-semibold">% Weight</th>
            <th className="px-4 py-3 font-semibold">Key Topics</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {cert.domains.map((d) => (
            <tr
              className="align-top transition-colors hover:bg-emerald-50/40"
              key={d.name}
            >
              <td className="px-4 py-4 font-semibold text-gray-900">
                {d.name}
              </td>
              <td className="px-4 py-4">
                <span className="inline-flex min-w-12 items-center justify-center rounded-lg bg-emerald-100 px-2 py-1 font-bold text-emerald-700 text-xs">
                  {d.percent}%
                </span>
              </td>
              <td className="px-4 py-4 text-gray-600 leading-relaxed">
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
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 font-bold text-emerald-700 text-xs">
          {index + 1}
        </span>
        <div>
          <span className="font-semibold text-emerald-600 text-xs uppercase tracking-wide">
            {q.domain}
            {q.multiSelect ? " · Choose all that apply" : ""}
          </span>
          <p className="mt-1 font-semibold text-gray-900 leading-snug">
            {q.question}
          </p>
        </div>
      </div>

      <ul className="mb-4 space-y-2">
        {q.options.map((opt, i) => {
          const isCorrect = revealed && correctOptions.includes(opt);
          return (
            <li
              className={`flex items-start gap-3 rounded-xl border px-3.5 py-2.5 text-sm leading-relaxed transition-colors ${
                isCorrect
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                  : "border-gray-100 bg-gray-50 text-gray-700"
              }`}
              key={opt}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-bold text-xs ${
                  isCorrect
                    ? "bg-emerald-600 text-white"
                    : "border border-gray-200 bg-white text-gray-500"
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
        className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 font-semibold text-sm text-white transition-colors hover:bg-gray-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
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
        <div className="mt-4 border-gray-100 border-t pt-4">
          <p className="mb-1.5 font-bold text-emerald-700 text-sm">
            Answer:{" "}
            <span className="font-semibold text-gray-800">{q.answer}</span>
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
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
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h4 className="mb-1 font-bold text-gray-900 text-sm uppercase tracking-wide">
        Study Time Across All Certifications
      </h4>
      <p className="mb-5 text-gray-400 text-xs">
        Sorted shortest to longest.{" "}
        <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-emerald-600"
          />
          {selectedCert?.code} highlighted
        </span>
      </p>

      <div className="relative">
        {/* Gridlines aligned to the track column */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-[68px] left-[96px]"
        >
          {TIMELINE_TICKS.map((t) => (
            <div
              className="absolute inset-y-0 w-px bg-gray-100"
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
                className={`grid w-full grid-cols-[84px_1fr_56px] items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors focus:outline-hidden focus:ring-2 focus:ring-emerald-500 ${
                  isSelected ? "bg-emerald-50" : "hover:bg-gray-50"
                }`}
                key={cert.code}
                onClick={() => onSelect(cert.code)}
                title={`${cert.title} (${cert.code}): ${cert.studyWeeks} weeks`}
                type="button"
              >
                <span
                  className={`truncate font-mono font-semibold text-xs ${
                    isSelected ? "text-emerald-700" : "text-gray-500"
                  }`}
                >
                  {cert.code}
                </span>
                <span className="relative h-2.5 rounded-full bg-gray-100">
                  <span
                    className={`absolute inset-y-0 rounded-full transition-colors ${
                      isSelected ? "bg-emerald-600" : "bg-gray-400"
                    }`}
                    style={{ left: `${startPct}%`, width: `${widthPct}%` }}
                  />
                </span>
                <span
                  className={`font-semibold text-xs tabular-nums ${
                    isSelected ? "text-emerald-700" : "text-gray-400"
                  }`}
                >
                  {cert.studyWeeks}w
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Axis */}
      <div className="mt-2 grid grid-cols-[84px_1fr_56px] gap-3 px-2">
        <span />
        <div className="relative h-4">
          {TIMELINE_TICKS.map((t) => (
            <span
              className="absolute -translate-x-1/2 font-medium text-[10px] text-gray-400 first:translate-x-0 last:-translate-x-full"
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
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
        <h4 className="mb-4 font-bold text-gray-900 text-sm uppercase tracking-wide">
          Study Tips & Pitfalls
        </h4>
        <ul className="space-y-3">
          {cert.studyTips.map((tip) => (
            <li
              className="flex items-start gap-2.5 text-gray-700 text-sm leading-relaxed"
              key={tip}
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <h4 className="mb-4 font-bold text-gray-900 text-sm uppercase tracking-wide">
          Study Resources
        </h4>
        <ul className="space-y-2.5">
          {cert.resources.map((r) => (
            <li
              className="flex items-start gap-2.5 rounded-xl px-3 py-2 text-gray-700 text-sm leading-relaxed transition-colors hover:bg-emerald-50"
              key={r}
            >
              <BookOpen
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
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
    <section className="bg-white py-20" id="syllabus">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block font-semibold text-emerald-600 text-sm uppercase tracking-widest">
            Exam Preparation
          </span>
          <h2 className="mb-4 font-extrabold text-3xl text-gray-900 sm:text-4xl">
            Syllabus & Sample Q&amp;A
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-500 leading-relaxed">
            Explore official exam blueprints, sample questions, study tips, and
            timelines for every AWS certification we support.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
          {/* Cert Selector — sidebar on desktop, scroll pills on mobile */}
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

          {/* Selected Cert Content */}
          <div className="min-w-0 rounded-3xl border border-gray-100 bg-gray-50 p-5 sm:p-8">
            <div className="mb-6">
              <h3 className="font-extrabold text-gray-900 text-xl sm:text-2xl">
                {selectedCert.title}
              </h3>
              <p className="mt-1 font-mono text-gray-400 text-sm">
                {selectedCert.code}
              </p>
            </div>

            {/* Section Tabs */}
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
