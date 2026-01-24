import { client } from "@/sanity/lib/client";
import { TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import { TestimonialsThree } from "@/components/ui/testimonials-three";

// Sanity testimonial type
interface SanityTestimonial {
  _id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  avatarPath?: string;
  rating?: number;
  linkedinUrl?: string;
  order?: number;
}

// Transform Sanity data to component props format
function transformTestimonials(sanityData: SanityTestimonial[]) {
  return sanityData.map((t, index) => ({
    id: index + 1,
    name: t.name,
    role: t.role || "",
    company: t.company || "",
    content: t.content,
    avatar: t.avatarPath || "/testimonials/placeholder.jpeg",
    rating: t.rating || 5,
    linkedinUrl: t.linkedinUrl || "",
  }));
}

// Main component - Server Component
export default async function TestimonialsSectionBasic() {
  const testimonials =
    await client.fetch<SanityTestimonial[]>(TESTIMONIALS_QUERY);
  const transformedTestimonials = transformTestimonials(testimonials);

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-light-97 to-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-95 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-97 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="container mx-auto relative">
        <TestimonialsThree testimonials={transformedTestimonials} />
      </div>
    </section>
  );
}
