"use client";

import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Mail,
  Menu,
  Phone,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CATEGORIES } from "@/data/courses";
import AWSPartnerBanner from "./AWSPartnerBadge";

// Types for Sanity-powered course navigation
export interface NavCourseItem {
  id: string;
  slug: string;
  title: string;
}

export interface NavCategory {
  courses: NavCourseItem[];
  id: string;
  label: string;
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
  { href: "/about", label: "About Us" },
  { href: "/certifications/aws", label: "Certifications" },
];

const SIMPLE_NAV_LINKS_AFTER: SimpleNavLink[] = [
  { href: "/pricing", label: "Pricing" },
  { href: "/blogs", label: "Blogs" },
];

const CONTACT_INFO = {
  email: "contact@eduwise.solutions",
  phone: "+91 91487 74540",
} as const;

const SCROLL_THRESHOLD = 20;

// Sub-components

const Logo = ({ className = "" }: LogoProps) => (
  <Link className={`relative ${className}`} href="/">
    <Image
      alt="Eduwise Solutions"
      className="w-[120px] object-contain md:w-[140px] lg:w-[160px]"
      height={48}
      priority
      src="/home/eduwise.png"
      width={160}
    />
  </Link>
);

const ContactInfo = ({ onClose }: ContactInfoProps) => (
  <div className="mt-8 space-y-4 border-grey-15/10 border-t pt-8">
    <a
      className="flex items-center gap-2 text-grey-35 transition-colors hover:text-grey-15"
      href={`tel:${CONTACT_INFO.phone}`}
      onClick={onClose}
    >
      <Phone className="text-grey-15" size={16} />
      <span>{CONTACT_INFO.phone}</span>
    </a>
    <a
      className="flex items-center gap-2 text-grey-35 transition-colors hover:text-grey-15"
      href={`mailto:${CONTACT_INFO.email}`}
      onClick={onClose}
    >
      <Mail className="text-grey-15" size={16} />
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
    [categoriesWithCourses]
  );

  return (
    <div className="group/courses relative">
      <Link
        className="flex items-center gap-1 py-2 text-grey-30 transition-colors hover:text-grey-15"
        href="/courses"
      >
        Courses
        <ChevronDown
          className="transition-transform duration-200 group-hover/courses:rotate-180"
          size={16}
        />
      </Link>

      {/* Mega-menu panel */}
      <div className="invisible absolute top-full left-[-340px] z-50 pt-4 opacity-0 transition-all duration-200 group-hover/courses:visible group-hover/courses:opacity-100">
        <div className="w-[860px] overflow-hidden rounded-3xl border-2 border-grey-15 bg-white shadow-[8px_8px_0_0_var(--color-grey-15)]">
          {/* Header */}
          <div className="flex items-center justify-between border-grey-15 border-b-2 bg-primary-99 px-6 py-4">
            <div>
              <h3 className="font-bold font-vietnam text-base text-grey-15">
                Explore Our Courses
              </h3>
              <p className="mt-0.5 text-grey-40 text-xs">
                {totalCourses}+ industry-ready programs to accelerate your
                career
              </p>
            </div>
            <Link
              className="flex items-center gap-1 font-bold text-grey-15 text-sm transition-colors hover:text-primary-75"
              href="/courses"
            >
              View All
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Course categories grid */}
          <div className="grid grid-cols-3 gap-0 divide-x divide-grey-15/10">
            {categoriesWithCourses.map((category) => {
              const CategoryIcon =
                CATEGORIES.find((c) => c.id === category.id)?.icon ?? Sparkles;

              return (
                <div className="p-4" key={category.id}>
                  {/* Category header */}
                  <div className="mb-3 flex items-center gap-2">
                    <CategoryIcon className="h-3.5 w-3.5 text-grey-15" />
                    <h4 className="font-bold text-grey-40 text-xs uppercase tracking-wider">
                      {category.label}
                    </h4>
                  </div>

                  {/* Course links */}
                  <div className="space-y-0.5">
                    {category.courses.map((course) => (
                      <Link
                        className="group/item flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-primary-99"
                        href={course.slug}
                        key={course.id}
                      >
                        <span className="flex-1 text-grey-30 text-sm transition-colors group-hover/item:text-grey-15">
                          {course.title}
                        </span>
                        <ChevronRight
                          className="text-grey-60 opacity-0 transition-opacity group-hover/item:opacity-100"
                          size={12}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Desktop Navigation

interface DesktopNavLinksProps {
  categoriesWithCourses: NavCategory[];
  pathname: string;
}

const DesktopNavLinks = ({
  pathname,
  categoriesWithCourses,
}: DesktopNavLinksProps) => (
  <div className="hidden items-center gap-8 lg:flex">
    {SIMPLE_NAV_LINKS.map((link) => (
      <Link
        className={`py-2 text-grey-30 transition-colors hover:text-grey-15 ${
          pathname === link.href ? "font-semibold text-grey-15" : ""
        }`}
        href={link.href}
        key={link.label}
      >
        {link.label}
      </Link>
    ))}

    {/* Mega-menu for courses */}
    <DesktopMegaMenu categoriesWithCourses={categoriesWithCourses} />

    {SIMPLE_NAV_LINKS_AFTER.map((link) => (
      <Link
        className={`py-2 text-grey-30 transition-colors hover:text-grey-15 ${
          pathname === link.href ? "font-semibold text-grey-15" : ""
        }`}
        href={link.href}
        key={link.label}
      >
        {link.label}
      </Link>
    ))}
  </div>
);

const DesktopCTAs = () => (
  <div className="hidden items-center gap-3 lg:flex">
    <Link
      className="inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-white px-5 py-2.5 font-bold text-grey-15 text-sm transition-transform hover:-translate-y-0.5"
      href="https://learner.eduwise.solutions/"
      target="_blank"
    >
      LMS Login
    </Link>
    <Link
      className="group inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 px-5 py-2.5 font-bold text-grey-15 text-sm transition-transform hover:-translate-y-0.5"
      href="/contact"
    >
      Contact Us
      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </Link>
  </div>
);

// Mobile Navigation

interface MobileNavigationProps {
  categoriesWithCourses: NavCategory[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  pathname: string;
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
    <Sheet onOpenChange={onOpenChange} open={isOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <Button
          aria-label="Open navigation menu"
          className="hover:bg-primary-99"
          size="icon"
          variant="ghost"
        >
          <Menu className="h-6 w-6 text-grey-30" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] p-0 sm:w-[400px]" side="right">
        <SheetHeader className="border-grey-15/10 border-b p-6">
          <div className="flex items-center justify-between">
            <Logo className="w-[120px]" />
          </div>
        </SheetHeader>

        <div className="max-h-[calc(100vh-120px)] overflow-y-auto p-6">
          <div className="flex flex-col gap-3">
            {/* Simple links before Courses */}
            {SIMPLE_NAV_LINKS.map((link) => (
              <Link
                className={`text-grey-30 text-lg transition-colors hover:text-grey-15 ${
                  pathname === link.href ? "font-semibold text-grey-15" : ""
                }`}
                href={link.href}
                key={link.label}
                onClick={handleClose}
              >
                {link.label}
              </Link>
            ))}

            {/* Courses accordion section */}
            <div className="space-y-2">
              <Link
                className={`flex items-center justify-between text-grey-30 text-lg transition-colors hover:text-grey-15 ${
                  pathname === "/courses" ? "font-semibold text-grey-15" : ""
                }`}
                href="/courses"
                onClick={handleClose}
              >
                Courses
              </Link>

              {/* Category accordions */}
              <div className="space-y-1 pl-2">
                {categoriesWithCourses.map((category) => {
                  const CategoryIcon =
                    CATEGORIES.find((c) => c.id === category.id)?.icon ??
                    Sparkles;

                  return (
                    <div key={category.id}>
                      {/* Category toggle button */}
                      <button
                        className="flex w-full items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-primary-99"
                        onClick={() => toggleCategory(category.id)}
                        type="button"
                      >
                        <span className="flex items-center gap-2 font-semibold text-grey-35 text-sm">
                          <CategoryIcon className="h-3.5 w-3.5 text-grey-15" />
                          {category.label}
                        </span>
                        <ChevronDown
                          className={`text-grey-50 transition-transform duration-200 ${
                            expandedCategory === category.id ? "rotate-180" : ""
                          }`}
                          size={14}
                        />
                      </button>

                      {/* Expanded course list */}
                      {expandedCategory === category.id && (
                        <div className="space-y-1 pb-2 pl-6">
                          {category.courses.map((course) => (
                            <Link
                              className="block rounded-lg px-2 py-1.5 text-grey-40 text-sm transition-colors hover:bg-primary-99 hover:text-grey-15"
                              href={course.slug}
                              key={course.id}
                              onClick={handleClose}
                            >
                              {course.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Simple links after Courses */}
            {SIMPLE_NAV_LINKS_AFTER.map((link) => (
              <Link
                className={`text-grey-30 text-lg transition-colors hover:text-grey-15 ${
                  pathname === link.href ? "font-semibold text-grey-15" : ""
                }`}
                href={link.href}
                key={link.label}
                onClick={handleClose}
              >
                {link.label}
              </Link>
            ))}

            <Link
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-grey-15 bg-white px-5 py-3 font-bold text-grey-15 transition-transform hover:-translate-y-0.5"
              href="https://learner.eduwise.solutions/"
              onClick={handleClose}
              target="_blank"
            >
              LMS Login
            </Link>

            <Link
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 px-5 py-3 font-bold text-grey-15 transition-transform hover:-translate-y-0.5"
              href="/contact"
              onClick={handleClose}
            >
              Contact Us
            </Link>
          </div>

          <ContactInfo onClose={handleClose} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

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
      if (timeoutId) {
        return;
      }
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
      `w-full py-4 sticky top-0 bg-white/85 backdrop-blur-md z-50 transition-all duration-300 ${
        scrolled
          ? "shadow-sm border-b-2 border-grey-15"
          : "border-b-2 border-transparent"
      }`,
    [scrolled]
  );

  return (
    <>
      <nav className={navClasses}>
        <div className="container">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
            <Logo />
            <div className="hidden justify-center lg:flex">
              <DesktopNavLinks
                categoriesWithCourses={categoriesWithCourses}
                pathname={pathname}
              />
            </div>
            <div className="flex items-center gap-3">
              <DesktopCTAs />
              <MobileNavigation
                categoriesWithCourses={categoriesWithCourses}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                pathname={pathname}
              />
            </div>
          </div>
        </div>
      </nav>
      <AWSPartnerBanner />
    </>
  );
}
