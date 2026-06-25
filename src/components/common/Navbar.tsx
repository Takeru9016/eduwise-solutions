"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Phone,
  Mail,
  ChevronDown,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import AWSPartnerBanner from "./AWSPartnerBadge";

// Types for Sanity-powered course navigation
export interface NavCourseItem {
  id: string;
  title: string;
  slug: string;
  emoji: string;
}

export interface NavCategory {
  id: string;
  label: string;
  emoji: string;
  courses: NavCourseItem[];
}

// Keep CourseCategoryId as a string for mobile accordion
type CourseCategoryId = string;

// Types

interface SimpleNavLink {
  href: string;
  label: string;
}

interface LogoProps {
  className?: string;
}

interface ContactInfoProps {
  onClose?: () => void;
}

// Constants

const SIMPLE_NAV_LINKS: SimpleNavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/certifications/aws", label: "Certifications" },
];

const SIMPLE_NAV_LINKS_AFTER: SimpleNavLink[] = [
  { href: "/blogs", label: "Blogs" },
];

const CONTACT_INFO = {
  phone: "+91 91487 74540",
  email: "contact@eduwise.solutions",
} as const;

const SCROLL_THRESHOLD = 20;

// Sub-components

const Logo = ({ className = "" }: LogoProps) => (
  <Link href="/" className={`relative ${className}`}>
    <Image
      src="/home/eduwise.png"
      alt="Eduwise Solutions"
      width={160}
      height={48}
      className="w-[120px] md:w-[140px] lg:w-[160px] object-contain"
      priority
    />
  </Link>
);

const ContactInfo = ({ onClose }: ContactInfoProps) => (
  <div className="mt-8 pt-8 border-t border-light-90 space-y-4">
    <a
      href={`tel:${CONTACT_INFO.phone}`}
      className="flex items-center gap-2 text-grey-35 hover:text-primary-75 transition-colors"
      onClick={onClose}
    >
      <Phone size={16} className="text-primary-75" />
      <span>{CONTACT_INFO.phone}</span>
    </a>
    <a
      href={`mailto:${CONTACT_INFO.email}`}
      className="flex items-center gap-2 text-grey-35 hover:text-primary-75 transition-colors"
      onClick={onClose}
    >
      <Mail size={16} className="text-primary-75" />
      <span>{CONTACT_INFO.email}</span>
    </a>
  </div>
);

// Desktop Mega-Menu

const DesktopMegaMenu = ({
  categoriesWithCourses,
}: {
  categoriesWithCourses: NavCategory[];
}) => {
  const totalCourses = useMemo(
    () =>
      categoriesWithCourses.reduce((acc, cat) => acc + cat.courses.length, 0),
    [categoriesWithCourses],
  );

  return (
    <div className="relative group/courses">
      <Link
        href="/courses"
        className="text-grey-30 hover:text-primary-75 transition-colors py-2 flex items-center gap-1"
      >
        Courses
        <ChevronDown
          size={16}
          className="group-hover/courses:rotate-180 transition-transform duration-200"
        />
      </Link>

      {/* Mega-menu panel */}
      <div className="absolute top-full -left-[340px] pt-4 opacity-0 invisible group-hover/courses:opacity-100 group-hover/courses:visible transition-all duration-200 z-50">
        <div className="bg-white rounded-xl shadow-2xl border border-light-90 w-[860px] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-99 to-white px-6 py-4 border-b border-light-90 flex items-center justify-between">
            <div>
              <h3 className="text-grey-15 font-semibold text-base">
                Explore Our Courses
              </h3>
              <p className="text-grey-50 text-xs mt-0.5">
                {totalCourses}+ industry-ready programs to accelerate your
                career
              </p>
            </div>
            <Link
              href="/courses"
              className="text-primary-75 text-sm font-medium hover:text-primary-60 transition-colors flex items-center gap-1"
            >
              View All
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Course categories grid */}
          <div className="grid grid-cols-3 gap-0 divide-x divide-light-90">
            {categoriesWithCourses.map((category) => (
              <div key={category.id} className="p-4">
                {/* Category header */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm">{category.emoji}</span>
                  <h4 className="text-xs font-semibold text-grey-40 uppercase tracking-wider">
                    {category.label}
                  </h4>
                </div>

                {/* Course links */}
                <div className="space-y-0.5">
                  {category.courses.map((course) => (
                    <Link
                      key={course.id}
                      href={course.slug}
                      className="group/item flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-primary-99 transition-colors"
                    >
                      <span className="text-sm">{course.emoji}</span>
                      <span className="text-sm text-grey-30 group-hover/item:text-primary-75 transition-colors flex-1">
                        {course.title}
                      </span>
                      <ChevronRight
                        size={12}
                        className="text-grey-60 opacity-0 group-hover/item:opacity-100 transition-opacity"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Desktop Navigation

interface DesktopNavigationProps {
  pathname: string;
  categoriesWithCourses: NavCategory[];
}

const DesktopNavigation = ({
  pathname,
  categoriesWithCourses,
}: DesktopNavigationProps) => (
  <div className="hidden lg:flex items-center space-x-8">
    {SIMPLE_NAV_LINKS.map((link) => (
      <Link
        key={link.label}
        href={link.href}
        className={`text-grey-30 hover:text-primary-75 transition-colors py-2 ${
          pathname === link.href ? "text-primary-75" : ""
        }`}
      >
        {link.label}
      </Link>
    ))}

    {/* Mega-menu for courses */}
    <DesktopMegaMenu categoriesWithCourses={categoriesWithCourses} />

    {SIMPLE_NAV_LINKS_AFTER.map((link) => (
      <Link
        key={link.label}
        href={link.href}
        className={`text-grey-30 hover:text-primary-75 transition-colors py-2 ${
          pathname === link.href ? "text-primary-75" : ""
        }`}
      >
        {link.label}
      </Link>
    ))}

    <Separator orientation="vertical" className="h-6" />
    <Link href="/contact">
      <Button
        variant="default"
        className="bg-primary-75 hover:bg-primary-70 transition-all duration-200 hover:-translate-y-0.5"
      >
        Contact Us
      </Button>
    </Link>
    <Separator orientation="vertical" className="h-6" />
    <Link href="https://learner.eduwise.solutions/" target="_blank">
      <Button
        variant="outline"
        className="border-primary-75 text-primary-75 hover:bg-primary-75 hover:text-white transition-all duration-300 font-semibold"
      >
        LMS Login
      </Button>
    </Link>
  </div>
);

// Mobile Navigation

interface MobileNavigationProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  pathname: string;
  categoriesWithCourses: NavCategory[];
}

const MobileNavigation = ({
  isOpen,
  onOpenChange,
  pathname,
  categoriesWithCourses,
}: MobileNavigationProps) => {
  const [expandedCategory, setExpandedCategory] =
    useState<CourseCategoryId | null>(null);

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const toggleCategory = useCallback((catId: CourseCategoryId) => {
    setExpandedCategory((prev) => (prev === catId ? null : catId));
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild className="lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-primary-99"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6 text-grey-30" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
        <SheetHeader className="p-6 border-b border-light-90">
          <div className="flex justify-between items-center">
            <Logo className="w-[120px]" />
          </div>
        </SheetHeader>

        <div className="p-6 overflow-y-auto max-h-[calc(100vh-120px)]">
          <div className="flex flex-col gap-3">
            {/* Simple links before Courses */}
            {SIMPLE_NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-lg text-grey-30 hover:text-primary-75 transition-colors ${
                  pathname === link.href ? "text-primary-75" : ""
                }`}
                onClick={handleClose}
              >
                {link.label}
              </Link>
            ))}

            {/* Courses accordion section */}
            <div className="space-y-2">
              <Link
                href="/courses"
                className={`text-lg text-grey-30 hover:text-primary-75 transition-colors flex items-center justify-between ${
                  pathname === "/courses" ? "text-primary-75" : ""
                }`}
                onClick={handleClose}
              >
                Courses
              </Link>

              {/* Category accordions */}
              <div className="pl-2 space-y-1">
                {categoriesWithCourses.map((category) => (
                  <div key={category.id}>
                    {/* Category toggle button */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full flex items-center justify-between py-2 px-2 rounded-lg hover:bg-primary-99 transition-colors"
                    >
                      <span className="flex items-center gap-2 text-sm font-medium text-grey-35">
                        <span>{category.emoji}</span>
                        {category.label}
                      </span>
                      <ChevronDown
                        size={14}
                        className={`text-grey-50 transition-transform duration-200 ${
                          expandedCategory === category.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Expanded course list */}
                    {expandedCategory === category.id && (
                      <div className="pl-6 pb-2 space-y-1">
                        {category.courses.map((course) => (
                          <Link
                            key={course.id}
                            href={course.slug}
                            className="block py-1.5 px-2 text-sm text-grey-40 hover:text-primary-75 transition-colors rounded-lg hover:bg-primary-99"
                            onClick={handleClose}
                          >
                            <span className="flex items-center gap-2">
                              <span>{course.emoji}</span>
                              {course.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Simple links after Courses */}
            {SIMPLE_NAV_LINKS_AFTER.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-lg text-grey-30 hover:text-primary-75 transition-colors ${
                  pathname === link.href ? "text-primary-75" : ""
                }`}
                onClick={handleClose}
              >
                {link.label}
              </Link>
            ))}

            <Link href="https://learner.eduwise.solutions/" target="_blank">
              <Button
                variant="outline"
                className="w-full mt-4 border-primary-75 text-primary-75 hover:bg-primary-75 hover:text-white transition-colors duration-300"
                onClick={handleClose}
              >
                LMS Login
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                variant="default"
                className="bg-primary-75 hover:bg-primary-70 w-full mt-4"
                onClick={handleClose}
              >
                Contact Us
              </Button>
            </Link>
          </div>

          <ContactInfo onClose={handleClose} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Types removed – defined above inline for sub-components

interface NavbarProps {
  categoriesWithCourses: NavCategory[];
}

// Main Navbar

export default function Navbar({ categoriesWithCourses }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const throttledHandleScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, 16);
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [handleScroll]);

  const navClasses = useMemo(
    () =>
      `w-full py-4 sticky top-0 bg-white/80 backdrop-blur-md z-50 transition-all duration-300 ${
        scrolled ? "shadow-md border-b border-light-90" : ""
      }`,
    [scrolled],
  );

  return (
    <>
      <nav className={navClasses}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Logo />
            <DesktopNavigation
              pathname={pathname}
              categoriesWithCourses={categoriesWithCourses}
            />
            <MobileNavigation
              isOpen={isOpen}
              onOpenChange={setIsOpen}
              pathname={pathname}
              categoriesWithCourses={categoriesWithCourses}
            />
          </div>
        </div>
      </nav>
      <AWSPartnerBanner />
    </>
  );
}
