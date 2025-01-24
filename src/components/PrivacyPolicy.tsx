import {
  Shield,
  Lock,
  Database,
  Mail,
  FileText,
  CheckCircle,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-primary-99 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-vietnam font-bold text-grey-15 mb-6 animate-fade-in-up">
              Privacy Policy
            </h1>
            <p className="text-grey-35 text-xl md:text-2xl max-w-2xl mx-auto">
              Your data privacy and security are our top priorities
            </p>
            <p className="text-grey-35 text-lg mt-4">
              Last updated: January 15, 2025
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
          <Tabs defaultValue="overview" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="rights">Your Rights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-6">
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Shield className="w-7 h-7 text-primary-75" />
                      Our Commitment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-grey-35 leading-relaxed">
                      At Eduwise Solutions, we are committed to protecting your
                      privacy through transparent data practices, robust
                      security measures, and respectful information handling.
                    </p>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Database className="w-6 h-6 text-primary-75" />
                        Data We Collect
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-grey-35">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Personal Details
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Contact Information
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Technical Usage Data
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Lock className="w-6 h-6 text-primary-75" />
                        Data Protection
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-grey-35">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          End-to-End Encryption
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Regular Security Audits
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Strict Access Controls
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <FileText className="w-7 h-7 text-primary-75" />
                    Detailed Information Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-grey-20 mb-3">
                      Personal Information
                    </h3>
                    <ul className="list-disc pl-6 text-grey-35 space-y-2">
                      <li>Name and contact details</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                      <li>Educational background</li>
                      <li>Employment history</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-grey-20 mb-3">
                      Technical Information
                    </h3>
                    <ul className="list-disc pl-6 text-grey-35 space-y-2">
                      <li>Device information</li>
                      <li>IP address</li>
                      <li>Browser type</li>
                      <li>Usage data</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rights">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <FileText className="w-7 h-7 text-primary-75" />
                    Your Privacy Rights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-primary-99 p-4 rounded-lg">
                    <h3 className="font-semibold text-grey-20 mb-2">
                      Your Control, Your Data
                    </h3>
                    <p className="text-grey-35">
                      We believe in empowering you with complete control over
                      your personal information.
                    </p>
                  </div>
                  <ul className="list-disc pl-6 text-grey-35 space-y-3">
                    <li>Access and review your personal information</li>
                    <li>Request corrections to your data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to specific data processing activities</li>
                    <li>Request data portability</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <Card className="max-w-xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-3">
                  <Mail className="w-7 h-7 text-primary-75" />
                  Contact Our Privacy Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-grey-35 mb-4">
                  For any privacy-related inquiries or concerns, reach out to
                  us:
                </p>
                <a
                  href="mailto:legal@eduwise.solutions"
                  className="text-primary-50 font-bold text-xl hover:underline"
                >
                  legal@eduwise.solutions
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
