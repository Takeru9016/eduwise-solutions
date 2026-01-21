import { Code2, Terminal, Database, Cloud, Settings2 } from "lucide-react";
import Image from "next/image";

const toolsData = [
  {
    icon: Code2,
    title: "Programming Languages & Frameworks",
    items: [
      {
        name: "Python",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "NumPy",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
      },
      {
        name: "Pandas",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
      },
      {
        name: "PyTorch",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
      },
      {
        name: "TensorFlow",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      },
      {
        name: "Scikit-learn",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
      },
    ],
  },
  {
    icon: Terminal,
    title: "Development Environments & Tools",
    items: [
      {
        name: "Jupyter Notebook",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
      },
      {
        name: "Google Colab",
        image: "/tech/colab.svg",
      },
      {
        name: "Git & GitHub",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      },
    ],
  },
  {
    icon: Database,
    title: "Database & Big Data",
    items: [
      {
        name: "MySQL",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
      {
        name: "MongoDB",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "Spark",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg",
      },
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & Deployment",
    items: [
      {
        name: "Amazon Web Services",
        image: "/tech/aws.svg",
      },
      {
        name: "Microsoft Azure",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
      },
      {
        name: "GCP (Google Cloud Platform)",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
      },
      {
        name: "Docker",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        name: "Kubernetes",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
      },
    ],
  },
];

export default function ToolsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
            <Settings2 className="text-primary-75 w-5 h-5" />
            Tools & Libraries You Will Learn
          </div>
          <h2 className="text-3xl md:text-4xl font-vietnam font-bold text-grey-15">
            Essential Tools & Libraries
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
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={40}
                        height={40}
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
