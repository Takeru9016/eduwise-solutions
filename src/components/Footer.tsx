import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Our Courses", href: "/courses" },
    { label: "Contact", href: "/contact" },
  ];

  const programLinks = [
    { label: "Master's Programme", href: "/masters" },
    { label: "Professional Certification", href: "/professional" },
    { label: "Certification Programme", href: "/certification" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://www.facebook.com/share/1GfVBLdak6/",
      icon: "/socials/facebook.svg",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/eduwise_insta/",
      icon: "/socials/instagram.svg",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/eduwisesolutions/",
      icon: "/socials/linkedin.svg",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-light-97">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="block w-[160px]">
              <Image
                src="/eduwise.png"
                alt="Eduwise Solutions"
                width={200}
                height={60}
                className="w-[160px] object-contain cursor-pointer"
              />
            </Link>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-grey-35 group hover:text-primary-75 transition-colors">
                <Mail className="w-5 h-5 text-primary-75 group-hover:text-primary-70" />
                <a href="mailto:admin@eduwise.solutions">
                  admin@eduwise.solutions
                </a>
              </div>
              <div className="flex items-center gap-3 text-grey-35 group hover:text-primary-75 transition-colors">
                <Phone className="w-5 h-5 text-primary-75 group-hover:text-primary-70" />
                <a href="tel:+911234567890">+91 1234 567 890</a>
              </div>
              <div className="flex items-start gap-3 text-grey-35">
                <MapPin className="w-5 h-5 text-primary-75 mt-1" />
                <span>
                  235, Binnamangala, 2nd Floor, 13th Cross Road, 2nd Stage,
                  Indira Nagar, Bengaluru - 560038
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-vietnam font-semibold text-grey-20 text-lg mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-grey-35 hover:text-primary-75 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={16}
                      className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-vietnam font-semibold text-grey-20 text-lg mb-6">
              Programs
            </h3>
            <ul className="space-y-3">
              {programLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-grey-35 hover:text-primary-75 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={16}
                      className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-vietnam font-semibold text-grey-20 mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-grey-35 hover:text-primary-75 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={16}
                      className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-vietnam font-semibold text-grey-20 text-lg mb-6">
              Connect With Us
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 flex items-center justify-center text-grey-35 hover:text-primary-75 transition-transform transform hover:scale-110"
                >
                  <span className="sr-only">{social.label}</span>
                  <Image
                    src={social.icon}
                    alt={social.label}
                    width={40}
                    height={40}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-light-90 py-6">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <p className="text-grey-35 text-sm text-center">
              © {new Date().getFullYear()} Eduwise Solutions. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
