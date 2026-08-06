import Image from "next/image";

const toolsData = [
  {
    image: "/logos/git.svg",
    name: "Git",
  },
  {
    image: "/logos/git.svg",
    name: "GitOps",
  },
  {
    image: "/logos/argocd.svg",
    name: "Argo CD",
  },
  {
    image: "/logos/jenkins.svg",
    name: "Jenkins",
  },
  {
    image: "/logos/docker.svg",
    name: "Docker",
  },
  {
    image: "/logos/kubernetes.svg",
    name: "Kubernetes",
  },
  {
    image: "/logos/eks.svg",
    name: "EKS",
  },
  {
    image: "/logos/gcp-icon.svg",
    name: "GKE",
  },
  {
    image: "/logos/rancher.svg",
    name: "Rancher",
  },
  {
    image: "/logos/terraform.svg",
    name: "Terraform",
  },
  {
    image: "/logos/ansible.svg",
    name: "Ansible",
  },
  {
    image: "/logos/aws-icon.svg",
    name: "CloudFormation",
  },
  {
    image: "/logos/aws-icon.svg",
    name: "AWS",
  },
  {
    image: "/logos/azure.svg",
    name: "Azure",
  },
  {
    image: "/logos/aws-lambda.svg",
    name: "Lambda",
  },
  {
    image: "/logos/prometheus.svg",
    name: "Prometheus",
  },
  {
    image: "/logos/grafana.svg",
    name: "Grafana",
  },
  {
    image: "/logos/tensorflow.svg",
    name: "TensorFlow",
  },
  {
    image: "/logos/pytorch.svg",
    name: "PyTorch",
  },
];

export default function DevOpsToolsSection() {
  return (
    <section className="bg-gray-50 py-12 lg:py-16">
      <div className="container mx-auto px-4">
        {/* Tools Covered Card */}
        <div className="rounded-3xl bg-linear-to-br from-primary-70 to-primary-90 p-6 shadow-2xl lg:p-12">
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
                <div className="flex h-7 w-7 shrink-0 items-center justify-center lg:h-10 lg:w-10">
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
