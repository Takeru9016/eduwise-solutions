import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

// Types
interface ContactDetail {
  href?: string;
  icon: React.ElementType;
  title: string;
  value: string;
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
        className="group flex items-start gap-4 rounded-lg p-4 transition-colors hover:bg-primary-99"
        href={detail.href}
      >
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-99 transition-colors group-hover:bg-white">
          <ContactIcon className="h-6 w-6 text-primary-75" />
        </div>

        <div className="flex-grow">
          <p className="mb-1 font-medium font-vietnam text-grey-20">
            {detail.title}
          </p>
          <p className="flex items-center gap-2 text-grey-35 transition-colors group-hover:text-primary-75">
            {detail.value}
            <ExternalLink
              className="opacity-0 transition-opacity group-hover:opacity-100"
              size={14}
            />
          </p>
        </div>
      </a>
    );
  }

  return (
    <div className="flex items-start gap-4 p-4">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-99">
        <ContactIcon className="h-6 w-6 text-primary-75" />
      </div>

      <div>
        <p className="mb-1 font-medium font-vietnam text-grey-20">
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
      href: "mailto:contact@eduwise.solutions",
      icon: Mail,
      title: "Email",
      value: "contact@eduwise.solutions",
    },
    {
      href: "tel:+919148774540",
      icon: Phone,
      title: "Phone",
      value: "+91 91487 74540",
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
        <h2 className="mb-8 font-bold font-vietnam text-2xl text-grey-15">
          Contact Information
        </h2>

        <div className="space-y-6">
          {contactDetails.map((detail, index) => (
            <ContactItem detail={detail} key={index} />
          ))}
        </div>

        {/* Operating Hours Section */}
        <div className="mt-8 border-light-90 border-t pt-8">
          <h3 className="mb-4 flex items-center gap-2 font-semibold font-vietnam text-grey-20">
            <Clock className="h-5 w-5 text-primary-75" />
            Operating Hours
          </h3>
          <div className="space-y-2 text-grey-35">
            {operatingHours.map((item, index) => (
              <OperatingHoursItem
                day={item.day}
                hours={item.hours}
                isClosed={item.isClosed}
                key={index}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
