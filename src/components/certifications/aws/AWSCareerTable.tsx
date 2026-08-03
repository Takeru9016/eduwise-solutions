import { CAREER_TABLE } from "./aws-data";

export default function AWSCareerTable() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block font-semibold text-emerald-600 text-sm uppercase tracking-widest">
            Career Outlook
          </span>
          <h2 className="mb-4 font-extrabold text-3xl text-gray-900 sm:text-4xl">
            AWS Certification Career Opportunities
          </h2>
          <p className="mx-auto max-w-2xl text-gray-500">
            Overview of common career paths associated with AWS Certifications.
            Salary ranges are approximate and vary by location, experience, and
            organization.
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto rounded-2xl border border-gray-200 shadow-xs md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-linear-to-r from-emerald-600 to-teal-700 text-white">
                {[
                  "Certification",
                  "Typical Roles",
                  "Experience",
                  "India Salary",
                  "US Salary",
                  "Key Responsibilities",
                ].map((h) => (
                  <th
                    className="whitespace-nowrap px-5 py-4 text-left font-bold text-xs uppercase tracking-wider"
                    key={h}
                    scope="col"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {CAREER_TABLE.map((row, i) => (
                <tr
                  className="transition-colors hover:bg-emerald-50/60"
                  key={i}
                >
                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-gray-900">
                    {row.cert}
                  </td>
                  <td className="px-5 py-4 text-gray-600">{row.roles}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                    {row.level}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-emerald-700">
                    {row.indSalary}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-teal-700">
                    {row.usSalary}
                  </td>
                  <td className="max-w-xs px-5 py-4 text-gray-600">
                    {row.responsibilities}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="space-y-4 md:hidden">
          {CAREER_TABLE.map((row, i) => (
            <div
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs"
              key={i}
            >
              <h3 className="mb-3 font-bold text-gray-900">{row.cert}</h3>
              <div className="mb-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="mb-0.5 text-gray-400 text-xs uppercase tracking-wide">
                    India
                  </p>
                  <p className="font-semibold text-emerald-700">
                    {row.indSalary}
                  </p>
                </div>
                <div>
                  <p className="mb-0.5 text-gray-400 text-xs uppercase tracking-wide">
                    US
                  </p>
                  <p className="font-semibold text-teal-700">{row.usSalary}</p>
                </div>
              </div>
              <p className="mb-1 text-gray-500 text-xs">
                <span className="font-semibold">Roles:</span> {row.roles}
              </p>
              <p className="mb-1 text-gray-500 text-xs">
                <span className="font-semibold">Level:</span> {row.level}
              </p>
              <p className="text-gray-500 text-xs">
                <span className="font-semibold">Responsibilities:</span>{" "}
                {row.responsibilities}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-gray-400 text-xs italic">
          Note: Salary ranges are indicative and may vary depending on market
          conditions, geographic location, and individual expertise.
        </p>
      </div>
    </section>
  );
}
