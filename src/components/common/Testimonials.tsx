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
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <TestimonialsThree testimonials={transformedTestimonials} />
      </div>
    </section>
  );
}
