import Image from "next/image";

const toolsData = [
  {
    name: "Git",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "GitOps",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Argo CD",
    image: "https://www.vectorlogo.zone/logos/argoprojio/argoprojio-icon.svg",
  },
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
  {
    name: "EKS",
    image: "https://www.vectorlogo.zone/logos/amazon_eks/amazon_eks-icon.svg",
  },
  {
    name: "GKE",
    image: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg",
  },
  {
    name: "Rancher",
    image: "https://www.vectorlogo.zone/logos/rancher/rancher-icon.svg",
  },
  {
    name: "Terraform",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
  },
  {
    name: "Ansible",
    image: "https://www.vectorlogo.zone/logos/ansible/ansible-icon.svg",
  },
  {
    name: "CloudFormation",
    image: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
  },
  {
    name: "AWS",
    image: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
  },
  {
    name: "Azure",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  },
  {
    name: "Lambda",
    image: "https://www.vectorlogo.zone/logos/amazon_awslambda/amazon_awslambda-icon.svg",
  },
  {
    name: "Prometheus",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Prometheus_software_logo.svg",
  },
  {
    name: "Grafana",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Grafana_logo.svg",
  },
  {
    name: "TensorFlow",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  },
  {
    name: "PyTorch",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  },
];

export default function DevOpsToolsSection() {
  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Tools Covered Card */}
        <div className="bg-gradient-to-br from-primary-70 to-primary-90 rounded-3xl shadow-2xl p-6 lg:p-12">
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-8 lg:mb-12">
            Tools Covered
          </h2>

          {/* Unified Grid View - Mobile (2 cols) and Desktop (3-5 cols) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-5">
            {toolsData.map((tool, index) => (
              <div
                key={`${tool.name}-${index}`}
                className="bg-white rounded-xl px-3 py-3 lg:px-4 flex items-center gap-2 lg:gap-3 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div className="w-7 h-7 lg:w-10 lg:h-10 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={tool.image}
                    alt={tool.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <span className="text-xs lg:text-base font-bold text-gray-800 truncate">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}