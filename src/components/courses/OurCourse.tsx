"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  BookCheck,
  CheckCircle,
  Clock,
  Users,
  Infinity,
  Building,
  Award,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CourseStat {
  label?: string;
  value?: string;
  icon: React.ElementType;
}

interface CourseCategory {
  title: string;
  subtitle: string;
  description: string;
  mainImage: string;
  additionalImages?: string[];
  viewLink: string;
  icon: React.ElementType;
  stats: CourseStat[];
}

const courseCategories: CourseCategory[] = [
  {
    title: "Artificial Intelligence",
    subtitle: "Master the future of tech",
    description:
      "Dive into AI and machine learning with hands-on projects and real-world applications.",
    mainImage: "/courses/artificial-intelligence.png",
    // additionalImages: ["/courses/jobs.jpg", "/courses/non-it.jpg"],
    viewLink: "/ai-ml",
    icon: BookCheck,
    stats: [
      { label: "Duration", value: "3 Months", icon: Clock },
      { label: "Live Session", value: "100%", icon: CheckCircle },
      { label: "Doubt Clearing", value: "1:1", icon: Users },
      // { label: "Access", value: "Lifetime", icon: Infinity },
      { label: "Companies", value: "250+", icon: Building },
      { label: "Placement", value: "100%", icon: Award },
    ],
  },
  {
    title: "DevOps with Cloud & AI",
    subtitle: "Automate, ship, and scale",
    description:
      "Learn DevOps with Jenkins, Docker, Kubernetes, Terraform, Ansible, AWS, Prometheus & Grafana.",
    mainImage: "/courses/devops.png",
    viewLink: "/devops",
    icon: BookCheck,
    stats: [
      { label: "Duration", value: "3.5 Months", icon: Clock },
      { label: "Live Session", value: "100%", icon: CheckCircle },
      { label: "Doubt Clearing", value: "1:1", icon: Users },
      { label: "Companies", value: "250+", icon: Building },
      { label: "Placement", value: "100%", icon: Award },
    ],
  },
  {
    title: "Data Science",
    subtitle: "Turn data into insights",
    description:
      "Explore data analysis, visualization, and predictive modeling using industry-standard tools.",
    mainImage: "/courses/data-science.png",
    // additionalImages: ["/courses/jobs.jpg", "/courses/non-it.jpg"],
    viewLink: "/data-science",
    icon: BookCheck,
    stats: [
      { label: "Duration", value: "3 Months", icon: Clock },
      { label: "Live Session", value: "100%", icon: CheckCircle },
      { label: "Doubt Clearing", value: "1:1", icon: Users },
      // { label: "Access", value: "Lifetime", icon: Infinity },
      { label: "Companies", value: "250+", icon: Building },
      { label: "Placement", value: "100%", icon: Award },
    ],
  },
  {
    title: "Full Stack Web Development",
    subtitle: "Build dynamic web apps",
    description:
      "Master front-end and back-end development using modern technologies like React, Node.js, and more.",
    mainImage: "/courses/full-stack.png",
    // additionalImages: ["/courses/jobs.jpg", "/courses/non-it.jpg"],
    viewLink: "/full-stack",
    icon: BookCheck,
    stats: [
      { label: "Duration", value: "3 Months", icon: Clock },
      { label: "Live Session", value: "100%", icon: CheckCircle },
      { label: "Doubt Clearing", value: "1:1", icon: Users },
      // { label: "Access", value: "Lifetime", icon: Infinity },
      { label: "Companies", value: "250+", icon: Building },
      { label: "Placement", value: "100%", icon: Award },
    ],
  },
  {
    title: "Cyber Security",
    subtitle: "Defend against digital threats",
    description:
      "Learn ethical hacking, network defense, and more to become a cybersecurity expert.",
    mainImage: "/courses/cyber-security.png",
    // additionalImages: ["/courses/jobs.jpg", "/courses/non-it.jpg"],
    viewLink: "/cyber-sec",
    icon: BookCheck,
    stats: [
      { label: "Duration", value: "3 Months", icon: Clock },
      { label: "Live Session", value: "100%", icon: CheckCircle },
      { label: "Doubt Clearing", value: "1:1", icon: Users },
      // { label: "Access", value: "Lifetime", icon: Infinity },
      { label: "Companies", value: "250+", icon: Building },
      { label: "Placement", value: "100%", icon: Award },
    ],
  },
  {
    title: "Placement Accelerator",
    subtitle: "100% Job Guarantee",
    description:
      "Get a 100% job guarantee with our 15-day programme! Learn resume building, LinkedIn optimization, business communication, and more.",
    mainImage: "/courses/professional.png",
    // additionalImages: ["/courses/jobs.jpg", "/courses/non-it.jpg"],
    viewLink: "/professional",
    icon: BookCheck,
    stats: [
      { label: "Duration", value: "15 Days", icon: Clock },
      { label: "Live Session", value: "100%", icon: CheckCircle },
      { label: "Doubt Clearing", value: "1:1", icon: Users },
      { label: "Access", value: "Lifetime", icon: Infinity },
      { label: "Companies", value: "250+", icon: Building },
      { label: "Placement", value: "100%", icon: Award },
    ],
  },
];

const CourseCard = ({ category }: { category: CourseCategory }) => {
  const [currentImage] = useState(category.mainImage);
  // const [currentImage, setCurrentImage] = useState(category.mainImage);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 ring-1 ring-slate-200">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Content - Left Side */}
          <div className="lg:w-2/5 p-8 flex flex-col justify-between bg-gradient-to-br from-white to-slate-50">
            <div className="space-y-6">
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-primary-600 to-blue-500 shadow-md">
                <category.icon className="w-6 h-6 text-primary-50" />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-primary-600 font-medium inline-block px-3 py-1 bg-primary-100 rounded-full">
                  {category.subtitle}
                </p>
              </div>

              <p className="text-slate-600 text-lg">{category.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {category.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center p-4 rounded-lg bg-white shadow-sm border border-slate-100 hover:border-primary-200 hover:shadow-md transition-all duration-300"
                  >
                    <stat.icon className="w-5 h-5 text-primary-600 mb-2" />
                    <div className="font-bold text-slate-900 text-lg">
                      {stat.value || ""}
                    </div>
                    <div className="text-xs text-slate-600 text-center">
                      {stat.label || ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              asChild
              variant="outline"
              className="w-full mt-5 hover:bg-primary-50 hover:text-white transition-all duration-300"
            >
              <Link
                href={category.viewLink}
                className="flex items-center justify-center gap-2 py-6"
              >
                View Program Details
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Images - Right Side */}
          <div className="lg:w-3/5 relative">
            {/* Main large image */}
            <div className="relative h-80 lg:h-full w-full">
              <Image
                src={currentImage}
                alt={category.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Thumbnail strip at bottom */}
            {/* <div className="absolute bottom-0 left-0 right-0 flex gap-2 p-3 bg-black/30 backdrop-blur-sm">
              <div
                className={`relative w-24 h-16 rounded-md overflow-hidden cursor-pointer border-2 ${
                  currentImage === category.mainImage
                    ? "border-white"
                    : "border-white/50 hover:border-white"
                } transition-all duration-300`}
                onClick={() => setCurrentImage(category.mainImage)}
              >
                <Image
                  src={category.mainImage}
                  alt={`${category.title} main`}
                  fill
                  className="object-cover"
                />
              </div>
              {category.additionalImages.map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  className={`relative w-24 h-16 rounded-md overflow-hidden cursor-pointer border-2 ${
                    currentImage === image
                      ? "border-white"
                      : "border-white/50 hover:border-white"
                  } transition-all duration-300`}
                  onClick={() => setCurrentImage(image)}
                >
                  <Image
                    src={image}
                    alt={`${category.title} thumbnail ${imgIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

        <div className="container mx-auto px-4">
          <Badge variant="secondary" className="mb-8 animate-pulse">
            <Sparkles className="w-4 h-4 mr-2" />
            Transform Your Career
          </Badge>

          <div className="max-w-4xl space-y-6">
            <h1 className="text-5xl font-bold text-slate-900 tracking-tight">
              Discover Your Perfect
              <span className="text-primary-600 block bg-gradient-to-r from-primary-600 to-blue-500 bg-clip-text text-transparent">
                Learning Path
              </span>
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed">
              Explore our comprehensive range of programs designed to help you
              master new skills, advance your career, and achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8">
            {courseCategories.map((category, index) => (
              <CourseCard key={index} category={category} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
