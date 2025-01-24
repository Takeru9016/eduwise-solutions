import { Sparkles, Quote } from "lucide-react";
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
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-light-97 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-95 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-97 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="container mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles size={16} className="text-primary-75" />
            Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-4">
            What Our Students Say
          </h2>
          <p className="text-grey-35 text-lg max-w-2xl mx-auto">
            Hear from our graduates about their journey with Eduwise Solutions
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
            <CarouselPrevious className="bg-white border-2 border-primary-95 text-primary-75 hover:bg-primary-99" />
            <CarouselNext className="bg-white border-2 border-primary-95 text-primary-75 hover:bg-primary-99" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <Card className="group border-none bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <CardContent className="p-8">
      <div className="flex flex-col h-full">
        {/* Rating Stars */}
        {/* <div className="flex items-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className="fill-primary-75 text-primary-75"
              strokeWidth={0}
            />
          ))}
        </div> */}

        {/* Quote Icon */}
        <div className="mb-6 relative">
          <div className="absolute -top-2 -left-2 w-12 h-12 bg-primary-99 rounded-full opacity-50" />
          <Quote className="w-8 h-8 text-primary-75 relative" />
        </div>

        {/* Content */}
        <p className="text-grey-35 font-vietnam text-lg leading-relaxed mb-8 flex-grow italic">
          &ldquo;{testimonial.content}&rdquo;
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-4 pt-6 border-t border-light-90">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-99 text-primary-75 font-semibold text-xl">
            {testimonial.name.charAt(0)}
          </div>
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
