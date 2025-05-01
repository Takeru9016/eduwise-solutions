import { TestimonialsSection } from "./blocks/simple-animated-testimonials";

// Main component
export default function TestimonialsSectionBasic() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-light-97 to-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-95 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-97 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="container mx-auto relative">
        <TestimonialsSection
          testimonials={[
            {
              id: 1,
              name: "M Pavithra",
              role: "Key accounts manager",
              company: "Myntra",
              content:
                "I applied to over 50 jobs with no response. After joining Eduwise, I fixed my resume, improved my communication, and cracked an interview within 5 weeks. It changed everything.",
              avatar: "/testimonials/pavithra.jpeg",
              rating: 5,
            },
            {
              id: 2,
              name: "Varshitha BM",
              role: "Senior assistant manager",
              company: "SOBHA",
              content:
                "I used to feel invisible in interviews. After the program, I finally understood how to present my skills. I got hired, and now I feel like I finally belong somewhere.",
              avatar: "/testimonials/varshitha.jpeg",
              rating: 5,
            },
            {
              id: 3,
              name: "Tathagata Bhattacharjee",
              role: "Portfolio Manager",
              company: "SquareYards",
              content:
                "When I joined Eduwise, I had zero confidence and no idea how to approach the job market. Now I walk into interviews with clarity, purpose, and skills that speak for me.",
              avatar: "/testimonials/tathagata.jpeg",
              rating: 5,
            },
            {
              id: 4,
              name: "Kushal Sahu",
              role: "Associate",
              company: "Giva",
              content:
                "I never thought a short course could have such a big impact. Eduwise taught me the skills I wish college had. More importantly, they taught me how to use them.",
              avatar: "/testimonials/kushal.jpeg",
              rating: 5,
            },
          ]}
        />
      </div>
    </section>
  );
}
