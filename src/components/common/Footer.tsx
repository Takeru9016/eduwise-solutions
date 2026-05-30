import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { COURSES_NAV_QUERY } from "@/sanity/lib/queries";
import { CATEGORIES } from "@/data/courses";

// Types
interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

interface SanityCourseNav {
  _id: string;
  title: string;
  slug: string;
  category: string;
  emoji: string | null;
}

// Data
const companyLinks: FooterLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Blogs", href: "/blogs" },
  { label: "All Courses", href: "/courses" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Testimonials", href: "/testimonials" },
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

export default async function Footer() {
  const currentYear = new Date().getFullYear();

  // Fetch courses from Sanity
  let categoriesWithCourses: { id: string; label: string; courses: { id: string; title: string; href: string }[] }[] = [];
  try {
    const courses = await client.fetch<SanityCourseNav[]>(
      COURSES_NAV_QUERY,
      {},
      { next: { revalidate: 60 } },
    );
    categoriesWithCourses = CATEGORIES.map((cat) => ({
      id: cat.id,
      label: cat.label,
      courses: courses
        .filter((c) => c.category === cat.id)
        .map((c) => ({
          id: c._id,
          title: c.title,
          href: `/courses/${c.slug}`,
        })),
    })).filter((cat) => cat.courses.length > 0);
  } catch (err) {
    console.error("[Footer] Failed to fetch courses from Sanity:", err);
  }

  return (
    <footer className="relative bg-gradient-to-b from-white via-primary-99 to-primary-97 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-gradient-to-br from-primary-90/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-24 w-56 h-56 bg-gradient-to-tr from-primary-95/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-16 right-1/4 w-64 h-64 bg-gradient-to-tl from-primary-90/15 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Top CTA banner */}
        <div className="border-b border-primary-90/20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="py-10 sm:py-14 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left max-w-xl">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-primary-75 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border border-primary-90/30 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  Start Your Journey
                </div>
                <h2 className="text-2xl sm:text-3xl font-vietnam font-bold text-grey-15 mb-2 leading-tight">
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

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/courses"
                  className="group inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary-75 to-primary-90 hover:from-primary-70 hover:to-primary-80 text-white font-semibold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-primary-75/20 hover:shadow-xl hover:shadow-primary-75/30 transition-all duration-300 hover:scale-[1.03]"
                >
                  <GraduationCap className="w-4.5 h-4.5" />
                  Explore Programs
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/70 backdrop-blur-sm border border-primary-90/30 hover:bg-white hover:border-primary-75/40 text-grey-20 font-semibold text-sm px-7 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Phone className="w-4 h-4 text-primary-75" />
                  Talk to Counselor
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="container mx-auto px-4 sm:px-6">
          <div className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Brand + Contact — span 3 */}
            <div className="lg:col-span-3 space-y-6">
              <Link href="/" className="inline-block">
                <Image
                  src="/home/eduwise.png"
                  alt="Eduwise Solutions"
                  width={200}
                  height={60}
                  className="w-[150px] object-contain hover:opacity-80 transition-opacity"
                />
              </Link>

              <p className="text-grey-40 text-sm leading-relaxed max-w-xs">
                Empowering careers through industry-aligned education with 100%
                placement assurance and live mentorship.
              </p>

              <div className="space-y-3.5">
                <a
                  href="mailto:contact@eduwise.solutions"
                  className="flex items-center gap-3 text-grey-35 hover:text-primary-75 transition-colors group text-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-97 group-hover:bg-primary-95 border border-primary-90/30 flex items-center justify-center transition-colors flex-shrink-0">
                    <Mail className="w-3.5 h-3.5 text-primary-75" />
                  </div>
                  contact@eduwise.solutions
                </a>
                <a
                  href="tel:+919148774540"
                  className="flex items-center gap-3 text-grey-35 hover:text-primary-75 transition-colors group text-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-97 group-hover:bg-primary-95 border border-primary-90/30 flex items-center justify-center transition-colors flex-shrink-0">
                    <Phone className="w-3.5 h-3.5 text-primary-75" />
                  </div>
                  +91 91487 74540
                </a>
                <div className="flex items-start gap-3 text-grey-35 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary-97 border border-primary-90/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-primary-75" />
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
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/80 border border-primary-90/25 hover:bg-primary-97 hover:border-primary-75/40 hover:shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <Image
                      src={social.icon}
                      alt={social.label}
                      width={18}
                      height={18}
                      className="opacity-50 hover:opacity-80"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Courses by categories — span 6 */}
            <div className="lg:col-span-6">
              <h3 className="font-vietnam font-semibold text-grey-20 text-sm uppercase tracking-wider mb-6">
                Our Programs
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-6">
                {categoriesWithCourses.slice(0, 6).map((cat) => (
                  <div key={cat.id}>
                    <h4 className="text-primary-75 text-xs font-bold uppercase tracking-wider mb-3">
                      {cat.label}
                    </h4>
                    <ul className="space-y-2">
                      {cat.courses.map((course) => (
                        <li key={course.id}>
                          <Link
                            href={course.href}
                            className="text-grey-40 hover:text-primary-75 text-sm transition-colors duration-200 block leading-snug"
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
            <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-8">
              <div>
                <h3 className="font-vietnam font-semibold text-grey-20 text-sm uppercase tracking-wider mb-6">
                  Company
                </h3>
                <ul className="space-y-2.5">
                  {companyLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-grey-40 hover:text-primary-75 text-sm transition-colors duration-200 inline-flex items-center gap-1.5 group"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-60 group-hover:ml-0 transition-all duration-200" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-vietnam font-semibold text-grey-20 text-sm uppercase tracking-wider mb-6">
                  Legal
                </h3>
                <ul className="space-y-2.5">
                  {legalLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-grey-40 hover:text-primary-75 text-sm transition-colors duration-200 inline-flex items-center gap-1.5 group"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-60 group-hover:ml-0 transition-all duration-200" />
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
        <div className="border-t border-primary-90/20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-grey-40 text-xs sm:text-sm text-center sm:text-left">
                © {currentYear} Eduwise Solutions. All rights reserved.
              </p>

              <p className="text-grey-40 text-xs sm:text-sm flex items-center gap-2">
                Made with ❤️ in India
                <Image
                  src="/home/indian_flag.svg"
                  alt="India Flag"
                  width={18}
                  height={13}
                  className="inline-block"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
