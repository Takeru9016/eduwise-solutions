"use client";

import {
  Check,
  HelpCircle,
  ListChecks,
  type LucideIcon,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";
import { useState } from "react";
import type { CourseOverviewTab } from "@/types/course";

const ICON_MAP: Record<string, LucideIcon> = {
  HelpCircle,
  ListChecks,
  TrendingUp,
  Users,
  Workflow,
};

function getIcon(name?: string): LucideIcon {
  if (!name) {
    return HelpCircle;
  }
  return ICON_MAP[name] || HelpCircle;
}

function OverviewTabButton({
  tab,
  active,
  onSelect,
}: {
  active: boolean;
  onSelect: () => void;
  tab: CourseOverviewTab;
}) {
  const Icon = getIcon(tab.icon);
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
      {tab.tabLabel}
    </button>
  );
}

function OverviewPanel({ tab }: { tab: CourseOverviewTab }) {
  return (
    <div>
      <h3 className="mb-3 font-black font-vietnam text-grey-15 text-xl sm:text-2xl">
        {tab.title}
      </h3>
      {tab.body && <p className="text-grey-35 leading-relaxed">{tab.body}</p>}
      {tab.bullets && tab.bullets.length > 0 && (
        <ul className="mt-4 space-y-2.5">
          {tab.bullets.map((bullet) => (
            <li className="flex items-start gap-2.5" key={bullet}>
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90">
                <Check className="h-3 w-3 text-grey-15" />
              </div>
              <span className="text-grey-35 text-sm leading-relaxed">
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function CourseOverviewTabs({
  overview,
}: {
  overview: CourseOverviewTab[];
}) {
  const [selectedLabel, setSelectedLabel] = useState(overview[0].tabLabel);
  const selectedTab =
    overview.find((tab) => tab.tabLabel === selectedLabel) ?? overview[0];

  return (
    <section>
      <h2 className="mb-8 font-black font-vietnam text-2xl text-grey-15 sm:text-3xl">
        Course Overview
      </h2>
      <div className="min-w-0 rounded-3xl border-2 border-grey-15 bg-light-97 p-5 sm:p-8">
        <div
          aria-label="Select overview section"
          className="scrollbar-hide -mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
          role="tablist"
        >
          {overview.map((tab) => (
            <OverviewTabButton
              active={tab.tabLabel === selectedLabel}
              key={tab.tabLabel}
              onSelect={() => setSelectedLabel(tab.tabLabel)}
              tab={tab}
            />
          ))}
        </div>

        <div role="tabpanel">
          <OverviewPanel tab={selectedTab} />
        </div>
      </div>
    </section>
  );
}
