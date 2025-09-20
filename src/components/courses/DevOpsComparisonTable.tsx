"use client";

import {
  Rocket,
  Building2,
  Cog,
  Brain,
  GraduationCap,
  TrendingUp,
  Key,
  DollarSign,
  BookOpen,
  Check,
  X,
  Star,
  Shield,
  Zap,
} from "lucide-react";

const comparisonData = [
  {
    category: "Curriculum",
    icon: Rocket,
    eduwise:
      "Modern DevOps + Cloud + AI integration (GitOps, ArgoCD, Flux, AI-driven automation, predictive monitoring)",
    other:
      "Limited to basic DevOps tools (Jenkins, Docker, AWS free tier) without AI focus",
  },
  {
    category: "Industry Relevance",
    icon: Building2,
    eduwise:
      "Designed with MNC requirements in mind → ensures graduates are job-ready from day one",
    other: "Often outdated syllabus, not aligned with current industry demand",
  },
  {
    category: "Projects",
    icon: Cog,
    eduwise:
      "Enterprise-grade live projects using Cloud + AI for automation, monitoring, and CI/CD optimization",
    other: "Educational/demo projects with no direct industry impact",
  },
  {
    category: "Problem-Solving",
    icon: Brain,
    eduwise:
      "AI-powered case studies — predictive analysis, automated root cause detection, anomaly detection in DevOps pipelines",
    other: "Mostly manual case studies, limited exposure to automation",
  },
  {
    category: "Faculty",
    icon: GraduationCap,
    eduwise:
      "Industry leaders (20+ yrs exp) who have implemented Cloud + AI in real projects",
    other:
      "Regular trainers with only academic or limited professional exposure",
  },
  {
    category: "Career Advantage",
    icon: TrendingUp,
    eduwise:
      "Future-proof skills → Cloud + AI + DevOps = high-demand career path with global opportunities",
    other:
      "Basic DevOps alone → increasingly becoming entry-level, high competition",
  },
  {
    category: "Placement",
    icon: Key,
    eduwise:
      "100% Job Assistance + Interview Assurance with direct MNC tie-ups",
    other: "Only job assistance, no placement assurance",
  },
  {
    category: "Fee Model",
    icon: DollarSign,
    eduwise:
      "Pay Minimum Fees Now, Remaining After Placement → Risk-free learning",
    other: "Full fees upfront with no placement guarantee",
  },
  {
    category: "LMS Access",
    icon: BookOpen,
    eduwise: "Lifetime LMS Access → learn, revise, and upgrade skills anytime",
    other: "Access only till course validity expires",
  },
];

export default function DevOpsComparisonTable() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary-75/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-75/5 to-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-primary-75 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg border border-primary-75/20">
            <Star className="w-4 h-4" />
            Industry-Leading Comparison
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6 leading-tight">
            DevOps & Cloud with AI{" "}
            <span className="bg-gradient-to-r from-primary-75 to-primary-90 bg-clip-text text-transparent">
              (Eduwise)
            </span>{" "}
            vs Traditional Platforms
          </h2>

          <p className="text-xl text-grey-35 max-w-4xl mx-auto leading-relaxed">
            Discover why thousands of students choose Eduwise for their DevOps
            journey
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-primary-75 via-primary-80 to-primary-90 text-white p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Comparison Aspect</h3>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-2">
                    <Shield className="w-5 h-5" />
                    <span className="font-bold">Eduwise Solutions</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-2">
                    <span className="font-bold">Other Platforms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-grey-10">
            {comparisonData.map((item, index) => (
              <div
                key={index}
                className="p-8 hover:bg-gradient-to-r hover:from-primary-75/5 hover:to-blue-50/50 transition-all duration-300 group"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                  {/* Category */}
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary-75/20 to-primary-90/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <item.icon className="w-7 h-7 text-primary-75" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-grey-15 mb-1">
                        {item.category}
                      </h4>
                      <div className="w-12 h-1 bg-gradient-to-r from-primary-75 to-primary-90 rounded-full"></div>
                    </div>
                  </div>

                  {/* Eduwise */}
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mt-1 shadow-lg">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200/50">
                        <p className="text-grey-35 leading-relaxed font-medium">
                          {item.eduwise}
                        </p>
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Other Platforms */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center mt-1 shadow-lg">
                      <X className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-rose-50 p-4 rounded-xl border border-red-200/50">
                      <p className="text-grey-35 leading-relaxed font-medium">
                        {item.other}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
