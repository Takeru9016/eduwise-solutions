import { Testimonials } from "@/components/ui/testimonials";

const testimonials = [
  {
    name: "M Pavithra",
    username: "Key accounts manager",
    company: "Myntra",
    text: "I applied to over 50 jobs with no response. After joining Eduwise, I fixed my resume, improved my communication, and cracked an interview within 5 weeks. It changed everything.",
    image: "/testimonials/pavithra.jpeg",
  },
  {
    name: "Varshitha BM",
    username: "Senior assistant manager",
    company: "SOBHA",
    text: "I used to feel invisible in interviews. After the program, I finally understood how to present my skills. I got hired, and now I feel like I finally belong somewhere.",
    image: "/testimonials/varshitha.jpeg",
  },
  {
    name: "Tathagata Bhattacharjee",
    username: "Portfolio Manager",
    company: "SquareYards",
    text: "When I joined Eduwise, I had zero confidence and no idea how to approach the job market. Now I walk into interviews with clarity, purpose, and skills that speak for me.",
    image: "/testimonials/tathagata.jpeg",
  },
  {
    name: "Kushal Sahu",
    username: "Associate",
    company: "Giva",
    text: "I never thought a short course could have such a big impact. Eduwise taught me the skills I wish college had. More importantly, they taught me how to use them.",
    image: "/testimonials/kushal.jpeg",
  },
];

export default function TestimonialPage() {
  return (
    <div className="container py-10">
      <Testimonials testimonials={testimonials} />
    </div>
  );
}
