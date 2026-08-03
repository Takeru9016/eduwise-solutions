"use client";

import Image from "next/image";
import Link from "next/link";

export default function AWSPartnerBanner() {
  const BannerContent = () => (
    <div className="flex items-center gap-4 pr-12">
      <Image
        alt="AWS"
        className="flex-shrink-0 object-contain brightness-0 invert"
        height={28}
        src="/partners/aws.svg"
        width={48}
      />
      <span className="whitespace-nowrap font-medium text-sm">
        <span className="text-[#FF9900]">Official AWS Partner</span>
        <span className="mx-2 text-white/40">•</span>
        <span>Cloud-powered training & certifications</span>
      </span>
      <Link
        className="ml-2 inline-flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#FF9900] px-3 py-1 font-semibold text-[#232F3E] text-xs transition-colors hover:bg-[#FFB74D]"
        href="/certifications/aws"
      >
        AWS Certifications
        <svg
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M9 5l7 7-7 7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </Link>
    </div>
  );

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#232F3E] via-[#1A242F] to-[#232F3E] text-white">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF9900' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative flex items-center py-2.5">
        {/* Marquee container */}
        <div className="flex-1 overflow-hidden">
          <div className="marquee-wrapper">
            <div className="marquee-content">
              <BannerContent />
              <BannerContent />
              <BannerContent />
              <BannerContent />
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes for seamless marquee */}
      <style jsx>{`
        .marquee-wrapper {
          display: flex;
          width: 100%;
        }
        .marquee-content {
          display: flex;
          gap: 3rem;
          animation: scroll 25s linear infinite;
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
