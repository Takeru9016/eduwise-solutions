export default function DomainsShowcase() {
  const domains: { icon: string; label: string }[] = [
    { icon: "🤖", label: "AI & Machine Learning" },
    { icon: "📈", label: "Data Science" },
    { icon: "💹", label: "Data Analytics" },
    { icon: "☁️", label: "Cloud Computing" },
    { icon: "🛡️", label: "Cyber Security" },
    { icon: "⚙️", label: "DevOps" },
    { icon: "🧩", label: "Full Stack Development" },
    { icon: "☕", label: "Java Programming" },
    { icon: "🐍", label: "Python Programming" },
    { icon: "🌐", label: "Web Development" },
    { icon: "🎨", label: "UI/UX Design" },
    { icon: "📊", label: "ML with Python" },
    { icon: "🔷", label: "Azure Cloud" },
    { icon: "📡", label: "IoT" },
    { icon: "🔌", label: "Embedded Systems" },
    { icon: "🚗", label: "Hybrid Electric Vehicles" },
    { icon: "🔬", label: "Nanotechnology" },
    { icon: "📐", label: "AutoCAD" },
    { icon: "📢", label: "Digital Marketing" },
    { icon: "💰", label: "Stock Market" },
    { icon: "💼", label: "Finance" },
    { icon: "👥", label: "HR Management" },
    { icon: "🧠", label: "Psychology" },
    { icon: "🎯", label: "Placement Programs" },
  ];

  const duplicated = [...domains, ...domains];

  return (
    <section
      aria-label="Technologies and Domains"
      className="relative py-14 sm:py-20 bg-gradient-to-b from-primary-99 via-white to-primary-99"
    >
      <div className="container">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-grey-15">
            Upskill and transform your career in latest
            <br className="hidden sm:block" />
            <span className="mx-2 bg-gradient-to-r from-primary-90 via-primary-75 to-primary-90 bg-clip-text text-transparent">
              technologies
            </span>
            and
            <span className="ml-2 bg-gradient-to-r from-primary-90 via-primary-75 to-primary-90 bg-clip-text text-transparent">
              domains
            </span>
          </h2>

          <p className="mt-4 text-grey-40 max-w-2xl mx-auto">
            Discover curated programs designed with industry experts to make you
            job‑ready.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-primary-95/40 bg-white/70 backdrop-blur">
          {/* left/right fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />

          {/* Row 1 */}
          <div className="flex items-center gap-4 sm:gap-6 py-6 whitespace-nowrap">
            <div className="flex animate-[marquee_30s_linear_infinite] gap-4 sm:gap-6 will-change-transform">
              {duplicated.map((item, idx) => (
                <div
                  key={`row1-${idx}-${item.label}`}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-primary-95/50 bg-white/90 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm sm:text-base font-medium text-grey-15">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary-95/50 to-transparent" />

          {/* Row 2 (reverse) */}
          <div className="flex items-center gap-4 sm:gap-6 py-6 whitespace-nowrap">
            <div className="flex animate-[marquee_30s_linear_infinite_reverse] gap-4 sm:gap-6 will-change-transform">
              {duplicated.map((item, idx) => (
                <div
                  key={`row2-${idx}-${item.label}`}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-primary-95/50 bg-white/90 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm sm:text-base font-medium text-grey-15">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
