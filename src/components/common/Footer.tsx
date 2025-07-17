import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

// Types
interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink extends FooterLink {
  icon: string;
}

// Reusable components
const ContactItem = ({
  icon: Icon,
  children,
  href,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
  href?: string;
}) => {
  const content = (
    <div className="flex items-start gap-3 text-grey-35 group hover:text-primary-75 transition-colors">
      <Icon className="w-5 h-5 text-primary-75 group-hover:text-primary-70 mt-1" />
      <span>{children}</span>
    </div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return content;
};

const FooterLinkList = ({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) => (
  <div>
    <h3 className="font-vietnam font-semibold text-grey-20 text-lg mb-6">
      {title}
    </h3>
    <ul className="space-y-3">
      {links.map((link) => (
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
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const companyLinks: FooterLink[] = [
    { label: "About Us", href: "/about" },
    { label: "Our Courses", href: "/courses" },
    { label: "Contact", href: "/contact" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "FAQ", href: "/faq" },
  ];

  const programLinks: FooterLink[] = [
    { label: "Artificial Intelligence", href: "/ai-ml" },
    { label: "Cyber Security", href: "/cyber-sec" },
    { label: "Data Science", href: "/data-science" },
    { label: "Full Stack Web Developer", href: "/full-stack" },
    { label: "Professional Certification", href: "/professional" },
  ];

  const legalLinks: FooterLink[] = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ];

  const socialLinks: SocialLink[] = [
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
              <ContactItem
                icon={Mail}
                href="mailto:vishal.chettri@eduwise.solutions"
              >
                vishal.chettri@eduwise.solutions
              </ContactItem>

              <ContactItem icon={Phone} href="tel:+919148774540">
                +91 91487 74540
              </ContactItem>

              <ContactItem icon={MapPin}>
                235, Binnamangala, 2nd Floor, 13th Cross Road, 2nd Stage, Indira
                Nagar, Bengaluru - 560038
              </ContactItem>
            </div>
          </div>

          {/* Quick Links */}
          <FooterLinkList title="Company" links={companyLinks} />

          {/* Programs */}
          <FooterLinkList title="Programs" links={programLinks} />

          {/* Legal */}
          <FooterLinkList title="Legal" links={legalLinks} />

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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center text-grey-35 hover:text-primary-75 transition-transform transform hover:scale-110"
                  aria-label={social.label}
                >
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
              © {currentYear} Eduwise Solutions. All rights reserved.
            </p>
            <p className="text-grey-35 text-sm text-center flex items-center gap-2">
              Made in India
              <Image
                src="/indian_flag.svg"
                alt="India Flag"
                width={20}
                height={15}
                className="inline-block"
              />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
