import { Mail, AlertCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-primary-99">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
              Refund Policy
            </h1>
            <p className="text-grey-35 text-lg">
              At Eduwise.Solutions, we aim to deliver high-quality educational
              experiences. However, if you feel our services are not meeting
              your expectations, you may be eligible for a refund under the
              terms and conditions outlined below.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Important Note */}
            <div className="p-4 bg-primary-99 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-primary-75 mt-1 flex-shrink-0" />
              <p className="text-grey-35">
                This policy is in compliance with Indian laws and designed to
                ensure fairness for both participants and the company.
              </p>
            </div>

            {/* Course Refund Policy */}
            <Card className="mb-8 mt-8 ">
              <CardHeader>
                <CardTitle className="text-2xl font-vietnam">
                  1. Refund Policy for Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="eligibility">
                    <AccordionTrigger className="text-lg font-vietnam font-semibold">
                      Eligibility for Refund
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 text-grey-35">
                      <p>
                        Refunds can be requested within the first 3 sessions
                        (approximately 7 days) of the cohort start date, under
                        the following conditions:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          You must attend and actively participate in all the
                          first 3 sessions.
                        </li>
                        <li>
                          You must complete and submit all assignments provided
                          during this period.
                        </li>
                        <li>
                          Refunds are subject to review and approval based on a
                          valid reason provided by you.
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="partial-refund">
                    <AccordionTrigger className="text-lg font-vietnam font-semibold">
                      Partial Refund
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 text-grey-35">
                      <p>
                        A partial refund may be issued after deducting the fees
                        for the first 3 sessions. This ensures compensation for
                        the content and resources utilized during the initial
                        sessions.
                      </p>
                      <p>
                        The exact refund amount will be determined based on the
                        extent of participation and resources used.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="non-refundable">
                    <AccordionTrigger className="text-lg font-vietnam font-semibold">
                      Non-Refundable Situations
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 text-grey-35">
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          You fail to attend all 3 sessions or complete the
                          required assignments.
                        </li>
                        <li>
                          You request a refund after the first 3 sessions.
                        </li>
                        <li>
                          The reason for the refund is deemed invalid by our
                          review board.
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Webinar Refund Policy */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-vietnam">
                  2. Refund Policy for Webinars
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-grey-35">
                <div className="bg-light-97 p-4 rounded-lg">
                  <p className="font-semibold text-grey-20">No Refunds:</p>
                  <p>
                    Refunds are not offered for webinar purchases, regardless of
                    attendance or dissatisfaction.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-grey-20 mb-2">
                    Access to Recordings:
                  </p>
                  <p>
                    If you miss the live webinar, recordings may be made
                    available upon request (subject to availability).
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* General Terms */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-vietnam">
                  3. General Terms and Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-vietnam font-semibold text-grey-20 mb-2">
                    Cancellation by Eduwise.Solutions
                  </h3>
                  <p className="text-grey-35">
                    If a course cohort is canceled or postponed by
                    Eduwise.Solutions, you will be offered either a full refund
                    or the option to transfer to another cohort at no additional
                    cost.
                  </p>
                </div>
                <div>
                  <h3 className="font-vietnam font-semibold text-grey-20 mb-2">
                    Changes to the Refund Policy
                  </h3>
                  <p className="text-grey-35">
                    Eduwise.Solutions reserves the right to modify this refund
                    policy at any time. Updates will be published on our
                    website, and continued use of our services indicates
                    acceptance of these changes.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-vietnam">
                  4. Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-grey-35">
                    If you have questions about our refund policy, please
                    contact us at:
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-primary-75 mt-1" />
                      <Link
                        href="mailto:admin@eduwise.solutions"
                        className="text-primary-75 hover:underline"
                      >
                        admin@eduwise.solutions
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
