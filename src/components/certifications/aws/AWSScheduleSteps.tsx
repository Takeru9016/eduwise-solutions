import { SCHEDULE_STEPS } from "./aws-data";

export default function AWSScheduleSteps() {
  return (
    <section className="bg-grey-15 py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center text-white">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/10 px-4 py-2 font-bold text-primary-90 text-sm">
            Exam Scheduling
          </div>
          <h2 className="mb-4 font-black font-vietnam text-3xl leading-tight sm:text-4xl">
            How to Schedule an AWS Exam with a Voucher?
          </h2>
          <p className="text-grey-70 leading-relaxed">
            Once you are ready to attempt your AWS Certification exam,
            scheduling is a straightforward 7-step process on the official AWS
            Certification portal.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {SCHEDULE_STEPS.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === SCHEDULE_STEPS.length - 1;
            return (
              <div
                className={`flex flex-col items-center gap-3 rounded-2xl border-2 border-white/15 bg-white/5 p-5 text-center transition-colors hover:border-primary-90/40 hover:bg-primary-90/10 ${
                  isLast ? "col-span-2 sm:col-span-1" : ""
                }`}
                key={step.label}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/20 bg-white/10">
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5 text-primary-90"
                  />
                </div>
                <div>
                  <span className="mb-1 block font-bold text-[10px] text-primary-90 uppercase tracking-widest">
                    Step {i + 1}
                  </span>
                  <p className="font-semibold text-white text-xs leading-tight">
                    {step.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
