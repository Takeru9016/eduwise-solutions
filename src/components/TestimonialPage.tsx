import { Testimonials } from "@/components/ui/testimonials";

const testimonials = [
  {
    name: "M Pavithra",
    username: "Key accounts manager",
    company: "Myntra",
    text: "I applied to over 50 jobs with no response. After joining Eduwise, I fixed my resume, improved my communication, and cracked an interview within 5 weeks. It changed everything.",
    image: "/testimonials/pavithra.jpeg",
    linkedinUrl: "",
  },
  {
    name: "Varshitha BM",
    username: "Senior assistant manager",
    company: "SOBHA",
    text: "I used to feel invisible in interviews. After the program, I finally understood how to present my skills. I got hired, and now I feel like I finally belong somewhere.",
    image: "/testimonials/varshitha.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/varshitha-bm-8a55b31a4/",
  },
  {
    name: "Tathagata Bhattacharjee",
    username: "Sr. Relationship Manager",
    company: "Assettrust Services Pvt Ltd",
    text: "When I joined Eduwise, I had zero confidence and no idea how to approach the job market. Now I walk into interviews with clarity, purpose, and skills that speak for me.",
    image: "/testimonials/tathagata.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/tathagata-bhattacharjee-687023264/",
  },
  {
    name: "Kushal Sahu",
    username: "Associate",
    company: "Giva",
    text: "I never thought a short course could have such a big impact. Eduwise taught me the skills I wish college had. More importantly, they taught me how to use them.",
    image: "/testimonials/kushal.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/kushal-sahu-288247312/",
  },
  {
    name: "Shraddha Dey",
    username: "Customer Support",
    company: "Saarthi IAS",
    text: "As a fresher recently graduated, I was actively looking for good opportunities and was quite worried about my career. That’s when I came across Eduwise Solutions, helped me gain confidence, improve my resume, build a strong LinkedIn profile, and provided proper training. Thanks to their support, I have now secured a work-from-home job. Thank you so much, Eduwise Solutions, for guiding me through this journey!",
    image: "/testimonials/shraddha.jpeg",
    linkedinUrl: "",
  },
];

export default function TestimonialPage() {
  return (
    <div className="container py-10">
      <Testimonials testimonials={testimonials} />
    </div>
  );
}
