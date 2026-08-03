import { Code2, Settings2, Terminal } from "lucide-react";
import Image from "next/image";

const toolsData = [
  {
    icon: Code2,
    items: [
      {
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        name: "Python",
      },
      {
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
        name: "NumPy",
      },
      {
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
        name: "Pandas",
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg",
        name: "Matplotlib",
      },
      {
        image: "https://seaborn.pydata.org/_static/logo-wide-lightbg.svg",
        name: "Seaborn",
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
        name: "Scikit-learn",
      },
    ],
    title: "Programming & Libraries",
  },
  {
    icon: Terminal,
    items: [
      {
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        name: "SQL",
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",
        name: "Power BI",
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/4/4b/Tableau_Logo.png",
        name: "Tableau",
      },
    ],
    title: "Data Tools",
  },
];

export default function DSToolsSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-99 px-4 py-2 font-medium text-primary-75 text-sm shadow-sm">
            <Settings2 className="h-5 w-5 text-primary-75" />
            Tools & Libraries You Will Learn
          </div>
          <h2 className="font-bold font-vietnam text-3xl text-grey-15 md:text-4xl">
            Essential Data Science Tools & Libraries
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {toolsData.map((cat) => (
            <div
              className="flex flex-col items-center rounded-xl border border-light-90 bg-white p-8 text-center shadow-lg transition-all duration-300 hover:border-primary-90"
              key={cat.title}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-95">
                <cat.icon className="h-7 w-7 text-primary-75" />
              </div>
              <h3 className="mb-3 font-bold font-vietnam text-grey-15 text-xl">
                {cat.title}
              </h3>
              <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3">
                {cat.items.map((item) => (
                  <div
                    className="group flex flex-col items-center rounded-xl bg-primary-97 p-4 text-center transition-colors duration-200 hover:bg-primary-95 hover:shadow-md"
                    key={item.name}
                  >
                    <div className="mb-3 flex h-12 w-12 items-center justify-center">
                      <Image
                        alt={item.name}
                        className="h-10 w-10 object-contain transition-transform duration-200 group-hover:scale-110"
                        height={40}
                        onError={(e) => {
                          // Fallback in case image fails to load
                          e.currentTarget.style.display = "none";
                        }}
                        src={item.image}
                        width={40}
                      />
                    </div>
                    <span className="font-medium text-grey-35 text-xs leading-tight">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
