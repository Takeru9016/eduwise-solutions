"use client";

import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Mail,
  Menu,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import AWSPartnerBanner from "./AWSPartnerBadge";

// Types for Sanity-powered course navigation
export interface NavCourseItem {
  emoji: string;
  id: string;
  slug: string;
  title: string;
}

export interface NavCategory {
  courses: NavCourseItem[];
  emoji: string;
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
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/certifications/aws", label: "Certifications" },
];

const SIMPLE_NAV_LINKS_AFTER: SimpleNavLink[] = [
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
  <div className="mt-8 space-y-4 border-light-90 border-t pt-8">
    <a
      className="flex items-center gap-2 text-grey-35 transition-colors hover:text-primary-75"
      href={`tel:${CONTACT_INFO.phone}`}
      onClick={onClose}
    >
      <Phone className="text-primary-75" size={16} />
      <span>{CONTACT_INFO.phone}</span>
    </a>
    <a
      className="flex items-center gap-2 text-grey-35 transition-colors hover:text-primary-75"
      href={`mailto:${CONTACT_INFO.email}`}
      onClick={onClose}
    >
      <Mail className="text-primary-75" size={16} />
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
        className="flex items-center gap-1 py-2 text-grey-30 transition-colors hover:text-primary-75"
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
        <div className="w-[860px] overflow-hidden rounded-xl border border-light-90 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-light-90 border-b bg-linear-to-r from-primary-99 to-white px-6 py-4">
            <div>
              <h3 className="font-semibold text-base text-grey-15">
                Explore Our Courses
              </h3>
              <p className="mt-0.5 text-grey-50 text-xs">
                {totalCourses}+ industry-ready programs to accelerate your
                career
              </p>
            </div>
            <Link
              className="flex items-center gap-1 font-medium text-primary-75 text-sm transition-colors hover:text-primary-60"
              href="/courses"
            >
              View All
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Course categories grid */}
          <div className="grid grid-cols-3 gap-0 divide-x divide-light-90">
            {categoriesWithCourses.map((category) => (
              <div className="p-4" key={category.id}>
                {/* Category header */}
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-sm">{category.emoji}</span>
                  <h4 className="font-semibold text-grey-40 text-xs uppercase tracking-wider">
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
                      <span className="text-sm">{course.emoji}</span>
                      <span className="flex-1 text-grey-30 text-sm transition-colors group-hover/item:text-primary-75">
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Desktop Navigation

interface DesktopNavigationProps {
  categoriesWithCourses: NavCategory[];
  pathname: string;
}

const DesktopNavigation = ({
  pathname,
  categoriesWithCourses,
}: DesktopNavigationProps) => (
  <div className="hidden items-center space-x-8 lg:flex">
    {SIMPLE_NAV_LINKS.map((link) => (
      <Link
        className={`py-2 text-grey-30 transition-colors hover:text-primary-75 ${
          pathname === link.href ? "text-primary-75" : ""
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
        className={`py-2 text-grey-30 transition-colors hover:text-primary-75 ${
          pathname === link.href ? "text-primary-75" : ""
        }`}
        href={link.href}
        key={link.label}
      >
        {link.label}
      </Link>
    ))}

    <Separator className="h-6" orientation="vertical" />
    <Link href="/contact">
      <Button
        className="bg-primary-75 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-70"
        variant="default"
      >
        Contact Us
      </Button>
    </Link>
    <Separator className="h-6" orientation="vertical" />
    <Link href="https://learner.eduwise.solutions/" target="_blank">
      <Button
        className="border-primary-75 font-semibold text-primary-75 transition-all duration-300 hover:bg-primary-75 hover:text-white"
        variant="outline"
      >
        LMS Login
      </Button>
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
        <SheetHeader className="border-light-90 border-b p-6">
          <div className="flex items-center justify-between">
            <Logo className="w-[120px]" />
          </div>
        </SheetHeader>

        <div className="max-h-[calc(100vh-120px)] overflow-y-auto p-6">
          <div className="flex flex-col gap-3">
            {/* Simple links before Courses */}
            {SIMPLE_NAV_LINKS.map((link) => (
              <Link
                className={`text-grey-30 text-lg transition-colors hover:text-primary-75 ${
                  pathname === link.href ? "text-primary-75" : ""
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
                className={`flex items-center justify-between text-grey-30 text-lg transition-colors hover:text-primary-75 ${
                  pathname === "/courses" ? "text-primary-75" : ""
                }`}
                href="/courses"
                onClick={handleClose}
              >
                Courses
              </Link>

              {/* Category accordions */}
              <div className="space-y-1 pl-2">
                {categoriesWithCourses.map((category) => (
                  <div key={category.id}>
                    {/* Category toggle button */}
                    <button
                      className="flex w-full items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-primary-99"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <span className="flex items-center gap-2 font-medium text-grey-35 text-sm">
                        <span>{category.emoji}</span>
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
                            className="block rounded-lg px-2 py-1.5 text-grey-40 text-sm transition-colors hover:bg-primary-99 hover:text-primary-75"
                            href={course.slug}
                            key={course.id}
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
                className={`text-grey-30 text-lg transition-colors hover:text-primary-75 ${
                  pathname === link.href ? "text-primary-75" : ""
                }`}
                href={link.href}
                key={link.label}
                onClick={handleClose}
              >
                {link.label}
              </Link>
            ))}

            <Link href="https://learner.eduwise.solutions/" target="_blank">
              <Button
                className="mt-4 w-full border-primary-75 text-primary-75 transition-colors duration-300 hover:bg-primary-75 hover:text-white"
                onClick={handleClose}
                variant="outline"
              >
                LMS Login
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                className="mt-4 w-full bg-primary-75 hover:bg-primary-70"
                onClick={handleClose}
                variant="default"
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
      `w-full py-4 sticky top-0 bg-white/80 backdrop-blur-md z-50 transition-all duration-300 ${
        scrolled ? "shadow-md border-b border-light-90" : ""
      }`,
    [scrolled]
  );

  return (
    <>
      <nav className={navClasses}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Logo />
            <DesktopNavigation
              categoriesWithCourses={categoriesWithCourses}
              pathname={pathname}
            />
            <MobileNavigation
              categoriesWithCourses={categoriesWithCourses}
              isOpen={isOpen}
              onOpenChange={setIsOpen}
              pathname={pathname}
            />
          </div>
        </div>
      </nav>
      <AWSPartnerBanner />
    </>
  );
}
