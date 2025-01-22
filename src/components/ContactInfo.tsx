import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfo() {
  return (
    <div>
      <h2 className="text-xl font-vietnam font-semibold text-grey-20 mb-6">
        Contact Information
      </h2>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Mail className="w-6 h-6 text-primary-75 mt-1" />
          <div>
            <p className="font-vietnam font-medium text-grey-20">Email</p>
            <p className="text-grey-35">admin@eduwise.solutions</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Phone className="w-6 h-6 text-primary-75 mt-1" />
          <div>
            <p className="font-vietnam font-medium text-grey-20">Phone</p>
            <p className="text-grey-35">+91 00000 00000</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <MapPin className="w-6 h-6 text-primary-75 mt-1" />
          <div>
            <p className="font-vietnam font-medium text-grey-20">Location</p>
            <p className="text-grey-35">
              235, Binnamangala, 2nd Floor, 13th Cross Road, 2nd Stage, Indira
              Nagar, Bengaluru - 560038
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
