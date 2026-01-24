import { client } from "@/sanity/lib/client";
import { TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import { Testimonials } from "@/components/ui/testimonials";

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

// Transform Sanity data to Testimonials component props format
function transformTestimonials(sanityData: SanityTestimonial[]) {
  return sanityData.map((t) => ({
    name: t.name,
    username: t.role || "",
    company: t.company || "",
    text: t.content,
    image: t.avatarPath || "/testimonials/placeholder.jpeg",
    linkedinUrl: t.linkedinUrl || "",
  }));
}

export default async function TestimonialPage() {
  const testimonials =
    await client.fetch<SanityTestimonial[]>(TESTIMONIALS_QUERY);
  const transformedTestimonials = transformTestimonials(testimonials);

  return (
    <div className="container py-10">
      <Testimonials testimonials={transformedTestimonials} />
    </div>
  );
}
