"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { modulesData } from "@/const/devOps_modules";

export default function DevOpsCurriculum() {
  const [selectedModule, setSelectedModule] = useState<number>(1);
  const selectedModuleData = modulesData.find((m) => m.id === selectedModule);

  return (
    <div className=" bg-gray-50">
      <div className="container mx-auto px-4 py-4 lg:py-8 space-y-4 lg:space-y-8">
        {/* Section 1: Course Curriculum */}
        <Card className="bg-gradient-to-br from-primary-70 to-primary-90 text-white overflow-hidden">
          <CardContent className="p-4 lg:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-3 lg:gap-4 mb-4 lg:mb-6">
              {/* <div className="bg-primary-80 text-white font-bold text-xl lg:text-2xl px-3 lg:px-4 py-1.5 lg:py-2 rounded-r-lg -ml-4 lg:-ml-8">
                1
              </div> */}
              <div className="flex-1">
                <h2 className="text-xl lg:text-2xl font-bold mb-2">
                  Course Curriculum
                </h2>
                <p className="text-primary-100 text-xs lg:text-sm leading-relaxed">
                  Our course is designed by industry experts for excellent
                  academic and industrial experience. We have a balanced
                  combination of theoretical, technical, and practical knowledge
                  for you to get the best training experience for everyone
                  regardless of their background.
                </p>
              </div>
              <span className="text-xs bg-primary-80 px-3 py-1 rounded flex items-center gap-1 whitespace-nowrap">
                📅 3.5 Months
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 lg:gap-6">
              {/* Scrollable Modules List */}
              <Card className="bg-white text-gray-800 h-[400px] lg:h-[600px]">
                <ScrollArea className="h-full">
                  <CardContent className="p-3 lg:p-4 space-y-2">
                    {modulesData.map((module) => (
                      <div
                        key={module.id}
                        onClick={() => setSelectedModule(module.id)}
                        className={`p-2.5 lg:p-3 rounded-lg cursor-pointer transition-all ${
                          selectedModule === module.id ?
                            "bg-primary-100 border-l-4 border-primary-500 font-semibold"
                          : "hover:bg-gray-50 border-l-4 border-transparent"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-xs text-gray-500">
                              {module.subtitle}
                            </div>
                            <div className="text-xs lg:text-sm line-clamp-2">
                              {module.title}
                            </div>
                            {module.duration && (
                              <div className="text-xs text-gray-400 mt-1">
                                ⏱️ {module.duration}
                              </div>
                            )}
                          </div>
                          <ChevronRight
                            className={`w-4 h-4 ml-2 transition-colors ${
                              selectedModule === module.id ?
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

              {/* Module Details with Scrollable Subtopics */}
              <Card className="bg-white text-gray-800 h-[400px] lg:h-[600px]">
                <ScrollArea className="h-full">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sticky top-0 bg-white pb-4 border-b">
                      <div>
                        <h3 className="text-lg lg:text-xl font-bold">
                          {selectedModuleData?.title}
                        </h3>
                        {selectedModuleData?.duration && (
                          <p className="text-xs text-gray-500 mt-1">
                            Duration: {selectedModuleData.duration}
                          </p>
                        )}
                      </div>
                      {/* <Button
                        variant="outline"
                        size="sm"
                        className="text-purple-600 border-purple-600 text-xs lg:text-sm w-full sm:w-auto shrink-0"
                      >
                        <Download className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
                        Download Syllabus
                      </Button> */}
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm lg:text-base text-gray-700">
                        Topics Covered:
                      </h4>
                      <ul className="space-y-2.5">
                        {selectedModuleData?.subtopics.map(
                          (subtopic, index) => (
                            <li
                              key={index}
                              className="text-xs lg:text-sm text-gray-600 flex items-start gap-2 p-2 rounded hover:bg-gray-50 transition-colors"
                            >
                              <span className="text-primary-500 font-bold shrink-0">
                                •
                              </span>
                              <span>{subtopic.title}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </CardContent>
                </ScrollArea>
              </Card>
            </div>
          </CardContent>
          {/* <div className="flex justify-center pb-4">
            <ChevronDown className="w-6 h-6 lg:w-8 lg:h-8 text-primary-400 animate-bounce" />
          </div> */}
        </Card>
      </div>
    </div>
  );
}
