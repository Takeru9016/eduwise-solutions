// import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const testimonials = [
  {
    name: "Madhur Sharma",
    role: "MBA Graduate",
    content:
      "The Earn and-Learn MBA program at Eduwise Solutions changed my life. I was able to work as a marketing associate while completing my degree. This program gave me financial stability and a head start in my career!",
    avatar: "/images/avatars/madhur.jpg",
  },
  {
    name: "Nitesh Deshmukh",
    role: "MSc Graduate",
    content:
      "Joining Eduwise Solutions was the best decision of my life. I was able to earn while gaining in-depth financial management knowledge. The flexible schedule helped me manage both my job and studies seamlessly.",
    avatar: "/images/avatars/nitesh.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-light-97">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-vietnam font-bold text-grey-15 text-center mb-8 md:mb-12">
          Our Testimonials
        </h2>

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full max-w-sm mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <Card className="border-none bg-white hover:shadow-lg transition-all duration-300">
    <CardContent className="p-6 md:p-8">
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <svg
            className="w-8 h-8 text-primary-75 opacity-50"
            fill="currentColor"
            viewBox="0 0 32 32"
          >
            <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6c0-2.2 1.8-4 4-4V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-8c0-2.2 1.8-4 4-4V8z" />
          </svg>
        </div>

        <p className="text-grey-35 font-vietnam text-base md:text-lg mb-6 flex-grow">
          &ldquo;{testimonial.content}&rdquo;
        </p>

        <div className="flex items-center gap-4">
          {/* <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div> */}
          <div>
            <h4 className="font-vietnam font-semibold text-grey-20">
              {testimonial.name}
            </h4>
            <p className="text-sm text-grey-40">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
