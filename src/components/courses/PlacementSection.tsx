"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Briefcase, User, Clock, Loader2, ArrowRight } from "lucide-react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PlacedStudent {
  _id: string;
  name: string;
  image?: SanityImageSource;
  experience?: string;
  previousRole?: string;
  previousCompanyLogo?: SanityImageSource;
  newRole: string;
  companyLogo: SanityImageSource;
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
        const query = `*[_type == "placedStudent" && category->slug.current == $categorySlug] | order(name asc) {
          _id,
          name,
          image,
          experience,
          previousRole,
          previousCompanyLogo,
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

  if (loading) {
    return (
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 w-full bg-slate-100 animate-pulse rounded-2xl flex-1"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!loading && students.length === 0) {
    return (
      <section className="py-20 bg-slate-50 border-t border-light-90">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm text-grey-35 border border-slate-200">
            <Loader2 className="w-4 h-4 animate-spin text-primary-75" />
            <span>Interview Phase Active</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Briefcase size={16} />
            Success Stories
          </div>
          <h2 className="text-3xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-4">
            Our Placed Students
          </h2>
          <p className="text-grey-35 text-lg max-w-3xl mx-auto">
            See where our graduates are working now. From career transitions to
            promotions, our students are making their mark in the industry.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {students.map((student) => (
              <CarouselItem
                key={student._id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-lg hover:border-primary-90 transition-all duration-300 group h-full">
                  {/* Student Header */}
                  <div className="flex items-center gap-4 mb-5 pb-5 border-b border-slate-100">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary-90 bg-slate-100 flex items-center justify-center flex-shrink-0">
                      {student.image ?
                        <Image
                          src={urlFor(student.image).url()}
                          alt={student.name}
                          fill
                          className="object-cover"
                        />
                      : <User className="w-8 h-8 text-primary-75/50" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-vietnam font-bold text-grey-15 truncate">
                        {student.name}
                      </h3>
                      {student.experience && (
                        <p className="text-sm text-primary-75 font-medium">
                          {student.experience}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Role Transition */}
                  <div className="space-y-3">
                    {/* Previous Role */}
                    {student.previousRole && (
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-grey-35 mb-0.5">
                            Before Eduwise
                          </p>
                          <p className="text-sm font-medium text-grey-15 truncate">
                            {student.previousRole}
                          </p>
                        </div>
                        {student.previousCompanyLogo && (
                          <div className="relative size-14 flex-shrink-0 ml-2">
                            <Image
                              src={urlFor(student.previousCompanyLogo).url()}
                              alt="Previous Company"
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Arrow */}
                    {student.previousRole && (
                      <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-primary-99 flex items-center justify-center">
                          <ArrowRight className="size-4 text-primary-75 rotate-90" />
                        </div>
                      </div>
                    )}

                    {/* New Role */}
                    <div className="flex items-center justify-between p-3 bg-primary-99 rounded-lg border-2 border-primary-90">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-primary-75 mb-0.5">
                          After Eduwise
                        </p>
                        <p className="text-sm font-bold text-grey-15 truncate">
                          {student.newRole}
                        </p>
                      </div>
                      {student.companyLogo && (
                        <div className="relative size-14 flex-shrink-0 ml-2">
                          <Image
                            src={urlFor(student.companyLogo).url()}
                            alt={student.placedAt || "Company"}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12" />
          <CarouselNext className="hidden md:flex -right-4 lg:-right-12" />
        </Carousel>
      </div>
    </section>
  );
}
