import Image from "next/image";

const toolsData = [
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    name: "Git",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    name: "GitOps",
  },
  {
    image: "https://www.vectorlogo.zone/logos/argoprojio/argoprojio-icon.svg",
    name: "Argo CD",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
    name: "Jenkins",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    name: "Docker",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    name: "Kubernetes",
  },
  {
    image: "https://www.vectorlogo.zone/logos/amazon_eks/amazon_eks-icon.svg",
    name: "EKS",
  },
  {
    image:
      "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg",
    name: "GKE",
  },
  {
    image: "https://www.vectorlogo.zone/logos/rancher/rancher-icon.svg",
    name: "Rancher",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
    name: "Terraform",
  },
  {
    image: "https://www.vectorlogo.zone/logos/ansible/ansible-icon.svg",
    name: "Ansible",
  },
  {
    image: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
    name: "CloudFormation",
  },
  {
    image: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
    name: "AWS",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    name: "Azure",
  },
  {
    image:
      "https://www.vectorlogo.zone/logos/amazon_awslambda/amazon_awslambda-icon.svg",
    name: "Lambda",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/38/Prometheus_software_logo.svg",
    name: "Prometheus",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a1/Grafana_logo.svg",
    name: "Grafana",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    name: "TensorFlow",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    name: "PyTorch",
  },
];

export default function DevOpsToolsSection() {
  return (
    <section className="bg-gray-50 py-12 lg:py-16">
      <div className="container mx-auto px-4">
        {/* Tools Covered Card */}
        <div className="rounded-3xl bg-gradient-to-br from-primary-70 to-primary-90 p-6 shadow-2xl lg:p-12">
          <h2 className="mb-8 font-bold text-2xl text-white lg:mb-12 lg:text-4xl">
            Tools Covered
          </h2>

          {/* Unified Grid View - Mobile (2 cols) and Desktop (3-5 cols) */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5">
            {toolsData.map((tool, index) => (
              <div
                className="group flex cursor-pointer items-center gap-2 rounded-xl bg-white px-3 py-3 transition-all duration-300 hover:scale-105 hover:shadow-xl lg:gap-3 lg:px-4"
                key={`${tool.name}-${index}`}
              >
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center lg:h-10 lg:w-10">
                  <Image
                    alt={tool.name}
                    className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-110"
                    height={40}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                    src={tool.image}
                    width={40}
                  />
                </div>
                <span className="truncate font-bold text-gray-800 text-xs lg:text-base">
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
