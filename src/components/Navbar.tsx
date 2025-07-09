"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import BookButton from "./BookButton";

// Types
interface NavLink {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

interface ContactInfo {
  icon: React.ElementType;
  href: string;
  text: string;
}

// Reusable components
const NavLinkItem = ({
  link,
  pathname,
  onClick,
}: {
  link: NavLink;
  pathname: string;
  onClick?: () => void;
}) => (
  <div className="space-y-2">
    <Link
      href={link.href}
      className={`text-grey-30 hover:text-primary-75 transition-colors text-lg flex items-center justify-between
        ${pathname === link.href ? "text-primary-75" : ""}`}
      onClick={onClick}
    >
      {link.label}
    </Link>
  </div>
);

const ContactInfoItem = ({ icon: Icon, href, text }: ContactInfo) => (
  <a
    href={href}
    className="flex items-center gap-2 text-grey-35 hover:text-primary-75 transition-colors"
  >
    <Icon size={16} className="text-primary-75" />
    <span>{text}</span>
  </a>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    // { href: "/courses", label: "Courses" },
    { href: "/about", label: "About Us" },
  ];

  const contactInfoItems: ContactInfo[] = [
    {
      icon: Phone,
      href: "tel:+919148774540",
      text: "+91 91487 74540",
    },
    {
      icon: Mail,
      href: "mailto:vishal.chettri@eduwise.solutions",
      text: "vishal.chettri@eduwise.solutions",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full py-4 sticky top-0 bg-white/80 backdrop-blur-md z-50 transition-all duration-300
        ${scrolled ? "shadow-md border-b border-light-90" : ""}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative">
            <Image
              src="/eduwise.png"
              alt="Eduwise Solutions"
              width={160}
              height={48}
              className="w-[120px] md:w-[140px] lg:w-[160px] object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                <Link
                  href={link.href}
                  className={`text-grey-30 hover:text-primary-75 transition-colors py-2 flex items-center gap-1
                    ${pathname === link.href ? "text-primary-75" : ""}`}
                >
                  {link.label}
                </Link>
              </div>
            ))}

            {/* Book Button */}
            <div className="ml-2">
              <BookButton />
            </div>

            {/* Contact Us Button */}
            <Link href="/contact">
              <Button
                variant="default"
                className="bg-primary-75 hover:bg-primary-70 transition-all duration-200 hover:-translate-y-0.5"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary-99"
              >
                <Menu className="h-6 w-6 text-grey-30" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <SheetHeader className="p-6 border-b border-light-90">
                <div className="flex justify-between items-center">
                  <Image
                    src="/eduwise.png"
                    alt="Eduwise Solutions"
                    width={120}
                    height={40}
                    className="w-[120px] object-contain"
                  />
                </div>
              </SheetHeader>

              <div className="p-6">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <NavLinkItem
                      key={link.label}
                      link={link}
                      pathname={pathname}
                      onClick={() => setIsOpen(false)}
                    />
                  ))}

                  <BookButton />

                  <Link href="/contact">
                    <Button
                      variant="default"
                      className="bg-primary-75 hover:bg-primary-70 w-full mt-4"
                      onClick={() => setIsOpen(false)}
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>

                {/* Mobile Contact Info */}
                <div className="mt-8 pt-8 border-t border-light-90 space-y-4">
                  {contactInfoItems.map((item, index) => (
                    <ContactInfoItem
                      key={index}
                      icon={item.icon}
                      href={item.href}
                      text={item.text}
                    />
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
