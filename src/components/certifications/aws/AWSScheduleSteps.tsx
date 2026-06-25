import { SCHEDULE_STEPS } from "./aws-data";

export default function AWSScheduleSteps() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ── Steps grid visual ── */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
              {SCHEDULE_STEPS.map((step, i) => {
                const Icon = step.icon;
                const isLast = i === SCHEDULE_STEPS.length - 1;
                return (
                  <div
                    key={i}
                    className={`group relative bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-400/40 rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-300 cursor-default ${isLast ? "col-span-2 sm:col-span-1 xl:col-span-1" : ""}`}
                  >
                    <div className="w-11 h-11 bg-emerald-500/20 group-hover:bg-emerald-500/30 rounded-xl flex items-center justify-center mb-3 transition-colors">
                      <Icon
                        className="w-5 h-5 text-emerald-400"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1">
                      Step {i + 1}
                    </span>
                    <p className="text-white text-xs font-semibold leading-tight">
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Text side ── */}
          <div className="order-1 lg:order-2 text-white">
            <span className="inline-block text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-3">
              Exam Scheduling
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
              How to Schedule an AWS Exam{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                with a Voucher?
              </span>
            </h2>
            <p className="text-slate-300 leading-relaxed mb-8">
              Once you are ready to attempt your AWS Certification exam,
              scheduling is a straightforward 7-step process on the official AWS
              Certification portal.
            </p>

            <ul className="space-y-3">
              {SCHEDULE_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center shrink-0">
                      <Icon
                        className="w-4 h-4 text-emerald-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <span className="text-emerald-400 text-xs font-bold mr-2">
                        Step {i + 1}.
                      </span>
                      <span className="text-slate-200 text-sm">
                        {step.label}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
