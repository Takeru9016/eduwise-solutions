import { Award, GraduationCap, BarChart3, Rocket, Target } from "lucide-react";
import CTASection from "./CTASection";

export default function AboutUs() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-vietnam font-bold text-gray-900">
                About Eduwise
              </h1>
            </div>
            <div>
              <p className="text-gray-600 text-lg">
                At Eduwise Solutions, we are on a mission to bridge the gap
                between aspiring learners and top-tier educational
                opportunities. We partner with leading educational institutions
                and companies to bring you an extensive range of courses,
                tailored to meet the demands of today&apos;s fast-evolving
                professional landscape.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4">
          <h2 className="text-3xl font-vietnam font-bold text-gray-900 mb-12 text-center">
            Who We Are
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="relative w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-emerald-700" />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-emerald-200 rounded-full"></div>
              </div>
              <h3 className="text-xl font-vietnam font-semibold text-gray-900 mb-4">
                Your Trusted Education Partner
              </h3>
              <p className="text-gray-600">
                We act as a bridge between learners and reputed institutions,
                ensuring access to high-quality courses across diverse domains.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="relative w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6 text-emerald-700" />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-emerald-200 rounded-full"></div>
              </div>
              <h3 className="text-xl font-vietnam font-semibold text-gray-900 mb-4">
                Expert Collaborators
              </h3>
              <p className="text-gray-600">
                We collaborate with industry-leading companies and universities
                to offer courses in fields like Data Science, Web Development,
                Online MBA, and more.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="relative w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-emerald-700" />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-emerald-200 rounded-full"></div>
              </div>
              <h3 className="text-xl font-vietnam font-semibold text-gray-900 mb-4">
                Passionate Counsellors
              </h3>
              <p className="text-gray-600">
                Our experts bring years of experience and industry knowledge to
                help you set right career path.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-vietnam font-bold text-gray-900 mb-12">
              Our Mission & Our Vision
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="relative w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-6">
                  <Rocket className="w-6 h-6 text-emerald-700" />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-emerald-200 rounded-full"></div>
                </div>
                <p className="text-gray-600">
                  To create a seamless platform where learners can access
                  high-quality courses from leading institutions and companies,
                  transforming aspirations into achievements.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="relative w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-emerald-700" />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-emerald-200 rounded-full"></div>
                </div>
                <p className="text-gray-600">
                  To empower learners with the right education and tools to
                  excel and start their professional journey while enabling
                  partner companies to reach and educate a broader audience
                  effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
