import {
  AlertCircle,
  BookOpen,
  Building,
  CheckCircle2,
  Clock,
  DollarSign,
  GraduationCap,
  Sparkles,
  Users,
} from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Types
interface CourseFeature {
  icon: React.ElementType;
  text: string;
}

interface CourseCard {
  comingSoon?: boolean;
  duration: string;
  image: string;
  isNew?: boolean;
  level: string;
  title: string;
  topics: string[];
}

interface ProgramBenefit {
  description: string;
  icon: React.ElementType;
  title: string;
}

// Reusable components
const PageHeader = () => (
  <section className="relative overflow-hidden bg-gradient-to-b from-primary-99 to-white py-20 md:py-28">
    <div className="absolute inset-0">
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-primary-95 opacity-20 blur-3xl" />
      <div className="absolute right-20 bottom-20 h-96 w-96 rounded-full bg-primary-97 opacity-20 blur-3xl" />
    </div>

    <div className="container relative mx-auto">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-medium text-primary-75 text-sm">
          <Sparkles className="text-primary-75" size={16} />
          Get Certified, Get Hired
        </div>

        <h1 className="mb-6 font-bold font-vietnam text-4xl text-grey-15 md:text-5xl lg:text-6xl">
          Certification Programs
        </h1>

        <p className="mb-8 text-grey-35 text-lg leading-relaxed md:text-xl">
          At Eduwise Solutions, we provide industry-relevant certification
          courses designed to help you gain practical skills and advance your
          career. Our programs include hands-on training, expert mentorship, and
          guaranteed job placement support.
        </p>

        <CourseFeatures />
      </div>
    </div>
  </section>
);

const CourseFeatures = () => {
  const features: CourseFeature[] = [
    { icon: CheckCircle2, text: "Industry-Recognized" },
    { icon: CheckCircle2, text: "Job Guarantee" },
    { icon: CheckCircle2, text: "Expert Mentorship" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {features.map((feature, index) => (
        <FeatureBadge feature={feature} key={index} />
      ))}
    </div>
  );
};

const FeatureBadge = ({ feature }: { feature: CourseFeature }) => {
  const { icon: Icon, text } = feature;

  return (
    <div className="flex items-center gap-2 rounded-lg bg-primary-99 px-4 py-2">
      <Icon className="text-primary-75" size={20} />
      <span className="text-grey-35">{text}</span>
    </div>
  );
};

const CourseCardComponent = ({ course }: { course: CourseCard }) => {
  const { title, duration, level, topics, image, isNew, comingSoon } = course;

  return (
    <Card className="group relative overflow-hidden border-light-90 transition-all duration-300 hover:border-primary-90 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden">
        <Image
          alt={title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          fill
          src={image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {isNew && (
          <Badge className="absolute top-4 right-4 bg-primary-75">NEW</Badge>
        )}
        <Badge
          className="absolute bottom-4 left-4 border-white text-white"
          variant="outline"
        >
          100% Job Guarantee
        </Badge>
      </div>

      {comingSoon && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70">
          <AlertCircle className="mb-4 text-white" size={48} />
          <div className="-rotate-12 transform rounded-full bg-primary-75 px-6 py-3 font-bold text-lg text-white">
            Coming Soon
          </div>
        </div>
      )}

      <CardContent className="p-6">
        <h3 className="mb-4 font-bold font-vietnam text-2xl text-grey-15">
          {title}
        </h3>

        <div className="mb-6 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary-75" />
            <span className="text-grey-35">{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary-75" />
            <span className="text-grey-35">{level}</span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-semibold text-grey-20">Key Topics:</p>
          <ul className="grid grid-cols-1 gap-3">
            {topics.map((topic, idx) => (
              <li className="flex items-center text-grey-35" key={idx}>
                <div className="mr-3 h-2 w-2 rounded-full bg-primary-75" />
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

const CoursesSection = ({ courses }: { courses: CourseCard[] }) => (
  <section className="bg-light-97 py-16">
    <div className="container mx-auto">
      <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="mb-2 font-bold font-vietnam text-3xl text-grey-15 md:text-4xl">
            Explore our Certification Courses
          </h2>
          <p className="text-grey-35">
            Choose from our range of industry-focused certification programs
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <CourseCardComponent course={course} key={index} />
        ))}
      </div>
    </div>
  </section>
);

const BenefitCard = ({ benefit }: { benefit: ProgramBenefit }) => {
  const { icon: Icon, title, description } = benefit;

  return (
    <Card className="group border-light-90 transition-all duration-300 hover:-translate-y-1 hover:border-primary-90 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-99 transition-colors group-hover:bg-primary-95">
          <Icon className="h-7 w-7 text-primary-75" />
        </div>
        <h3 className="mb-3 font-bold font-vietnam text-grey-15 text-xl">
          {title}
        </h3>
        <p className="text-grey-35 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

const BenefitsSection = ({ benefits }: { benefits: ProgramBenefit[] }) => (
  <section className="bg-white py-16">
    <div className="container mx-auto">
      <div className="mb-12 text-center">
        <h2 className="mb-4 font-bold font-vietnam text-3xl text-grey-15 md:text-4xl">
          Program Benefits
        </h2>
        <p className="text-grey-35 text-lg">
          Experience the advantages of learning with Eduwise Solutions
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, index) => (
          <BenefitCard benefit={benefit} key={index} />
        ))}
      </div>
    </div>
  </section>
);

export default function CertificationPage() {
  // Data
  const certificationCourses: CourseCard[] = [
    {
      comingSoon: true,
      duration: "3 Months",
      image: "/courses/trading.jpg",
      isNew: true,
      level: "Beginner",
      title: "Digital Marketing",
      topics: [
        "SEO & Content Marketing",
        "Social Media Marketing",
        "Email Marketing",
        "Google Analytics",
      ],
    },
    {
      comingSoon: true,
      duration: "4 Months",
      image: "/courses/mern.png",
      level: "Intermediate",
      title: "Web Development",
      topics: [
        "Frontend Development",
        "Backend Development",
        "Database Management",
        "Deployment",
      ],
    },
    {
      comingSoon: true,
      duration: "3 Months",
      image: "/courses/ethical.png",
      level: "Advanced",
      title: "Cybersecurity",
      topics: [
        "Network Security",
        "Ethical Hacking",
        "Security Protocols",
        "Threat Analysis",
      ],
    },
    {
      comingSoon: true,
      duration: "5 Months",
      image: "/courses/trading.jpg",
      level: "Intermediate",
      title: "Data Science & Analytics",
      topics: [
        "Statistical Analysis",
        "Machine Learning",
        "Data Visualization",
        "Big Data Technologies",
      ],
    },
    {
      comingSoon: true,
      duration: "4 Months",
      image: "/courses/mern.png",
      level: "Advanced",
      title: "Cloud Computing",
      topics: [
        "AWS Services",
        "Azure Fundamentals",
        "Cloud Security",
        "DevOps Integration",
      ],
    },
  ];

  const programBenefits: ProgramBenefit[] = [
    {
      description:
        "Courses designed with input from industry experts to ensure relevance",
      icon: BookOpen,
      title: "Industry-Aligned Curriculum",
    },
    {
      description:
        "Learn from experienced professionals with real-world expertise",
      icon: Users,
      title: "Expert Mentorship",
    },
    {
      description:
        "100% placement assistance with our network of partner companies",
      icon: Building,
      title: "Job Guarantee",
    },
    {
      description: "Receive industry-recognized certifications upon completion",
      icon: GraduationCap,
      title: "Recognized Certification",
    },
    {
      description:
        "Balance your studies with work through our flexible schedule",
      icon: Clock,
      title: "Flexible Learning",
    },
    {
      description:
        "Competitive pricing with easy payment options and EMI facility",
      icon: DollarSign,
      title: "Affordable Fees",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <PageHeader />
      <CoursesSection courses={certificationCourses} />
      <BenefitsSection benefits={programBenefits} />
    </main>
  );
}
