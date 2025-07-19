import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AIMLPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center">AI & ML Course - Batch 2025</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Course Overview</h2>
        <p>
          The AIML course for Batch 2025 is designed to equip students with comprehensive knowledge in Artificial Intelligence and Machine Learning. It spans a wide range of technical and analytical topics with hands-on practical exposure, making students industry-ready.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Course Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "Introduction to AI/ML & Python Basics",
            "Object-Oriented Programming in Python",
            "Data Handling & Visualization",
            "Statistics for ML",
            "Machine Learning Algorithms",
            "Deep Learning Fundamentals",
            "Natural Language Processing",
            "Computer Vision",
            "Time Series Analysis",
            "Model Deployment & MLOps",
            "Capstone Project"
          ].map((module, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <p className="font-medium">{module}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Key Highlights</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Industry-recognized certification</li>
          <li>Hands-on projects and assignments</li>
          <li>Live sessions with domain experts</li>
          <li>Capstone project to showcase skills</li>
          <li>Career guidance and placement support</li>
        </ul>
      </section>

      <section className="space-y-4 text-center">
        <Button className="text-lg px-6 py-3">Enroll Now</Button>
      </section>
    </div>
  );
}
