import Image from "next/image";
import {
  Clock,
  Users,
  BookOpen,
  Building,
  DollarSign,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Types
interface CourseFeature {
  icon: React.ElementType;
  text: string;
}

interface CourseCard {
  title: string;
  duration: string;
  level: string;
  topics: string[];
  image: string;
  isNew?: boolean;
  comingSoon?: boolean;
}

interface ProgramBenefit {
  icon: React.ElementType;
  title: string;
  description: string;
}

// Reusable components
const PageHeader = () => (
  <section className="relative py-20 md:py-28 bg-gradient-to-b from-primary-99 to-white overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary-95 rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-97 rounded-full opacity-20 blur-3xl" />
    </div>

    <div className="container mx-auto relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Sparkles size={16} className="text-primary-75" />
          Get Certified, Get Hired
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-vietnam font-bold text-grey-15 mb-6">
          Certification Programs
        </h1>

        <p className="text-grey-35 text-lg md:text-xl leading-relaxed mb-8">
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
        <FeatureBadge key={index} feature={feature} />
      ))}
    </div>
  );
};

const FeatureBadge = ({ feature }: { feature: CourseFeature }) => {
  const { icon: Icon, text } = feature;

  return (
    <div className="flex items-center gap-2 bg-primary-99 px-4 py-2 rounded-lg">
      <Icon size={20} className="text-primary-75" />
      <span className="text-grey-35">{text}</span>
    </div>
  );
};

const CourseCardComponent = ({ course }: { course: CourseCard }) => {
  const { title, duration, level, topics, image, isNew, comingSoon } = course;

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-light-90 hover:border-primary-90 relative">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {isNew && (
          <Badge className="absolute top-4 right-4 bg-primary-75">NEW</Badge>
        )}
        <Badge
          variant="outline"
          className="absolute bottom-4 left-4 text-white border-white"
        >
          100% Job Guarantee
        </Badge>
      </div>

      {comingSoon && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10">
          <AlertCircle size={48} className="text-white mb-4" />
          <div className="bg-primary-75 text-white px-6 py-3 rounded-full font-bold text-lg transform -rotate-12">
            Coming Soon
          </div>
        </div>
      )}

      <CardContent className="p-6">
        <h3 className="text-2xl font-vietnam font-bold text-grey-15 mb-4">
          {title}
        </h3>

        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary-75" />
            <span className="text-grey-35">{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary-75" />
            <span className="text-grey-35">{level}</span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-semibold text-grey-20">Key Topics:</p>
          <ul className="grid grid-cols-1 gap-3">
            {topics.map((topic, idx) => (
              <li key={idx} className="flex items-center text-grey-35">
                <div className="w-2 h-2 bg-primary-75 rounded-full mr-3" />
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
  <section className="py-16 bg-light-97">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-vietnam font-bold text-grey-15 mb-2">
            Explore our Certification Courses
          </h2>
          <p className="text-grey-35">
            Choose from our range of industry-focused certification programs
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <CourseCardComponent key={index} course={course} />
        ))}
      </div>
    </div>
  </section>
);

const BenefitCard = ({ benefit }: { benefit: ProgramBenefit }) => {
  const { icon: Icon, title, description } = benefit;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-light-90 hover:border-primary-90 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="w-14 h-14 rounded-xl bg-primary-99 flex items-center justify-center mb-6 group-hover:bg-primary-95 transition-colors">
          <Icon className="w-7 h-7 text-primary-75" />
        </div>
        <h3 className="text-xl font-vietnam font-bold text-grey-15 mb-3">
          {title}
        </h3>
        <p className="text-grey-35 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

const BenefitsSection = ({ benefits }: { benefits: ProgramBenefit[] }) => (
  <section className="py-16 bg-white">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-vietnam font-bold text-grey-15 mb-4">
          Program Benefits
        </h2>
        <p className="text-grey-35 text-lg">
          Experience the advantages of learning with Eduwise Solutions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <BenefitCard key={index} benefit={benefit} />
        ))}
      </div>
    </div>
  </section>
);

export default function CertificationPage() {
  // Data
  const certificationCourses: CourseCard[] = [
    {
      title: "Digital Marketing",
      duration: "3 Months",
      level: "Beginner",
      topics: [
        "SEO & Content Marketing",
        "Social Media Marketing",
        "Email Marketing",
        "Google Analytics",
      ],
      image: "/courses/trading.jpg",
      isNew: true,
      comingSoon: true,
    },
    {
      title: "Web Development",
      duration: "4 Months",
      level: "Intermediate",
      topics: [
        "Frontend Development",
        "Backend Development",
        "Database Management",
        "Deployment",
      ],
      image: "/courses/mern.png",
      comingSoon: true,
    },
    {
      title: "Cybersecurity",
      duration: "3 Months",
      level: "Advanced",
      topics: [
        "Network Security",
        "Ethical Hacking",
        "Security Protocols",
        "Threat Analysis",
      ],
      image: "/courses/ethical.png",
      comingSoon: true,
    },
    {
      title: "Data Science & Analytics",
      duration: "5 Months",
      level: "Intermediate",
      topics: [
        "Statistical Analysis",
        "Machine Learning",
        "Data Visualization",
        "Big Data Technologies",
      ],
      image: "/courses/trading.jpg",
      comingSoon: true,
    },
    {
      title: "Cloud Computing",
      duration: "4 Months",
      level: "Advanced",
      topics: [
        "AWS Services",
        "Azure Fundamentals",
        "Cloud Security",
        "DevOps Integration",
      ],
      image: "/courses/mern.png",
      comingSoon: true,
    },
  ];

  const programBenefits: ProgramBenefit[] = [
    {
      icon: BookOpen,
      title: "Industry-Aligned Curriculum",
      description:
        "Courses designed with input from industry experts to ensure relevance",
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description:
        "Learn from experienced professionals with real-world expertise",
    },
    {
      icon: Building,
      title: "Job Guarantee",
      description:
        "100% placement assistance with our network of partner companies",
    },
    {
      icon: GraduationCap,
      title: "Recognized Certification",
      description: "Receive industry-recognized certifications upon completion",
    },
    {
      icon: Clock,
      title: "Flexible Learning",
      description:
        "Balance your studies with work through our flexible schedule",
    },
    {
      icon: DollarSign,
      title: "Affordable Fees",
      description:
        "Competitive pricing with easy payment options and EMI facility",
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
