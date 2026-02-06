import { careerTrackData } from "@/const/devOps_career";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { CheckCircle2, ChevronDown, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import CompanyMarquee from "../common/CompanyMarquee";
import { Card, CardContent } from "../ui/card";

export default function TEMP_SEC() {
  const [selectedCareerTrack, setSelectedCareerTrack] = useState<number>(1);
  const selectedCareerTrackData = careerTrackData.find(
    (c) => c.id === selectedCareerTrack,
  );
  return (
    <>
      {/* Section 2: Placement Readiness Test (PRT) */}
      <Card className="bg-gradient-to-br from-primary-70 to-primary-90 text-white overflow-hidden">
        <CardContent className="p-4 lg:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-3 lg:gap-4 mb-4 lg:mb-6">
            <div className="bg-primary-80 text-white font-bold text-xl lg:text-2xl px-3 lg:px-4 py-1.5 lg:py-2 rounded-r-lg -ml-4 lg:-ml-8">
              2
            </div>
            <div className="flex-1">
              <h2 className="text-xl lg:text-2xl font-bold mb-2">
                Placement Readiness Test (PRT)
              </h2>
              <p className="text-primary-100 text-xs lg:text-sm leading-relaxed">
                To become eligible for our Job Guarantee Program, every learner
                must complete the following Placement Readiness Test (PRT)
                milestones:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {/* Step 1 */}
            <Card className="bg-white backdrop-blur-sm border-none transition-all duration-300">
              <CardContent className="p-4 lg:p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="bg-primary-80 text-white rounded-full w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center">
                    <span className="text-2xl lg:text-3xl font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold mb-2">
                      Complete Your Learning Journey
                    </h3>
                    <div className="bg-primary-95/50 rounded-lg p-3 lg:p-4 mt-3">
                      <CheckCircle2 className="w-6 h-6 lg:w-8 lg:h-8 mx-auto mb-2 text-emerald-400" />
                      <p className="text-xs lg:text-sm font-semibold">
                        Finish 100% of the DevOps Course Curriculum
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="bg-white backdrop-blur-sm border-none transition-all duration-300">
              <CardContent className="p-4 lg:p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="bg-primary-80 text-white rounded-full w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center">
                    <span className="text-2xl lg:text-3xl font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold mb-2">
                      Build Real-World Experience
                    </h3>
                    <div className="bg-primary-95/50 rounded-lg p-3 lg:p-4 mt-3">
                      <div className="flex justify-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-400" />
                        <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-400" />
                        <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-400" />
                      </div>
                      <p className="text-xs lg:text-sm font-semibold">
                        Successfully complete a minimum of 3 hands-on projects
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="bg-white backdrop-blur-sm border-none transition-all duration-300 md:col-span-3 lg:col-span-1">
              <CardContent className="p-4 lg:p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="bg-primary-80 text-white rounded-full w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center">
                    <span className="text-2xl lg:text-3xl font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold mb-2">
                      Demonstrate Your Expertise
                    </h3>
                    <div className="bg-primary-95/50 rounded-lg p-3 lg:p-4 mt-3">
                      <div className="text-3xl lg:text-4xl mb-2">🎯</div>
                      <p className="text-xs lg:text-sm font-semibold">
                        Clear the 1:1 Virtual Interview Round with our DevOps
                        Experts
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 lg:mt-8 text-center">
            <div className="bg-white text-black rounded-xl p-4 lg:p-6 inline-block">
              <p className="text-sm lg:text-base font-semibold mb-2">
                ✨ Complete all 3 steps to unlock your Job Guarantee Program
                eligibility! ✨
              </p>
              <p className="text-xs lg:text-sm text-black-200">
                Our team will guide you through each milestone to ensure your
                success
              </p>
            </div>
          </div>
        </CardContent>
        <div className="flex justify-center pb-4">
          <ChevronDown className="w-6 h-6 lg:w-8 lg:h-8 text-primary-400 animate-bounce" />
        </div>
      </Card>

      {/* Section 3: Sign ISA Agreement */}
      <Card className="bg-gradient-to-br from-primary-70 to-primary-90 text-white overflow-hidden">
        <CardContent className="p-4 lg:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-3 lg:gap-4 mb-4 lg:mb-6">
            <div className="bg-primary-80 text-white font-bold text-xl lg:text-2xl px-3 lg:px-4 py-1.5 lg:py-2 rounded-r-lg -ml-4 lg:-ml-8">
              3
            </div>
            <div className="flex-1">
              <h2 className="text-xl lg:text-2xl font-bold mb-2">
                Sign ISA Agreement
              </h2>
              <p className="text-primary-100 text-xs lg:text-sm leading-relaxed">
                The students need to pay after they get placed. They need to pay
                INR 20,000 to Eduwise Solutions as a career services fee which
                can be paid in easy EMIs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 ">
            <Card className="bg-primary-800/50 border-primary-600">
              <CardContent className="p-4 lg:p-6 text-center">
                <div className="bg-white rounded-lg p-4 mb-4 h-24 lg:h-32 flex items-center justify-center">
                  <div className="text-3xl lg:text-4xl">📄</div>
                </div>
                <p className="text-xs lg:text-sm font-semibold text-white">
                  Sign ISA
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary-800/50 border-primary-600">
              <CardContent className="p-4 lg:p-6 text-center">
                <div className="bg-white rounded-lg p-4 mb-4 h-24 lg:h-32 flex items-center justify-center relative">
                  <div className="text-3xl lg:text-4xl">👤</div>
                  <div className="absolute top-2 right-2 bg-primary-80 rounded-full p-1.5 lg:p-2">
                    <span className="text-lg lg:text-2xl">✓</span>
                  </div>
                </div>
                <p className="text-xs lg:text-sm font-semibold text-white">
                  You are eligible
                </p>
                <p className="text-xs text-white">for placement program</p>
              </CardContent>
            </Card>

            <Card className="bg-primary-800/50 border-primary-600 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-4 lg:p-6 text-center">
                <div className="bg-white rounded-lg p-4 mb-4 h-24 lg:h-32 flex items-center justify-center">
                  <div className="text-3xl lg:text-4xl">💰</div>
                </div>
                <p className="text-xs lg:text-sm font-semibold text-white">
                  Pay the career services
                </p>
                <p className="text-xs text-white">fee of INR (20,000) INR</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <div className="flex justify-center pb-4">
          <ChevronDown className="w-6 h-6 lg:w-8 lg:h-8 text-primary-400 animate-bounce" />
        </div>
      </Card>

      {/* Section 4: Career Track */}
      <Card className="bg-gradient-to-br from-primary-70 to-primary-90 text-white overflow-hidden">
        <CardContent className="p-4 lg:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-3 lg:gap-4 mb-4 lg:mb-6">
            <div className="bg-primary-80 text-white font-bold text-xl lg:text-2xl px-3 lg:px-4 py-1.5 lg:py-2 rounded-r-lg -ml-4 lg:-ml-8">
              4
            </div>
            <div className="flex-1">
              <h2 className="text-xl lg:text-2xl font-bold mb-2">
                Career Track
              </h2>
              <p className="text-primary-100 text-xs lg:text-sm leading-relaxed">
                Once you have enrolled for the program then you will have access
                to a wide range of resources which will help you in becoming a
                Job-Ready Candidate. We have a dedicated placement team of
                professionals who excel in their individual domains committed to
                assist you in your journey.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 lg:gap-6">
            {/* Scrollable Career Track List */}
            <Card className="bg-white text-gray-800 h-[400px] lg:h-[600px]">
              <ScrollArea className="h-full">
                <CardContent className="p-3 lg:p-4 space-y-2">
                  {careerTrackData.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedCareerTrack(item.id)}
                      className={`p-2.5 lg:p-3 rounded-lg cursor-pointer transition-all ${
                        selectedCareerTrack === item.id ?
                          "bg-primary-100 border-l-4 border-primary-500 font-semibold"
                        : "hover:bg-gray-50 border-l-4 border-transparent"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-xs lg:text-sm line-clamp-2">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-400 mt-1 line-clamp-1">
                            {item.description}
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 ml-2 transition-colors shrink-0 ${
                            selectedCareerTrack === item.id ?
                              "text-primary-500"
                            : "text-gray-400"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </ScrollArea>
            </Card>

            {/* Career Track Details with Scrollable Content */}
            <Card className="bg-white text-gray-800 h-[400px] lg:h-[600px]">
              <ScrollArea className="h-full">
                <CardContent className="p-4 lg:p-6">
                  <div className="sticky top-0 bg-white pb-4 border-b mb-4">
                    <h3 className="text-lg lg:text-xl font-bold">
                      {selectedCareerTrackData?.title}
                    </h3>
                    <p className="text-xs lg:text-sm text-gray-500 mt-1">
                      {selectedCareerTrackData?.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm lg:text-base text-gray-700">
                      What You&lsquo;ll Learn:
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedCareerTrackData?.details.map((detail, index) => (
                        <li
                          key={index}
                          className="text-xs lg:text-sm text-gray-600 flex items-start gap-2 p-2 rounded hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-primary-500 font-bold shrink-0">
                            •
                          </span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </ScrollArea>
            </Card>
          </div>
        </CardContent>
        <div className="flex justify-center pb-4">
          <ChevronDown className="w-6 h-6 lg:w-8 lg:h-8 text-primary-400 animate-bounce" />
        </div>
      </Card>

      {/* Section 5: Pay Career Services Fee */}
      <Card className="bg-gradient-to-br from-primary-70 to-primary-90 text-white overflow-hidden">
        <CardContent className="p-4 lg:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-3 lg:gap-4 mb-4 lg:mb-6">
            <div className="bg-primary-80 text-white font-bold text-xl lg:text-2xl px-3 lg:px-4 py-1.5 lg:py-2 rounded-r-lg -ml-4 lg:-ml-8">
              5
            </div>
            <div className="flex-1">
              <h2 className="text-xl lg:text-2xl font-bold mb-2">
                Pay Career Services Fee
              </h2>
              <p className="text-primary-100 text-xs lg:text-sm leading-relaxed">
                Pay ₹20,000/- (Career Services Fee) Only after Getting Offer
                Letter
              </p>
            </div>
          </div>

          <CompanyMarquee />
        </CardContent>
      </Card>
    </>
  );
}
