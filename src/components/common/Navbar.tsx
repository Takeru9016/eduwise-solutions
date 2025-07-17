"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Mail, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import BookButton from "./BookButton";

// Type definitions
interface NavChild {
  label: string;
  href: string;
}

interface NavLink {
  href: string;
  label: string;
  children?: NavChild[];
}

interface NavLinkProps {
  link: NavLink;
  pathname: string;
  isMobile?: boolean;
  onClose?: () => void;
}

interface LogoProps {
  className?: string;
}

interface ContactInfoProps {
  onClose?: () => void;
}

interface MobileNavigationProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  pathname: string;
}

interface DesktopNavigationProps {
  pathname: string;
}

// Constants moved outside component to prevent recreation
const NAV_LINKS: NavLink[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about",
    label: "About Us",
  },
  {
    href: "/courses",
    label: "Courses",
    children: [
      { label: "Artificial Intelligence", href: "/ai-ml" },
      { label: "Cyber Security", href: "/cyber-sec" },
      { label: "Data Science", href: "/data-science" },
      { label: "Full Stack Web Developer", href: "/full-stack" },
      { label: "Professional Certification", href: "/professional" },
    ],
  },
];

const CONTACT_INFO = {
  phone: "+91 91487 74540",
  email: "vishal.chettri@eduwise.solutions",
} as const;

const SCROLL_THRESHOLD = 20;

// Extracted components for better organization
const NavLink = ({
  link,
  pathname,
  isMobile = false,
  onClose,
}: NavLinkProps) => {
  const isActive = pathname === link.href;
  const baseClasses = `text-grey-30 hover:text-primary-75 transition-colors ${
    isActive ? "text-primary-75" : ""
  }`;

  const handleClick = useCallback(() => {
    if (isMobile && !link.children) {
      onClose?.();
    }
  }, [isMobile, link.children, onClose]);

  if (isMobile) {
    return (
      <div className="space-y-2">
        <Link
          href={link.href}
          className={`${baseClasses} text-lg flex items-center justify-between`}
          onClick={handleClick}
        >
          {link.label}
          {link.children && <ChevronDown size={16} />}
        </Link>

        {link.children && (
          <div className="pl-4 space-y-2">
            {link.children.map((child) => (
              <Link
                key={child.label}
                href={child.href}
                className="block text-grey-35 hover:text-primary-75 transition-colors"
                onClick={onClose}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative group">
      <Link
        href={link.href}
        className={`${baseClasses} py-2 flex items-center gap-1`}
      >
        {link.label}
        {link.children && (
          <ChevronDown
            size={16}
            className="group-hover:rotate-180 transition-transform duration-200"
          />
        )}
      </Link>

      {link.children && (
        <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <div className="bg-white rounded-lg shadow-lg border border-light-90 min-w-[240px] py-2">
            {link.children.map((child) => (
              <Link
                key={child.label}
                href={child.href}
                className="block px-4 py-2 text-grey-30 hover:text-primary-75 hover:bg-primary-99 transition-colors"
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Logo = ({ className = "" }: LogoProps) => (
  <Link href="/" className={`relative ${className}`}>
    <Image
      src="/eduwise.png"
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

const MobileNavigation = ({
  isOpen,
  onOpenChange,
  pathname,
}: MobileNavigationProps) => {
  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

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

        <div className="p-6">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                link={link}
                pathname={pathname}
                isMobile={true}
                onClose={handleClose}
              />
            ))}

            <BookButton />

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

const DesktopNavigation = ({ pathname }: DesktopNavigationProps) => (
  <div className="hidden lg:flex items-center space-x-8">
    {NAV_LINKS.map((link) => (
      <NavLink key={link.label} link={link} pathname={pathname} />
    ))}
    <BookButton />
    <Link href="/contact">
      <Button
        variant="default"
        className="bg-primary-75 hover:bg-primary-70 transition-all duration-200 hover:-translate-y-0.5"
      >
        Contact Us
      </Button>
    </Link>
  </div>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Optimize scroll handler with useCallback
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  // Optimize scroll event listener
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const throttledHandleScroll = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, 16); // ~60fps
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [handleScroll]);

  // Memoize navbar classes to prevent unnecessary re-renders
  const navClasses = useMemo(
    () =>
      `w-full py-4 sticky top-0 bg-white/80 backdrop-blur-md z-50 transition-all duration-300 ${
        scrolled ? "shadow-md border-b border-light-90" : ""
      }`,
    [scrolled]
  );

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Logo />
          <DesktopNavigation pathname={pathname} />
          <MobileNavigation
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            pathname={pathname}
          />
        </div>
      </div>
    </nav>
  );
}
