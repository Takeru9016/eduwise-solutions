import {
  FileText,
  UserCheck,
  ShieldAlert,
  Ban,
  Scale,
  Mail,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-primary-99">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
              Terms of Service
            </h1>
            <p className="text-grey-35 text-lg">
              Last updated: January 15, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Agreement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary-75" />
                  Agreement to Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="text-grey-35">
                <p>
                  By accessing or using Eduwise Solutions services, you agree to
                  be bound by these Terms of Service. If you disagree with any
                  part of these terms, you may not access our services.
                </p>
              </CardContent>
            </Card>

            {/* User Accounts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-6 h-6 text-primary-75" />
                  User Accounts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-grey-35">
                <p>When creating an account, you must:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account</li>
                  <li>Promptly update any changes to your information</li>
                  <li>
                    Accept responsibility for all activities under your account
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Course Policies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-6 h-6 text-primary-75" />
                  Course Policies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-grey-35">
                <div className="space-y-2">
                  <h3 className="font-semibold text-grey-20">Enrollment:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Course access is granted after successful payment</li>
                    <li>Enrollment is non-transferable</li>
                    <li>Course materials are for personal use only</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-grey-20">
                    Course Content:
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All materials are protected by copyright</li>
                    <li>Sharing or redistributing content is prohibited</li>
                    <li>Course content may be updated periodically</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Prohibited Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ban className="w-6 h-6 text-primary-75" />
                  Prohibited Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="text-grey-35">
                <p>Users are prohibited from:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Sharing account credentials</li>
                  <li>Copying or redistributing course materials</li>
                  <li>Engaging in disruptive behavior</li>
                  <li>Using services for illegal purposes</li>
                  <li>Attempting to access unauthorized areas</li>
                </ul>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6 text-primary-75" />
                  Intellectual Property
                </CardTitle>
              </CardHeader>
              <CardContent className="text-grey-35">
                <p>
                  All content, including but not limited to courses, materials,
                  logos, and trademarks, are the exclusive property of Eduwise
                  Solutions. Users agree not to reproduce, distribute, or create
                  derivative works without explicit permission.
                </p>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ban className="w-6 h-6 text-primary-75" />
                  Termination
                </CardTitle>
              </CardHeader>
              <CardContent className="text-grey-35">
                <p>
                  We reserve the right to terminate or suspend accounts for
                  violations of these terms, inappropriate behavior, or at our
                  discretion. Upon termination, your right to access our
                  services will immediately cease.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-6 h-6 text-primary-75" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent className="text-grey-35">
                <p>
                  For questions about these Terms of Service, please contact us
                  at:
                </p>
                <div className="mt-4">
                  <p className="font-semibold">Eduwise Solutions</p>
                  <p>Email: legal@eduwise.solutions</p>
                  <p>Address: [Your Address]</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
