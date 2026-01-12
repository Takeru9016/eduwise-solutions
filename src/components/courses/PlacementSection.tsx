"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Briefcase, User, Clock, Loader2 } from "lucide-react";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image"; // Assuming this is where it is

interface PlacedStudent {
  _id: string;
  name: string;
  image?: any;
  previousRole?: string;
  newRole: string;
  companyLogo: any;
  placedAt?: string;
}

interface PlacementSectionProps {
  categorySlug: string;
}

export default function PlacementSection({
  categorySlug,
}: PlacementSectionProps) {
  const [students, setStudents] = useState<PlacedStudent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const query = `*[_type == "placedStudent" && category->slug.current == $categorySlug] {
          _id,
          name,
          image,
          previousRole,
          newRole,
          companyLogo,
          placedAt
        }`;
        const data = await client.fetch(query, { categorySlug });
        setStudents(data);
      } catch (error) {
        console.error("Error fetching placed students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [categorySlug]);

  // console.log("Students state length:", students.length);

  if (loading) {
    // Optional: Add a loading skeleton or just return null
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="h-96 md:h-[500px] w-full bg-slate-100 animate-pulse rounded-2xl"></div>
        </div>
      </section>
    );
  }

  // FORCE RENDER for debugging - remove the null check
  if (!loading && students.length === 0) {
    return (
      <section className="py-20 bg-white border-t border-light-90">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-99 rounded-full mb-6">
            <Clock className="w-8 h-8 text-primary-75" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-vietnam font-bold text-grey-15 mb-3">
            Placement Process in Progress
          </h2>
          <p className="text-grey-35 text-lg max-w-2xl mx-auto mb-6">
            Our current batch of students is currently undergoing their
            interview rounds. Success stories will be updated here soon!
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg text-sm text-grey-35 border border-slate-100">
            <Loader2 className="w-4 h-4 animate-spin text-primary-75" />
            <span>Interview Phase Active</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Briefcase size={16} />
            Success Stories
          </div>
          <h2 className="text-3xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
            Our Placed Students
          </h2>
          <p className="text-grey-35 text-lg max-w-3xl mx-auto">
            See where our graduates are working now. From career transitions to
            promotions, our students are making their mark in the industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {students.map((student) => (
            <div
              key={student._id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-light-90 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary-90 bg-slate-100 flex items-center justify-center">
                  {student.image ?
                    <Image
                      src={urlFor(student.image).url()}
                      alt={student.name}
                      fill
                      className="object-cover"
                    />
                  : <User className="w-10 h-10 text-primary-75/50" />}
                </div>
                {student.companyLogo && (
                  <div className="w-16 h-16 relative transition-all duration-300">
                    <Image
                      src={urlFor(student.companyLogo).url()}
                      alt={student.placedAt || "Company Logo"}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>

              <h3 className="text-xl font-vietnam font-bold text-grey-15 mb-2">
                {student.name}
              </h3>

              <div className="space-y-3">
                <div className="flex items-center flex-wrap gap-2 text-sm">
                  {student.previousRole && (
                    <>
                      <span className="text-black font-medium opacity-70">
                        {student.previousRole}
                      </span>
                      <ArrowRight size={14} className="text-primary-75" />
                    </>
                  )}
                  <span className="font-bold text-primary-75">
                    {student.newRole}
                  </span>
                </div>

                {student.placedAt && (
                  <div className="text-sm text-grey-35 pt-2 border-t border-dashed border-light-90">
                    Placed at{" "}
                    <span className="font-semibold text-grey-15">
                      {student.placedAt}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
