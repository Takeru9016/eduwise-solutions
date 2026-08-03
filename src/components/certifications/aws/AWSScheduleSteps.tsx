import { SCHEDULE_STEPS } from "./aws-data";

export default function AWSScheduleSteps() {
  return (
    <section className="bg-linear-to-br from-slate-900 via-slate-800 to-emerald-950 py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* ── Steps grid visual ── */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {SCHEDULE_STEPS.map((step, i) => {
                const Icon = step.icon;
                const isLast = i === SCHEDULE_STEPS.length - 1;
                return (
                  <div
                    className={`group relative flex cursor-default flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-5 text-center transition-all duration-300 hover:border-emerald-400/40 hover:bg-emerald-500/20 ${isLast ? "col-span-2 sm:col-span-1 xl:col-span-1" : ""}`}
                    key={i}
                  >
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 transition-colors group-hover:bg-emerald-500/30">
                      <Icon
                        aria-hidden="true"
                        className="h-5 w-5 text-emerald-400"
                      />
                    </div>
                    <span className="mb-1 font-bold text-[10px] text-emerald-500 uppercase tracking-widest">
                      Step {i + 1}
                    </span>
                    <p className="font-semibold text-white text-xs leading-tight">
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Text side ── */}
          <div className="order-1 text-white lg:order-2">
            <span className="mb-3 inline-block font-semibold text-emerald-400 text-sm uppercase tracking-widest">
              Exam Scheduling
            </span>
            <h2 className="mb-4 font-extrabold text-3xl leading-tight sm:text-4xl">
              How to Schedule an AWS Exam{" "}
              <span className="bg-linear-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                with a Voucher?
              </span>
            </h2>
            <p className="mb-8 text-slate-300 leading-relaxed">
              Once you are ready to attempt your AWS Certification exam,
              scheduling is a straightforward 7-step process on the official AWS
              Certification portal.
            </p>

            <ul className="space-y-3">
              {SCHEDULE_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <li className="flex items-center gap-3" key={i}>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20">
                      <Icon
                        aria-hidden="true"
                        className="h-4 w-4 text-emerald-400"
                      />
                    </div>
                    <div>
                      <span className="mr-2 font-bold text-emerald-400 text-xs">
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
