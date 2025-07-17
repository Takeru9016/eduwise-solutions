"use client";

import { useState, useEffect } from "react";
import { Home, Zap } from "lucide-react";
import Link from "next/link";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background glow */}
      <div
        className="absolute inset-0 transition-all duration-300 ease-out"
        style={glowStyle}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div
        className={`relative z-10 text-center max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* 404 Number with glitch effect */}
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse select-none">
            404
          </h1>

          {/* Glitch overlay */}
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-red-500 opacity-20 animate-ping">
            404
          </div>
        </div>

        {/* Error message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-300 max-w-md mx-auto leading-relaxed">
            The page you&apos;re looking for seems to have vanished into the digital
            void. Let&apos;s get you back on track!
          </p>
        </div>

        {/* Action buttons */}
        <Link
          href={"/"}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <button className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-lg font-medium hover:from-emerald-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Home Page
          </button>
        </Link>

        {/* Fun fact */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Did you know?</h3>
          </div>
          <p className="text-gray-300 text-sm">
            The 404 error code was named after room 404 at CERN, where the first
            web server was located. When pages weren&apos;t found, they&apos;d say the
            file was &quot;not found in room 404&quot;!
          </p>
        </div>
      </div>

      {/* Animated shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-purple-500 rounded-full animate-bounce opacity-20" />
      <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-blue-500 rotate-45 animate-pulse opacity-20" />
      <div className="absolute top-1/2 left-5 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-ping opacity-30" />
      <div
        className="absolute bottom-1/3 right-1/4 w-12 h-12 border-2 border-cyan-500 rounded-full animate-spin opacity-20"
        style={{ animationDuration: "3s" }}
      />
    </div>
  );
}
