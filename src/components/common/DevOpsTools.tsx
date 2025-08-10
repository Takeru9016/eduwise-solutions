import { Settings2, Boxes, Cpu, Cloud } from "lucide-react";

const toolsData = [
  {
    icon: Boxes,
    title: "CI/CD & Containers",
    items: [
      {
        name: "Jenkins",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
      },
      {
        name: "Docker",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        name: "Kubernetes",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
      },
    ],
  },
  {
    icon: Cpu,
    title: "IaC & Config Mgmt",
    items: [
      {
        name: "Terraform",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
      },
      {
        name: "Ansible",
        image: "https://www.vectorlogo.zone/logos/ansible/ansible-icon.svg",
      },
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & Monitoring",
    items: [
      {
        name: "AWS",
        image: "/aws.svg",
      },
      {
        name: "Prometheus",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Prometheus_software_logo.svg",
      },
      {
        name: "Grafana",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Grafana_logo.svg",
      },
    ],
  },
];

export default function DevOpsToolsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
            <Settings2 className="text-primary-75 w-5 h-5" />
            Tools & Platforms You Will Learn
          </div>
          <h2 className="text-3xl md:text-4xl font-vietnam font-bold text-grey-15">
            DevOps & Cloud Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <div className="grid grid-cols-3 gap-4 w-full">
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
                          (e.currentTarget as HTMLImageElement).style.display = "none";
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


