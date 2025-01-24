import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const contactDetails = [
  {
    icon: Mail,
    title: "Email",
    value: "admin@eduwise.solutions",
    href: "mailto:admin@eduwise.solutions",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 00000 00000",
    href: "tel:+910000000000",
  },
  {
    icon: MapPin,
    title: "Location",
    value:
      "235, Binnamangala, 2nd Floor, 13th Cross Road, 2nd Stage, Indira Nagar, Bengaluru - 560038",
  },
];

export default function ContactInfo() {
  return (
    <Card className="border border-light-90">
      <CardContent className="p-6">
        <h2 className="text-2xl font-vietnam font-bold text-grey-15 mb-8">
          Contact Information
        </h2>

        <div className="space-y-6">
          {contactDetails.map((detail, index) => (
            <div key={index} className="group">
              {detail.href ? (
                <a
                  href={detail.href}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary-99 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary-99 group-hover:bg-white flex items-center justify-center flex-shrink-0 transition-colors">
                    <detail.icon className="w-6 h-6 text-primary-75" />
                  </div>

                  <div className="flex-grow">
                    <p className="font-vietnam font-medium text-grey-20 mb-1">
                      {detail.title}
                    </p>
                    <p className="text-grey-35 flex items-center gap-2 group-hover:text-primary-75 transition-colors">
                      {detail.value}
                      <ExternalLink
                        size={14}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </p>
                  </div>
                </a>
              ) : (
                <div className="flex items-start gap-4 p-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-99 flex items-center justify-center flex-shrink-0">
                    <detail.icon className="w-6 h-6 text-primary-75" />
                  </div>

                  <div>
                    <p className="font-vietnam font-medium text-grey-20 mb-1">
                      {detail.title}
                    </p>
                    <p className="text-grey-35">{detail.value}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Operating Hours Section */}
        <div className="mt-8 pt-8 border-t border-light-90">
          <h3 className="font-vietnam font-semibold text-grey-20 mb-4">
            Operating Hours
          </h3>
          <div className="space-y-2 text-grey-35">
            <div className="flex justify-between">
              <span>Monday - Friday</span>
              <span>9:00 AM - 6:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday</span>
              <span>10:00 AM - 4:00 PM</span>
            </div>
            <div className="flex justify-between text-primary-75">
              <span>Sunday</span>
              <span>Closed</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
