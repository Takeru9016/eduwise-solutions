"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  Check,
  Clock,
  Layers,
  BookOpen,
  Lightbulb,
  ListChecks,
} from "lucide-react";
import { CATEGORY_STYLES, type CertCategory } from "./aws-data";
import { CERT_SYLLABUS, type CertSyllabus, type SampleQuestion } from "./aws-syllabus-data";

const OPTION_LETTERS = ["A", "B", "C", "D"];
const TIMELINE_DOMAIN_MAX_WEEKS = 12;
const TIMELINE_TICKS = [0, 4, 8, 12];

type SectionId = "overview" | "syllabus" | "qa" | "tips" | "timeline";
type PanelSectionId = Exclude<SectionId, "timeline">;

const SECTIONS: { id: SectionId; label: string; icon: typeof Layers }[] = [
  { id: "overview", label: "Overview", icon: Layers },
  { id: "syllabus", label: "Syllabus", icon: ListChecks },
  { id: "qa", label: "Sample Q&A", icon: BookOpen },
  { id: "tips", label: "Tips & Resources", icon: Lightbulb },
  { id: "timeline", label: "Timeline", icon: Clock },
];

function parseWeekRange(weeks: string): [number, number] {
  const [lo, hi] = weeks.split(/[–-]/).map((n) => parseInt(n, 10));
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
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onSelect}
      className={`shrink-0 lg:w-full lg:shrink lg:justify-start min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${active
          ? "bg-emerald-600 border-emerald-600 text-white shadow-md"
          : `${s.bg} ${s.border} ${s.text} hover:bg-white hover:border-emerald-200`
        }`}
    >
      <span className="font-mono">{cert.code}</span>
      <span className="hidden lg:inline font-normal opacity-80 truncate">
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
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onSelect}
      className={`shrink-0 min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${active
          ? "bg-gray-900 border-gray-900 text-white shadow-md"
          : "bg-white border-gray-200 text-gray-600 hover:border-emerald-200 hover:text-emerald-700"
        }`}
    >
      <Icon className="w-4 h-4" aria-hidden="true" />
      {section.label}
    </button>
  );
}

function OverviewChips({ cert }: { cert: CertSyllabus }) {
  const s = CATEGORY_STYLES[cert.level as CertCategory];
  return (
    <div className="flex flex-wrap gap-2.5">
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-700">
        <span className="font-mono">{cert.code}</span>
      </span>
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wide ${s.bg} ${s.text} ${s.border}`}
      >
        {cert.level}
      </span>
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-700">
        <Layers className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
        {cert.domains.length} Domains
      </span>
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-700">
        <Clock className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
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
          <tr className="bg-gray-50 text-left text-gray-500 uppercase text-xs tracking-wide">
            <th className="px-4 py-3 font-semibold">Domain</th>
            <th className="px-4 py-3 font-semibold w-24">% Weight</th>
            <th className="px-4 py-3 font-semibold">Key Topics</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {cert.domains.map((d) => (
            <tr key={d.name} className="align-top hover:bg-emerald-50/40 transition-colors">
              <td className="px-4 py-4 font-semibold text-gray-900">{d.name}</td>
              <td className="px-4 py-4">
                <span className="inline-flex items-center justify-center min-w-[3rem] px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs">
                  {d.percent}%
                </span>
              </td>
              <td className="px-4 py-4 text-gray-600 leading-relaxed">{d.keyTopics}</td>
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
      <div className="flex items-start gap-3 mb-4">
        <span className="shrink-0 w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">
          {index + 1}
        </span>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
            {q.domain}
            {q.multiSelect ? " · Choose all that apply" : ""}
          </span>
          <p className="text-gray-900 font-semibold leading-snug mt-1">
            {q.question}
          </p>
        </div>
      </div>

      <ul className="space-y-2 mb-4">
        {q.options.map((opt, i) => {
          const isCorrect = revealed && correctOptions.includes(opt);
          return (
            <li
              key={opt}
              className={`flex items-start gap-3 px-3.5 py-2.5 rounded-xl border text-sm leading-relaxed transition-colors ${isCorrect
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                  : "bg-gray-50 border-gray-100 text-gray-700"
                }`}
            >
              <span
                className={`shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${isCorrect
                    ? "bg-emerald-600 text-white"
                    : "bg-white border border-gray-200 text-gray-500"
                  }`}
              >
                {isCorrect ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : OPTION_LETTERS[i]}
              </span>
              <span>{opt}</span>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => setRevealed((prev) => !prev)}
        aria-expanded={revealed}
        className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        {revealed ? "Hide Answer" : "Show Answer"}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${revealed ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {revealed && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm font-bold text-emerald-700 mb-1.5">
            Answer: <span className="font-semibold text-gray-800">{q.answer}</span>
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">{q.explanation}</p>
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
  const rows = useMemo(() => {
    return certs
      .map((cert) => {
        const [lo, hi] = parseWeekRange(cert.studyWeeks);
        return { cert, lo, hi };
      })
      .sort((a, b) => a.lo - b.lo || a.hi - b.hi);
  }, [certs]);

  const selectedCert = certs.find((c) => c.code === selectedCode);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h4 className="text-sm font-bold uppercase tracking-wide text-gray-900 mb-1">
        Study Time Across All Certifications
      </h4>
      <p className="text-xs text-gray-400 mb-5">
        Sorted shortest to longest.{" "}
        <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-600" aria-hidden="true" />
          {selectedCert?.code} highlighted
        </span>
      </p>

      <div className="relative">
        {/* Gridlines aligned to the track column */}
        <div
          className="pointer-events-none absolute inset-y-0 left-[96px] right-[68px]"
          aria-hidden="true"
        >
          {TIMELINE_TICKS.map((t) => (
            <div
              key={t}
              className="absolute inset-y-0 w-px bg-gray-100"
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
                key={cert.code}
                type="button"
                onClick={() => onSelect(cert.code)}
                aria-current={isSelected}
                title={`${cert.title} (${cert.code}): ${cert.studyWeeks} weeks`}
                className={`w-full grid grid-cols-[84px_1fr_56px] gap-3 items-center px-2 py-1.5 rounded-lg text-left transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${isSelected ? "bg-emerald-50" : "hover:bg-gray-50"
                  }`}
              >
                <span
                  className={`text-xs font-mono font-semibold truncate ${isSelected ? "text-emerald-700" : "text-gray-500"
                    }`}
                >
                  {cert.code}
                </span>
                <span className="relative h-2.5 rounded-full bg-gray-100">
                  <span
                    className={`absolute inset-y-0 rounded-full transition-colors ${isSelected ? "bg-emerald-600" : "bg-gray-400"
                      }`}
                    style={{ left: `${startPct}%`, width: `${widthPct}%` }}
                  />
                </span>
                <span
                  className={`text-xs font-semibold tabular-nums ${isSelected ? "text-emerald-700" : "text-gray-400"
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
      <div className="grid grid-cols-[84px_1fr_56px] gap-3 mt-2 px-2">
        <span />
        <div className="relative h-4">
          {TIMELINE_TICKS.map((t) => (
            <span
              key={t}
              className="absolute -translate-x-1/2 first:translate-x-0 last:-translate-x-full text-[10px] font-medium text-gray-400"
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
        <h4 className="text-sm font-bold uppercase tracking-wide text-gray-900 mb-4">
          Study Tips & Pitfalls
        </h4>
        <ul className="space-y-3">
          {cert.studyTips.map((tip) => (
            <li key={tip} className="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed">
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <h4 className="text-sm font-bold uppercase tracking-wide text-gray-900 mb-4">
          Study Resources
        </h4>
        <ul className="space-y-2.5">
          {cert.resources.map((r) => (
            <li
              key={r}
              className="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed px-3 py-2 rounded-xl hover:bg-emerald-50 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
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
            <QuestionCard key={i} q={q} index={i} />
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
    <section id="syllabus" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Exam Preparation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Syllabus & Sample Q&amp;A
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
            Explore official exam blueprints, sample questions, study tips,
            and timelines for every AWS certification we support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
          {/* Cert Selector — sidebar on desktop, scroll pills on mobile */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div
              role="tablist"
              aria-label="Select AWS certification"
              className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide lg:flex-col lg:overflow-visible lg:pb-0 lg:mx-0 lg:px-0 lg:gap-1.5 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto"
            >
              {CERT_SYLLABUS.map((cert) => (
                <CertTab
                  key={cert.code}
                  cert={cert}
                  active={cert.code === selectedCode}
                  onSelect={() => setSelectedCode(cert.code)}
                />
              ))}
            </div>
          </aside>

          {/* Selected Cert Content */}
          <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5 sm:p-8 min-w-0">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                {selectedCert.title}
              </h3>
              <p className="text-sm font-mono text-gray-400 mt-1">
                {selectedCert.code}
              </p>
            </div>

            {/* Section Tabs */}
            <div
              role="tablist"
              aria-label="Select syllabus section"
              className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-5 px-5 scrollbar-hide sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 lg:flex-wrap lg:overflow-visible"
            >
              {SECTIONS.map((section) => (
                <SectionTab
                  key={section.id}
                  section={section}
                  active={section.id === selectedSection}
                  onSelect={() => setSelectedSection(section.id)}
                />
              ))}
            </div>

            <div role="tabpanel">
              {selectedSection === "timeline" ? (
                <CertTimelineChart
                  certs={CERT_SYLLABUS}
                  selectedCode={selectedCert.code}
                  onSelect={setSelectedCode}
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
