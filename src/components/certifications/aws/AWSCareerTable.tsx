import { CAREER_TABLE } from "./aws-data";

export default function AWSCareerTable() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Career Outlook
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            AWS Certification Career Opportunities
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Overview of common career paths associated with AWS Certifications.
            Salary ranges are approximate and vary by location, experience, and
            organization.
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
                {[
                  "Certification",
                  "Typical Roles",
                  "Experience",
                  "India Salary",
                  "US Salary",
                  "Key Responsibilities",
                ].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {CAREER_TABLE.map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-emerald-50/60 transition-colors"
                >
                  <td className="px-5 py-4 font-semibold text-gray-900 whitespace-nowrap">
                    {row.cert}
                  </td>
                  <td className="px-5 py-4 text-gray-600">{row.roles}</td>
                  <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                    {row.level}
                  </td>
                  <td className="px-5 py-4 font-semibold text-emerald-700 whitespace-nowrap">
                    {row.indSalary}
                  </td>
                  <td className="px-5 py-4 font-semibold text-teal-700 whitespace-nowrap">
                    {row.usSalary}
                  </td>
                  <td className="px-5 py-4 text-gray-600 max-w-xs">
                    {row.responsibilities}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {CAREER_TABLE.map((row, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm"
            >
              <h3 className="font-bold text-gray-900 mb-3">{row.cert}</h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                    India
                  </p>
                  <p className="font-semibold text-emerald-700">
                    {row.indSalary}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                    US
                  </p>
                  <p className="font-semibold text-teal-700">{row.usSalary}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-1">
                <span className="font-semibold">Roles:</span> {row.roles}
              </p>
              <p className="text-xs text-gray-500 mb-1">
                <span className="font-semibold">Level:</span> {row.level}
              </p>
              <p className="text-xs text-gray-500">
                <span className="font-semibold">Responsibilities:</span>{" "}
                {row.responsibilities}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-5 text-center italic">
          Note: Salary ranges are indicative and may vary depending on market
          conditions, geographic location, and individual expertise.
        </p>
      </div>
    </section>
  );
}
