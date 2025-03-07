"use client";

import { useState, useEffect } from "react";
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/courses",
      label: "Courses",
      // children: [
      //   { href: "/masters", label: "Master's Programme" },
      //   { href: "/professional", label: "Professional Certification" },
      //   { href: "/certification", label: "Certification Programme" },
      // ],
    },
    { href: "/about", label: "About Us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Main Navigation */}
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
                    {/* {link.children && (
                      <ChevronDown
                        size={16}
                        className="group-hover:rotate-180 transition-transform duration-200"
                      />
                    )} */}
                  </Link>

                  {/* Dropdown Menu */}
                  {/* {link.children && (
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
                  )} */}
                </div>
              ))}

              {/* Add BookButton to desktop menu */}
              <div className="ml-2">
                <BookButton />
              </div>

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
                      <div key={link.label} className="space-y-2">
                        <Link
                          href={link.href}
                          className={`text-grey-30 hover:text-primary-75 transition-colors text-lg flex items-center justify-between
                            ${pathname === link.href ? "text-primary-75" : ""}`}
                          // onClick={() => !link.children && setIsOpen(false)}
                        >
                          {link.label}
                          {/* {link.children && <ChevronDown size={16} />} */}
                        </Link>

                        {/* {link.children && (
                          <div className="pl-4 space-y-2">
                            {link.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="block text-grey-35 hover:text-primary-75 transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )} */}
                      </div>
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
                    <a
                      href="tel:+9160093 92581"
                      className="flex items-center gap-2 text-grey-35 hover:text-primary-75 transition-colors"
                    >
                      <Phone size={16} className="text-primary-75" />
                      <span>+91 60093 92581</span>
                    </a>
                    <a
                      href="mailto:admin@eduwise.solutions"
                      className="flex items-center gap-2 text-grey-35 hover:text-primary-75 transition-colors"
                    >
                      <Mail size={16} className="text-primary-75" />
                      <span>admin@eduwise.solutions</span>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
