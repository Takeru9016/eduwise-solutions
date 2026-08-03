import { Testimonials } from "@/components/ui/testimonials";
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

// Transform Sanity data to Testimonials component props format
function transformTestimonials(sanityData: SanityTestimonial[]) {
  return sanityData.map((t) => ({
    company: t.company || "",
    image: t.avatarPath || "/testimonials/placeholder.jpeg",
    linkedinUrl: t.linkedinUrl || "",
    name: t.name,
    text: t.content,
    username: t.role || "",
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
