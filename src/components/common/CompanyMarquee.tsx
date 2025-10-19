"use client";

import Image from "next/image";

interface CompanyLogo {
  src: string;
  alt: string;
}

const row1Logos: CompanyLogo[] = [
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-20.webp",
    alt: "QualiTlabs",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-21.webp",
    alt: "Ola",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-22.webp",
    alt: "Novature Tech",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-23.webp",
    alt: "CIMCON Software",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-24.webp",
    alt: "Techify",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-25.webp",
    alt: "Thoughtworks",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-26.webp",
    alt: "RevInfotech",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-27.webp",
    alt: "HDFC Bank",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-28.webp",
    alt: "Meesho",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-29.webp",
    alt: "First Source",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-30.webp",
    alt: "Mihup",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/logos/FastPixLogo.webp",
    alt: "FastPix Logo",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-32.webp",
    alt: "People Tech",
  },
];

const row2Logos: CompanyLogo[] = [
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-10.webp",
    alt: "eClerx",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-11.webp",
    alt: "FatakPay",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/Kartoffel.webp",
    alt: "Kartoffel Logo",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/Rummy Verse.webp",
    alt: "Rummy Verse Logo",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-14.webp",
    alt: "Latent View",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-15.webp",
    alt: "Blinkit",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-16.webp",
    alt: "Nvest Solution",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/Onward.webp",
    alt: "Onward Logo",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/Cricbuzz.webp",
    alt: "Cricbuzz Logo",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-19.webp",
    alt: "HealthSignz",
  },
];

const row3Logos: CompanyLogo[] = [
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button.webp",
    alt: "Hitachi",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-1.webp",
    alt: "RapiPay",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-2.webp",
    alt: "CIMCON Digital",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-3.webp",
    alt: "Ease my Trip",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-4.webp",
    alt: "Mindteck",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-5.webp",
    alt: "Thoughts",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/Trigent.webp",
    alt: "Trigent Logo",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-7.webp",
    alt: "CarDekho",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-8.webp",
    alt: "Coolberg",
  },
  {
    src: "https://d1qnndbrfkpp2h.cloudfront.net/static-images/hiring-companies/button-9.webp",
    alt: "HappyMonk.AI",
  },
];

const LogoCard = ({ src, alt }: CompanyLogo) => (
  <div className="h-16 min-w-32 flex-shrink-0 rounded-xl flex items-center justify-center bg-white p-2">
    <Image
      src={src}
      alt={alt}
      width={112}
      height={40}
      className="max-w-28 max-h-10 object-contain"
    />
  </div>
);

const MarqueeRow = ({
  logos,
  direction,
}: {
  logos: CompanyLogo[];
  direction: "ltr" | "rtl";
}) => {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex gap-7 w-fit ${
          direction === "ltr" ? "animate-scroll-left" : "animate-scroll-right"
        }`}
      >
        {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
          <LogoCard key={`${direction}-${index}`} {...logo} />
        ))}
      </div>
    </div>
  );
};

export default function CompanyMarquee() {
  return (
    <div className="w-full space-y-4 py-8">
      <MarqueeRow logos={row1Logos} direction="ltr" />
      <MarqueeRow logos={row2Logos} direction="rtl" />
      <MarqueeRow logos={row3Logos} direction="ltr" />
    </div>
  );
}
