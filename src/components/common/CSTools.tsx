import { Terminal, Shield, Settings2 } from "lucide-react";

const toolsData = [
  {
    icon: Terminal,
    title: "Operating Systems & Commands",
    items: [
      {
        name: "Linux",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
      },
    ],
  },
  {
    icon: Shield,
    title: "Networking & Security Tools",
    items: [
      {
        name: "Wireshark",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/5/5f/Wireshark_Logo.svg",
      },
      {
        name: "Burp Suite",
        image:
          "https://portswigger.net/cms/images/61/2a/2b2e-article-main-burp-suite-logo.png",
      },
      {
        name: "SIEM",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/2/2a/IBM_QRadar_logo.png",
      },
      {
        name: "Firewalls",
        image:
          "https://cdn-icons-png.flaticon.com/512/565/565547.png",
      },
    ],
  },
];

export default function CSToolsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
            <Settings2 className="text-primary-75 w-5 h-5" />
            Tools & Libraries You Will Learn
          </div>
          <h2 className="text-3xl md:text-4xl font-vietnam font-bold text-grey-15">
            Essential Cyber Security Tools & Platforms
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {toolsData.map((cat) => (
            <div
              key={cat.title}
              className="bg-white rounded-xl shadow-lg border border-light-90 hover:border-primary-90 transition-all duration-300 p-8 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary-95 flex items-center justify-center mb-4">
                <cat.icon className="w-7 h-7 text-primary-75" />
              </div>
              <h3 className="text-xl font-vietnam font-bold text-grey-15 mb-3">
                {cat.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="bg-primary-97 p-4 rounded-xl hover:bg-primary-95 transition-colors duration-200 flex flex-col items-center text-center group hover:shadow-md"
                  >
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-200"
                        onError={(e) => {
                          // Fallback in case image fails to load
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    <span className="text-grey-35 text-xs font-medium leading-tight">
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
