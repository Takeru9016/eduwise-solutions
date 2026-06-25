import { Trophy, Globe, Users, TrendingUp } from "lucide-react";

const STATS = [
  { icon: Trophy, value: "12", label: "Certification Paths" },
  { icon: Globe, value: "200+", label: "Countries Recognized" },
  { icon: Users, value: "50K+", label: "AWS Certified Pros" },
  { icon: TrendingUp, value: "40%", label: "Avg Salary Growth" },
];

export default function AWSStatsBar() {
  return (
    <section className="bg-gradient-to-r from-emerald-600 to-teal-700 py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-white"
            >
              <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-2xl font-extrabold leading-none">{value}</p>
                <p className="text-emerald-100 text-sm mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
