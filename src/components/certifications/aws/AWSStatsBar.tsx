import { Globe, TrendingUp, Trophy, Users } from "lucide-react";

const STATS = [
  { icon: Trophy, label: "Certification Paths", value: "12" },
  { icon: Globe, label: "Countries Recognized", value: "200+" },
  { icon: Users, label: "AWS Certified Pros", value: "50K+" },
  { icon: TrendingUp, label: "Avg Salary Growth", value: "40%" },
];

export default function AWSStatsBar() {
  return (
    <section className="bg-linear-to-r from-emerald-600 to-teal-700 py-10">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div
              className="flex flex-col items-center gap-3 text-white sm:flex-row sm:items-start"
              key={label}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-extrabold text-2xl leading-none">{value}</p>
                <p className="mt-0.5 text-emerald-100 text-sm">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
