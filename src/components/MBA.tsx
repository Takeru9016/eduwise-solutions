// app/courses/masters/mba/page.tsx
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  Users,
  Building,
  BookOpen,
  Monitor,
  CheckCircle2,
} from "lucide-react";

const specializations = [
  "Finance",
  "Digital Marketing",
  "Marketing",
  "HRM",
  "Analytics & Data Science",
  "IT & FinTech",
  "Operations Management",
  "Retail Management",
  "International Business",
  "Information System Management",
  "Project Management",
  "Supply Chain Management",
  "Banking Finance Service & Insurance",
];

export default function MBAPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-primary-99">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-primary-75">Masters Program</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
              Master of Business Administration
            </h1>
            <div className="flex flex-wrap gap-4 text-grey-35">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>2 Years</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Weekend Classes</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                <span>100% Placement Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Specializations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-vietnam">
                    Available Specializations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {specializations.map((spec, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-primary-99 text-primary-75 border-primary-75"
                      >
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Course Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-vietnam">
                    Course Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      "Flexible and customisable class and exam schedule",
                      "100% placements and job opportunities with higher packages up to 22 lakhs LPA",
                      "Full assistance in Final year project and internship",
                      "Access to alumni portal which includes Mr. Satya Nadela, Mr. Sanjeev Kapoor, Mr. Rajeev Suri",
                    ].map((benefit, index) => (
                      <li key={index} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary-75 flex-shrink-0" />
                        <span className="text-grey-35">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* LMS Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-vietnam">
                    LMS Portal Includes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      {
                        icon: Monitor,
                        text: "Live classes & recorded classes",
                      },
                      { icon: BookOpen, text: "Study materials" },
                      { icon: BookOpen, text: "E-books & E-content" },
                      { icon: BookOpen, text: "E-Tutorials" },
                      { icon: BookOpen, text: "Assessment and Transcript" },
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-primary-75" />
                        <span className="text-grey-35">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
