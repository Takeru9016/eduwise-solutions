import {
  ArrowRight,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/data/courses";
import { client } from "@/sanity/lib/client";
import { COURSES_NAV_QUERY } from "@/sanity/lib/queries";

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

interface SanityCourseNav {
  _id: string;
  category: string;
  emoji: string | null;
  slug: string;
  title: string;
}

// Data
const companyLinks: FooterLink[] = [
  { href: "/about", label: "About Us" },
  { href: "/blogs", label: "Blogs" },
  { href: "/courses", label: "All Courses" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/testimonials", label: "Testimonials" },
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

export default async function Footer() {
  const currentYear = new Date().getFullYear();

  // Fetch courses from Sanity
  let categoriesWithCourses: {
    id: string;
    label: string;
    courses: { id: string; title: string; href: string }[];
  }[] = [];
  try {
    const courses = await client.fetch<SanityCourseNav[]>(
      COURSES_NAV_QUERY,
      {},
      { next: { revalidate: 60 } }
    );
    categoriesWithCourses = CATEGORIES.map((cat) => ({
      courses: courses
        .filter((c) => c.category === cat.id)
        .map((c) => ({
          href: `/courses/${c.slug}`,
          id: c._id,
          title: c.title,
        })),
      id: cat.id,
      label: cat.label,
    })).filter((cat) => cat.courses.length > 0);
  } catch (err) {
    console.error("[Footer] Failed to fetch courses from Sanity:", err);
  }

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-white via-primary-99 to-primary-97">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-gradient-to-br from-primary-90/20 to-transparent blur-3xl" />
        <div className="absolute top-1/3 -left-24 h-56 w-56 rounded-full bg-gradient-to-tr from-primary-95/30 to-transparent blur-3xl" />
        <div className="absolute right-1/4 -bottom-16 h-64 w-64 rounded-full bg-gradient-to-tl from-primary-90/15 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Top CTA banner */}
        <div className="border-primary-90/20 border-b">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center justify-between gap-8 py-10 sm:py-14 lg:flex-row">
              <div className="max-w-xl text-center lg:text-left">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-90/30 bg-white/80 px-4 py-1.5 font-semibold text-primary-75 text-xs shadow-sm backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  Start Your Journey
                </div>
                <h2 className="mb-2 font-bold font-vietnam text-2xl text-grey-15 leading-tight sm:text-3xl">
                  Ready to{" "}
                  <span className="bg-gradient-to-r from-primary-75 to-primary-90 bg-clip-text text-transparent">
                    transform
                  </span>{" "}
                  your career?
                </h2>
                <p className="text-grey-40 text-sm sm:text-base">
                  Join 2000+ students who have already kickstarted their dream
                  career with industry-aligned programs.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-primary-75 to-primary-90 px-7 py-3.5 font-semibold text-sm text-white shadow-lg shadow-primary-75/20 transition-all duration-300 hover:scale-[1.03] hover:from-primary-70 hover:to-primary-80 hover:shadow-primary-75/30 hover:shadow-xl"
                  href="/courses"
                >
                  <GraduationCap className="h-4.5 w-4.5" />
                  Explore Programs
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary-90/30 bg-white/70 px-7 py-3.5 font-semibold text-grey-20 text-sm shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary-75/40 hover:bg-white hover:shadow-md"
                  href="/contact"
                >
                  <Phone className="h-4 w-4 text-primary-75" />
                  Talk to Counselor
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 py-12 sm:py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            {/* Brand + Contact — span 3 */}
            <div className="space-y-6 lg:col-span-3">
              <Link className="inline-block" href="/">
                <Image
                  alt="Eduwise Solutions"
                  className="w-[150px] object-contain transition-opacity hover:opacity-80"
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
                  className="group flex items-center gap-3 text-grey-35 text-sm transition-colors hover:text-primary-75"
                  href="mailto:contact@eduwise.solutions"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-primary-90/30 bg-primary-97 transition-colors group-hover:bg-primary-95">
                    <Mail className="h-3.5 w-3.5 text-primary-75" />
                  </div>
                  contact@eduwise.solutions
                </a>
                <a
                  className="group flex items-center gap-3 text-grey-35 text-sm transition-colors hover:text-primary-75"
                  href="tel:+919148774540"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-primary-90/30 bg-primary-97 transition-colors group-hover:bg-primary-95">
                    <Phone className="h-3.5 w-3.5 text-primary-75" />
                  </div>
                  +91 91487 74540
                </a>
                <div className="flex items-start gap-3 text-grey-35 text-sm">
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-primary-90/30 bg-primary-97">
                    <MapPin className="h-3.5 w-3.5 text-primary-75" />
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
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary-90/25 bg-white/80 transition-all duration-300 hover:scale-110 hover:border-primary-75/40 hover:bg-primary-97 hover:shadow-md"
                    href={social.href}
                    key={social.label}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Image
                      alt={social.label}
                      className="opacity-50 hover:opacity-80"
                      height={18}
                      src={social.icon}
                      width={18}
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Courses by categories — span 6 */}
            <div className="lg:col-span-6">
              <h3 className="mb-6 font-semibold font-vietnam text-grey-20 text-sm uppercase tracking-wider">
                Our Programs
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3">
                {categoriesWithCourses.slice(0, 6).map((cat) => (
                  <div key={cat.id}>
                    <h4 className="mb-3 font-bold text-primary-75 text-xs uppercase tracking-wider">
                      {cat.label}
                    </h4>
                    <ul className="space-y-2">
                      {cat.courses.map((course) => (
                        <li key={course.id}>
                          <Link
                            className="block text-grey-40 text-sm leading-snug transition-colors duration-200 hover:text-primary-75"
                            href={course.href}
                          >
                            {course.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Company + Legal — span 3 */}
            <div className="grid grid-cols-2 gap-8 lg:col-span-3 lg:grid-cols-1">
              <div>
                <h3 className="mb-6 font-semibold font-vietnam text-grey-20 text-sm uppercase tracking-wider">
                  Company
                </h3>
                <ul className="space-y-2.5">
                  {companyLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        className="group inline-flex items-center gap-1.5 text-grey-40 text-sm transition-colors duration-200 hover:text-primary-75"
                        href={link.href}
                      >
                        <ArrowRight className="-ml-4 h-3 w-3 opacity-0 transition-all duration-200 group-hover:ml-0 group-hover:opacity-60" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-6 font-semibold font-vietnam text-grey-20 text-sm uppercase tracking-wider">
                  Legal
                </h3>
                <ul className="space-y-2.5">
                  {legalLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        className="group inline-flex items-center gap-1.5 text-grey-40 text-sm transition-colors duration-200 hover:text-primary-75"
                        href={link.href}
                      >
                        <ArrowRight className="-ml-4 h-3 w-3 opacity-0 transition-all duration-200 group-hover:ml-0 group-hover:opacity-60" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-primary-90/20 border-t">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
              <p className="text-center text-grey-40 text-xs sm:text-left sm:text-sm">
                © {currentYear} Eduwise Solutions. All rights reserved.
              </p>

              <p className="flex items-center gap-2 text-grey-40 text-xs sm:text-sm">
                Made with ❤️ in India
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
      </div>
    </footer>
  );
}
