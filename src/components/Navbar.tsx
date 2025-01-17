"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <nav className="w-full py-4 border-b border-light-90 sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo - Responsive sizes */}
          <Link href="/" className="relative">
            <Image
              src="/eduwise.png"
              alt="Eduwise Solutions"
              width={120}
              height={40}
              className="w-[120px] md:w-[140px] lg:w-[160px] object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-grey-30 hover:text-primary-75 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact">
              <Button
                variant="default"
                className="bg-primary-75 hover:bg-primary-70 ml-4"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-grey-30 hover:text-primary-75 transition-colors text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/contact">
                  <Button
                    variant="default"
                    className="bg-primary-75 hover:bg-primary-70 w-full mt-4"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
