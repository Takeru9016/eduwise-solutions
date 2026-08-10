import { CAREER_TABLE } from "./aws-data";

export default function AWSCareerTable() {
  return (
    <section className="bg-light-97 py-16 sm:py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-bold text-grey-15 text-sm">
            Career Outlook
          </div>
          <h2 className="mb-4 font-black font-vietnam text-3xl text-grey-15 lg:text-5xl">
            AWS Certification Career Opportunities
          </h2>
          <p className="mx-auto max-w-2xl text-grey-35 text-lg">
            Overview of common career paths associated with AWS Certifications.
            Salary ranges are approximate and vary by location, experience, and
            organization.
          </p>
        </div>

        <div className="space-y-4">
          {CAREER_TABLE.map((row) => (
            <div
              className="rounded-2xl border-2 border-grey-15 bg-white p-6 shadow-[4px_4px_0_0_var(--color-grey-15)]"
              key={row.cert}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="font-bold font-vietnam text-grey-15 text-lg">
                    {row.cert}
                  </h3>
                  <p className="mt-1 text-grey-35 text-sm">
                    <span className="font-bold text-grey-15">Roles:</span>{" "}
                    {row.roles}
                  </p>
                  <p className="mt-1 text-grey-35 text-sm">
                    <span className="font-bold text-grey-15">Experience:</span>{" "}
                    {row.level}
                  </p>
                  <p className="mt-1 text-grey-35 text-sm">
                    <span className="font-bold text-grey-15">
                      Responsibilities:
                    </span>{" "}
                    {row.responsibilities}
                  </p>
                </div>

                <div className="flex shrink-0 gap-3">
                  <div className="rounded-xl border-2 border-grey-15 bg-primary-90 px-4 py-3 text-center">
                    <p className="text-grey-15/70 text-xs uppercase tracking-wide">
                      India
                    </p>
                    <p className="font-bold text-grey-15">{row.indSalary}</p>
                  </div>
                  <div className="rounded-xl border-2 border-grey-15 bg-gold-90 px-4 py-3 text-center">
                    <p className="text-grey-15/70 text-xs uppercase tracking-wide">
                      US
                    </p>
                    <p className="font-bold text-grey-15">{row.usSalary}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-grey-40 text-xs italic">
          Note: Salary ranges are indicative and may vary depending on market
          conditions, geographic location, and individual expertise.
        </p>
      </div>
    </section>
  );
}
