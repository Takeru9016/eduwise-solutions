import { CheckCircle2, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { careerTrackData } from "@/const/devOps_career";
import CompanyMarquee from "../common/CompanyMarquee";
import { Card, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

export default function TEMP_SEC() {
  const [selectedCareerTrack, setSelectedCareerTrack] = useState<number>(1);
  const selectedCareerTrackData = careerTrackData.find(
    (c) => c.id === selectedCareerTrack
  );
  return (
    <>
      {/* Section 2: Placement Readiness Test (PRT) */}
      <Card className="overflow-hidden bg-linear-to-br from-primary-70 to-primary-90 text-white">
        <CardContent className="p-4 lg:p-8">
          <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row lg:mb-6 lg:gap-4">
            <div className="-ml-4 rounded-r-lg bg-primary-80 px-3 py-1.5 font-bold text-white text-xl lg:-ml-8 lg:px-4 lg:py-2 lg:text-2xl">
              2
            </div>
            <div className="flex-1">
              <h2 className="mb-2 font-bold text-xl lg:text-2xl">
                Placement Readiness Test (PRT)
              </h2>
              <p className="text-primary-100 text-xs leading-relaxed lg:text-sm">
                To become eligible for our Job Guarantee Program, every learner
                must complete the following Placement Readiness Test (PRT)
                milestones:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
            {/* Step 1 */}
            <Card className="border-none bg-white backdrop-blur-xs transition-all duration-300">
              <CardContent className="p-4 lg:p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-80 text-white lg:h-20 lg:w-20">
                    <span className="font-bold text-2xl lg:text-3xl">1</span>
                  </div>
                  <div>
                    <h3 className="mb-2 font-bold text-lg lg:text-xl">
                      Complete Your Learning Journey
                    </h3>
                    <div className="mt-3 rounded-lg bg-primary-95/50 p-3 lg:p-4">
                      <CheckCircle2 className="mx-auto mb-2 h-6 w-6 text-emerald-400 lg:h-8 lg:w-8" />
                      <p className="font-semibold text-xs lg:text-sm">
                        Finish 100% of the DevOps Course Curriculum
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-none bg-white backdrop-blur-xs transition-all duration-300">
              <CardContent className="p-4 lg:p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-80 text-white lg:h-20 lg:w-20">
                    <span className="font-bold text-2xl lg:text-3xl">2</span>
                  </div>
                  <div>
                    <h3 className="mb-2 font-bold text-lg lg:text-xl">
                      Build Real-World Experience
                    </h3>
                    <div className="mt-3 rounded-lg bg-primary-95/50 p-3 lg:p-4">
                      <div className="mb-2 flex justify-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 lg:h-6 lg:w-6" />
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 lg:h-6 lg:w-6" />
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 lg:h-6 lg:w-6" />
                      </div>
                      <p className="font-semibold text-xs lg:text-sm">
                        Successfully complete a minimum of 3 hands-on projects
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-none bg-white backdrop-blur-xs transition-all duration-300 md:col-span-3 lg:col-span-1">
              <CardContent className="p-4 lg:p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-80 text-white lg:h-20 lg:w-20">
                    <span className="font-bold text-2xl lg:text-3xl">3</span>
                  </div>
                  <div>
                    <h3 className="mb-2 font-bold text-lg lg:text-xl">
                      Demonstrate Your Expertise
                    </h3>
                    <div className="mt-3 rounded-lg bg-primary-95/50 p-3 lg:p-4">
                      <div className="mb-2 text-3xl lg:text-4xl">🎯</div>
                      <p className="font-semibold text-xs lg:text-sm">
                        Clear the 1:1 Virtual Interview Round with our DevOps
                        Experts
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 text-center lg:mt-8">
            <div className="inline-block rounded-xl bg-white p-4 text-black lg:p-6">
              <p className="mb-2 font-semibold text-sm lg:text-base">
                ✨ Complete all 3 steps to unlock your Job Guarantee Program
                eligibility! ✨
              </p>
              <p className="text-black-200 text-xs lg:text-sm">
                Our team will guide you through each milestone to ensure your
                success
              </p>
            </div>
          </div>
        </CardContent>
        <div className="flex justify-center pb-4">
          <ChevronDown className="h-6 w-6 animate-bounce text-primary-400 lg:h-8 lg:w-8" />
        </div>
      </Card>

      {/* Section 3: Sign ISA Agreement */}
      <Card className="overflow-hidden bg-linear-to-br from-primary-70 to-primary-90 text-white">
        <CardContent className="p-4 lg:p-8">
          <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row lg:mb-6 lg:gap-4">
            <div className="-ml-4 rounded-r-lg bg-primary-80 px-3 py-1.5 font-bold text-white text-xl lg:-ml-8 lg:px-4 lg:py-2 lg:text-2xl">
              3
            </div>
            <div className="flex-1">
              <h2 className="mb-2 font-bold text-xl lg:text-2xl">
                Sign ISA Agreement
              </h2>
              <p className="text-primary-100 text-xs leading-relaxed lg:text-sm">
                The students need to pay after they get placed. They need to pay
                INR 20,000 to Eduwise Solutions as a career services fee which
                can be paid in easy EMIs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <Card className="border-primary-600 bg-primary-800/50">
              <CardContent className="p-4 text-center lg:p-6">
                <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-white p-4 lg:h-32">
                  <div className="text-3xl lg:text-4xl">📄</div>
                </div>
                <p className="font-semibold text-white text-xs lg:text-sm">
                  Sign ISA
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary-600 bg-primary-800/50">
              <CardContent className="p-4 text-center lg:p-6">
                <div className="relative mb-4 flex h-24 items-center justify-center rounded-lg bg-white p-4 lg:h-32">
                  <div className="text-3xl lg:text-4xl">👤</div>
                  <div className="absolute top-2 right-2 rounded-full bg-primary-80 p-1.5 lg:p-2">
                    <span className="text-lg lg:text-2xl">✓</span>
                  </div>
                </div>
                <p className="font-semibold text-white text-xs lg:text-sm">
                  You are eligible
                </p>
                <p className="text-white text-xs">for placement program</p>
              </CardContent>
            </Card>

            <Card className="border-primary-600 bg-primary-800/50 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-4 text-center lg:p-6">
                <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-white p-4 lg:h-32">
                  <div className="text-3xl lg:text-4xl">💰</div>
                </div>
                <p className="font-semibold text-white text-xs lg:text-sm">
                  Pay the career services
                </p>
                <p className="text-white text-xs">fee of INR (20,000) INR</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <div className="flex justify-center pb-4">
          <ChevronDown className="h-6 w-6 animate-bounce text-primary-400 lg:h-8 lg:w-8" />
        </div>
      </Card>

      {/* Section 4: Career Track */}
      <Card className="overflow-hidden bg-linear-to-br from-primary-70 to-primary-90 text-white">
        <CardContent className="p-4 lg:p-8">
          <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row lg:mb-6 lg:gap-4">
            <div className="-ml-4 rounded-r-lg bg-primary-80 px-3 py-1.5 font-bold text-white text-xl lg:-ml-8 lg:px-4 lg:py-2 lg:text-2xl">
              4
            </div>
            <div className="flex-1">
              <h2 className="mb-2 font-bold text-xl lg:text-2xl">
                Career Track
              </h2>
              <p className="text-primary-100 text-xs leading-relaxed lg:text-sm">
                Once you have enrolled for the program then you will have access
                to a wide range of resources which will help you in becoming a
                Job-Ready Candidate. We have a dedicated placement team of
                professionals who excel in their individual domains committed to
                assist you in your journey.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr] lg:gap-6">
            {/* Scrollable Career Track List */}
            <Card className="h-[400px] bg-white text-gray-800 lg:h-[600px]">
              <ScrollArea className="h-full">
                <CardContent className="space-y-2 p-3 lg:p-4">
                  {careerTrackData.map((item) => (
                    <div
                      className={`cursor-pointer rounded-lg p-2.5 transition-all lg:p-3 ${
                        selectedCareerTrack === item.id
                          ? "border-primary-500 border-l-4 bg-primary-100 font-semibold"
                          : "border-transparent border-l-4 hover:bg-gray-50"
                      }`}
                      key={item.id}
                      onClick={() => setSelectedCareerTrack(item.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="line-clamp-2 text-xs lg:text-sm">
                            {item.title}
                          </div>
                          <div className="mt-1 line-clamp-1 text-gray-400 text-xs">
                            {item.description}
                          </div>
                        </div>
                        <ChevronRight
                          className={`ml-2 h-4 w-4 shrink-0 transition-colors ${
                            selectedCareerTrack === item.id
                              ? "text-primary-500"
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
            <Card className="h-[400px] bg-white text-gray-800 lg:h-[600px]">
              <ScrollArea className="h-full">
                <CardContent className="p-4 lg:p-6">
                  <div className="sticky top-0 mb-4 border-b bg-white pb-4">
                    <h3 className="font-bold text-lg lg:text-xl">
                      {selectedCareerTrackData?.title}
                    </h3>
                    <p className="mt-1 text-gray-500 text-xs lg:text-sm">
                      {selectedCareerTrackData?.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-700 text-sm lg:text-base">
                      What You&lsquo;ll Learn:
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedCareerTrackData?.details.map((detail, index) => (
                        <li
                          className="flex items-start gap-2 rounded p-2 text-gray-600 text-xs transition-colors hover:bg-gray-50 lg:text-sm"
                          key={index}
                        >
                          <span className="shrink-0 font-bold text-primary-500">
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
          <ChevronDown className="h-6 w-6 animate-bounce text-primary-400 lg:h-8 lg:w-8" />
        </div>
      </Card>

      {/* Section 5: Pay Career Services Fee */}
      <Card className="overflow-hidden bg-linear-to-br from-primary-70 to-primary-90 text-white">
        <CardContent className="p-4 lg:p-8">
          <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row lg:mb-6 lg:gap-4">
            <div className="-ml-4 rounded-r-lg bg-primary-80 px-3 py-1.5 font-bold text-white text-xl lg:-ml-8 lg:px-4 lg:py-2 lg:text-2xl">
              5
            </div>
            <div className="flex-1">
              <h2 className="mb-2 font-bold text-xl lg:text-2xl">
                Pay Career Services Fee
              </h2>
              <p className="text-primary-100 text-xs leading-relaxed lg:text-sm">
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
