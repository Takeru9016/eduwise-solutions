import React from "react";
import {
  ShieldCheck,
  AlertCircle,
  RefreshCcw,
  Ban,
  Mail,
  Clock,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-primary-99 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-vietnam font-bold text-grey-15 mb-6 animate-fade-in-up">
              Refund Policy
            </h1>
            <p className="text-grey-35 text-xl md:text-2xl max-w-2xl mx-auto">
              Fair, Transparent, and Customer-Centric Approach
            </p>
          </div>
        </div>
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-25 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Important Note */}
            <div className="bg-primary-99 rounded-lg flex gap-4 p-6 mb-8 items-center shadow-md">
              <AlertCircle className="w-8 h-8 text-primary-75 flex-shrink-0" />
              <div>
                <h2 className="font-semibold text-grey-20 mb-2">
                  Important Notice
                </h2>
                <p className="text-grey-35">
                  This policy is designed to ensure fairness for both
                  participants and Eduwise Solutions, in full compliance with
                  Indian laws.
                </p>
              </div>
            </div>

            <Tabs defaultValue="courses" className="mb-8">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="courses">Course Refunds</TabsTrigger>
                <TabsTrigger value="webinars">Webinar Policy</TabsTrigger>
              </TabsList>

              <TabsContent value="courses">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <ShieldCheck className="w-7 h-7 text-primary-75" />
                      Course Refund Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="eligibility">
                        <AccordionTrigger className="text-lg font-vietnam font-semibold">
                          Refund Eligibility
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 text-grey-35">
                          <div className="bg-primary-99 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-5 h-5 text-primary-75" />
                              <span className="font-semibold text-grey-20">
                                7-Day Window
                              </span>
                            </div>
                            <p>
                              Refunds are available within the first 3 sessions
                              (approximately 7 days).
                            </p>
                          </div>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>
                              Must attend and actively participate in all first
                              3 sessions
                            </li>
                            <li>
                              Complete and submit all assignments during this
                              period
                            </li>
                            <li>
                              Provide a valid reason for the refund request
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="partial-refund">
                        <AccordionTrigger className="text-lg font-vietnam font-semibold">
                          Partial Refund Details
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 text-grey-35">
                          <div className="bg-primary-99 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <RefreshCcw className="w-5 h-5 text-primary-75" />
                              <span className="font-semibold text-grey-20">
                                Prorated Refund
                              </span>
                            </div>
                            <p>
                              Partial refunds calculated after deducting fees
                              for initial sessions.
                            </p>
                          </div>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>
                              Refund amount based on participation and resources
                              used
                            </li>
                            <li>First 3 sessions fees will be deducted</li>
                            <li>
                              Remaining balance eligible for partial refund
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="non-refundable">
                        <AccordionTrigger className="text-lg font-vietnam font-semibold">
                          Non-Refundable Scenarios
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 text-grey-35">
                          <div className="bg-primary-99 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Ban className="w-5 h-5 text-primary-75" />
                              <span className="font-semibold text-grey-20">
                                Refund Restrictions
                              </span>
                            </div>
                            <p>Certain conditions void refund eligibility.</p>
                          </div>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Missing all 3 initial sessions</li>
                            <li>Incomplete assignment submission</li>
                            <li>Refund request after initial 3 sessions</li>
                            <li>Invalid reason per review board</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="webinars">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <ShieldCheck className="w-7 h-7 text-primary-75" />
                      Webinar Refund Policy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-primary-99 p-6 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Ban className="w-6 h-6 text-primary-75" />
                        <h3 className="font-semibold text-grey-20 text-lg">
                          No Refunds
                        </h3>
                      </div>
                      <p className="text-grey-35">
                        Webinar purchases are non-refundable, regardless of
                        attendance or satisfaction.
                      </p>
                    </div>

                    <div className="bg-light-97 p-6 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <RefreshCcw className="w-6 h-6 text-primary-75" />
                        <h3 className="font-semibold text-grey-20 text-lg">
                          Recording Access
                        </h3>
                      </div>
                      <p className="text-grey-35">
                        Missed live webinars may have recording access upon
                        request, subject to availability.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Additional Terms */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <AlertCircle className="w-7 h-7 text-primary-75" />
                  Additional Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-grey-20 mb-2">
                    Cancellation by Eduwise Solutions
                  </h3>
                  <p className="text-grey-35">
                    If a course is canceled or postponed, you&apos;ll receive a
                    full refund or free transfer to another cohort.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-grey-20 mb-2">
                    Policy Updates
                  </h3>
                  <p className="text-grey-35">
                    We reserve the right to modify this policy. Continued
                    service use indicates acceptance of changes.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Mail className="w-7 h-7 text-primary-75" />
                  Contact Our Support Team
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-grey-35 mb-4">
                  Questions about our refund policy? Reach out to us:
                </p>
                <a
                  href="mailto:admin@eduwise.solutions"
                  className="text-primary-50 font-bold text-xl hover:underline"
                >
                  admin@eduwise.solutions
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
