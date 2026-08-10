import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";

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

const ContactItem = ({ detail }: { detail: ContactDetail }) => {
  const ContactIcon = detail.icon;

  if (detail.href) {
    return (
      <a
        className="group flex items-start gap-4 rounded-2xl border-2 border-white/10 bg-white/5 p-4 transition-colors hover:border-primary-90/40 hover:bg-white/10"
        href={detail.href}
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-white/20 bg-white/10">
          <ContactIcon className="h-5 w-5 text-primary-90" />
        </div>

        <div className="grow">
          <p className="mb-1 font-bold text-white">{detail.title}</p>
          <p className="flex items-center gap-2 text-grey-70 text-sm transition-colors group-hover:text-primary-90">
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
    <div className="flex items-start gap-4 rounded-2xl border-2 border-white/10 bg-white/5 p-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-white/20 bg-white/10">
        <ContactIcon className="h-5 w-5 text-primary-90" />
      </div>

      <div>
        <p className="mb-1 font-bold text-white">{detail.title}</p>
        <p className="text-grey-70 text-sm leading-relaxed">{detail.value}</p>
      </div>
    </div>
  );
};

const OperatingHoursItem = ({ day, hours, isClosed }: OperatingHour) => (
  <div className="flex justify-between text-sm">
    <span className={isClosed ? "font-bold text-primary-90" : "text-grey-70"}>
      {day}
    </span>
    <span className={isClosed ? "font-bold text-primary-90" : "text-grey-70"}>
      {hours}
    </span>
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
    <div className="rounded-3xl border-2 border-grey-15 bg-grey-15 p-6 text-white shadow-[6px_6px_0_0_var(--color-grey-15)] sm:p-8">
      <h2 className="mb-6 font-black font-vietnam text-2xl text-white">
        Contact Information
      </h2>

      <div className="space-y-3">
        {contactDetails.map((detail, index) => (
          <ContactItem detail={detail} key={index} />
        ))}
      </div>

      <div className="mt-8 border-white/10 border-t pt-6">
        <h3 className="mb-4 flex items-center gap-2 font-bold text-white">
          <Clock className="h-5 w-5 text-primary-90" />
          Operating Hours
        </h3>
        <div className="space-y-2">
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
    </div>
  );
}
