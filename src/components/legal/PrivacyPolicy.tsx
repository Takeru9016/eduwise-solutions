"use client";

import {
  CheckCircle,
  Database,
  FileText,
  Lock,
  Mail,
  Shield,
} from "lucide-react";
import { useState } from "react";

interface PrivacyFeature {
  icon: React.ElementType;
  items: string[];
  title: string;
}

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "details", label: "Details" },
  { id: "rights", label: "Your Rights" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const FeatureCard = ({ icon: Icon, title, items }: PrivacyFeature) => (
  <div className="rounded-2xl border-2 border-grey-15 bg-white p-6 shadow-[4px_4px_0_0_var(--color-grey-15)]">
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90">
        <Icon className="h-5 w-5 text-grey-15" />
      </div>
      <h3 className="font-bold font-vietnam text-grey-15 text-lg">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item) => (
        <li className="flex items-center gap-2 text-grey-35 text-sm" key={item}>
          <CheckCircle className="h-4 w-4 shrink-0 text-primary-75" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const InfoSection = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h3 className="mb-3 font-bold text-grey-15">{title}</h3>
    <ul className="space-y-2">
      {items.map((item) => (
        <li className="flex items-start gap-2 text-grey-35 text-sm" key={item}>
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-grey-15" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default function PrivacyPolicyPage() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const lastUpdated = "January 1, 2026";

  const dataCollectionItems = [
    "Personal Details",
    "Contact Information",
    "Technical Usage Data",
  ];

  const dataProtectionItems = [
    "End-to-End Encryption",
    "Regular Security Audits",
    "Strict Access Controls",
  ];

  const personalInfoItems = [
    "Name and contact details",
    "Email address",
    "Phone number",
    "Educational background",
    "Employment history",
  ];

  const technicalInfoItems = [
    "Device information",
    "IP address",
    "Browser type",
    "Usage data",
  ];

  const privacyRightsItems = [
    "Access and review your personal information",
    "Request corrections to your data",
    "Request deletion of your data",
    "Object to specific data processing activities",
    "Request data portability",
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-light-97 py-16 sm:py-20 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-bold text-grey-15 text-sm sm:mb-8">
              <Shield className="h-4 w-4" />
              Privacy & Security
            </div>

            <h1 className="mb-4 font-black font-vietnam text-3xl text-grey-15 tracking-tight sm:mb-6 sm:text-4xl md:text-5xl">
              Privacy Policy
            </h1>

            <p className="mx-auto max-w-2xl px-2 text-grey-40 text-lg leading-relaxed">
              Your data privacy and security are our top priorities
            </p>
            <p className="mt-4 text-grey-40 text-sm">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {TABS.map((tab) => (
                <button
                  className={`rounded-full border-2 px-5 py-2.5 font-bold text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? "border-grey-15 bg-primary-75 text-grey-15"
                      : "border-grey-15/15 bg-white text-grey-35 hover:border-grey-15"
                  }`}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="rounded-2xl border-2 border-grey-15 bg-primary-99 p-6 shadow-[4px_4px_0_0_var(--color-grey-15)]">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-white">
                      <Shield className="h-5 w-5 text-grey-15" />
                    </div>
                    <h2 className="font-bold font-vietnam text-grey-15 text-xl">
                      Our Commitment
                    </h2>
                  </div>
                  <p className="text-grey-35 leading-relaxed">
                    At Eduwise Solutions, we are committed to protecting your
                    privacy through transparent data practices, robust security
                    measures, and respectful information handling.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FeatureCard
                    icon={Database}
                    items={dataCollectionItems}
                    title="Data We Collect"
                  />
                  <FeatureCard
                    icon={Lock}
                    items={dataProtectionItems}
                    title="Data Protection"
                  />
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="rounded-3xl border-2 border-grey-15 bg-white p-6 shadow-[4px_4px_0_0_var(--color-grey-15)] sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90">
                    <FileText className="h-5 w-5 text-grey-15" />
                  </div>
                  <h2 className="font-bold font-vietnam text-grey-15 text-xl">
                    Detailed Information Breakdown
                  </h2>
                </div>
                <div className="space-y-6">
                  <InfoSection
                    items={personalInfoItems}
                    title="Personal Information"
                  />
                  <InfoSection
                    items={technicalInfoItems}
                    title="Technical Information"
                  />
                </div>
              </div>
            )}

            {activeTab === "rights" && (
              <div className="rounded-3xl border-2 border-grey-15 bg-white p-6 shadow-[4px_4px_0_0_var(--color-grey-15)] sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90">
                    <FileText className="h-5 w-5 text-grey-15" />
                  </div>
                  <h2 className="font-bold font-vietnam text-grey-15 text-xl">
                    Your Privacy Rights
                  </h2>
                </div>
                <div className="mb-5 rounded-2xl border-2 border-grey-15/10 bg-light-97 p-4">
                  <h3 className="mb-2 font-bold text-grey-15">
                    Your Control, Your Data
                  </h3>
                  <p className="text-grey-35 text-sm">
                    We believe in empowering you with complete control over your
                    personal information.
                  </p>
                </div>
                <ul className="space-y-3">
                  {privacyRightsItems.map((item) => (
                    <li
                      className="flex items-start gap-2 text-grey-35 text-sm"
                      key={item}
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-grey-15" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-12">
              <div className="mx-auto max-w-xl rounded-3xl border-2 border-grey-15 bg-grey-15 p-8 text-center text-white shadow-[6px_6px_0_0_var(--color-grey-15)]">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/20 bg-white/10">
                    <Mail className="h-6 w-6 text-primary-90" />
                  </div>
                </div>
                <h2 className="mb-3 font-bold font-vietnam text-white text-xl">
                  Contact Our Privacy Team
                </h2>
                <p className="mb-4 text-grey-70">
                  For any privacy-related inquiries or concerns, reach out to
                  us:
                </p>
                <a
                  className="font-bold text-primary-90 text-xl hover:underline"
                  href="mailto:legal@eduwise.solutions"
                >
                  contact@eduwise.solutions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
