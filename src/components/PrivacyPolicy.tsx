import { Shield, Lock, Database, Mail, FileText } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-primary-99">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
              Privacy Policy
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
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary-75" />
                  Introduction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-grey-35">
                <p>
                  At Eduwise Solutions, we are committed to protecting your
                  privacy and ensuring the security of your personal
                  information. This Privacy Policy explains how we collect, use,
                  and protect your data when you use our services.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-6 h-6 text-primary-75" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-grey-20">
                    Personal Information:
                  </h3>
                  <ul className="list-disc pl-6 text-grey-35 space-y-2">
                    <li>Name and contact details</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Educational background</li>
                    <li>Employment history</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-grey-20">
                    Technical Information:
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

            {/* How We Use Your Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-6 h-6 text-primary-75" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-grey-35">
                <p>We use your information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and maintain our educational services</li>
                  <li>Process your enrollment and payments</li>
                  <li>Send important course updates and notifications</li>
                  <li>Improve our services and user experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-6 h-6 text-primary-75" />
                  Data Security
                </CardTitle>
              </CardHeader>
              <CardContent className="text-grey-35">
                <p>
                  We implement appropriate security measures to protect your
                  personal information from unauthorized access, alteration,
                  disclosure, or destruction. This includes:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Encryption of sensitive data</li>
                  <li>Regular security assessments</li>
                  <li>Access controls and authentication</li>
                  <li>Secure data storage practices</li>
                </ul>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary-75" />
                  Your Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="text-grey-35">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Access your personal information</li>
                  <li>Request corrections to your data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to data processing</li>
                  <li>Data portability</li>
                </ul>
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
                  If you have any questions about this Privacy Policy, please
                  contact us at:
                </p>
                <div className="mt-4">
                  <p className="font-semibold">Eduwise Solutions</p>
                  <p>Email: privacy@eduwise.solutions</p>
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
