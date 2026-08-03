"use client";

import Image from "next/image";

interface CompanyLogo {
  alt: string;
  src: string;
}

const row1Logos: CompanyLogo[] = [
  {
    alt: "QualiTlabs",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-20.webp",
  },
  {
    alt: "Ola",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-21.webp",
  },
  {
    alt: "Novature Tech",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-22.webp",
  },
  {
    alt: "CIMCON Software",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-23.webp",
  },
  {
    alt: "Techify",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-24.webp",
  },
  {
    alt: "Thoughtworks",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-25.webp",
  },
  {
    alt: "RevInfotech",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-26.webp",
  },
  {
    alt: "HDFC Bank",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-27.webp",
  },
  {
    alt: "Meesho",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-28.webp",
  },
  {
    alt: "First Source",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-29.webp",
  },
  {
    alt: "Mihup",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-30.webp",
  },
  {
    alt: "FastPix Logo",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/logos/FastPixLogo.webp",
  },
  {
    alt: "People Tech",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-32.webp",
  },
];

const row2Logos: CompanyLogo[] = [
  {
    alt: "eClerx",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-10.webp",
  },
  {
    alt: "FatakPay",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-11.webp",
  },
  {
    alt: "Kartoffel Logo",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/Kartoffel.webp",
  },
  {
    alt: "Rummy Verse Logo",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/Rummy Verse.webp",
  },
  {
    alt: "Latent View",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-14.webp",
  },
  {
    alt: "Blinkit",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-15.webp",
  },
  {
    alt: "Nvest Solution",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-16.webp",
  },
  {
    alt: "Onward Logo",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/Onward.webp",
  },
  {
    alt: "Cricbuzz Logo",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/Cricbuzz.webp",
  },
  {
    alt: "HealthSignz",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-19.webp",
  },
];

const row3Logos: CompanyLogo[] = [
  {
    alt: "Hitachi",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button.webp",
  },
  {
    alt: "RapiPay",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-1.webp",
  },
  {
    alt: "CIMCON Digital",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-2.webp",
  },
  {
    alt: "Ease my Trip",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-3.webp",
  },
  {
    alt: "Mindteck",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-4.webp",
  },
  {
    alt: "Thoughts",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-5.webp",
  },
  {
    alt: "Trigent Logo",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/Trigent.webp",
  },
  {
    alt: "CarDekho",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-7.webp",
  },
  {
    alt: "Coolberg",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-8.webp",
  },
  {
    alt: "HappyMonk.AI",
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-9.webp",
  },
];

const LogoCard = ({ src, alt }: CompanyLogo) => (
  <div className="flex h-16 min-w-32 shrink-0 items-center justify-center rounded-xl bg-white p-2">
    <Image
      alt={alt}
      className="max-h-10 max-w-28 object-contain"
      height={40}
      src={src}
      width={112}
    />
  </div>
);

const MarqueeRow = ({
  logos,
  direction,
}: {
  logos: CompanyLogo[];
  direction: "ltr" | "rtl";
}) => (
  <div className="mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] relative overflow-hidden">
    <div
      className={`flex w-fit gap-7 ${
        direction === "ltr" ? "animate-scroll-left" : "animate-scroll-right"
      }`}
    >
      {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
        <LogoCard key={`${direction}-${index}`} {...logo} />
      ))}
    </div>
  </div>
);

export default function CompanyMarquee() {
  return (
    <div className="w-full space-y-4 py-8">
      <MarqueeRow direction="ltr" logos={row1Logos} />
      <MarqueeRow direction="rtl" logos={row2Logos} />
      <MarqueeRow direction="ltr" logos={row3Logos} />
    </div>
  );
}
