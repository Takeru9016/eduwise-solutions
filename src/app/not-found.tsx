"use client";

import { Home, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const glowStyle = {
    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Animated background glow */}
      <div
        className="absolute inset-0 transition-all duration-300 ease-out"
        style={glowStyle}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...new Array(20)].map((_, i) => (
          <div
            className="absolute h-2 w-2 animate-pulse rounded-full bg-blue-400 opacity-20"
            key={i}
            style={{
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div
        className={`relative z-10 mx-auto max-w-2xl text-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        {/* 404 Number with glitch effect */}
        <div className="relative mb-8">
          <h1 className="animate-pulse select-none bg-linear-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text font-bold text-9xl text-transparent md:text-[12rem]">
            404
          </h1>

          {/* Glitch overlay */}
          <div className="absolute inset-0 animate-ping font-bold text-9xl text-red-500 opacity-20 md:text-[12rem]">
            404
          </div>
        </div>

        {/* Error message */}
        <div className="mb-8 space-y-4">
          <h2 className="mb-4 animate-fade-in font-bold text-3xl text-white md:text-4xl">
            Oops! Page Not Found
          </h2>
          <p className="mx-auto max-w-md text-gray-300 text-lg leading-relaxed">
            The page you&apos;re looking for seems to have vanished into the
            digital void. Let&apos;s get you back on track!
          </p>
        </div>

        {/* Action buttons */}
        <Link
          className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          href={"/"}
        >
          <button className="group flex transform items-center gap-2 rounded-lg bg-linear-to-r from-emerald-600 to-cyan-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-emerald-700 hover:to-cyan-700 hover:shadow-xl">
            <Home className="h-5 w-5 transition-transform group-hover:scale-110" />
            Home Page
          </button>
        </Link>

        {/* Fun fact */}
        <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-6 backdrop-blur-xs">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            <h3 className="font-semibold text-lg text-white">Did you know?</h3>
          </div>
          <p className="text-gray-300 text-sm">
            The 404 error code was named after room 404 at CERN, where the first
            web server was located. When pages weren&apos;t found, they&apos;d
            say the file was &quot;not found in room 404&quot;!
          </p>
        </div>
      </div>

      {/* Animated shapes */}
      <div className="absolute top-20 left-10 h-20 w-20 animate-bounce rounded-full border-2 border-purple-500 opacity-20" />
      <div className="absolute right-10 bottom-20 h-16 w-16 rotate-45 animate-pulse border-2 border-blue-500 opacity-20" />
      <div className="absolute top-1/2 left-5 h-8 w-8 animate-ping rounded-full bg-linear-to-r from-pink-500 to-purple-500 opacity-30" />
      <div
        className="absolute right-1/4 bottom-1/3 h-12 w-12 animate-spin rounded-full border-2 border-cyan-500 opacity-20"
        style={{ animationDuration: "3s" }}
      />
    </div>
  );
}
