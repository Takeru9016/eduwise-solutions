import {
  Code2,
  Terminal,
  Database,
  Cloud,
  Cpu,
  BarChart3,
  Layers,
  FlaskConical,
  GitBranch,
  ServerCog,
  BookOpen,
  Settings2,
  Package2,
  FileBarChart,
  MessageSquareCode,
} from "lucide-react";

const toolsData = [
  {
    icon: Code2,
    title: "Programming Languages & Frameworks",
    items: [
      "Python", "C", "HTML", "CSS", "JavaScript", "Flask", "Django", "NumPy", "Pandas", "Matplotlib", "Seaborn", "OpenCV", "PyTorch", "TensorFlow", "Scikit-learn", "NLTK", "SpaCy"
    ],
  },
  {
    icon: Terminal,
    title: "Development Environments & Tools",
    items: [
      "Jupyter Notebook", "Google Colab", "Anaconda", "VS Code", "Git", "GitHub"
    ],
  },
  {
    icon: Database,
    title: "Database & Big Data",
    items: [
      "MySQL", "MongoDB", "Hadoop", "MapReduce", "Hive", "Spark"
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & Deployment",
    items: [
      "AWS (Amazon Web Services)", "Microsoft Azure", "GCP (Google Cloud Platform)", "Docker", "Kubernetes", "CI/CD Tools"
    ],
  },
  {
    icon: Cpu,
    title: "Machine Learning & AI Tools",
    items: [
      "AutoML", "MLflow", "TensorBoard"
    ],
  },
  {
    icon: BarChart3,
    title: "Other Tools & Platforms",
    items: [
      "Tableau", "Power BI", "Apache Kafka", "RabbitMQ"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toolsData.map((cat, idx) => (
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
              <ul className="flex flex-wrap justify-center gap-2 text-grey-35 text-sm">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="bg-primary-97 px-3 py-1 rounded-full mb-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 