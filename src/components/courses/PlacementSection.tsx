"use client";

import type { SanityImageSource } from "@sanity/image-url";
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
        const query = `*[_type == "placedStudent" && category->slug.current == $categorySlug] | order(featured desc, name asc) {
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
      <section className="bg-light-97 py-20">
        <div className="container">
          <div className="flex gap-6">
            {[1, 2, 3].map((i) => (
              <div
                className="h-64 w-full flex-1 animate-pulse rounded-3xl border-2 border-grey-15/10 bg-light-95"
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
      <section className="bg-light-97 py-20">
        <div className="container text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-99">
            <Clock className="h-8 w-8 text-grey-15" />
          </div>
          <h2 className="mb-3 font-bold font-vietnam text-2xl text-grey-15 lg:text-3xl">
            Placement Process in Progress
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-grey-35 text-lg">
            Our current batch of students is currently undergoing their
            interview rounds. Success stories will be updated here soon!
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-white px-4 py-2 text-grey-35 text-sm">
            <Loader2 className="h-4 w-4 animate-spin text-grey-15" />
            <span>Interview Phase Active</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-bold text-grey-15 text-sm">
          <Briefcase size={16} />
          Success Stories
        </div>
        <h2 className="mb-4 font-black font-vietnam text-3xl text-grey-15 lg:text-5xl">
          Our Placed Students
        </h2>
        <p className="mx-auto max-w-3xl text-grey-35 text-lg">
          See where our graduates are working now. From career transitions to
          promotions, our students are making their mark in the industry.
        </p>
      </div>

      <Carousel
        className="h-100 w-full"
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
              <div className="group h-full rounded-3xl border-2 border-grey-15 bg-white p-6 shadow-[4px_4px_0_0_var(--color-grey-15)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-grey-15)]">
                <div className="mb-5 flex items-center gap-4 border-grey-15/10 border-b pb-5">
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-grey-15 bg-primary-99">
                    {student.image ? (
                      <Image
                        alt={student.name}
                        className="object-cover"
                        fill
                        src={urlFor(student.image).url()}
                      />
                    ) : (
                      <User className="h-8 w-8 text-grey-40" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-bold font-vietnam text-grey-15 text-lg">
                      {student.name}
                    </h3>
                    {student.experience && (
                      <p className="font-bold text-primary-75 text-sm">
                        {student.experience}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {student.previousRole && (
                    <div className="flex items-center justify-between rounded-xl border-2 border-grey-15/10 bg-light-97 p-3">
                      <div className="min-w-0 flex-1">
                        <p className="mb-0.5 text-grey-40 text-xs">
                          Before Eduwise
                        </p>
                        <p className="truncate font-bold text-grey-15 text-sm">
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

                  {student.previousRole && (
                    <div className="flex justify-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-99">
                        <ArrowRight className="size-4 rotate-90 text-grey-15" />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between rounded-xl border-2 border-grey-15 bg-primary-90 p-3">
                    <div className="min-w-0 flex-1">
                      <p className="mb-0.5 text-grey-15/70 text-xs">
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
        <CarouselPrevious className="-left-4 hidden border-2 border-grey-15 md:flex lg:-left-12" />
        <CarouselNext className="-right-4 hidden border-2 border-grey-15 md:flex lg:-right-12" />
      </Carousel>
    </section>
  );
}
