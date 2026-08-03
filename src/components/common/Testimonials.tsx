import { TestimonialsThree } from "@/components/ui/testimonials-three";
import { client } from "@/sanity/lib/client";
import { TESTIMONIALS_QUERY } from "@/sanity/lib/queries";

// Sanity testimonial type
interface SanityTestimonial {
  _id: string;
  avatarPath?: string;
  company?: string;
  content: string;
  linkedinUrl?: string;
  name: string;
  order?: number;
  rating?: number;
  role?: string;
}

// Transform Sanity data to component props format
function transformTestimonials(sanityData: SanityTestimonial[]) {
  return sanityData.map((t, index) => ({
    avatar: t.avatarPath || "/testimonials/placeholder.jpeg",
    company: t.company || "",
    content: t.content,
    id: index + 1,
    linkedinUrl: t.linkedinUrl || "",
    name: t.name,
    rating: t.rating || 5,
    role: t.role || "",
  }));
}

// Main component - Server Component
export default async function TestimonialsSectionBasic() {
  const testimonials =
    await client.fetch<SanityTestimonial[]>(TESTIMONIALS_QUERY);
  const transformedTestimonials = transformTestimonials(testimonials);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-light-97 to-white py-16 md:py-24">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-primary-95 opacity-20 blur-3xl" />
        <div className="absolute right-20 bottom-20 h-96 w-96 rounded-full bg-primary-97 opacity-20 blur-3xl" />
      </div>

      <div className="container relative mx-auto">
        <TestimonialsThree testimonials={transformedTestimonials} />
      </div>
    </section>
  );
}
