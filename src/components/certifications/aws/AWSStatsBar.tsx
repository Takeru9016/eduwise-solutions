import { Globe, TrendingUp, Trophy, Users } from "lucide-react";
import { CERTIFICATIONS } from "./aws-data";

const STATS = [
  {
    icon: Trophy,
    label: "Certification Paths",
    value: `${CERTIFICATIONS.length}`,
  },
  { icon: Globe, label: "Countries Recognized", value: "200+" },
  { icon: Users, label: "AWS Certified Pros", value: "50K+" },
  { icon: TrendingUp, label: "Avg Salary Growth", value: "40%" },
];

export default function AWSStatsBar() {
  return (
    <section className="border-grey-15/10 border-b bg-primary-99 py-8">
      <div className="container">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div
              className="flex items-center gap-3 rounded-2xl border-2 border-grey-15 bg-white px-4 py-3 shadow-[3px_3px_0_0_var(--color-grey-15)]"
              key={label}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90">
                <Icon className="h-5 w-5 text-grey-15" />
              </div>
              <div>
                <p className="font-black text-grey-15 text-xl leading-none">
                  {value}
                </p>
                <p className="mt-0.5 text-grey-40 text-xs">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
