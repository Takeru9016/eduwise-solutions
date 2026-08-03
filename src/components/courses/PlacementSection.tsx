"use client";

import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { ArrowRight, Briefcase, Clock, Loader2, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface PlacedStudent {
  _id: string;
  companyLogo: SanityImageSource;
  experience?: string;
  image?: SanityImageSource;
  name: string;
  newRole: string;
  placedAt?: string;
  previousCompanyLogo?: SanityImageSource;
  previousRole?: string;
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
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex gap-6">
            {[1, 2, 3].map((i) => (
              <div
                className="h-64 w-full flex-1 animate-pulse rounded-2xl bg-slate-100"
                key={i}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!loading && students.length === 0) {
    return (
      <section className="border-light-90 border-t bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-99">
            <Clock className="h-8 w-8 text-primary-75" />
          </div>
          <h2 className="mb-3 font-bold font-vietnam text-2xl text-grey-15 lg:text-3xl">
            Placement Process in Progress
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-grey-35 text-lg">
            Our current batch of students is currently undergoing their
            interview rounds. Success stories will be updated here soon!
          </p>
          <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-grey-35 text-sm">
            <Loader2 className="h-4 w-4 animate-spin text-primary-75" />
            <span>Interview Phase Active</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-99 px-4 py-2 font-semibold text-primary-75 text-sm">
            <Briefcase size={16} />
            Success Stories
          </div>
          <h2 className="mb-4 font-bold font-vietnam text-3xl text-grey-15 lg:text-5xl">
            Our Placed Students
          </h2>
          <p className="mx-auto max-w-3xl text-grey-35 text-lg">
            See where our graduates are working now. From career transitions to
            promotions, our students are making their mark in the industry.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {students.map((student) => (
              <CarouselItem
                className="pl-4 md:basis-1/2 lg:basis-1/3"
                key={student._id}
              >
                <div className="group h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-md transition-all duration-300 hover:border-primary-90 hover:shadow-lg">
                  {/* Student Header */}
                  <div className="mb-5 flex items-center gap-4 border-slate-100 border-b pb-5">
                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary-90 bg-slate-100">
                      {student.image ? (
                        <Image
                          alt={student.name}
                          className="object-cover"
                          fill
                          src={urlFor(student.image).url()}
                        />
                      ) : (
                        <User className="h-8 w-8 text-primary-75/50" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-bold font-vietnam text-grey-15 text-lg">
                        {student.name}
                      </h3>
                      {student.experience && (
                        <p className="font-medium text-primary-75 text-sm">
                          {student.experience}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Role Transition */}
                  <div className="space-y-3">
                    {/* Previous Role */}
                    {student.previousRole && (
                      <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                        <div className="min-w-0 flex-1">
                          <p className="mb-0.5 text-grey-35 text-xs">
                            Before Eduwise
                          </p>
                          <p className="truncate font-medium text-grey-15 text-sm">
                            {student.previousRole}
                          </p>
                        </div>
                        {student.previousCompanyLogo && (
                          <div className="relative ml-2 size-14 shrink-0">
                            <Image
                              alt="Previous Company"
                              className="object-contain"
                              fill
                              src={urlFor(student.previousCompanyLogo).url()}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Arrow */}
                    {student.previousRole && (
                      <div className="flex justify-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-99">
                          <ArrowRight className="size-4 rotate-90 text-primary-75" />
                        </div>
                      </div>
                    )}

                    {/* New Role */}
                    <div className="flex items-center justify-between rounded-lg border-2 border-primary-90 bg-primary-99 p-3">
                      <div className="min-w-0 flex-1">
                        <p className="mb-0.5 text-primary-75 text-xs">
                          After Eduwise
                        </p>
                        <p className="truncate font-bold text-grey-15 text-sm">
                          {student.newRole}
                        </p>
                      </div>
                      {student.companyLogo && (
                        <div className="relative ml-2 size-14 shrink-0">
                          <Image
                            alt={student.placedAt || "Company"}
                            className="object-contain"
                            fill
                            src={urlFor(student.companyLogo).url()}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 hidden md:flex lg:-left-12" />
          <CarouselNext className="-right-4 hidden md:flex lg:-right-12" />
        </Carousel>
      </div>
    </section>
  );
}
