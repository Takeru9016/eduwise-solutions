import { Mail, Phone, MapPin, ExternalLink, Clock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

// Types
interface ContactDetail {
  icon: React.ElementType;
  title: string;
  value: string;
  href?: string;
}

interface OperatingHour {
  day: string;
  hours: string;
  isClosed?: boolean;
}

// Reusable components
const ContactItem = ({ detail }: { detail: ContactDetail }) => {
  const ContactIcon = detail.icon;

  if (detail.href) {
    return (
      <a
        href={detail.href}
        className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary-99 transition-colors group"
      >
        <div className="w-12 h-12 rounded-lg bg-primary-99 group-hover:bg-white flex items-center justify-center flex-shrink-0 transition-colors">
          <ContactIcon className="w-6 h-6 text-primary-75" />
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
    );
  }

  return (
    <div className="flex items-start gap-4 p-4">
      <div className="w-12 h-12 rounded-lg bg-primary-99 flex items-center justify-center flex-shrink-0">
        <ContactIcon className="w-6 h-6 text-primary-75" />
      </div>

      <div>
        <p className="font-vietnam font-medium text-grey-20 mb-1">
          {detail.title}
        </p>
        <p className="text-grey-35">{detail.value}</p>
      </div>
    </div>
  );
};

const OperatingHoursItem = ({ day, hours, isClosed }: OperatingHour) => (
  <div className="flex justify-between">
    <span className={isClosed ? "text-primary-75" : ""}>{day}</span>
    <span className={isClosed ? "text-primary-75" : ""}>{hours}</span>
  </div>
);

export default function ContactInfo() {
  const contactDetails: ContactDetail[] = [
    {
      icon: Mail,
      title: "Email",
      value: "admin@eduwise.solutions",
      href: "mailto:admin@eduwise.solutions",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 91487 74540",
      href: "tel:+919148774540",
    },
    {
      icon: MapPin,
      title: "Location",
      value:
        "235, Binnamangala, 2nd Floor, 13th Cross Road, 2nd Stage, Indira Nagar, Bengaluru - 560038",
    },
  ];

  const operatingHours: OperatingHour[] = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed", isClosed: true },
  ];

  return (
    <Card className="border border-light-90">
      <CardContent className="p-6">
        <h2 className="text-2xl font-vietnam font-bold text-grey-15 mb-8">
          Contact Information
        </h2>

        <div className="space-y-6">
          {contactDetails.map((detail, index) => (
            <ContactItem key={index} detail={detail} />
          ))}
        </div>

        {/* Operating Hours Section */}
        <div className="mt-8 pt-8 border-t border-light-90">
          <h3 className="font-vietnam font-semibold text-grey-20 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary-75" />
            Operating Hours
          </h3>
          <div className="space-y-2 text-grey-35">
            {operatingHours.map((item, index) => (
              <OperatingHoursItem
                key={index}
                day={item.day}
                hours={item.hours}
                isClosed={item.isClosed}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
