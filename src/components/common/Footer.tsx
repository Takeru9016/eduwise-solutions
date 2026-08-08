import {
  ArrowRight,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/data/courses";

// Types
interface FooterLink {
  href: string;
  label: string;
}

interface SocialLink {
  href: string;
  icon: string;
  label: string;
}

// Data
const programLinks: FooterLink[] = CATEGORIES.map((cat) => ({
  href: `/courses?category=${cat.id}`,
  label: cat.label,
}));

const exploreLinks: FooterLink[] = [
  { href: "/courses", label: "All Courses" },
  { href: "/certifications/aws", label: "AWS Certification" },
  { href: "/pricing", label: "Pricing" },
  { href: "/quiz", label: "Find Your Course" },
  { href: "/resources", label: "Free Guides" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/press", label: "Press Coverage" },
];

const companyLinks: FooterLink[] = [
  { href: "/about", label: "About Us" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

const legalLinks: FooterLink[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/refund", label: "Refund Policy" },
];

const socialLinks: SocialLink[] = [
  {
    href: "https://www.facebook.com/share/1GfVBLdak6/",
    icon: "/socials/facebook.svg",
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/eduwise_insta/",
    icon: "/socials/instagram.svg",
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/eduwisesolutions/",
    icon: "/socials/linkedin.svg",
    label: "LinkedIn",
  },
];

const LinkGroup = ({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) => (
  <div>
    <h3 className="mb-4 font-bold font-vietnam text-grey-15 text-sm uppercase tracking-wider">
      {title}
    </h3>
    <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-1">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            className="group inline-flex items-center gap-1.5 text-grey-40 text-sm transition-colors duration-200 hover:text-grey-15"
            href={link.href}
          >
            <ArrowRight className="-ml-4 h-3 w-3 opacity-0 transition-all duration-200 group-hover:ml-0 group-hover:opacity-60" />
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-light-97">
      <div className="container">
        {/* Top CTA banner */}
        <div className="pt-12 sm:pt-16">
          <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border-2 border-grey-15 bg-primary-75 p-8 shadow-[4px_4px_0_0_var(--color-grey-15)] sm:p-10 lg:flex-row">
            <div className="max-w-xl text-center lg:text-left">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-white px-4 py-1.5 font-semibold text-grey-15 text-xs">
                <Sparkles className="h-3.5 w-3.5" />
                Start Your Journey
              </div>
              <h2 className="mb-2 font-black font-vietnam text-2xl text-grey-15 leading-tight sm:text-3xl">
                Ready to transform your career?
              </h2>
              <p className="text-grey-20 text-sm sm:text-base">
                Join 2000+ students who have already kickstarted their dream
                career with industry-aligned programs.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-grey-15 bg-grey-15 px-6 py-3 font-bold text-sm text-white transition-transform hover:-translate-y-0.5"
                href="/courses"
              >
                <GraduationCap className="h-4 w-4" />
                Explore Programs
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-grey-15 bg-white px-6 py-3 font-bold text-grey-15 text-sm transition-transform hover:-translate-y-0.5"
                href="/contact"
              >
                <Phone className="h-4 w-4" />
                Talk to Counselor
              </Link>
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="mt-10 grid grid-cols-1 gap-10 border-grey-15/10 border-t pt-10 pb-12 sm:mt-16 sm:pt-16 sm:pb-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand + Contact — span 4 */}
          <div className="space-y-6 lg:col-span-4">
            <Link className="inline-block" href="/">
              <Image
                alt="Eduwise Solutions"
                className="w-37.5 object-contain transition-opacity hover:opacity-80"
                height={60}
                src="/home/eduwise.png"
                width={200}
              />
            </Link>

            <p className="max-w-xs text-grey-40 text-sm leading-relaxed">
              Empowering careers through industry-aligned education with 100%
              placement assurance and live mentorship.
            </p>

            <div className="space-y-3.5">
              <a
                className="group flex items-center gap-3 text-grey-35 text-sm transition-colors hover:text-grey-15"
                href="mailto:contact@eduwise.solutions"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-grey-15 bg-white">
                  <Mail className="h-3.5 w-3.5 text-grey-15" />
                </div>
                contact@eduwise.solutions
              </a>
              <a
                className="group flex items-center gap-3 text-grey-35 text-sm transition-colors hover:text-grey-15"
                href="tel:+919148774540"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-grey-15 bg-white">
                  <Phone className="h-3.5 w-3.5 text-grey-15" />
                </div>
                +91 91487 74540
              </a>
              <div className="flex items-start gap-3 text-grey-35 text-sm">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-grey-15 bg-white">
                  <MapPin className="h-3.5 w-3.5 text-grey-15" />
                </div>
                <span className="leading-relaxed">
                  Binnamangala, 2nd Stage, Indira Nagar, Bengaluru - 560038
                </span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-2.5 pt-2">
              {socialLinks.map((social) => (
                <Link
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-grey-15 bg-white transition-transform duration-200 hover:-translate-y-0.5"
                  href={social.href}
                  key={social.label}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image
                    alt={social.label}
                    height={16}
                    src={social.icon}
                    width={16}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Programs + Explore + Company + Legal — span 2 each */}
          <div className="lg:col-span-2">
            <LinkGroup links={programLinks} title="Programs" />
          </div>
          <div className="lg:col-span-2">
            <LinkGroup links={exploreLinks} title="Explore" />
          </div>
          <div className="lg:col-span-2">
            <LinkGroup links={companyLinks} title="Company" />
          </div>
          <div className="lg:col-span-2">
            <LinkGroup links={legalLinks} title="Legal" />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-grey-15/10 border-t">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
            <p className="text-center text-grey-40 text-xs sm:text-left sm:text-sm">
              © {currentYear} Eduwise Solutions. All rights reserved.
            </p>

            <p className="flex items-center gap-1.5 text-grey-40 text-xs sm:text-sm">
              Made with
              <Heart className="h-3.5 w-3.5 fill-gold text-gold" />
              in India
              <Image
                alt="India Flag"
                className="inline-block"
                height={13}
                src="/home/indian_flag.svg"
                width={18}
              />
            </p>
          </div>
        </div>
      </div>

      {/* Ghost wordmark */}
      <p
        aria-hidden="true"
        className="pointer-events-none mb-[-3vw] select-none overflow-hidden text-center font-black font-vietnam text-[18vw] text-grey-15/5 leading-none"
      >
        Eduwise
      </p>
    </footer>
  );
}
