import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  { id: "01", title: "One-Stop Solution" },
  { id: "02", title: "Curate Premier Courses" },
  { id: "03", title: "Simplify Learning Choices" },
  { id: "04", title: "Earn While You Learn" },
  { id: "05", title: "Trusted Partners" },
  { id: "06", title: "End-to-End Support" },
];

export default function Benefits() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-light-97">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-vietnam font-bold text-grey-15 text-center mb-8 md:mb-12">
          Benefits
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit) => (
            <Card
              key={benefit.id}
              className="border-none bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardContent className="p-6 md:p-8">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-75 mb-4 block">
                      {benefit.id}
                    </span>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary-95 rounded-full" />
                  </div>
                  <h3 className="text-lg md:text-xl font-vietnam font-semibold text-grey-20">
                    {benefit.title}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
